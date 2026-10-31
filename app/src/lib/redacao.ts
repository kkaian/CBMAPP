import { db } from './db'
import { supabase } from './supabase'
import { agendarSincronizacao } from './sync'
import type { AvaliacaoIA, RegistroRedacao, TipoErro } from './types'

// NPD = NC − 6 × NE ÷ TL (edital); nunca negativa
export function calcularNpd(nc: number, ne: number, tl: number): number {
  if (!tl) return 0
  return Math.max(0, Math.round((nc - (6 * ne) / tl) * 100) / 100)
}

// linhas da folha: cada quebra de linha é uma linha; as vazias do fim não contam
export function linhasDoTexto(texto: string): string[] {
  const linhas = texto.replace(/\r/g, '').split('\n')
  while (linhas.length && !linhas[linhas.length - 1].trim()) linhas.pop()
  return linhas
}

export function contarLinhas(texto: string): number {
  return linhasDoTexto(texto).filter((l) => l.trim()).length
}

export function novaRedacao(parcial: Partial<RegistroRedacao> = {}): RegistroRedacao {
  const agora = new Date().toISOString()
  return {
    id: crypto.randomUUID(), temaId: null, tema: '', comandos: [], texto: '', origem: 'rascunho', avaliacao: null,
    errosRecusados: [], nc: null, ne: null, npd: null, criadaEm: agora, atualizadaEm: agora, sincronizada: 0, ...parcial,
  }
}

export async function salvarRedacao(r: RegistroRedacao) {
  await db.redacoes.put({ ...r, atualizadaEm: new Date().toISOString(), sincronizada: 0 })
  agendarSincronizacao()
}

export async function excluirRedacao(r: RegistroRedacao) {
  await salvarRedacao({ ...r, excluida: true })
}

// recalcula NE e NPD a partir dos erros aceitos (os que o usuário não recusou)
export function aplicarAvaliacao(r: RegistroRedacao, avaliacao: AvaliacaoIA, recusados = r.errosRecusados): RegistroRedacao {
  const ne = avaliacao.erros.length - recusados.filter((i) => i < avaliacao.erros.length).length
  const tl = contarLinhas(r.texto)
  return { ...r, origem: 'ia', avaliacao, errosRecusados: recusados, nc: avaliacao.nc, ne, npd: calcularNpd(avaliacao.nc, ne, tl) }
}

async function token(): Promise<string | null> {
  if (!supabase) return null
  const { data } = await supabase.auth.getSession()
  return data.session?.access_token ?? null
}

export async function cotaIA(): Promise<{ limite: number; usadas: number } | null> {
  const t = await token()
  if (!t || !navigator.onLine) return null
  try {
    const r = await fetch('/api/corrigir', { headers: { Authorization: `Bearer ${t}` } })
    if (!r.ok) return null
    return await r.json()
  } catch { return null }
}

export async function corrigirComIA(r: RegistroRedacao): Promise<{ avaliacao: AvaliacaoIA; limite: number; usadas: number }> {
  const t = await token()
  if (!t) throw new Error('A correção por IA precisa do login.')
  if (!navigator.onLine) throw new Error('Sem internet. Use "Copiar para correção" ou tente quando estiver conectado.')
  const resp = await fetch('/api/corrigir', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${t}` },
    body: JSON.stringify({ tema: r.tema, comandos: r.comandos, linhas: linhasDoTexto(r.texto) }),
  })
  const corpo = await resp.json().catch(() => ({ erro: `Erro ${resp.status} do servidor.` }))
  if (!resp.ok) throw new Error(corpo.erro ?? `Erro ${resp.status}`)
  return corpo
}

// Prompt para colar no Claude ou no ChatGPT (reserva, sem cota)
export function montarPromptManual(r: RegistroRedacao): string {
  const linhas = linhasDoTexto(r.texto)
  const porComando = Math.round((24 / Math.max(1, r.comandos.length)) * 100) / 100
  return `Você é examinador da banca Cebraspe. Corrija esta redação da prova discursiva do concurso do Corpo de Bombeiros Militar de Alagoas (praça), com rigor e em português.

Critérios:
- Nota de conteúdo (NC) de 0 a 30: apresentação e estrutura textual de 0 a 6; cada comando de 0 a ${porComando} (não abordado = 0; superficial = no máximo metade). Proposta de intervenção só se algum comando pedir. Fuga ao tema zera.
- Liste CADA erro (NE), com a linha, o trecho, a correção e o tipo: grafia, morfossintaxe (concordância, regência, crase, pontuação, colocação) ou propriedade vocabular. Na dúvida, não liste.
- Avalie o repertório (autores, leis e fatos corretos e amarrados ao comando; dados inventados).
- Calcule NPD = NC − 6 × NE ÷ TL, com TL = ${contarLinhas(r.texto)} linhas.

Responda nesta ordem: nota por comando com comentário; nota de estrutura; lista de erros; comentário do repertório; NC, NE e NPD; dois trechos reescritos.

TEMA: ${r.tema}
COMANDOS:
${r.comandos.map((c, i) => `${i + 1}. ${c}`).join('\n')}

TEXTO (linhas numeradas):
${linhas.map((l, i) => `${String(i + 1).padStart(2, '0')}| ${l}`).join('\n')}`
}

// ---------- erros mais frequentes ----------

const CATEGORIAS: { nome: string; teste: RegExp }[] = [
  { nome: 'Crase', teste: /crase/i },
  { nome: 'Concordância', teste: /concord/i },
  { nome: 'Regência', teste: /reg[êe]ncia/i },
  { nome: 'Pontuação', teste: /v[íi]rgula|pontua|ponto e v|dois-pontos/i },
  { nome: 'Acentuação', teste: /acent/i },
  { nome: 'Colocação pronominal', teste: /coloca[çc][ãa]o|pr[óo]clise|[êe]nclise|mes[óo]clise/i },
]

export function categoriaDoErro(e: { tipo: TipoErro; explicacao: string; correcao: string }): string {
  const c = CATEGORIAS.find((x) => x.teste.test(e.explicacao))
  if (c) return c.nome
  if (e.tipo === 'grafia') return 'Ortografia'
  if (e.tipo === 'propriedade vocabular') return 'Propriedade vocabular'
  return 'Outros (morfossintaxe)'
}

export function errosFrequentes(redacoes: RegistroRedacao[]): { nome: string; n: number }[] {
  const conta = new Map<string, number>()
  for (const r of redacoes) {
    if (!r.avaliacao) continue
    r.avaliacao.erros.forEach((e, i) => {
      if (r.errosRecusados.includes(i)) return
      const c = categoriaDoErro(e)
      conta.set(c, (conta.get(c) ?? 0) + 1)
    })
  }
  return [...conta.entries()].map(([nome, n]) => ({ nome, n })).sort((a, b) => b.n - a.n)
}

// tópico de Português para revisar cada categoria de erro (as sem tópico no edital ficam de fora)
export const TOPICO_DO_ERRO: Record<string, string> = {
  Crase: 'PT-12',
  'Concordância': 'PT-10',
  'Regência': 'PT-11',
  'Pontuação': 'PT-09',
  'Acentuação': 'PT-03',
  'Colocação pronominal': 'PT-13',
  Ortografia: 'PT-03',
}

// ---------- histórico ----------

const media = (v: number[]) => (v.length ? v.reduce((s, x) => s + x, 0) / v.length : 0)

// Resumo das redações corrigidas: de onde vem a nota e o que já foi treinado
export function resumoRedacoes(redacoes: RegistroRedacao[]) {
  const corrigidas = redacoes.filter((r) => r.npd != null)
  const comandos = corrigidas.flatMap((r) => r.avaliacao?.comandos ?? [])
  return {
    total: corrigidas.length,
    mediaNpd: media(corrigidas.map((r) => r.npd!)),
    melhor: Math.max(0, ...corrigidas.map((r) => r.npd!)),
    acimaDoMinimo: corrigidas.filter((r) => r.npd! >= 15).length,
    mediaNc: media(corrigidas.map((r) => r.nc ?? 0)),
    mediaErros: media(corrigidas.map((r) => r.ne ?? 0)),
    // quanto os erros tiram da nota de conteúdo, em média
    perdaPorErros: media(corrigidas.map((r) => Math.max(0, (r.nc ?? 0) - r.npd!))),
    comandos: {
      sim: comandos.filter((c) => c.atendido === 'sim').length,
      parcial: comandos.filter((c) => c.atendido === 'parcial').length,
      nao: comandos.filter((c) => c.atendido === 'nao').length,
    },
    temasEscritos: new Set(corrigidas.filter((r) => r.temaId != null).map((r) => r.temaId)).size,
  }
}
