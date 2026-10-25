// Correção de redação por IA (Gemini), rodando no servidor da Vercel.
// - A chave do Gemini fica só aqui (variável GEMINI_API_KEY), nunca no app.
// - Só contas aprovadas usam; cada pessoa tem um limite de correções por dia (tabela correcoes_ia).
// - O app manda o tema, os comandos e o texto linha a linha; a função devolve a avaliação em JSON.

export const maxDuration = 60 // a IA leva ~15 s; folga para tentar outro modelo

const LIMITE_DIA = Number(process.env.LIMITE_CORRECOES_DIA ?? 3)
const MODELOS = (process.env.GEMINI_MODELOS ?? 'gemini-3.5-flash,gemini-flash-latest,gemini-flash-lite-latest').split(',').map((m) => m.trim()).filter(Boolean)
const MAX_ESTRUTURA = 6 // apresentação e estrutura textual; o restante do NC (24) é dividido entre os comandos
const NC_MAX = 30

type Pedido = { tema: string; comandos: string[]; linhas: string[] }

export interface Avaliacao {
  fugaAoTema: boolean
  estrutura: { nota: number; maximo: number; comentario: string }
  comandos: { comando: string; atendido: 'sim' | 'parcial' | 'nao'; nota: number; maximo: number; comentario: string }[]
  erros: { linha: number; trecho: string; correcao: string; tipo: 'grafia' | 'morfossintaxe' | 'propriedade vocabular'; explicacao: string }[]
  repertorio: string
  pontosFortes: string[]
  melhorias: string[]
  reescritas: { original: string; sugestao: string }[]
  nc: number
  modelo: string
}

function json(dados: unknown, status = 200) {
  return new Response(JSON.stringify(dados), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' } })
}

// ---------- instrução ao modelo ----------

export function montarInstrucao(p: Pedido): string {
  const porComando = Math.round(((NC_MAX - MAX_ESTRUTURA) / p.comandos.length) * 100) / 100
  return `Você é um examinador experiente da banca Cebraspe corrigindo a prova discursiva do concurso do Corpo de Bombeiros Militar de Alagoas (cargo de praça). Corrija com rigor, de forma justa e em português do Brasil.

REGRAS DA PROVA
- Texto dissertativo de até 30 linhas sobre o tema e os comandos abaixo. Linguagem formal, impessoal (3ª pessoa).
- Nota de conteúdo (NC) de 0 a 30, assim distribuída nesta correção:
  * apresentação e estrutura textual (introdução, desenvolvimento e conclusão; paragrafação; coesão; progressão): 0 a ${MAX_ESTRUTURA};
  * cada comando: 0 a ${porComando} (comando não abordado vale 0; abordado de forma superficial vale no máximo metade).
- Proposta de intervenção só é exigida se um comando pedir. Não desconte por ausência dela em outros casos.
- Fuga total ao tema zera a prova (fugaAoTema = true).
- Erros (NE) contam à parte: liste CADA ocorrência de erro de grafia (ortografia, acentuação, hífen), de morfossintaxe (concordância, regência, crase, pontuação que comprometa a frase, colocação pronominal, flexão) e de propriedade vocabular (palavra com sentido inadequado). Não liste escolhas de estilo, repetições aceitáveis nem preferências. Na dúvida se é erro segundo a norma-padrão, NÃO liste. Indique a linha exatamente como numerada no texto.

REPERTÓRIO
- Avalie se autores, leis e fatos citados estão corretos e amarrados ao comando. Aponte dados ou números que pareçam inventados, citações literais duvidosas e atribuições erradas (por exemplo, o "homem cordial" de Sérgio Buarque de Holanda não significa povo gentil). A citação coringa do candidato é Darcy Ribeiro, O Povo Brasileiro (desigualdade estrutural da formação do Brasil): diga se foi bem usada, quando aparecer.

SAÍDA
- Responda só no formato JSON pedido. Comentários diretos, em 1 a 3 frases cada, dizendo o que faltou para a nota máxima.
- Em "reescritas", traga até 2 trechos do candidato (copiados) com uma versão melhorada.

TEMA: ${p.tema}
COMANDOS:
${p.comandos.map((c, i) => `${i + 1}. ${c}`).join('\n')}

TEXTO DO CANDIDATO (${p.linhas.length} linhas, numeradas):
${p.linhas.map((l, i) => `${String(i + 1).padStart(2, '0')}| ${l}`).join('\n')}`
}

const ESQUEMA = {
  type: 'OBJECT',
  properties: {
    fugaAoTema: { type: 'BOOLEAN' },
    estrutura: { type: 'OBJECT', properties: { nota: { type: 'NUMBER' }, comentario: { type: 'STRING' } }, required: ['nota', 'comentario'] },
    comandos: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          comando: { type: 'STRING' }, atendido: { type: 'STRING', enum: ['sim', 'parcial', 'nao'] },
          nota: { type: 'NUMBER' }, comentario: { type: 'STRING' },
        },
        required: ['comando', 'atendido', 'nota', 'comentario'],
      },
    },
    erros: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          linha: { type: 'INTEGER' }, trecho: { type: 'STRING' }, correcao: { type: 'STRING' },
          tipo: { type: 'STRING', enum: ['grafia', 'morfossintaxe', 'propriedade vocabular'] }, explicacao: { type: 'STRING' },
        },
        required: ['linha', 'trecho', 'correcao', 'tipo', 'explicacao'],
      },
    },
    repertorio: { type: 'STRING' },
    pontosFortes: { type: 'ARRAY', items: { type: 'STRING' } },
    melhorias: { type: 'ARRAY', items: { type: 'STRING' } },
    reescritas: { type: 'ARRAY', items: { type: 'OBJECT', properties: { original: { type: 'STRING' }, sugestao: { type: 'STRING' } }, required: ['original', 'sugestao'] } },
  },
  required: ['fugaAoTema', 'estrutura', 'comandos', 'erros', 'repertorio', 'pontosFortes', 'melhorias', 'reescritas'],
}

const limitar = (n: unknown, max: number) => Math.max(0, Math.min(max, Math.round((Number(n) || 0) * 100) / 100))

// Normaliza a resposta: limites de nota, um item por comando, linhas válidas, NC somado aqui (não pelo modelo).
export function normalizar(bruto: Record<string, unknown>, p: Pedido, modelo: string): Avaliacao {
  const porComando = (NC_MAX - MAX_ESTRUTURA) / p.comandos.length
  const b = bruto as unknown as Partial<Avaliacao> & { estrutura?: { nota?: number; comentario?: string } }
  const comandos = p.comandos.map((c, i) => {
    const r = (b.comandos ?? [])[i] ?? { atendido: 'nao', nota: 0, comentario: 'Comando não avaliado.' }
    return { comando: c, atendido: (['sim', 'parcial', 'nao'].includes(r.atendido as string) ? r.atendido : 'nao') as 'sim' | 'parcial' | 'nao', nota: limitar(r.nota, porComando), maximo: Math.round(porComando * 100) / 100, comentario: String(r.comentario ?? '') }
  })
  const estrutura = { nota: limitar(b.estrutura?.nota, MAX_ESTRUTURA), maximo: MAX_ESTRUTURA, comentario: String(b.estrutura?.comentario ?? '') }
  const fuga = !!b.fugaAoTema
  const erros = (b.erros ?? []).filter((e) => e && e.trecho).map((e) => ({
    linha: Math.max(1, Math.min(p.linhas.length, Math.round(Number(e.linha) || 1))), trecho: String(e.trecho), correcao: String(e.correcao ?? ''),
    tipo: (['grafia', 'morfossintaxe', 'propriedade vocabular'].includes(e.tipo as string) ? e.tipo : 'morfossintaxe') as Avaliacao['erros'][number]['tipo'],
    explicacao: String(e.explicacao ?? ''),
  }))
  const nc = fuga ? 0 : Math.round((estrutura.nota + comandos.reduce((s, c) => s + c.nota, 0)) * 100) / 100
  return {
    fugaAoTema: fuga, estrutura, comandos, erros, nc, modelo,
    repertorio: String(b.repertorio ?? ''),
    pontosFortes: (b.pontosFortes ?? []).map(String).slice(0, 5),
    melhorias: (b.melhorias ?? []).map(String).slice(0, 6),
    reescritas: (b.reescritas ?? []).filter((r) => r && r.original && r.sugestao).slice(0, 2),
  }
}

// Tenta os modelos em ordem; pula para o próximo se estiver sobrecarregado ou indisponível.
export async function corrigirTexto(p: Pedido, chave: string): Promise<Avaliacao> {
  let ultimoErro = 'sem modelo configurado'
  for (const modelo of MODELOS) {
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), 45_000)
    try {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent`, {
        method: 'POST',
        signal: ctrl.signal,
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': chave },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: montarInstrucao(p) }] }],
          generationConfig: { temperature: 0.2, responseMimeType: 'application/json', responseSchema: ESQUEMA },
        }),
      })
      const corpo = await r.json() as { candidates?: { content?: { parts?: { text?: string }[] } }[]; error?: { message?: string } }
      if (!r.ok) { ultimoErro = `${modelo}: ${r.status} ${corpo.error?.message ?? ''}`; continue }
      const texto = corpo.candidates?.[0]?.content?.parts?.map((x) => x.text ?? '').join('') ?? ''
      return normalizar(JSON.parse(texto), p, modelo)
    } catch (e) {
      ultimoErro = `${modelo}: ${(e as Error).message}`
    } finally {
      clearTimeout(timer)
    }
  }
  throw new Error(ultimoErro)
}

// ---------- acesso (Supabase, com o token de quem chamou) ----------

const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? ''
const SUPABASE_ANON = process.env.SUPABASE_ANON_KEY ?? process.env.VITE_SUPABASE_ANON_KEY ?? ''

async function supabase(caminho: string, token: string, init: RequestInit = {}) {
  return fetch(`${SUPABASE_URL}${caminho}`, {
    ...init,
    headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', ...(init.headers ?? {}) },
  })
}

// Início do dia em Maceió (UTC−3), em ISO
function inicioDoDia(): string {
  const agora = new Date(Date.now() - 3 * 3600_000)
  return new Date(Date.UTC(agora.getUTCFullYear(), agora.getUTCMonth(), agora.getUTCDate()) + 3 * 3600_000).toISOString()
}

async function usadasHoje(token: string): Promise<number> {
  const r = await supabase(`/rest/v1/correcoes_ia?select=id&criada_em=gte.${encodeURIComponent(inicioDoDia())}`, token, { method: 'HEAD', headers: { Prefer: 'count=exact' } })
  const faixa = r.headers.get('content-range') ?? '*/0'
  return Number(faixa.split('/')[1] ?? 0) || 0
}

export async function GET(req: Request) {
  const token = (req.headers.get('authorization') ?? '').replace(/^Bearer\s+/i, '')
  if (!token) return json({ erro: 'Faça login para usar a correção.' }, 401)
  return json({ limite: LIMITE_DIA, usadas: await usadasHoje(token) })
}

export async function POST(req: Request) {
  const chave = process.env.GEMINI_API_KEY
  if (!chave || !SUPABASE_URL) return json({ erro: 'Correção por IA não configurada no servidor.' }, 503)
  const token = (req.headers.get('authorization') ?? '').replace(/^Bearer\s+/i, '')
  if (!token) return json({ erro: 'Faça login para usar a correção.' }, 401)

  const user = await supabase('/auth/v1/user', token)
  if (!user.ok) return json({ erro: 'Sessão expirada. Entre de novo.' }, 401)
  const aprovado = await supabase('/rest/v1/rpc/eh_aprovado', token, { method: 'POST', body: '{}' })
  if (!aprovado.ok || (await aprovado.json()) !== true) return json({ erro: 'Sua conta ainda não foi aprovada.' }, 403)

  let p: Pedido
  try {
    const b = await req.json() as Partial<Pedido>
    p = {
      tema: String(b.tema ?? '').slice(0, 300),
      comandos: (b.comandos ?? []).map(String).filter(Boolean).slice(0, 6).map((c) => c.slice(0, 400)),
      linhas: (b.linhas ?? []).map((l) => String(l).slice(0, 200)).slice(0, 35),
    }
  } catch { return json({ erro: 'Pedido inválido.' }, 400) }
  if (!p.tema || !p.comandos.length) return json({ erro: 'Informe o tema e pelo menos um comando.' }, 400)
  const escritas = p.linhas.filter((l) => l.trim()).length
  if (escritas < 7) return json({ erro: 'Texto curto demais para corrigir (menos de 7 linhas).' }, 400)

  const usadas = await usadasHoje(token)
  if (usadas >= LIMITE_DIA) return json({ erro: `Você já usou as ${LIMITE_DIA} correções de hoje. Use "Copiar para correção" ou tente amanhã.`, limite: LIMITE_DIA, usadas }, 429)

  try {
    const avaliacao = await corrigirTexto(p, chave)
    await supabase('/rest/v1/correcoes_ia', token, { method: 'POST', body: JSON.stringify({ modelo: avaliacao.modelo }) })
    return json({ avaliacao, limite: LIMITE_DIA, usadas: usadas + 1 })
  } catch (e) {
    return json({ erro: `A IA não respondeu agora (${(e as Error).message.slice(0, 160)}). Tente de novo em alguns minutos ou use "Copiar para correção".` }, 502)
  }
}
