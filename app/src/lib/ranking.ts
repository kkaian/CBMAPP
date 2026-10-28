import { calcularConquistas } from './conquistas'
import { carregarIndice } from './conteudo'
import { diaLocal, inicioSemana } from './datas'
import { db, gravarConfig, lerConfig } from './db'
import { calcularStreak, condecoracoes, extratoXp, xpDesde, diagnosticoPorMateria, diasComEstudo, patente } from './stats'
import { supabase } from './supabase'

// Resumo que cada pessoa publica para os colegas verem (tabela "ranking").
// Só números agregados: nada de respostas item a item.
export interface ResumoPublico {
  versao: 1
  xp: number
  xpSemana: number
  patente: string
  nivel: number
  condecoracoes?: number
  streak: number
  diasEstudo: number
  itens: number
  itensSemana: number
  acertoSemana: number | null
  materias: { codigo: string; itens: number; acerto: number | null }[]
  conquistas: { icone: string; nome: string }[]
  totalConquistas: number
  simulados: { feitos: number; melhorCompleto: number | null; ultimo: { titulo: string; nota: number; itens: number; passou: boolean; em: string } | null }
  ultimaAtividade: string | null
}

export interface LinhaRanking {
  userId: string
  usuario: string
  visivel: boolean
  dados: ResumoPublico
  atualizadoEm: string
}

export async function montarResumo(): Promise<ResumoPublico> {
  const ind = await carregarIndice()
  const respostas = await db.respostas.orderBy('criadaEm').toArray()
  const leituras = await db.leituras.toArray()
  const revisoes = await db.revisoes.toArray()
  const simulados = (await db.simulados.where('status').equals('concluido').toArray())
    .sort((a, b) => (a.concluidoEm ?? '').localeCompare(b.concluidoEm ?? ''))

  const semana = inicioSemana(diaLocal())
  const daSemana = <T extends { criadaEm: string }>(xs: T[]) => xs.filter((x) => diaLocal(new Date(x.criadaEm)) >= semana)
  const respSemana = daSemana(respostas)
  const julgadasSemana = respSemana.filter((r) => r.correta !== null)
  const redacoes = await db.redacoes.toArray()
  const extrato = extratoXp({ respostas, leituras, simulados, redacoes })
  const xp = extrato.total
  const p = patente(xp)
  const diag = diagnosticoPorMateria(respostas)
  const conquistas = calcularConquistas({ ind, respostas, leituras, revisoes, simulados }).flatMap((g) => g.itens)
  const completos = simulados.filter((s) => s.itens.length >= 120 && s.resumo)
  const ultimo = simulados[simulados.length - 1]

  return {
    versao: 1,
    xp,
    xpSemana: Math.max(0, xpDesde(extrato, semana)),
    patente: p.nome,
    nivel: p.nivel,
    condecoracoes: condecoracoes(xp).obtidas.length,
    streak: calcularStreak(diasComEstudo(respostas)).dias,
    diasEstudo: diasComEstudo(respostas).size,
    itens: respostas.length,
    itensSemana: respSemana.length,
    acertoSemana: julgadasSemana.length ? julgadasSemana.filter((r) => r.correta === 1).length / julgadasSemana.length : null,
    materias: ind.edital.materias
      .filter((m) => diag[m.codigo])
      .map((m) => ({ codigo: m.codigo, itens: diag[m.codigo].respondidas, acerto: diag[m.codigo].acerto })),
    conquistas: conquistas.filter((c) => c.ok).map(({ icone, nome }) => ({ icone, nome })),
    totalConquistas: conquistas.length,
    simulados: {
      feitos: simulados.length,
      melhorCompleto: completos.length ? Math.max(...completos.map((s) => s.resumo!.nota)) : null,
      ultimo: ultimo?.resumo ? { titulo: ultimo.titulo, nota: ultimo.resumo.nota, itens: ultimo.resumo.itens, passou: ultimo.resumo.passou, em: ultimo.concluidoEm ?? ultimo.iniciadoEm } : null,
    },
    ultimaAtividade: respostas[respostas.length - 1]?.criadaEm ?? null,
  }
}

export async function lerVisivel(): Promise<boolean> {
  return lerConfig<boolean>('ranking.visivel', true)
}

export async function definirVisivel(v: boolean) {
  await gravarConfig('ranking.visivel', v)
  await gravarConfig('ranking.enviado', null) // força reenviar
  await publicarResumo()
}

// Chamado pela sincronização: só envia quando o resumo mudou.
export async function publicarResumo() {
  if (!supabase) return
  const dados = await montarResumo()
  const visivel = await lerVisivel()
  const assinatura = JSON.stringify({ dados, visivel })
  if ((await lerConfig<string | null>('ranking.enviado', null)) === assinatura) return
  const { error } = await supabase.from('ranking').upsert({ dados, visivel }, { onConflict: 'user_id' })
  if (error) throw error
  await gravarConfig('ranking.enviado', assinatura)
}

export async function buscarRanking(): Promise<LinhaRanking[]> {
  if (!supabase) return []
  const { data, error } = await supabase.from('ranking').select('user_id, usuario, visivel, dados, atualizado_em')
  if (error) throw error
  return (data ?? []).map((l) => ({
    userId: l.user_id as string, usuario: l.usuario as string, visivel: l.visivel as boolean,
    dados: l.dados as ResumoPublico, atualizadoEm: l.atualizado_em as string,
  }))
}
