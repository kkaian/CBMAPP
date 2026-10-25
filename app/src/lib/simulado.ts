import { carregarIndice, carregarMateria, carregarTodas, materiaDoTopico } from './conteudo'
import { db } from './db'
import { registrarResposta } from './estudo'
import { diagnosticoPorTopico } from './stats'
import { agendarSincronizacao } from './sync'
import type { Edital, Questao, RegistroResposta, RegistroSimulado, TipoSimulado } from './types'

// Distribuição da prova (docs/PROJETO.md §2.2) e versão reduzida do mini-simulado (30 itens, proporcional).
const DIST_MINI: Record<string, number> = { PT: 3, ING: 1, INF: 2, MAT: 2, RLM: 2, LEG: 1, CDH: 1, FIS: 5, QUI: 5, BIO: 5, MEC: 3 }
const MIN = 60_000
export const LIMITE_COMPLETO = 270 * MIN // 4h30
export const LIMITE_MINI = 40 * MIN
const POR_ITEM_FRACOS = 80_000 // mesmo ritmo do mini (40 min ÷ 30 itens)
export const DRIVE = [1, 2, 3, 4, 5]

function embaralhar<T>(lista: T[]): T[] {
  const a = [...lista]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Nunca respondidos → errados (ou em branco) na última vez → acertados.
async function porPrioridade(questoes: Questao[]): Promise<Questao[]> {
  const respostas = await db.respostas.where('itemId').anyOf(questoes.map((q) => q.id)).sortBy('criadaEm')
  const ultima = new Map<string, number | null>()
  for (const r of respostas) ultima.set(r.itemId, r.correta)
  return [
    ...embaralhar(questoes.filter((q) => !ultima.has(q.id))),
    ...embaralhar(questoes.filter((q) => ultima.has(q.id) && ultima.get(q.id) !== 1)),
    ...embaralhar(questoes.filter((q) => ultima.get(q.id) === 1)),
  ]
}

// Escolhe n itens mantendo juntos os do mesmo texto-base (até 5 por texto), como na prova.
async function sortear(questoes: Questao[], n: number): Promise<Questao[]> {
  const ordem = await porPrioridade(questoes.filter((q) => q.status === 'ok'))
  const usados = new Set<string>()
  const saida: Questao[] = []
  for (const q of ordem) {
    if (saida.length >= n) break
    if (usados.has(q.id)) continue
    const bloco = q.grupo ? ordem.filter((x) => x.grupo === q.grupo && !usados.has(x.id)).slice(0, Math.min(5, n - saida.length)) : [q]
    for (const x of bloco) { usados.add(x.id); saida.push(x) }
  }
  return saida
}

// P1 primeiro, na ordem do caderno do Cebraspe; depois P2
const ORDEM_CADERNO = ['PT', 'ING', 'INF', 'MAT', 'RLM', 'LEG', 'CDH', 'FIS', 'QUI', 'BIO', 'MEC']

function posicaoNoCaderno(edital: Edital): Map<string, number> {
  const ordemMateria = new Map<string, number>()
  ORDEM_CADERNO.forEach((m, i) => ordemMateria.set(m, i))
  edital.materias.forEach((m, i) => { if (!ordemMateria.has(m.codigo)) ordemMateria.set(m.codigo, 100 + i) })
  return ordemMateria
}

function ordenarComoProva(questoes: Questao[], edital: Edital): Questao[] {
  const ordemMateria = posicaoNoCaderno(edital)
  return questoes
    .map((q, i) => ({ q, i }))
    .sort((a, b) => (ordemMateria.get(materiaDoTopico(a.q.topico))! - ordemMateria.get(materiaDoTopico(b.q.topico))!) || a.i - b.i)
    .map((x) => x.q)
}

export interface Montagem {
  tipo: TipoSimulado
  titulo: string
  itens: Questao[]
  limiteMs: number
}

export async function montarDrive(numero: number): Promise<Montagem> {
  const todas = Object.values(await carregarTodas()).flatMap((d) => d.questoes)
  const prefixo = `simulado-${String(numero).padStart(2, '0')}-`
  const itens = todas
    .filter((q) => q.origem.startsWith(prefixo))
    .sort((a, b) => Number(a.origem.slice(prefixo.length)) - Number(b.origem.slice(prefixo.length)))
  return { tipo: 'drive', titulo: `Simulado ${String(numero).padStart(2, '0')}`, itens, limiteMs: LIMITE_COMPLETO }
}

export async function montarCompleto(): Promise<Montagem> {
  const ind = await carregarIndice()
  const partes: Questao[] = []
  for (const m of ind.edital.materias.filter((m) => m.itensProva > 0)) {
    partes.push(...(await sortear((await carregarMateria(m.codigo)).questoes, m.itensProva)))
  }
  return { tipo: 'completo', titulo: 'Simulado completo', itens: ordenarComoProva(partes, ind.edital), limiteMs: LIMITE_COMPLETO }
}

export async function montarMini(): Promise<Montagem> {
  const ind = await carregarIndice()
  const partes: Questao[] = []
  for (const [cod, n] of Object.entries(DIST_MINI)) partes.push(...(await sortear((await carregarMateria(cod)).questoes, n)))
  return { tipo: 'mini', titulo: 'Mini-simulado', itens: ordenarComoProva(partes, ind.edital), limiteMs: LIMITE_MINI }
}

export async function topicosFracos(): Promise<string[]> {
  const diag = diagnosticoPorTopico(await db.respostas.orderBy('criadaEm').toArray())
  return Object.entries(diag).filter(([, d]) => d.status === 'critico' || d.status === 'construcao').map(([t]) => t)
}

export async function montarFracos(n = 30): Promise<Montagem | null> {
  const fracos = new Set(await topicosFracos())
  if (!fracos.size) return null
  const ind = await carregarIndice()
  const todas = Object.values(await carregarTodas()).flatMap((d) => d.questoes).filter((q) => fracos.has(q.topico))
  // reparte os itens entre os tópicos fracos para nenhum dominar o simulado
  const porTopico = new Map<string, Questao[]>()
  for (const q of todas) porTopico.set(q.topico, [...(porTopico.get(q.topico) ?? []), q])
  const cota = Math.max(3, Math.ceil(n / porTopico.size))
  const partes: Questao[] = []
  for (const qs of porTopico.values()) partes.push(...(await sortear(qs, cota)))
  const itens = ordenarComoProva(embaralharBlocos(partes).slice(0, n), ind.edital)
  return { tipo: 'fracos', titulo: 'Pontos fracos', itens, limiteMs: itens.length * POR_ITEM_FRACOS }
}

// embaralha mantendo os itens de um mesmo texto-base juntos
function embaralharBlocos(questoes: Questao[]): Questao[] {
  const blocos = new Map<string, Questao[]>()
  for (const q of questoes) { const k = q.grupo ?? q.id; blocos.set(k, [...(blocos.get(k) ?? []), q]) }
  return embaralhar([...blocos.values()]).flat()
}

export async function iniciarSimulado(m: Montagem): Promise<string> {
  const agora = new Date().toISOString()
  const reg: RegistroSimulado = {
    id: crypto.randomUUID(), tipo: m.tipo, titulo: m.titulo, itens: m.itens.map((q) => q.id), respostas: {}, tempos: {},
    limiteMs: m.limiteMs, gastoMs: 0, atual: 0, status: 'andamento', iniciadoEm: agora, concluidoEm: null, atualizadaEm: agora, sincronizada: 0,
  }
  await db.simulados.add(reg)
  agendarSincronizacao()
  return reg.id
}

// Salva a prova em andamento; nunca sobrescreve um simulado já entregue ou descartado.
export async function salvarSimulado(s: RegistroSimulado) {
  const salvo = await db.transaction('rw', db.simulados, async () => {
    const atual = await db.simulados.get(s.id)
    if (atual && atual.status !== 'andamento') return false
    await db.simulados.put({ ...s, status: 'andamento', atualizadaEm: new Date().toISOString(), sincronizada: 0 })
    return true
  })
  if (salvo) agendarSincronizacao(10_000)
}

// Ao entregar: cada item vira uma resposta normal (modo "simulado"), que alimenta o diagnóstico e o caderno de erros.
export async function entregarSimulado(s: RegistroSimulado, questoes: Questao[]) {
  const agora = new Date().toISOString()
  const nota = calcularNota(s, questoes, (await carregarIndice()).edital)
  const resumo = { nota: nota.total.nota, itens: nota.total.itens, passou: nota.passou }
  await db.simulados.put({ ...s, status: 'concluido', concluidoEm: agora, resumo, atualizadaEm: agora, sincronizada: 0 })
  const porId = new Map(questoes.map((q) => [q.id, q]))
  for (const id of s.itens) {
    const q = porId.get(id)
    if (!q) continue
    const r = s.respostas[id]
    await registrarResposta(q, r?.r ?? 'B', r?.r === 'B' ? null : r?.c ?? null, s.tempos[id] ?? 0, 'simulado')
  }
  agendarSincronizacao(500)
}

// Só simulados em andamento (o concluído já virou respostas no histórico).
// Fica marcado como descartado, e não apagado, para a sincronização levar a mudança ao outro aparelho.
export async function descartarSimulado(id: string) {
  const s = await db.simulados.get(id)
  if (!s || s.status !== 'andamento') return
  await db.simulados.put({ ...s, status: 'descartado', respostas: {}, atualizadaEm: new Date().toISOString(), sincronizada: 0 })
  agendarSincronizacao()
}

// ---------- nota pela regra do edital ----------

export interface Placar { certos: number; errados: number; brancos: number; itens: number; nota: number }

export interface NotaSimulado {
  provas: { codigo: string; nome: string; placar: Placar; minimo: number }[]
  total: Placar
  minimoTotal: number
  proporcional: boolean // mínimos ajustados ao tamanho do simulado
  passou: boolean
  materias: { codigo: string; nome: string; placar: Placar }[]
}

function placar(ids: string[], s: RegistroSimulado, porId: Map<string, Questao>): Placar {
  const p: Placar = { certos: 0, errados: 0, brancos: 0, itens: ids.length, nota: 0 }
  for (const id of ids) {
    const r = s.respostas[id]?.r ?? 'B'
    if (r === 'B') p.brancos++
    else if (r === porId.get(id)?.gabarito) p.certos++
    else p.errados++
  }
  p.nota = p.certos - p.errados
  return p
}

export function calcularNota(s: RegistroSimulado, questoes: Questao[], edital: Edital): NotaSimulado {
  const porId = new Map(questoes.map((q) => [q.id, q]))
  const ids = s.itens.filter((id) => porId.has(id))
  const provaDe = new Map(edital.materias.map((m) => [m.codigo, m.prova]))
  const objetivas = edital.provas.filter((p) => p.itens > 0)
  const completo = ids.length === objetivas.reduce((t, p) => t + p.itens, 0)
  const provas = objetivas.map((p) => {
    const daProva = ids.filter((id) => provaDe.get(materiaDoTopico(id)) === p.codigo)
    const minimo = completo ? p.minimo : Math.round(((p.minimo * daProva.length) / p.itens) * 10) / 10
    return { codigo: p.codigo, nome: p.nome, placar: placar(daProva, s, porId), minimo }
  })
  const total = placar(ids, s, porId)
  const minimoTotal = completo ? edital.minimoTotal : Math.round(((edital.minimoTotal * ids.length) / 120) * 10) / 10
  const posicao = posicaoNoCaderno(edital)
  const materias = edital.materias
    .map((m) => ({ codigo: m.codigo, nome: m.nome, placar: placar(ids.filter((id) => materiaDoTopico(id) === m.codigo), s, porId) }))
    .filter((m) => m.placar.itens > 0)
    .sort((a, b) => posicao.get(a.codigo)! - posicao.get(b.codigo)!)
  return {
    provas, total, minimoTotal, proporcional: !completo, materias,
    passou: provas.every((p) => p.placar.nota >= p.minimo) && total.nota >= minimoTotal,
  }
}

// Brancos: compensaria chutar? Usa o acerto histórico dos chutes (fora deste simulado).
export function valeChutar(respostas: RegistroResposta[]): { acerto: number; n: number } | null {
  const chutes = respostas.filter((r) => r.confianca === 'chute' && r.correta !== null)
  if (chutes.length < 10) return null
  return { acerto: chutes.filter((r) => r.correta === 1).length / chutes.length, n: chutes.length }
}

export function formatarDuracao(ms: number): string {
  const s = Math.max(0, Math.round(ms / 1000))
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), seg = s % 60
  return h ? `${h}h${String(m).padStart(2, '0')}` : `${m}:${String(seg).padStart(2, '0')}`
}
