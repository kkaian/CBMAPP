import { carregarIndice, carregarMateria, carregarTodas, materiaDoTopico, questoesPorId } from './conteudo'
import { db } from './db'
import { diaLocal } from './datas'
import { cadernoDeDuvidas, diagnosticoPorTopico, revisoesPendentes } from './stats'
import type { Questao } from './types'

function embaralhar<T>(lista: T[]): T[] {
  const a = [...lista]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Ordem de prioridade dentro de um conjunto: nunca respondidos → errados na última vez → o resto.
// Itens do mesmo grupo (texto-base) ficam juntos.
async function priorizar(questoes: Questao[], n: number): Promise<Questao[]> {
  const respostas = await db.respostas.where('itemId').anyOf(questoes.map((q) => q.id)).sortBy('criadaEm')
  const ultima = new Map<string, number | null>()
  for (const r of respostas) ultima.set(r.itemId, r.correta)
  const nunca = embaralhar(questoes.filter((q) => !ultima.has(q.id)))
  const errados = embaralhar(questoes.filter((q) => ultima.has(q.id) && ultima.get(q.id) !== 1))
  const resto = embaralhar(questoes.filter((q) => ultima.get(q.id) === 1))
  const escolhidos = [...nunca, ...errados, ...resto].slice(0, n)
  // agrupa por texto-base mantendo a ordem do primeiro item de cada grupo
  const ordemGrupo = new Map<string, number>()
  escolhidos.forEach((q, i) => { if (q.grupo && !ordemGrupo.has(q.grupo)) ordemGrupo.set(q.grupo, i) })
  return escolhidos
    .map((q, i) => ({ q, k: q.grupo ? ordemGrupo.get(q.grupo)! + i / 1000 : i }))
    .sort((a, b) => a.k - b.k)
    .map((x) => x.q)
}

export async function itensDoTopico(topico: string, n: number): Promise<Questao[]> {
  const dados = await carregarMateria(materiaDoTopico(topico))
  return priorizar(dados.questoes.filter((q) => q.topico === topico), n)
}

export async function itensDaMateria(materia: string, n: number): Promise<Questao[]> {
  const dados = await carregarMateria(materia)
  return priorizar(dados.questoes, n)
}

export async function itensDeRevisao(n: number): Promise<Questao[]> {
  const pendentes = revisoesPendentes(await db.revisoes.toArray(), diaLocal())
    .sort((a, b) => (a.proxima ?? '').localeCompare(b.proxima ?? ''))
    .slice(0, n)
  return questoesPorId(pendentes.map((r) => r.itemId))
}

// Caderno de dúvidas: sorteia entre os itens do caderno, de um tópico, de uma matéria ou de todos.
export async function itensDeDuvidas(n: number, filtro: { topico?: string; materia?: string } = {}): Promise<Questao[]> {
  const itens = cadernoDeDuvidas(await db.respostas.toArray())
    .filter((r) => (!filtro.topico || r.topico === filtro.topico) && (!filtro.materia || r.materia === filtro.materia))
  return questoesPorId(embaralhar(itens).slice(0, n).map((r) => r.itemId))
}

// Trilha de revisão: os tópicos que a pessoa não acessa (leitura ou resposta) há mais tempo.
// Pega os mais antigos (os nunca acessados entram só se faltarem) e sorteia entre eles.
export async function topicosParaTrilha(n = 6): Promise<string[]> {
  const ind = await carregarIndice()
  const ultimo: Record<string, string> = {}
  const marcar = (t: string, quando: string) => { if (!ultimo[t] || quando > ultimo[t]) ultimo[t] = quando }
  for (const r of await db.respostas.toArray()) marcar(r.topico, r.criadaEm)
  for (const l of await db.leituras.toArray()) marcar(l.topico, l.criadaEm)
  const candidatos = ind.edital.materias.flatMap((m) => m.topicos.map((t) => t.codigo))
    .filter((t) => ind.temConteudo[t] && (ind.resumo[t]?.itens ?? 0) >= 5)
  const acessados = embaralhar(candidatos.filter((t) => ultimo[t])).sort((a, b) => ultimo[a].localeCompare(ultimo[b]))
  const nunca = embaralhar(candidatos.filter((t) => !ultimo[t]))
  const pool = [...acessados, ...nunca].slice(0, Math.max(n * 2, 12))
  return embaralhar(pool).slice(0, n)
}

export async function itensDaTrilha(topicos: string[], porTopico = 5): Promise<Questao[]> {
  const saida: Questao[] = []
  for (const t of topicos) saida.push(...await itensDoTopico(t, porTopico))
  return saida
}

// Relâmpago: 5 itens rápidos, puxando mais dos tópicos fracos
export async function itensRelampago(n = 5): Promise<Questao[]> {
  const todas = Object.values(await carregarTodas()).flatMap((d) => d.questoes)
  const diag = diagnosticoPorTopico(await db.respostas.orderBy('criadaEm').toArray())
  const fracos = new Set(Object.entries(diag).filter(([, d]) => d.status === 'critico' || d.status === 'construcao').map(([t]) => t))
  const dosFracos = embaralhar(todas.filter((q) => fracos.has(q.topico))).slice(0, Math.ceil(n / 2))
  const outros = embaralhar(todas.filter((q) => !dosFracos.includes(q))).slice(0, n - dosFracos.length)
  return embaralhar([...dosFracos, ...outros])
}
