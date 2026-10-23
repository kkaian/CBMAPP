// Mostra o balanceamento do banco por tópico: itens, % de gabarito C, dificuldade e status.
// Uso: node scripts/balanco.mjs [MATERIA]   (ex.: node scripts/balanco.mjs MAT)
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
const edital = JSON.parse(readFileSync(join(ROOT, 'conteudo', 'edital.json'), 'utf8'))
const filtro = process.argv[2]

for (const m of edital.materias) {
  if (filtro && m.codigo !== filtro) continue
  const pasta = join(ROOT, 'conteudo', m.codigo)
  if (!existsSync(pasta)) continue
  const qs = readdirSync(pasta).filter((a) => a.startsWith('questoes') && a.endsWith('.json')).flatMap((a) => JSON.parse(readFileSync(join(pasta, a), 'utf8')))
  console.log(`\n${m.codigo} — ${qs.length} itens (meta ${m.topicos.length * m.metaPorTopico})`)
  console.log('tópico   itens   %C   fácil/média/difícil   revisar  conteúdo')
  for (const t of m.topicos) {
    const q = qs.filter((x) => x.topico === t.codigo)
    if (!q.length) continue
    const pc = Math.round((q.filter((x) => x.gabarito === 'C').length / q.length) * 100)
    const d = [1, 2, 3].map((n) => Math.round((q.filter((x) => x.dificuldade === n).length / q.length) * 100))
    const rev = q.filter((x) => x.status === 'revisar').length
    const md = existsSync(join(pasta, `${t.codigo}.md`)) ? 'sim' : '—'
    console.log(`${t.codigo.padEnd(8)} ${String(q.length).padStart(5)} ${String(pc).padStart(4)}   ${d.map((x) => String(x).padStart(3) + '%').join(' / ')}   ${String(rev).padStart(7)}  ${md}`)
  }
}
