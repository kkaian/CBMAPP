import {
  calcularStreak, diagnosticoPorTopico, diasComEstudo, excessoConfianca, noCaderno,
} from './stats'
import type { IndiceConteudo, RegistroLeitura, RegistroResposta, RegistroRevisao, RegistroSimulado } from './types'

export interface Conquista { icone: string; nome: string; ok: boolean }
export interface GrupoConquistas { titulo: string; itens: Conquista[] }

// Todas ligadas a progresso real. Usadas no Perfil e no resumo público do ranking.
export function calcularConquistas({ ind, respostas, leituras, revisoes, simulados }: {
  ind: IndiceConteudo
  respostas: RegistroResposta[]
  leituras: RegistroLeitura[]
  revisoes: RegistroRevisao[]
  simulados: RegistroSimulado[] // só os concluídos
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
  const lidos = new Set(leituras.map((l) => l.topico))
  const materiaLida = ind.edital.materias.some((m) => m.topicos.length > 0 && m.topicos.every((t) => lidos.has(t.codigo)))
  const semErroComCerteza = respostas.length >= 100 && excessoConfianca(respostas, 7).length === 0
    && respostas.filter((r) => Date.now() - new Date(r.criadaEm).getTime() < 7 * 86_400_000).length >= 50

  return [
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
      { icone: '📅', nome: '20 dias de estudo', ok: ultimos30.size >= 20 },
      { icone: '🗓️', nome: '60 dias de estudo', ok: ultimos30.size >= 60 },
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
    ] },
  ]
}
