import { db, gravarConfig, lerConfig } from './db'
import { supabase } from './supabase'
import type { RegistroLeitura, RegistroResposta, RegistroRevisao, RegistroSimulado } from './types'

// Sincronização local ⇄ Supabase.
// - respostas e leituras: só acrescentam (id único), nunca mudam
// - revisões: uma linha por item; vence a mais recente (atualizadaEm)
// - simulados: uma linha por tentativa; idem
let timer: ReturnType<typeof setTimeout> | null = null
let rodando: Promise<void> | null = null
let aprovado = false // contas pendentes de aprovação não sincronizam (o banco recusaria)

export function definirAprovado(v: boolean) {
  aprovado = v
}
const ouvintes = new Set<(s: EstadoSync) => void>()

export type EstadoSync = { status: 'local' | 'ok' | 'pendente' | 'sincronizando' | 'erro'; ultima?: string; mensagem?: string }
let estado: EstadoSync = { status: supabase ? 'pendente' : 'local' }

function definir(e: EstadoSync) {
  estado = e
  ouvintes.forEach((f) => f(e))
}

export function ouvirSync(f: (s: EstadoSync) => void) {
  ouvintes.add(f)
  f(estado)
  return () => { ouvintes.delete(f) }
}

export function agendarSincronizacao(ms = 3000) {
  if (!supabase) return
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => { void sincronizar() }, ms)
}

export function sincronizar(): Promise<void> {
  if (!supabase) return Promise.resolve()
  rodando ??= executar().finally(() => { rodando = null })
  return rodando
}

async function executar() {
  const sb = supabase!
  const { data: sessao } = await sb.auth.getSession()
  if (!sessao.session || !aprovado) return
  if (!navigator.onLine) { definir({ ...estado, status: 'pendente', mensagem: 'Sem internet: as respostas ficam guardadas no aparelho.' }); return }
  definir({ ...estado, status: 'sincronizando' })
  try {
    await enviar()
    await receber()
    definir({ status: 'ok', ultima: new Date().toISOString() })
  } catch (e) {
    definir({ ...estado, status: 'erro', mensagem: (e as Error).message })
  }
}

async function enviar() {
  const sb = supabase!
  const respostas = await db.respostas.where('sincronizada').equals(0).toArray()
  for (const lote of lotes(respostas, 500)) {
    const { error } = await sb.from('respostas').upsert(lote.map(respostaParaLinha), { onConflict: 'id', ignoreDuplicates: true })
    if (error) throw error
    await db.respostas.bulkUpdate(lote.map((r) => ({ key: r.id, changes: { sincronizada: 1 as const } })))
  }
  const leituras = await db.leituras.where('sincronizada').equals(0).toArray()
  for (const lote of lotes(leituras, 500)) {
    const { error } = await sb.from('leituras').upsert(lote.map((l) => ({ id: l.id, topico: l.topico, aba: l.aba, criada_em: l.criadaEm })), { onConflict: 'id', ignoreDuplicates: true })
    if (error) throw error
    await db.leituras.bulkUpdate(lote.map((l) => ({ key: l.id, changes: { sincronizada: 1 as const } })))
  }
  const revisoes = await db.revisoes.where('sincronizada').equals(0).toArray()
  for (const lote of lotes(revisoes, 500)) {
    const { error } = await sb.from('revisoes').upsert(
      lote.map((r) => ({ item_id: r.itemId, topico: r.topico, etapa: r.etapa, proxima: r.proxima, atualizada_em: r.atualizadaEm })),
      { onConflict: 'user_id,item_id' },
    )
    if (error) throw error
    await db.revisoes.bulkUpdate(lote.map((r) => ({ key: r.itemId, changes: { sincronizada: 1 as const } })))
  }
  const simulados = await db.simulados.where('sincronizada').equals(0).toArray()
  for (const lote of lotes(simulados, 50)) {
    const { error } = await sb.from('simulados').upsert(
      lote.map(({ sincronizada: _, ...dados }) => ({ id: dados.id, dados, status: dados.status, atualizada_em: dados.atualizadaEm })),
      { onConflict: 'id' },
    )
    if (error) throw error
    // só marca como enviada se não mudou durante o envio (o simulado em andamento é salvo o tempo todo)
    for (const s of lote) {
      await db.simulados.where('id').equals(s.id).and((x) => x.atualizadaEm === s.atualizadaEm).modify({ sincronizada: 1 })
    }
  }
}

// Traz o que foi feito em outro aparelho desde a última vez.
async function receber() {
  const sb = supabase!
  const desde = await lerConfig<string>('sync.recebidoAte', '1970-01-01T00:00:00Z')
  const inicio = new Date().toISOString()

  const respostas = await paginar<Record<string, unknown>>((de, ate) => sb.from('respostas').select('*').gt('recebida_em', desde).range(de, ate))
  if (respostas.length) {
    const existentes = new Set(await db.respostas.where('id').anyOf(respostas.map((r) => r.id as string)).primaryKeys())
    await db.respostas.bulkPut(respostas.filter((r) => !existentes.has(r.id as string)).map(linhaParaResposta))
  }

  const leituras = await paginar<Record<string, unknown>>((de, ate) => sb.from('leituras').select('*').gt('recebida_em', desde).range(de, ate))
  if (leituras.length) {
    await db.leituras.bulkPut(leituras.map((l): RegistroLeitura => ({ id: l.id as string, topico: l.topico as string, aba: l.aba as 'resumo' | 'teoria', criadaEm: l.criada_em as string, sincronizada: 1 })))
  }

  const revisoes = await paginar<Record<string, unknown>>((de, ate) => sb.from('revisoes').select('*').gt('recebida_em', desde).range(de, ate))
  for (const r of revisoes) {
    const local = await db.revisoes.get(r.item_id as string)
    if (local && local.atualizadaEm >= (r.atualizada_em as string)) continue
    const reg: RegistroRevisao = { itemId: r.item_id as string, topico: r.topico as string, etapa: r.etapa as number, proxima: (r.proxima as string | null) ?? null, atualizadaEm: r.atualizada_em as string, sincronizada: 1 }
    await db.revisoes.put(reg)
  }
  const simulados = await paginar<Record<string, unknown>>((de, ate) => sb.from('simulados').select('*').gt('recebida_em', desde).range(de, ate))
  for (const linha of simulados) {
    const remoto = linha.dados as Omit<RegistroSimulado, 'sincronizada'>
    const local = await db.simulados.get(remoto.id)
    if (local && local.atualizadaEm >= remoto.atualizadaEm) continue
    await db.simulados.put({ ...remoto, sincronizada: 1 })
  }
  await gravarConfig('sync.recebidoAte', inicio)
}

function respostaParaLinha(r: RegistroResposta) {
  return {
    id: r.id, item_id: r.itemId, topico: r.topico, materia: r.materia, resposta: r.resposta, correta: r.correta === null ? null : r.correta === 1,
    confianca: r.confianca, armadilha: r.armadilha, tempo_ms: r.tempoMs, modo: r.modo, criada_em: r.criadaEm,
  }
}

function linhaParaResposta(l: Record<string, unknown>): RegistroResposta {
  return {
    id: l.id as string, itemId: l.item_id as string, topico: l.topico as string, materia: l.materia as string,
    resposta: l.resposta as RegistroResposta['resposta'], correta: l.correta === null ? null : l.correta ? 1 : 0,
    confianca: (l.confianca as RegistroResposta['confianca']) ?? null, armadilha: (l.armadilha as RegistroResposta['armadilha']) ?? null,
    tempoMs: (l.tempo_ms as number) ?? 0, modo: l.modo as RegistroResposta['modo'], criadaEm: l.criada_em as string, sincronizada: 1,
  }
}

function lotes<T>(lista: T[], n: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < lista.length; i += n) out.push(lista.slice(i, i + n))
  return out
}

async function paginar<T>(consulta: (de: number, ate: number) => PromiseLike<{ data: T[] | null; error: unknown }>): Promise<T[]> {
  const out: T[] = []
  for (let de = 0; ; de += 1000) {
    const { data, error } = await consulta(de, de + 999)
    if (error) throw error
    out.push(...(data ?? []))
    if (!data || data.length < 1000) return out
  }
}

// Ao sair: apaga os dados locais (eles já estão no Supabase).
export async function limparDadosLocais() {
  await db.delete()
  await db.open()
}

if (typeof window !== 'undefined') {
  window.addEventListener('online', () => agendarSincronizacao(500))
}
