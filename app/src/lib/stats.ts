import { diaLocal, inicioSemana, somarDias } from './datas'
import type { Armadilha, IndiceConteudo, RegistroLeitura, RegistroResposta, RegistroRevisao } from './types'

// ---------- diagnóstico por tópico ----------

export type Status = 'critico' | 'construcao' | 'bom' | 'dominado' | 'semdados'

export const STATUS_INFO: Record<Status, { rotulo: string; cor: string; emoji: string; recomendacao: string }> = {
  critico: { rotulo: 'Crítico', cor: 'red', emoji: '🔴', recomendacao: 'Volte à teoria completa e veja uma videoaula antes de mais questões.' },
  construcao: { rotulo: 'Em construção', cor: 'orange', emoji: '🟠', recomendacao: 'Releia o resumo e treine itens fáceis e médios.' },
  bom: { rotulo: 'Bom', cor: 'yellow', emoji: '🟡', recomendacao: 'Treine itens difíceis para consolidar.' },
  dominado: { rotulo: 'Dominado', cor: 'green', emoji: '🟢', recomendacao: 'Só manutenção: revisão espaçada e simulados.' },
  semdados: { rotulo: 'Sem dados', cor: 'gray', emoji: '⚪', recomendacao: 'Responda pelo menos 10 itens para o diagnóstico.' },
}

export const MIN_RESPOSTAS = 10
const JANELA = 30

export interface Diagnostico {
  status: Status
  acerto: number | null // 0–1, ponderado pelas respostas recentes
  liquida: number | null // (acertos − erros) ÷ respondidas, incluindo brancos
  respondidas: number // total histórico (inclui brancos)
}

export function statusPorAcerto(acerto: number | null, n: number): Status {
  if (acerto === null || n < MIN_RESPOSTAS) return 'semdados'
  if (acerto < 0.5) return 'critico'
  if (acerto < 0.7) return 'construcao'
  if (acerto < 0.85) return 'bom'
  return 'dominado'
}

// respostas devem vir em ordem cronológica; usa as 30 mais recentes, com peso maior para as últimas
export function diagnosticar(respostas: RegistroResposta[]): Diagnostico {
  const recentes = respostas.slice(-JANELA)
  const julgadas = recentes.filter((r) => r.correta !== null)
  let soma = 0, pesos = 0
  julgadas.forEach((r, i) => {
    const peso = 0.5 + (0.5 * (i + 1)) / julgadas.length // de ~0,5 (mais antiga) a 1 (mais recente)
    soma += peso * (r.correta as number)
    pesos += peso
  })
  const acerto = pesos ? soma / pesos : null
  const acertos = recentes.filter((r) => r.correta === 1).length
  const erros = recentes.filter((r) => r.correta === 0).length
  return {
    status: statusPorAcerto(acerto, julgadas.length),
    acerto,
    liquida: recentes.length ? (acertos - erros) / recentes.length : null,
    respondidas: respostas.length,
  }
}

export function agruparPor<T, K extends string>(lista: T[], chave: (x: T) => K): Record<K, T[]> {
  const out = {} as Record<K, T[]>
  for (const x of lista) (out[chave(x)] ??= []).push(x)
  return out
}

export function diagnosticoPorTopico(respostas: RegistroResposta[]): Record<string, Diagnostico> {
  const porTopico = agruparPor(respostas, (r) => r.topico)
  return Object.fromEntries(Object.entries(porTopico).map(([t, rs]) => [t, diagnosticar(rs)]))
}

export function diagnosticoPorMateria(respostas: RegistroResposta[]): Record<string, Diagnostico> {
  // para a matéria usa uma janela maior (as 30 mais recentes de cada tópico, juntas)
  const porMateria = agruparPor(respostas, (r) => r.materia)
  return Object.fromEntries(
    Object.entries(porMateria).map(([m, rs]) => {
      const porTopico = agruparPor(rs, (r) => r.topico)
      const janela = Object.values(porTopico).flatMap((x) => x.slice(-JANELA))
      const julgadas = janela.filter((r) => r.correta !== null)
      const acertos = julgadas.filter((r) => r.correta === 1).length
      const acerto = julgadas.length ? acertos / julgadas.length : null
      const erros = julgadas.length - acertos
      return [m, { status: statusPorAcerto(acerto, julgadas.length), acerto, liquida: janela.length ? (acertos - erros) / janela.length : null, respondidas: rs.length }]
    }),
  )
}

// ---------- streak, meta e XP ----------

export function diasComEstudo(respostas: RegistroResposta[]): Set<string> {
  return new Set(respostas.map((r) => diaLocal(new Date(r.criadaEm))))
}

// Dias seguidos com pelo menos 1 item. Um dia sem estudo por semana (seg–dom) é "congelado" e não quebra a sequência.
export function calcularStreak(dias: Set<string>, hoje = diaLocal()): { dias: number; congelamentoUsadoNaSemana: boolean } {
  let dia = dias.has(hoje) ? hoje : somarDias(hoje, -1)
  let total = 0
  const semanasComCongelamento = new Set<string>()
  for (let i = 0; i < 400; i++) {
    if (dias.has(dia)) {
      total++
    } else {
      const semana = inicioSemana(dia)
      const anteriorTemEstudo = dias.has(somarDias(dia, -1))
      if (semanasComCongelamento.has(semana) || !anteriorTemEstudo || total === 0) break
      semanasComCongelamento.add(semana)
    }
    dia = somarDias(dia, -1)
  }
  return { dias: total, congelamentoUsadoNaSemana: semanasComCongelamento.has(inicioSemana(hoje)) }
}

export function respostasDoDia(respostas: RegistroResposta[], dia = diaLocal()) {
  return respostas.filter((r) => diaLocal(new Date(r.criadaEm)) === dia)
}

export const PATENTES: [string, number][] = [
  ['Soldado', 0], ['Cabo', 800], ['3º Sargento', 2000], ['2º Sargento', 3500], ['1º Sargento', 5500],
  ['Subtenente', 8000], ['Aspirante', 11000], ['2º Tenente', 14500], ['1º Tenente', 18500], ['Capitão', 23000],
  ['Major', 28000], ['Tenente-Coronel', 34000], ['Coronel', 41000],
]

// XP: 10 por item respondido (branco vale 4), +5 por acerto com certeza, +3 por item de revisão; leitura vale 20.
export function calcularXp(respostas: RegistroResposta[], leituras: RegistroLeitura[]): number {
  let xp = leituras.length * 20
  for (const r of respostas) {
    xp += r.resposta === 'B' ? 4 : 10
    if (r.correta === 1 && r.confianca === 'certeza') xp += 5
    if (r.modo === 'revisao') xp += 3
  }
  return xp
}

export function patente(xp: number) {
  let i = 0
  while (i + 1 < PATENTES.length && xp >= PATENTES[i + 1][1]) i++
  const [nome, base] = PATENTES[i]
  const proxima = PATENTES[i + 1]
  return { nome, nivel: i, base, proximaNome: proxima?.[0] ?? null, proximaXp: proxima?.[1] ?? null }
}

// ---------- inteligência Cebraspe ----------

export function chutesPorMateria(respostas: RegistroResposta[]) {
  const chutes = respostas.filter((r) => r.confianca === 'chute' && r.correta !== null)
  const por = agruparPor(chutes, (r) => r.materia)
  return Object.entries(por)
    .map(([materia, rs]) => ({ materia, total: rs.length, acerto: rs.filter((r) => r.correta === 1).length / rs.length }))
    .sort((a, b) => b.total - a.total)
}

export function excessoConfianca(respostas: RegistroResposta[], dias = 7) {
  const limite = somarDias(diaLocal(), -dias)
  return respostas.filter((r) => r.confianca === 'certeza' && r.correta === 0 && diaLocal(new Date(r.criadaEm)) > limite)
}

export const ARMADILHA_ROTULO: Record<Armadilha, string> = {
  numero: 'Número ou prazo trocado',
  absoluto: '"Sempre / nunca / exclusivamente"',
  inversao: 'Conceito invertido',
  competencia: 'Função ou competência trocada',
  excecao: 'Exceção ignorada ou inventada',
  outro: 'Confusão de conceito',
}

export function armadilhasMaisErradas(respostas: RegistroResposta[]) {
  const erros = respostas.filter((r) => r.correta === 0 && r.armadilha)
  const por = agruparPor(erros, (r) => r.armadilha as Armadilha)
  return Object.entries(por)
    .map(([a, rs]) => ({ armadilha: a as Armadilha, erros: rs.length, pct: rs.length / erros.length }))
    .sort((a, b) => b.erros - a.erros)
}

// acerto por semana (segunda a domingo), das últimas n semanas
export function serieSemanal(respostas: RegistroResposta[], semanas = 6) {
  const hoje = diaLocal()
  const inicioAtual = inicioSemana(hoje)
  const out: { semana: string; acerto: number | null; total: number }[] = []
  for (let i = semanas - 1; i >= 0; i--) {
    const ini = somarDias(inicioAtual, -7 * i)
    const fim = somarDias(ini, 6)
    const rs = respostas.filter((r) => {
      const d = diaLocal(new Date(r.criadaEm))
      return d >= ini && d <= fim && r.correta !== null
    })
    out.push({ semana: ini, total: rs.length, acerto: rs.length ? rs.filter((r) => r.correta === 1).length / rs.length : null })
  }
  return out
}

// ---------- caderno de erros ----------

export function revisoesPendentes(revisoes: RegistroRevisao[], hoje = diaLocal()) {
  return revisoes.filter((r) => r.proxima !== null && r.proxima <= hoje)
}

export function noCaderno(revisoes: RegistroRevisao[]) {
  return revisoes.filter((r) => r.proxima !== null)
}

// ---------- missão do dia ----------

export interface Missao {
  focoTopico: string | null
  focoMeta: number
  focoFeitos: number
  revisaoPendentes: number
  revisaoFeitas: number
  leituraTopico: string | null
  leituraFeita: boolean
  metaItens: number
  itensHoje: number
}

export function montarMissao(
  ind: IndiceConteudo,
  respostas: RegistroResposta[],
  revisoes: RegistroRevisao[],
  leituras: RegistroLeitura[],
  metaItens: number,
): Missao {
  const hoje = diaLocal()
  const deHoje = respostasDoDia(respostas, hoje)
  const diag = diagnosticoPorTopico(respostas)
  const ordem = ind.edital.materias.flatMap((m) => m.topicos.map((t) => t.codigo)) // exatas primeiro (ordem do edital.json)
  const comItens = ordem.filter((t) => (ind.resumo[t]?.itens ?? 0) > 0)

  // foco: se já começou um foco hoje, mantém; senão o tópico crítico mais fraco; senão o próximo tópico com menos respostas
  const topicoHoje = deHoje.filter((r) => r.modo === 'treino').map((r) => r.topico)
  const focoDeHoje = topicoHoje.length ? maisFrequente(topicoHoje) : null
  const criticos = comItens
    .filter((t) => diag[t]?.status === 'critico')
    .sort((a, b) => (diag[a].acerto ?? 0) - (diag[b].acerto ?? 0))
  const menosVisto = [...comItens].sort((a, b) => (diag[a]?.respondidas ?? 0) - (diag[b]?.respondidas ?? 0))[0]
  const focoTopico = focoDeHoje ?? criticos[0] ?? menosVisto ?? null

  const focoMeta = 25
  const focoFeitos = focoTopico ? deHoje.filter((r) => r.topico === focoTopico && r.modo === 'treino').length : 0

  const lidosHoje = new Set(leituras.filter((l) => diaLocal(new Date(l.criadaEm)) === hoje).map((l) => l.topico))
  const jaLidos = new Set(leituras.map((l) => l.topico))
  const comConteudo = ordem.filter((t) => ind.temConteudo[t])
  const leituraTopico =
    [...lidosHoje][0] ??
    (focoTopico && ind.temConteudo[focoTopico] ? focoTopico : null) ??
    comConteudo.find((t) => !jaLidos.has(t)) ??
    comConteudo[0] ??
    null

  return {
    focoTopico,
    focoMeta,
    focoFeitos,
    revisaoPendentes: revisoesPendentes(revisoes, hoje).length,
    revisaoFeitas: deHoje.filter((r) => r.modo === 'revisao').length,
    leituraTopico,
    leituraFeita: leituraTopico ? lidosHoje.has(leituraTopico) : false,
    metaItens,
    itensHoje: deHoje.length,
  }
}

function maisFrequente(lista: string[]): string {
  const c: Record<string, number> = {}
  for (const x of lista) c[x] = (c[x] ?? 0) + 1
  return Object.entries(c).sort((a, b) => b[1] - a[1])[0][0]
}
