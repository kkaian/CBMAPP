import { diaLocal, inicioSemana, somarDias } from './datas'
import type { Armadilha, IndiceConteudo, RegistroLeitura, RegistroRedacao, RegistroResposta, RegistroRevisao, RegistroSimulado } from './types'

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

// Patentes: Coronel com 50.000 XP, o que dá cerca de 5.000 acertos (cada acerto vale 10).
export const PATENTES: [string, number][] = [
  ['Soldado', 0], ['Cabo', 1000], ['3º Sargento', 2500], ['2º Sargento', 4500], ['1º Sargento', 7000],
  ['Subtenente', 10000], ['Aspirante', 13500], ['2º Tenente', 17500], ['1º Tenente', 22000], ['Capitão', 27000],
  ['Major', 33000], ['Tenente-Coronel', 40000], ['Coronel', 50000],
]

// Uma leitura só conta (XP, conquistas, missão) depois de 10 acertos no tópico feitos a partir dela;
// até lá fica pendente. Cada leitura usa os acertos até a leitura seguinte do mesmo tópico.
export const ACERTOS_PARA_LEITURA = 10
export interface LeituraAvaliada { leitura: RegistroLeitura; acertos: number; valida: boolean }

export function avaliarLeituras(leituras: RegistroLeitura[], respostas: RegistroResposta[]): LeituraAvaliada[] {
  const acertosPorTopico: Record<string, string[]> = {}
  for (const r of respostas) if (r.correta === 1) (acertosPorTopico[r.topico] ??= []).push(r.criadaEm)
  const porTopico: Record<string, RegistroLeitura[]> = {}
  for (const l of leituras) (porTopico[l.topico] ??= []).push(l)
  const saida: LeituraAvaliada[] = []
  for (const [topico, ls] of Object.entries(porTopico)) {
    const ordenadas = [...ls].sort((a, b) => a.criadaEm.localeCompare(b.criadaEm))
    const acertos = acertosPorTopico[topico] ?? []
    ordenadas.forEach((l, i) => {
      const fim = ordenadas[i + 1]?.criadaEm
      const n = acertos.filter((t) => t >= l.criadaEm && (!fim || t < fim)).length
      saida.push({ leitura: l, acertos: n, valida: n >= ACERTOS_PARA_LEITURA })
    })
  }
  return saida
}

export function leiturasValidas(leituras: RegistroLeitura[], respostas: RegistroResposta[]): RegistroLeitura[] {
  return avaliarLeituras(leituras, respostas).filter((a) => a.valida).map((a) => a.leitura)
}

// Situação da última leitura de um tópico: null (nunca lido), pendente (com acertos feitos) ou válida.
export function situacaoLeitura(topico: string, leituras: RegistroLeitura[], respostas: RegistroResposta[]) {
  const doTopico = avaliarLeituras(leituras.filter((l) => l.topico === topico), respostas.filter((r) => r.topico === topico))
    .sort((a, b) => a.leitura.criadaEm.localeCompare(b.leitura.criadaEm))
  return doTopico[doTopico.length - 1] ?? null
}

// ---------- XP ----------
// Base de cada tarefa: acerto 10, erro 2, branco 1, leitura confirmada 10, simulado entregue 100
// (completo, 120 itens) ou 30 (os menores), redação corrigida 150.
// O XP de cada dia é multiplicado pela sequência de dias de estudo daquele dia: ×0,4 no 1º dia,
// +0,1 por dia, até ×1,0 a partir do 7º, e fica no máximo enquanto a sequência continuar.
// Perder a sequência custa 30 XP por dia da sequência perdida (no máximo 300).
export const XP_BASE = { branco: 1, leitura: 10, simuladoCompleto: 100, simulado: 30, redacao: 150 }
// Questão: a errada tira o mesmo que a certa daria, e o valor depende da confiança marcada.
// Sem confiança registrada (itens antigos, simulado sem marcação) vale como dúvida.
export const XP_CONFIANCA = { certeza: 10, duvida: 6, chute: 3 } as const
// Caderno de erros: cada volta do item vale mais, até o valor cheio (25%, 50%, 75%, 100%).
export function fatorCaderno(revisoesFeitas: number): number {
  return Math.min(1, 0.25 * (revisoesFeitas + 1))
}
export const DIAS_PARA_XP_MAXIMO = 7
// Física e Química valem um pouco mais (para ganhar e para perder).
export const BONUS_MATERIA: Record<string, number> = { FIS: 1.2, QUI: 1.2 }
// Meta não cumprida no prazo tira XP: dia (meta de itens), semana (7 matérias) e cada meta do mês.
export const PENALIDADE_META = { dia: 20, semana: 100, mes: 150 }
export const REGRA_XP = 'Questão: certa soma e errada tira o mesmo valor, conforme a confiança: certeza ±10, dúvida ±6, chute ±3; branco +1. Física e Química valem 20% a mais. Item repetido vale metade; no caderno de erros o valor cresce a cada volta (25%, 50%, 75%, 100%). Leitura confirmada 10, simulado completo 100 (menores 30), redação corrigida 150. Tudo multiplicado pela sequência do dia: ×0,4 no 1º dia até ×1,0 a partir do 7º. Perder a sequência custa 30 XP por dia dela (máx. 300). Meta não cumprida no prazo: −20 (dia), −100 (semana), −150 (cada meta do mês). Coronel aos 50.000 XP.'

export function multiplicadorSequencia(dias: number): number {
  if (dias <= 0) return 0.4
  return Math.min(1, 0.4 + 0.1 * (dias - 1))
}

export function penalidadeQuebra(diasPerdidos: number): number {
  return Math.min(300, 30 * diasPerdidos)
}

export interface DadosXp {
  respostas: RegistroResposta[]
  leituras: RegistroLeitura[]
  simulados?: RegistroSimulado[]
  redacoes?: RegistroRedacao[]
  metaDiaria?: number
}

export interface ExtratoXp {
  total: number
  porDia: Record<string, number> // ganho líquido do dia (já com multiplicador e penalidades)
  penalidades: { dia: string; diasPerdidos: number; xp: number }[]
  penalidadesMetas: { dia: string; tipo: 'dia' | 'semana' | 'mes'; descricao: string; xp: number }[]
  sequenciaAtual: number // dias seguidos já feitos (como no contador 🔥)
  sequenciaHoje: number
  multiplicadorHoje: number // o que vale estudar hoje (conta o dia de hoje na sequência)
  emRisco: number // quanto se perde se a sequência atual quebrar
}

export function extratoXp({ respostas, leituras, simulados = [], redacoes = [], metaDiaria = 40 }: DadosXp, hoje = diaLocal()): ExtratoXp {
  const base: Record<string, number> = {}
  const somar = (iso: string, v: number) => { const d = diaLocal(new Date(iso)); base[d] = (base[d] ?? 0) + v }
  // Valor da questão: ± pela confiança (certa soma, errada tira), branco +1.
  // Caderno de erros: progressivo a cada volta do item (zera quando ele volta ao caderno).
  // Outras repetições (trilha, treino de novo): metade do item inédito.
  const vistos = new Set<string>()
  const voltas: Record<string, number> = {}
  for (const r of [...respostas].sort((a, b) => a.criadaEm.localeCompare(b.criadaEm))) {
    somar(r.criadaEm, valorResposta(r, vistos.has(r.itemId), voltas[r.itemId] ?? 0).xp)
    vistos.add(r.itemId)
    voltas[r.itemId] = proximasVoltas(r, voltas[r.itemId] ?? 0)
  }
  for (const l of leiturasValidas(leituras, respostas)) somar(l.criadaEm, XP_BASE.leitura)
  for (const x of simulados) if (x.status === 'concluido' && x.concluidoEm) somar(x.concluidoEm, x.itens.length >= 120 ? XP_BASE.simuladoCompleto : XP_BASE.simulado)
  for (const x of redacoes) if (!x.excluida && x.npd !== null) somar(x.atualizadaEm ?? x.criadaEm, XP_BASE.redacao)

  const estudo = diasComEstudo(respostas)
  const penalidadesMetas = penalidadesDeMetas(respostas, simulados, redacoes, metaDiaria, hoje)
  const multa: Record<string, number> = {}
  for (const p of penalidadesMetas) multa[p.dia] = (multa[p.dia] ?? 0) + p.xp
  const dias = [...new Set([...estudo, ...Object.keys(base), ...Object.keys(multa)])].sort()
  const seq: Record<string, number> = {}
  for (const d of estudo) seq[d] = calcularStreak(estudo, d).dias

  const porDia: Record<string, number> = {}
  const penalidades: ExtratoXp['penalidades'] = []
  let total = 0
  let anterior: string | null = null
  for (const d of dias) {
    let ganho = Math.round((base[d] ?? 0) * multiplicadorSequencia(seq[d] ?? 0))
    if (estudo.has(d)) {
      if (anterior && seq[d] === 1) {
        const p = penalidadeQuebra(seq[anterior])
        penalidades.push({ dia: d, diasPerdidos: seq[anterior], xp: p })
        ganho -= p
      }
      anterior = d
    }
    ganho -= multa[d] ?? 0
    porDia[d] = ganho
    total = Math.max(0, total + ganho)
  }
  // sequência já perdida sem volta: dois ou mais dias seguidos sem estudo antes de hoje
  if (anterior && anterior < somarDias(hoje, -2) && !estudo.has(hoje)) {
    const p = penalidadeQuebra(seq[anterior])
    penalidades.push({ dia: hoje, diasPerdidos: seq[anterior], xp: p })
    porDia[hoje] = (porDia[hoje] ?? 0) - p
    total = Math.max(0, total - p)
  }

  const atual = calcularStreak(estudo, hoje).dias
  const sequenciaHoje = estudo.has(hoje) ? atual : atual + 1
  return { total, porDia, penalidades, penalidadesMetas, sequenciaAtual: atual, sequenciaHoje, multiplicadorHoje: multiplicadorSequencia(sequenciaHoje), emRisco: atual ? penalidadeQuebra(atual) : 0 }
}

// Valor de uma resposta antes do multiplicador da sequência, com a explicação de cada parte.
export function valorResposta(r: RegistroResposta, jaVisto: boolean, voltasNoCaderno: number) {
  const bonus = BONUS_MATERIA[r.materia] ?? 1
  const cheio = (r.resposta === 'B' ? XP_BASE.branco : (r.correta === 1 ? 1 : -1) * XP_CONFIANCA[r.confianca ?? 'duvida']) * bonus
  const fator = r.modo === 'revisao' ? fatorCaderno(voltasNoCaderno) : jaVisto ? 0.5 : 1
  const motivos = [
    bonus !== 1 ? `${r.materia === 'FIS' ? 'Física' : 'Química'} +${Math.round((bonus - 1) * 100)}%` : null,
    r.modo === 'revisao' ? `caderno, ${voltasNoCaderno + 1}ª volta (${Math.round(fator * 100)}%)` : jaVisto ? 'item repetido (metade)' : null,
  ].filter(Boolean)
  return { xp: cheio * fator, cheio, fator, motivo: motivos.length ? motivos.join(' · ') : null }
}

function proximasVoltas(r: RegistroResposta, voltas: number) {
  const precisaRever = r.correta !== 1 || r.confianca === 'chute'
  return precisaRever ? 0 : r.modo === 'revisao' ? voltas + 1 : voltas
}

// XP de uma resposta recém-gravada, olhando o histórico do item e a sequência de hoje.
export function xpDaRespostaNova(r: RegistroResposta, historicoDoItem: RegistroResposta[], todas: RegistroResposta[]) {
  const antes = historicoDoItem.filter((x) => x.id !== r.id && x.criadaEm < r.criadaEm).sort((a, b) => a.criadaEm.localeCompare(b.criadaEm))
  let voltas = 0
  for (const x of antes) voltas = proximasVoltas(x, voltas)
  const v = valorResposta(r, antes.length > 0, voltas)
  const mult = multiplicadorSequencia(calcularStreak(diasComEstudo(todas), diaLocal(new Date(r.criadaEm))).dias)
  return { ...v, mult, final: v.xp * mult }
}

// Metas vencidas e não cumpridas, desde o primeiro dia de estudo (o período atual ainda não conta).
export function penalidadesDeMetas(respostas: RegistroResposta[], simulados: RegistroSimulado[], redacoes: RegistroRedacao[], metaDiaria: number, hoje = diaLocal()) {
  const saida: ExtratoXp['penalidadesMetas'] = []
  if (!respostas.length) return saida
  const porDia: Record<string, number> = {}
  const materiasSemana: Record<string, Record<string, number>> = {}
  let primeiro = hoje
  for (const r of respostas) {
    const d = diaLocal(new Date(r.criadaEm))
    if (d < primeiro) primeiro = d
    porDia[d] = (porDia[d] ?? 0) + 1
    const w = (materiasSemana[inicioSemana(d)] ??= {})
    w[r.materia] = (w[r.materia] ?? 0) + 1
  }
  // dia: meta de itens
  for (let d = primeiro; d < hoje; d = somarDias(d, 1)) {
    if ((porDia[d] ?? 0) < metaDiaria) saida.push({ dia: d, tipo: 'dia', descricao: `meta de ${metaDiaria} itens em ${d.split('-').reverse().join('/')}`, xp: PENALIDADE_META.dia })
  }
  // semana: 7 matérias (penalidade no domingo)
  for (let w = inicioSemana(primeiro); w < inicioSemana(hoje); w = somarDias(w, 7)) {
    const feitas = Object.values(materiasSemana[w] ?? {}).filter((n) => n >= ITENS_PARA_CONTAR_MATERIA).length
    if (feitas < META_MATERIAS_SEMANA) saida.push({ dia: somarDias(w, 6), tipo: 'semana', descricao: `semana de ${w.split('-').reverse().join('/')}: ${feitas} de ${META_MATERIAS_SEMANA} matérias`, xp: PENALIDADE_META.semana })
  }
  // mês: simulado completo, redação corrigida e trilha (penalidade no último dia do mês)
  const mesesFeitos = (datas: string[]) => new Set(datas.map((x) => diaLocal(new Date(x)).slice(0, 7)))
  const metas: [string, Set<string>][] = [
    ['simulado completo', mesesFeitos(simulados.filter((x) => x.status === 'concluido' && x.itens.length >= 120 && x.concluidoEm).map((x) => x.concluidoEm!))],
    ['redação corrigida', mesesFeitos(redacoes.filter((x) => !x.excluida && x.npd !== null).map((x) => x.criadaEm))],
    ['trilha de revisão', mesesFeitos(trilhasConcluidas(respostas))],
  ]
  const mesAtual = hoje.slice(0, 7)
  let [a, m] = primeiro.slice(0, 7).split('-').map(Number)
  for (let mes = primeiro.slice(0, 7); mes < mesAtual;) {
    const proximo = m === 12 ? `${a + 1}-01` : `${a}-${String(m + 1).padStart(2, '0')}`
    const ultimoDia = somarDias(`${proximo}-01`, -1)
    for (const [nome, feitos] of metas) if (!feitos.has(mes)) saida.push({ dia: ultimoDia, tipo: 'mes', descricao: `${nome} de ${mes.split('-').reverse().join('/')}`, xp: PENALIDADE_META.mes })
    ;[a, m] = proximo.split('-').map(Number)
    mes = proximo
  }
  return saida
}

export function calcularXp(dados: DadosXp): number {
  return extratoXp(dados).total
}

export function xpDesde(extrato: ExtratoXp, dia: string): number {
  return Object.entries(extrato.porDia).filter(([d]) => d >= dia).reduce((s, [, v]) => s + v, 0)
}

export function patente(xp: number) {
  let i = 0
  while (i + 1 < PATENTES.length && xp >= PATENTES[i + 1][1]) i++
  const [nome, base] = PATENTES[i]
  const proxima = PATENTES[i + 1]
  return { nome, nivel: i, base, proximaNome: proxima?.[0] ?? null, proximaXp: proxima?.[1] ?? null }
}

// Condecorações: para quem passa de Coronel. A lista fixa vai até 200.000 XP;
// depois, uma Estrela de Honra a cada 50.000 XP.
export interface Condecoracao { icone: string; nome: string; xp: number }
const CONDECORACOES_FIXAS: Condecoracao[] = [
  { icone: '🥉', nome: 'Medalha do Mérito · Bronze', xp: 55000 },
  { icone: '🥈', nome: 'Medalha do Mérito · Prata', xp: 62500 },
  { icone: '🥇', nome: 'Medalha do Mérito · Ouro', xp: 70000 },
  { icone: '🎖️', nome: 'Cruz do Mérito Operacional', xp: 80000 },
  { icone: '🏅', nome: 'Medalha Bombeiro Padrão', xp: 90000 },
  { icone: '⭐', nome: 'Ordem do Mérito · Cavaleiro', xp: 100000 },
  { icone: '✨', nome: 'Ordem do Mérito · Oficial', xp: 120000 },
  { icone: '🌟', nome: 'Ordem do Mérito · Comendador', xp: 150000 },
  { icone: '👑', nome: 'Grã-Cruz do Mérito', xp: 200000 },
]

export function condecoracao(n: number): Condecoracao {
  if (n < CONDECORACOES_FIXAS.length) return CONDECORACOES_FIXAS[n]
  const k = n - CONDECORACOES_FIXAS.length + 1
  return { icone: '💫', nome: `Estrela de Honra nº ${k}`, xp: 200000 + 50000 * k }
}

export function condecoracoes(xp: number) {
  const obtidas: Condecoracao[] = []
  let n = 0
  while (xp >= condecoracao(n).xp) obtidas.push(condecoracao(n++))
  return { obtidas, proxima: condecoracao(n) }
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

// Meta semanal: passar por pelo menos 7 matérias diferentes (seg a dom), com 5+ itens em cada.
export const META_MATERIAS_SEMANA = 7
export const ITENS_PARA_CONTAR_MATERIA = 5
export function materiasDaSemana(respostas: RegistroResposta[], hoje = diaLocal()): Record<string, number> {
  const semana = inicioSemana(hoje)
  const c: Record<string, number> = {}
  for (const r of respostas) if (diaLocal(new Date(r.criadaEm)) >= semana) c[r.materia] = (c[r.materia] ?? 0) + 1
  return c
}

// Metas mensais: 1 simulado completo (120 itens), 1 redação corrigida e 1 trilha de revisão por mês.
// São cumulativas: o mês não cumprido fica pendente e soma com o seguinte. Fazer mais de um num mês
// quita pendências antigas, mas não adianta meses futuros. A contagem começa no mês do primeiro estudo.
export interface MetaMensal { feitosNoMes: number; pendentes: number; desde: string }

function mesDe(iso: string) {
  return diaLocal(new Date(iso)).slice(0, 7)
}

function mesesDesde(inicio: string, atual: string): string[] {
  const meses: string[] = []
  let [a, m] = inicio.split('-').map(Number)
  const [af, mf] = atual.split('-').map(Number)
  while (a < af || (a === af && m <= mf)) {
    meses.push(`${a}-${String(m).padStart(2, '0')}`)
    if (++m > 12) { m = 1; a++ }
  }
  return meses
}

function metaCumulativa(datas: string[], inicio: string, atual: string): MetaMensal {
  const porMes: Record<string, number> = {}
  for (const d of datas) porMes[mesDe(d)] = (porMes[mesDe(d)] ?? 0) + 1
  let divida = 0
  for (const mes of mesesDesde(inicio, atual)) divida = Math.max(0, divida + 1 - (porMes[mes] ?? 0))
  return { feitosNoMes: porMes[atual] ?? 0, pendentes: divida, desde: inicio }
}

export function metasMensais(respostas: RegistroResposta[], simulados: RegistroSimulado[], redacoes: RegistroRedacao[], hoje = diaLocal()) {
  const atual = hoje.slice(0, 7)
  const primeiro = respostas.reduce<string | null>((min, r) => (!min || r.criadaEm < min ? r.criadaEm : min), null)
  const inicio = primeiro && mesDe(primeiro) < atual ? mesDe(primeiro) : atual
  const sims = simulados.filter((x) => x.status === 'concluido' && x.itens.length >= 120 && x.concluidoEm).map((x) => x.concluidoEm!)
  const reds = redacoes.filter((x) => !x.excluida && x.npd !== null).map((x) => x.criadaEm)
  return { simulado: metaCumulativa(sims, inicio, atual), redacao: metaCumulativa(reds, inicio, atual), revisao: metaCumulativa(trilhasConcluidas(respostas), inicio, atual) }
}

// Uma trilha de revisão conta como feita a cada 30 respostas no modo trilha (a data é a da 30ª).
export const ITENS_POR_TRILHA = 30
export function trilhasConcluidas(respostas: RegistroResposta[]): string[] {
  const datas = respostas.filter((r) => r.modo === 'trilha').map((r) => r.criadaEm).sort()
  return datas.filter((_, i) => (i + 1) % ITENS_POR_TRILHA === 0)
}

export interface Missao {
  semanaFeitas: string[]
  semanaParciais: Record<string, number>
  semanaMeta: number
  materiaSugerida: string | null
  leituraAcertos: number
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

  // meta semanal: se ainda faltam matérias, o foco do dia vai para uma matéria não visitada na semana
  const porMateriaSemana = materiasDaSemana(respostas, hoje)
  const semanaFeitas = Object.entries(porMateriaSemana).filter(([, n]) => n >= ITENS_PARA_CONTAR_MATERIA).map(([m]) => m)
  const materiasComItens = ind.edital.materias.filter((m) => m.topicos.some((t) => (ind.resumo[t.codigo]?.itens ?? 0) > 0))
  const respondidasMateria = (cod: string) => respostas.filter((r) => r.materia === cod).length
  const faltando = materiasComItens
    .filter((m) => !semanaFeitas.includes(m.codigo))
    .sort((a, b) => (porMateriaSemana[b.codigo] ?? 0) - (porMateriaSemana[a.codigo] ?? 0) || respondidasMateria(a.codigo) - respondidasMateria(b.codigo))
  const materiaSugerida = semanaFeitas.length < META_MATERIAS_SEMANA ? faltando[0]?.codigo ?? null : null
  const doSugerida = materiaSugerida ? comItens.filter((t) => materiaDoTopicoCod(t) === materiaSugerida) : []
  const focoSemana = doSugerida.length
    ? doSugerida.find((t) => diag[t]?.status === 'critico') ?? [...doSugerida].sort((a, b) => (diag[a]?.respondidas ?? 0) - (diag[b]?.respondidas ?? 0))[0]
    : null

  const focoTopico = focoDeHoje ?? focoSemana ?? criticos[0] ?? menosVisto ?? null

  const focoMeta = 25
  const focoFeitos = focoTopico ? deHoje.filter((r) => r.topico === focoTopico && r.modo === 'treino').length : 0

  const lidosHoje = new Set(leituras.filter((l) => diaLocal(new Date(l.criadaEm)) === hoje).map((l) => l.topico))
  const jaLidos = new Set(leituras.map((l) => l.topico)) // inclui as pendentes: não sugere reler o que já foi lido
  const comConteudo = ordem.filter((t) => ind.temConteudo[t])
  const leituraTopico =
    [...lidosHoje][0] ??
    (focoTopico && ind.temConteudo[focoTopico] ? focoTopico : null) ??
    comConteudo.find((t) => !jaLidos.has(t)) ??
    comConteudo[0] ??
    null

  const sitLeitura = leituraTopico ? situacaoLeitura(leituraTopico, leituras, respostas) : null
  const leituraHoje = sitLeitura && diaLocal(new Date(sitLeitura.leitura.criadaEm)) === hoje
  return {
    semanaFeitas,
    semanaParciais: porMateriaSemana,
    semanaMeta: META_MATERIAS_SEMANA,
    materiaSugerida,
    leituraAcertos: leituraHoje ? sitLeitura.acertos : 0,
    focoTopico,
    focoMeta,
    focoFeitos,
    revisaoPendentes: revisoesPendentes(revisoes, hoje).length,
    revisaoFeitas: deHoje.filter((r) => r.modo === 'revisao').length,
    leituraTopico,
    leituraFeita: !!(leituraHoje && sitLeitura.valida),
    metaItens,
    itensHoje: deHoje.length,
  }
}

function materiaDoTopicoCod(topico: string): string {
  return topico.split('-')[0]
}

function maisFrequente(lista: string[]): string {
  const c: Record<string, number> = {}
  for (const x of lista) c[x] = (c[x] ?? 0) + 1
  return Object.entries(c).sort((a, b) => b[1] - a[1])[0][0]
}
