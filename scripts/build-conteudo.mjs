// Valida o conteúdo de conteudo/ e gera os arquivos que o app carrega (app/public/data/).
//
// Uso:
//   node scripts/build-conteudo.mjs           valida e gera
//   node scripts/build-conteudo.mjs --check   só valida (sai com erro se houver problema)
//
// Estrutura esperada por matéria (ex.: conteudo/FIS/):
//   questoes*.json  lista(s) de itens (formato em docs/PROJETO.md §6.4); ex.: questoes-FIS-12.json
//   grupos*.json    lista(s) de { id, texto } com textos-base compartilhados (opcional)
//   FIS-12.md       conteúdo do tópico, com as seções "## Resumo", "## Teoria" e "## Manias da banca" (opcional)
//   temas.json      só na redação (RED): temas com ganchos e comandos
//   repertorio.json só na redação: autores e obras comentados, com aplicações por tema
//   modelos.json    só na redação: redações-modelo anotadas parágrafo a parágrafo
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { join } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
const CONTEUDO = join(ROOT, 'conteudo')
const SAIDA = join(ROOT, 'app', 'public', 'data')
const SO_CHECAR = process.argv.includes('--check')

const TIPOS = ['conceito', 'calculo', 'situacao', 'interpretacao']
const ARMADILHAS = ['numero', 'absoluto', 'inversao', 'competencia', 'excecao', 'outro']
const STATUS = ['ok', 'revisar']
const OBRIGATORIOS = ['id', 'topico', 'enunciado', 'gabarito', 'comentario', 'dificuldade', 'tipo', 'origem', 'status']

const erros = []
const avisos = []
const lerJson = (arq) => JSON.parse(readFileSync(arq, 'utf8'))
const normalizar = (t) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim()

function secoesMarkdown(md) {
  const secoes = {}
  const mapa = { resumo: 'resumo', teoria: 'teoria', 'manias da banca': 'manias' }
  let atual = null
  for (const linha of md.split(/\r?\n/)) {
    const m = linha.match(/^##\s+(.+?)\s*$/)
    if (m && mapa[m[1].toLowerCase()]) { atual = mapa[m[1].toLowerCase()]; secoes[atual] = []; continue }
    if (atual) secoes[atual].push(linha)
  }
  return Object.fromEntries(Object.entries(secoes).map(([k, v]) => [k, v.join('\n').trim()]))
}

const edital = lerJson(join(CONTEUDO, 'edital.json'))
const topicoDaMateria = new Map()
for (const m of edital.materias) for (const t of m.topicos) topicoDaMateria.set(t.codigo, m.codigo)

const idsVistos = new Set()
const enunciadosVistos = new Map()
const contagem = {} // topico -> { ok, revisar, conteudo }
const porMateria = {}

for (const materia of edital.materias) {
  const pasta = join(CONTEUDO, materia.codigo)
  // aceita um arquivo único (questoes.json) ou vários (questoes-MAT-01.json…); idem para grupos
  const arquivos = (prefixo) => (existsSync(pasta) ? readdirSync(pasta).filter((a) => a.startsWith(prefixo) && a.endsWith('.json')).sort() : [])
  const questoes = arquivos('questoes').flatMap((a) => lerJson(join(pasta, a)))
  const grupos = arquivos('grupos').flatMap((a) => lerJson(join(pasta, a)))
  const opcional = (arq) => (existsSync(join(pasta, arq)) ? lerJson(join(pasta, arq)) : undefined) // só na redação
  const temas = opcional('temas.json')
  const repertorio = opcional('repertorio.json')
  const modelos = opcional('modelos.json')
  const idsGrupos = new Set(grupos.map((g) => g.id))
  const conteudos = {}

  if (existsSync(pasta)) {
    for (const arq of readdirSync(pasta).filter((a) => a.endsWith('.md'))) {
      const topico = arq.replace(/\.md$/, '')
      if (topicoDaMateria.get(topico) !== materia.codigo) { erros.push(`${materia.codigo}/${arq}: tópico ${topico} não existe nesta matéria`); continue }
      conteudos[topico] = secoesMarkdown(readFileSync(join(pasta, arq), 'utf8'))
    }
  }

  for (const [i, q] of questoes.entries()) {
    const onde = `${materia.codigo}/questoes.json [${i}] ${q.id ?? ''}`
    for (const campo of OBRIGATORIOS) {
      if (q[campo] === undefined || q[campo] === null || q[campo] === '') erros.push(`${onde}: falta o campo "${campo}"`)
    }
    if (idsVistos.has(q.id)) erros.push(`${onde}: id repetido`)
    idsVistos.add(q.id)
    if (topicoDaMateria.get(q.topico) !== materia.codigo) erros.push(`${onde}: tópico "${q.topico}" não pertence a ${materia.codigo}`)
    if (q.id && q.topico && !q.id.startsWith(q.topico + '-')) erros.push(`${onde}: id deve começar com o tópico (${q.topico}-)`)
    if (!['C', 'E'].includes(q.gabarito)) erros.push(`${onde}: gabarito deve ser "C" ou "E"`)
    if (![1, 2, 3].includes(q.dificuldade)) erros.push(`${onde}: dificuldade deve ser 1, 2 ou 3`)
    if (q.tipo && !TIPOS.includes(q.tipo)) erros.push(`${onde}: tipo inválido "${q.tipo}"`)
    if (q.armadilha != null && !ARMADILHAS.includes(q.armadilha)) erros.push(`${onde}: armadilha inválida "${q.armadilha}"`)
    if (q.status && !STATUS.includes(q.status)) erros.push(`${onde}: status inválido "${q.status}"`)
    if (q.grupo && !idsGrupos.has(q.grupo)) erros.push(`${onde}: grupo "${q.grupo}" não existe em grupos*.json`)
    if (q.enunciado) {
      const chave = normalizar(q.enunciado)
      if (enunciadosVistos.has(chave)) avisos.push(`${onde}: enunciado igual a ${enunciadosVistos.get(chave)}`)
      else enunciadosVistos.set(chave, q.id)
    }
    const c = (contagem[q.topico] ??= { ok: 0, revisar: 0, C: 0, dif: [0, 0, 0] })
    c[q.status === 'revisar' ? 'revisar' : 'ok']++
    if (q.gabarito === 'C') c.C++
    if (q.dificuldade) c.dif[q.dificuldade - 1]++
  }

  for (const t of temas ?? []) {
    if (!t.titulo || !Array.isArray(t.comandos) || !t.comandos.length) erros.push(`${materia.codigo}/temas.json: tema ${t.id} sem título ou comandos`)
    if (t.eixo && topicoDaMateria.get(t.eixo) !== materia.codigo) erros.push(`${materia.codigo}/temas.json: tema ${t.id} com eixo inválido "${t.eixo}"`)
  }

  for (const r of repertorio ?? []) {
    if (!r.id || !r.nome || !r.obra || !r.ideia || !Array.isArray(r.aplicacoes)) erros.push(`${materia.codigo}/repertorio.json: entrada ${r.id ?? '?'} incompleta (id, nome, obra, ideia, aplicacoes)`)
  }
  const idsTemas = new Set((temas ?? []).map((t) => t.id))
  for (const m of modelos ?? []) {
    if (!m.titulo || !Array.isArray(m.paragrafos) || m.paragrafos.some((p) => !p.texto || !p.papel)) erros.push(`${materia.codigo}/modelos.json: modelo ${m.id} incompleto`)
    if (m.tema != null && !idsTemas.has(m.tema)) erros.push(`${materia.codigo}/modelos.json: modelo ${m.id} aponta para tema ${m.tema}, que não existe`)
  }

  porMateria[materia.codigo] = { questoes, grupos, conteudos, ...(temas ? { temas } : {}), ...(repertorio ? { repertorio } : {}), ...(modelos ? { modelos } : {}) }
}

// balanceamento por tópico (só avisa quando já há volume)
for (const [topico, c] of Object.entries(contagem)) {
  const total = c.ok + c.revisar
  if (total < 20) continue
  const pctC = c.C / total
  if (pctC < 0.4 || pctC > 0.6) avisos.push(`${topico}: gabarito desbalanceado (${Math.round(pctC * 100)}% C)`)
}

const totalItens = Object.values(contagem).reduce((s, c) => s + c.ok + c.revisar, 0)
const totalRevisar = Object.values(contagem).reduce((s, c) => s + c.revisar, 0)
console.log(`Itens: ${totalItens} (${totalRevisar} para revisar) em ${Object.keys(contagem).length} tópicos`)
for (const m of edital.materias) {
  const n = m.topicos.reduce((s, t) => s + (contagem[t.codigo] ? contagem[t.codigo].ok + contagem[t.codigo].revisar : 0), 0)
  const meta = m.topicos.length * m.metaPorTopico
  const comConteudo = Object.keys(porMateria[m.codigo].conteudos).length
  console.log(`  ${m.codigo.padEnd(4)} ${String(n).padStart(5)} / ${meta} itens · conteúdo em ${comConteudo}/${m.topicos.length} tópicos`)
}
for (const a of avisos) console.warn('AVISO  ' + a)
for (const e of erros) console.error('ERRO   ' + e)
if (erros.length) { console.error(`\n${erros.length} erro(s). Corrija antes de publicar.`); process.exit(1) }
if (SO_CHECAR) { console.log('\nConteúdo válido.'); process.exit(0) }

mkdirSync(SAIDA, { recursive: true })
const hash = createHash('sha1')
for (const [cod, dados] of Object.entries(porMateria)) {
  const json = JSON.stringify(dados)
  hash.update(json)
  writeFileSync(join(SAIDA, `${cod}.json`), json)
}
const resumo = Object.fromEntries(Object.entries(contagem).map(([t, c]) => [t, { itens: c.ok + c.revisar, revisar: c.revisar }]))
const temConteudo = Object.fromEntries(Object.values(porMateria).flatMap((d) => Object.keys(d.conteudos).map((t) => [t, true])))
writeFileSync(join(SAIDA, 'index.json'), JSON.stringify({ versao: hash.digest('hex').slice(0, 10), edital, resumo, temConteudo }))
console.log(`\nGerado em app/public/data/`)
