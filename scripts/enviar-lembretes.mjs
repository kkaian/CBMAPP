// Envia os lembretes diários (Web Push). Roda de hora em hora no GitHub Actions.
// Variáveis: SUPABASE_DB_URL (pooler, com senha), VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY.
// Só manda para quem escolheu a hora atual (horário de Maceió), uma vez por dia,
// e só se a meta do dia ainda não foi batida ou há revisões pendentes.
import pg from 'pg'
import webpush from 'web-push'

const { SUPABASE_DB_URL, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY } = process.env
if (!SUPABASE_DB_URL || !VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) { console.error('Faltam variáveis de ambiente.'); process.exit(1) }

const META = 40 // meta diária padrão do app
const PROVA = '2027-01-26'
const FUSO = 'America/Maceio'

webpush.setVapidDetails('mailto:noreply@cbmapp.local', VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY)

const agora = new Date()
const partes = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: FUSO, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hourCycle: 'h23' })
  .formatToParts(agora).map((p) => [p.type, p.value]))
const hoje = `${partes.year}-${partes.month}-${partes.day}`
const hora = Number(partes.hour)
const faltam = Math.round((Date.parse(PROVA) - Date.parse(hoje)) / 86400000)
// permite rodar à mão para testar: HORA=19 node scripts/enviar-lembretes.mjs
const horaAlvo = process.env.HORA ? Number(process.env.HORA) : hora

const db = new pg.Client({ connectionString: SUPABASE_DB_URL, ssl: { rejectUnauthorized: false } })
await db.connect()

const { rows: inscricoes } = await db.query(
  `select endpoint, user_id, p256dh, auth from public.push_inscricoes
   where ativo and hora = $1 and (ultimo_envio is null or ultimo_envio < $2::date)`,
  [horaAlvo, hoje],
)
console.log(`${hoje} ${hora}h (alvo ${horaAlvo}h): ${inscricoes.length} inscrição(ões)`)

for (const i of inscricoes) {
  const { rows: [r] } = await db.query(
    `select
       (select count(*) from public.respostas where user_id = $1 and (criada_em at time zone $3)::date = $2::date)::int as feitos,
       (select count(*) from public.revisoes where user_id = $1 and proxima is not null and proxima <= $2::date)::int as revisoes`,
    [i.user_id, hoje, FUSO],
  )
  if (r.feitos >= META && r.revisoes === 0) { console.log('  meta batida, sem lembrete'); continue }

  const corpo = r.feitos === 0
    ? `Você ainda não estudou hoje.${r.revisoes ? ` ${r.revisoes} revisões te esperam.` : ''} Faltam ${faltam} dias para a prova.`
    : r.feitos < META
      ? `${r.feitos} de ${META} itens hoje. Faltam ${META - r.feitos} para fechar a meta.${r.revisoes ? ` E ${r.revisoes} revisões pendentes.` : ''}`
      : `Meta batida! Ainda há ${r.revisoes} revisões no caderno de erros.`
  const titulo = r.feitos === 0 ? '🔥 Não quebre a sequência' : '📚 Bora fechar o dia'
  const url = r.revisoes && r.feitos >= META ? '/#/quiz?modo=revisao&n=30' : '/'

  try {
    await webpush.sendNotification({ endpoint: i.endpoint, keys: { p256dh: i.p256dh, auth: i.auth } }, JSON.stringify({ titulo, corpo, url, tag: 'lembrete' }))
    await db.query('update public.push_inscricoes set ultimo_envio = $2::date where endpoint = $1', [i.endpoint, hoje])
    console.log('  enviado')
  } catch (e) {
    if (e.statusCode === 404 || e.statusCode === 410) {
      await db.query('delete from public.push_inscricoes where endpoint = $1', [i.endpoint])
      console.log('  inscrição expirada, removida')
    } else {
      console.error('  erro ao enviar:', e.statusCode, e.body ?? e.message)
    }
  }
}
await db.end()
