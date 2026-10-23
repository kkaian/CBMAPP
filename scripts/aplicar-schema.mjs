// Aplica supabase/schema.sql no banco do Supabase.
// Uso: SUPABASE_DB_URL="postgresql://..." node scripts/aplicar-schema.mjs
// (a URL com senha nunca vai para o repositório: fica só na variável de ambiente)
import { readFileSync } from 'node:fs'
import pg from 'pg'

const url = process.env.SUPABASE_DB_URL
if (!url) { console.error('Defina SUPABASE_DB_URL.'); process.exit(1) }

const sql = readFileSync(new URL('../supabase/schema.sql', import.meta.url), 'utf8')
const cliente = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } })
await cliente.connect()
await cliente.query(sql)
const { rows } = await cliente.query(
  "select table_name from information_schema.tables where table_schema = 'public' order by 1",
)
console.log('Tabelas em public:', rows.map((r) => r.table_name).join(', '))
await cliente.end()
