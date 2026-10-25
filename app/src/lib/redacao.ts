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
