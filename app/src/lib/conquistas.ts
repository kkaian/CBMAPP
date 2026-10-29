import { diaLocal, inicioSemana } from './datas'
import {
  ITENS_PARA_CONTAR_MATERIA, calcularXp, condecoracoes, leiturasValidas, patente, trilhasConcluidas,
  calcularStreak, diagnosticoPorTopico, diasComEstudo, excessoConfianca, noCaderno,
} from './stats'
import type { IndiceConteudo, RegistroLeitura, RegistroRedacao, RegistroResposta, RegistroRevisao, RegistroSimulado } from './types'

export interface Conquista { icone: string; nome: string; ok: boolean }
export interface GrupoConquistas { titulo: string; itens: Conquista[] }

// Todas ligadas a progresso real. Usadas no Perfil e no resumo público do ranking.
export function calcularConquistas({ ind, respostas, leituras, revisoes, simulados, redacoes = [], metaDiaria }: {
  ind: IndiceConteudo
  respostas: RegistroResposta[]
  leituras: RegistroLeitura[]
  revisoes: RegistroRevisao[]
  simulados: RegistroSimulado[] // só os concluídos
  redacoes?: RegistroRedacao[]
  metaDiaria?: number
}): GrupoConquistas[] {
  const streak = calcularStreak(diasComEstudo(respostas))
  const porMateria = (m: string) => respostas.filter((r) => r.materia === m).length
  const diag = diagnosticoPorTopico(respostas)
  const rlmVerde = ind.edital.materias.find((m) => m.codigo === 'RLM')!.topicos.every((t) => diag[t.codigo]?.status === 'dominado')
  const ultimos30 = new Set([...diasComEstudo(respostas)])

  const sims = simulados
  const completos = sims.filter((s) => s.itens.length >= 120)
  const driveFeitos = new Set(sims.filter((s) => s.tipo === 'drive').map((s) => s.titulo))
  const materiaVerde = ind.edital.materias.some((m) => m.topicos.length > 0 && m.topicos.every((t) => diag[t.codigo]?.status === 'dominado'))
  const topicosComDiagnostico = Object.values(diag).filter((d) => d.status !== 'semdados').length
  const lidos = new Set(leiturasValidas(leituras, respostas).map((l) => l.topico))
  const materiaLida = ind.edital.materias.some((m) => m.topicos.length > 0 && m.topicos.every((t) => lidos.has(t.codigo)))
  const semErroComCerteza = respostas.length >= 100 && excessoConfianca(respostas, 7).length === 0
    && respostas.filter((r) => Date.now() - new Date(r.criadaEm).getTime() < 7 * 86_400_000).length >= 50

  // novas: XP, acertos, inéditos, revisão, missões e redação
  const xp = calcularXp({ respostas, leituras, simulados, redacoes, metaDiaria })
  const nivel = patente(xp).nivel
  const nCond = condecoracoes(xp).obtidas.length
  const acertos = respostas.filter((r) => r.correta === 1).length
  const ineditos = new Set(respostas.map((r) => r.itemId)).size
  const totalBanco = Object.values(ind.resumo).reduce((t, r) => t + r.itens, 0)
  const trilhas = trilhasConcluidas(respostas).length
  const corrigidas = redacoes.filter((x) => !x.excluida && x.npd !== null)
  const melhorNpd = Math.max(0, ...corrigidas.map((x) => x.npd ?? 0))
  const semanas: Record<string, Record<string, number>> = {}
  for (const r of respostas) {
    const w = inicioSemana(diaLocal(new Date(r.criadaEm)))
    const m = (semanas[w] ??= {})
    m[r.materia] = (m[r.materia] ?? 0) + 1
  }
  const semanasCompletas = Object.values(semanas).filter((m) => Object.values(m).filter((n) => n >= ITENS_PARA_CONTAR_MATERIA).length >= 7).length
  const porDia: Record<string, { n: number; ok: number }> = {}
  for (const r of respostas) {
    const d = (porDia[diaLocal(new Date(r.criadaEm))] ??= { n: 0, ok: 0 })
    d.n++
    if (r.correta === 1) d.ok++
  }
  const diaDe90 = Object.values(porDia).some((d) => d.n >= 30 && d.ok / d.n >= 0.9)
  const diaDe100 = Object.values(porDia).some((d) => d.n >= 100)
  const materias100 = ind.edital.materias.filter((m) => m.codigo !== 'RED').every((m) => porMateria(m.codigo) >= 100)
  const todosLidos = ind.edital.materias.every((m) => m.topicos.every((t) => !ind.temConteudo[t.codigo] || lidos.has(t.codigo)))

  return [
    { titulo: 'Patentes e XP', itens: [
      { icone: '🪖', nome: 'Cabo', ok: nivel >= 1 },
      { icone: '🎗️', nome: '3º Sargento', ok: nivel >= 2 },
      { icone: '🔰', nome: 'Subtenente', ok: nivel >= 5 },
      { icone: '⚜️', nome: '2º Tenente', ok: nivel >= 7 },
      { icone: '🛡️', nome: 'Capitão', ok: nivel >= 9 },
      { icone: '🦅', nome: 'Major', ok: nivel >= 10 },
      { icone: '🎖️', nome: 'Coronel', ok: nivel >= 12 },
      { icone: '🥉', nome: '1ª condecoração', ok: nCond >= 1 },
      { icone: '👑', nome: 'Grã-Cruz do Mérito', ok: nCond >= 9 },
    ] },
    { titulo: 'Acertos e banco', itens: [
      { icone: '✔️', nome: '500 acertos', ok: acertos >= 500 },
      { icone: '✅', nome: '1.000 acertos', ok: acertos >= 1000 },
      { icone: '💪', nome: '2.500 acertos', ok: acertos >= 2500 },
      { icone: '🏋️', nome: '5.000 acertos', ok: acertos >= 5000 },
      { icone: '🆕', nome: '1.000 itens diferentes', ok: ineditos >= 1000 },
      { icone: '🌗', nome: 'Metade do banco', ok: totalBanco > 0 && ineditos >= totalBanco / 2 },
      { icone: '🌕', nome: 'Banco inteiro respondido', ok: totalBanco > 0 && ineditos >= totalBanco },
      { icone: '🎯', nome: '90%+ num dia (30+ itens)', ok: diaDe90 },
      { icone: '🌋', nome: '100 itens num só dia', ok: diaDe100 },
      { icone: '🧩', nome: '100 itens em todas as matérias', ok: materias100 },
    ] },
    { titulo: 'Revisão e missões', itens: [
      { icone: '🧭', nome: '1ª trilha de revisão', ok: trilhas >= 1 },
      { icone: '🗺️', nome: '5 trilhas de revisão', ok: trilhas >= 5 },
      { icone: '🏔️', nome: '20 trilhas de revisão', ok: trilhas >= 20 },
      { icone: '📆', nome: 'Semana com 7 matérias', ok: semanasCompletas >= 1 },
      { icone: '🗓️', nome: '4 semanas com 7 matérias', ok: semanasCompletas >= 4 },
      { icone: '📜', nome: '50 leituras confirmadas', ok: lidos.size >= 50 },
      { icone: '🏛️', nome: 'Todos os resumos confirmados', ok: todosLidos },
    ] },
    { titulo: 'Redação', itens: [
      { icone: '✍️', nome: '1ª redação corrigida', ok: corrigidas.length >= 1 },
      { icone: '📄', nome: '5 redações corrigidas', ok: corrigidas.length >= 5 },
      { icone: '📚', nome: '12 redações corrigidas', ok: corrigidas.length >= 12 },
      { icone: '🖋️', nome: 'NPD 20+', ok: melhorNpd >= 20 },
      { icone: '🏆', nome: 'NPD 25+', ok: melhorNpd >= 25 },
    ] },
    { titulo: 'Volume', itens: [
      { icone: '🎯', nome: 'Primeiro item', ok: respostas.length >= 1 },
      { icone: '💯', nome: '100 itens', ok: respostas.length >= 100 },
      { icone: '🗂️', nome: '500 itens', ok: respostas.length >= 500 },
      { icone: '🏅', nome: '1.000 itens', ok: respostas.length >= 1000 },
      { icone: '🏛️', nome: '5.000 itens', ok: respostas.length >= 5000 },
      { icone: '⚛️', nome: '100 itens de Física', ok: porMateria('FIS') >= 100 },
      { icone: '🧪', nome: '100 itens de Química', ok: porMateria('QUI') >= 100 },
      { icone: '🧬', nome: '100 itens de Biologia', ok: porMateria('BIO') >= 100 },
      { icone: '🔧', nome: '100 itens de Mecânica', ok: porMateria('MEC') >= 100 },
      { icone: '🧮', nome: '100 itens de Matemática', ok: porMateria('MAT') >= 100 },
      { icone: '✒️', nome: '100 itens de Português', ok: porMateria('PT') >= 100 },
    ] },
    { titulo: 'Constância', itens: [
      { icone: '🔥', nome: '7 dias seguidos', ok: streak.dias >= 7 },
      { icone: '⚡', nome: '14 dias seguidos', ok: streak.dias >= 14 },
      { icone: '🏆', nome: '30 dias seguidos', ok: streak.dias >= 30 },
      { icone: '💎', nome: '60 dias seguidos', ok: streak.dias >= 60 },
      { icone: '📅', nome: '20 dias de estudo', ok: ultimos30.size >= 20 },
      { icone: '🗓️', nome: '60 dias de estudo', ok: ultimos30.size >= 60 },
      { icone: '🌳', nome: '100 dias de estudo', ok: ultimos30.size >= 100 },
    ] },
    { titulo: 'Domínio', itens: [
      { icone: '🧠', nome: 'Raciocínio Lógico todo verde', ok: rlmVerde },
      { icone: '🌟', nome: 'Uma matéria inteira em 🟢', ok: materiaVerde },
      { icone: '🗺️', nome: 'Diagnóstico em 50 tópicos', ok: topicosComDiagnostico >= 50 },
      { icone: '🛡️', nome: '7 dias sem errar com certeza (50+ itens)', ok: semErroComCerteza },
      { icone: '📕', nome: 'Caderno de erros zerado (com 20+ revisões)', ok: noCaderno(revisoes).length === 0 && respostas.filter((r) => r.modo === 'revisao').length >= 20 },
      { icone: '🔁', nome: '100 revisões do caderno', ok: respostas.filter((r) => r.modo === 'revisao').length >= 100 },
      { icone: '📖', nome: '10 resumos lidos', ok: lidos.size >= 10 },
      { icone: '📚', nome: 'Todos os resumos de uma matéria', ok: materiaLida },
    ] },
    { titulo: 'Simulados', itens: [
      { icone: '⏱️', nome: '1º mini-simulado', ok: sims.some((s) => s.tipo === 'mini') },
      { icone: '✅', nome: 'Mini acima do mínimo', ok: sims.some((s) => s.tipo === 'mini' && s.resumo?.passou) },
      { icone: '📝', nome: '1º simulado completo', ok: completos.length > 0 },
      { icone: '🎖️', nome: 'Simulado completo acima do mínimo', ok: completos.some((s) => s.resumo?.passou) },
      { icone: '🚀', nome: 'Nota 60+ num simulado completo', ok: completos.some((s) => (s.resumo?.nota ?? 0) >= 60) },
      { icone: '🗃️', nome: 'Simulados 01–05 feitos', ok: driveFeitos.size >= 5 },
      { icone: '📈', nome: '5 simulados concluídos', ok: sims.length >= 5 },
      { icone: '🩹', nome: 'Pontos fracos encarados', ok: sims.some((s) => s.tipo === 'fracos') },
      { icone: '🧪', nome: 'Mini por matérias', ok: sims.some((s) => s.tipo === 'materias') },
    ] },
  ]
}
