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

// TL da fórmula: o que passa de 30 linhas é desconsiderado (edital, 9.7.5, c)
export function linhasParaNota(texto: string): number {
  return Math.min(30, contarLinhas(texto))
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
  const tl = linhasParaNota(r.texto)
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

export async function corrigirComIA(r: RegistroRedacao, motivadores: string[] = []): Promise<{ avaliacao: AvaliacaoIA; limite: number; usadas: number }> {
  const t = await token()
  if (!t) throw new Error('A correção por IA precisa do login.')
  if (!navigator.onLine) throw new Error('Sem internet. Use "Copiar para correção" ou tente quando estiver conectado.')
  const resp = await fetch('/api/corrigir', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${t}` },
    body: JSON.stringify({ tema: r.tema, comandos: r.comandos, motivadores, linhas: linhasDoTexto(r.texto) }),
  })
  const corpo = await resp.json().catch(() => ({ erro: `Erro ${resp.status} do servidor.` }))
  if (!resp.ok) throw new Error(corpo.erro ?? `Erro ${resp.status}`)
  return corpo
}

// Prompt para colar no Claude ou no ChatGPT (reserva, sem cota)
export function montarPromptManual(r: RegistroRedacao, motivadores: string[] = []): string {
  const linhas = linhasDoTexto(r.texto)
  const porComando = Math.round((24 / Math.max(1, r.comandos.length)) * 100) / 100
  const faixa = (de: number, ate: number) => `${Math.round(de * porComando * 100) / 100} a ${Math.round(ate * porComando * 100) / 100}`
  return `Você é examinador rigoroso da banca Cebraspe. Corrija esta redação da prova discursiva do concurso do Corpo de Bombeiros Militar de Alagoas (praça), em português. Não é correção do ENEM: nenhuma nota é alta por padrão, e proposta de intervenção só conta se um comando pedir. Fuga ao tema zera.

Nota de conteúdo (NC), de 0 a 30:
- Cada comando vale de 0 a ${porComando}. Atendido (${faixa(7 / 8, 1)}): todas as partes, explicadas e corretas. Parcial (${faixa(1 / 2, 3 / 4)}): uma parte ausente ou pontos sem explicação. Superficial (${faixa(1 / 8, 3 / 8)}): menções soltas. Não atendido: 0.
- Explicar, não listar. Erro de conteúdo pesa mais que omissão. Informação no parágrafo de outro comando não pontua onde está. Constatação não é proposta. Cópia dos textos motivadores não pontua; repertório próprio vale mais.
- Apresentação e estrutura: começa em 6 e perde de 0,5 a 1 por falha (introdução sem tese, comando fora do seu parágrafo ou da ordem, desequilíbrio, conectivo inadequado ou sequência não fechada, redundância). Se o último comando e a conclusão dividirem o parágrafo final, com o comando desenvolvido e fecho claro, desconte só 0,5.

Erros (NE): liste CADA ocorrência, com a linha, o trecho, a correção e o tipo: grafia, morfossintaxe (crase, vírgula entre sujeito e verbo, concordância, regência, tempo ou modo verbal, paralelismo, maiúscula, colocação) ou propriedade vocabular. Coesão e conectivo vão para a estrutura; conteúdo vai para o comando.
Riscos, à parte e sem somar ao NE: "através de" no sentido de "por meio de", paralelismo em enumerações, palavra que retoma algo não mencionado antes e nome de órgão ora com maiúscula, ora com minúscula.

Calcule NPD = NC − 6 × NE ÷ TL, com TL = ${linhasParaNota(r.texto)} linhas, para o NE sem riscos e com riscos. O mínimo é 15.

Responda nesta ordem: leitura do comando; nota por comando com nível, o que foi bem feito e o que faltou; estrutura e falhas; NC; lista de erros e de riscos; cálculo do NPD; resultado e margem em relação a 15; até três prioridades com um exemplo de reescrita.

TEMA: ${r.tema}
COMANDOS:
${r.comandos.map((c, i) => `${i + 1}. ${c}`).join('\n')}
${motivadores.length ? `\nTEXTOS MOTIVADORES:\n${motivadores.map((m, i) => `Texto ${i + 1}: ${m}`).join('\n')}\n` : ''}
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
  { nome: 'Tempo ou modo verbal', teste: /tempo (ou modo )?verbal|modo verbal/i },
  { nome: 'Paralelismo', teste: /paralelismo/i },
  { nome: 'Maiúscula', teste: /mai[úu]scula|min[úu]scula/i },
]

export function categoriaDoErro(e: { tipo: TipoErro; explicacao: string; correcao: string }): string {
  // a explicação pode citar outros erros: vale a categoria mencionada primeiro
  const c = CATEGORIAS.map((x) => ({ nome: x.nome, i: e.explicacao.search(x.teste) })).filter((x) => x.i >= 0).sort((a, b) => a.i - b.i)[0]
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
  'Tempo ou modo verbal': 'PT-05',
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
      superficial: comandos.filter((c) => c.atendido === 'superficial').length,
      nao: comandos.filter((c) => c.atendido === 'nao').length,
    },
    temasEscritos: new Set(corrigidas.filter((r) => r.temaId != null).map((r) => r.temaId)).size,
  }
}
