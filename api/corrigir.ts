// Correção de redação por IA (Gemini), rodando no servidor da Vercel.
// - A chave do Gemini fica só aqui (variável GEMINI_API_KEY), nunca no app.
// - Só contas aprovadas usam; cada pessoa tem um limite de correções por dia (tabela correcoes_ia).
// - O app manda o tema, os comandos e o texto linha a linha; a função devolve a avaliação em JSON.

export const maxDuration = 60 // a IA leva ~15 s; folga para tentar outro modelo

const LIMITE_DIA = Number(process.env.LIMITE_CORRECOES_DIA ?? 3)
const MODELOS = (process.env.GEMINI_MODELOS ?? 'gemini-3.5-flash,gemini-flash-latest,gemini-flash-lite-latest').split(',').map((m) => m.trim()).filter(Boolean)
const MAX_ESTRUTURA = 6 // apresentação e estrutura textual; o restante do NC (24) é dividido entre os comandos
const NC_MAX = 30

const MAX_LINHAS = 30 // o que passa disso é desconsiderado (edital, 9.7.5, c)

type Pedido = { tema: string; comandos: string[]; linhas: string[]; motivadores?: string[] }
type Nivel = 'sim' | 'parcial' | 'superficial' | 'nao'

export interface Avaliacao {
  fugaAoTema: boolean
  estrutura: { nota: number; maximo: number; comentario: string; falhas: { falha: string; desconto: number }[] }
  comandos: { comando: string; partes: string[]; atendido: Nivel; nota: number; maximo: number; comentario: string; faltou: string; erroConteudo: string }[]
  erros: { linha: number; trecho: string; correcao: string; tipo: 'grafia' | 'morfossintaxe' | 'propriedade vocabular'; explicacao: string }[]
  riscos: { linha: number; trecho: string; correcao: string; motivo: string }[]
  repertorio: string
  pontosFortes: string[]
  melhorias: string[]
  reescritas: { mudanca: string; original: string; sugestao: string }[]
  nc: number
  modelo: string
}

function json(dados: unknown, status = 200) {
  return new Response(JSON.stringify(dados), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' } })
}

// ---------- instrução ao modelo ----------

// Faixa de nota de cada nível, em fração do máximo do comando (8 pontos: 7–8, 4–6, 1–3, 0)
const FAIXAS: Record<Nivel, [number, number]> = { sim: [7 / 8, 1], parcial: [1 / 2, 3 / 4], superficial: [1 / 8, 3 / 8], nao: [0, 0] }
const pontos = (n: number) => Math.round(n * 100) / 100
const faixaTexto = (nivel: Nivel, max: number) => `${pontos(FAIXAS[nivel][0] * max)} a ${pontos(FAIXAS[nivel][1] * max)}`

export function montarInstrucao(p: Pedido): string {
  const porComando = pontos((NC_MAX - MAX_ESTRUTURA) / p.comandos.length)
  return `Você é um examinador rigoroso da banca Cebraspe corrigindo a prova discursiva do concurso do Corpo de Bombeiros Militar de Alagoas (cargo de praça). Em português do Brasil. Seja exigente e justo: nenhuma nota é alta por padrão; cada ponto precisa estar justificado pelo que está escrito no texto. Isto não é correção do ENEM: não há competências.

BASE (edital, item 9.7)
- NPD = NC − 6 × NE ÷ TL. Aprovação: NPD a partir de 15 de 30. O app faz a conta; você dá as notas e lista os erros.
- Texto dissertativo de até 30 linhas sobre Atualidades. Fuga total ao tema zera (fugaAoTema = true).
- Proposta de intervenção só conta se um comando pedir medidas. Não desconte a ausência dela em outros casos.

NOTA POR COMANDO (0 a ${porComando} cada; "comandos" tem um item por comando, na ordem)
Primeiro separe, em "partes", tudo o que o comando pede. Avalie a qualidade, não a quantidade: dois ou três pontos bem explicados valem mais que uma lista. Escolha o nível e dê a nota dentro da faixa:
- "sim" (atendido), ${faixaTexto('sim', porComando)}: todas as partes abordadas, com pontos explicados e corretos.
- "parcial", ${faixaTexto('parcial', porComando)}: uma parte ausente, ou pontos citados sem explicação.
- "superficial", ${faixaTexto('superficial', porComando)}: apenas menções soltas, sem desenvolvimento.
- "nao" (não atendido), 0: ausente ou totalmente equivocado.
Regras:
1. Todas as partes: se o comando pede duas coisas, a ausência de uma limita a "parcial".
2. Explicar, não listar: cada ponto deve dizer como ou por que acontece. Enumerar vários itens numa frase é abordagem superficial desses itens.
3. Erro de conteúdo pesa mais que omissão: afirmar algo que contradiz os textos motivadores ou o conhecimento técnico tira mais pontos do que deixar de citar o item. Registre em "erroConteudo" (vazio se não houver).
4. Recorte: se o comando delimita um grupo, o texto precisa explicar por que esse grupo é mais atingido.
5. Aspecto certo: informação no parágrafo de outro comando não pontua onde está. Pode pontuar no comando a que pertence, se apresentada como tal.
6. Constatação não é proposta: quando o comando pede medidas, dizer que algo já acontece não equivale a propor a medida.
7. Repertório: lei, dado ou fato pertinente, com as próprias palavras, valoriza o comando; repertório próprio, além dos textos motivadores, vale mais. Cópia de trechos dos textos motivadores não pontua.
Em "comentario", diga o que foi bem feito; em "faltou", o que faltou para a nota máxima (vazio se nada).

APRESENTAÇÃO E ESTRUTURA (começa em ${MAX_ESTRUTURA}; o app desconta)
Liste em "falhas" cada falha encontrada, com "desconto" de 0,5 a 1. Lista vazia só para texto sem nenhuma falha. Em "comentario", diga o que funcionou (retomar na conclusão a ideia da introdução é ponto positivo, mas não soma nota).
- Tese: a introdução deve terminar anunciando os eixos do texto. Contextualização sem tese é falha.
- Parágrafos por comando: cada comando em seu próprio parágrafo, na ordem pedida.
- Conclusão: deve haver fecho claro. Se o último comando e a conclusão dividirem o parágrafo final, com o comando desenvolvido e frases claras de fechamento, desconte exatamente 0,5 por não haver conclusão separada e não aponte desequilíbrio nesse parágrafo. Se o último comando for só uma menção na conclusão, a nota dele é "superficial" ou "nao".
- Equilíbrio: os desenvolvimentos devem ser os parágrafos mais longos. Conclusão muito maior que eles indica argumentação rasa.
- Conectivos: devem ter o sentido certo ("Dessa forma" indica consequência, não adição). Sequências abertas devem ser fechadas ("Em primeiro lugar" pede "Além disso" ou "Em segundo lugar").
- Coesão sem redundância: retomar com pronomes, sinônimos, termos gerais ou elipse. Repetir a mesma ideia com outras palavras, ou o mesmo termo na mesma frase, é falha.

ERROS (NE): liste em "erros" CADA ocorrência, inclusive repetições do mesmo tipo, com a linha exatamente como numerada e o trecho copiado do texto. Só erro que a norma-padrão justifique; preferência de estilo não é erro. Comece "explicacao" pelo nome do erro (Crase, Vírgula, Concordância nominal, Concordância verbal, Tempo ou modo verbal, Regência, Paralelismo, Maiúscula, Grafia, Acentuação, Colocação pronominal, Propriedade vocabular). Contam como erro, por exemplo:
- crase antes de pronome demonstrativo: "quanto à esse direito" → "quanto a esse direito";
- crase antes de plural sem artigo: "levou à construções" → "levou a construções";
- vírgula entre sujeito e verbo, inclusive sujeito posposto ou oracional: "Soma-se a isso, a poluição" → "Soma-se a isso a poluição";
- orações independentes unidas só por vírgula antes de conectivo adversativo: "direito social, no entanto, parte..." → "direito social; no entanto, parte...";
- concordância nominal: "residências... sujeitos" → "residências... sujeitas";
- concordância verbal: "A Prefeitura dos Municípios devem" → "As prefeituras devem";
- tempo ou modo verbal inadequado: "deixaram de ser" com sentido futuro → "deixarão de ser";
- regência: "um problema a população" → "um problema para a população";
- quebra de paralelismo: "para melhorar... e na fiscalização" → "para melhorar... e fiscalizar";
- maiúscula ou minúscula indevida: "Leptospirose" → "leptospirose";
- grafia: "Geverno" → "Governo"; acentuação e hífen; colocação pronominal; propriedade vocabular (palavra com sentido inadequado).
Não contam: falhas de coesão ou de conectivo (vão para a estrutura) e erros de conteúdo (vão para o comando).

RISCOS: liste em "riscos", e não em "erros", o que os corretores divergem: "através de" no sentido de "por meio de"; paralelismo em enumerações ("de visitas, palestras e pela mídia"); palavra que retoma algo não mencionado antes ("dessa tragédia"); nome de órgão grafado ora com maiúscula, ora com minúscula.

REPERTÓRIO
Avalie se autores, leis e fatos citados estão corretos e amarrados ao comando. Aponte dados ou números que pareçam inventados, citações literais duvidosas e atribuições erradas (por exemplo, o "homem cordial" de Sérgio Buarque de Holanda não significa povo gentil). A citação coringa do candidato é Darcy Ribeiro, O Povo Brasileiro (desigualdade estrutural da formação do Brasil): diga se foi bem usada, quando aparecer.

SAÍDA
Responda só no formato JSON pedido, com justificativas curtas. Em "reescritas", traga até 3 prioridades, das mudanças que mais aumentariam a nota: "mudanca" diz o que fazer, "original" copia o trecho do candidato e "sugestao" traz a reescrita.

TEMA: ${p.tema}
COMANDOS:
${p.comandos.map((c, i) => `${i + 1}. ${c}`).join('\n')}
${p.motivadores?.length ? `\nTEXTOS MOTIVADORES:\n${p.motivadores.map((m, i) => `Texto ${i + 1}: ${m}`).join('\n')}\n` : ''}
TEXTO DO CANDIDATO (${p.linhas.length} linhas, numeradas):
${p.linhas.map((l, i) => `${String(i + 1).padStart(2, '0')}| ${l}`).join('\n')}`
}

const ESQUEMA = {
  type: 'OBJECT',
  properties: {
    fugaAoTema: { type: 'BOOLEAN' },
    estrutura: {
      type: 'OBJECT',
      properties: {
        comentario: { type: 'STRING' },
        falhas: { type: 'ARRAY', items: { type: 'OBJECT', properties: { falha: { type: 'STRING' }, desconto: { type: 'NUMBER' } }, required: ['falha', 'desconto'] } },
      },
      required: ['comentario', 'falhas'],
    },
    comandos: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          comando: { type: 'STRING' }, partes: { type: 'ARRAY', items: { type: 'STRING' } },
          atendido: { type: 'STRING', enum: ['sim', 'parcial', 'superficial', 'nao'] },
          nota: { type: 'NUMBER' }, comentario: { type: 'STRING' }, faltou: { type: 'STRING' }, erroConteudo: { type: 'STRING' },
        },
        required: ['comando', 'partes', 'atendido', 'nota', 'comentario', 'faltou', 'erroConteudo'],
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
    riscos: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: { linha: { type: 'INTEGER' }, trecho: { type: 'STRING' }, correcao: { type: 'STRING' }, motivo: { type: 'STRING' } },
        required: ['linha', 'trecho', 'correcao', 'motivo'],
      },
    },
    repertorio: { type: 'STRING' },
    pontosFortes: { type: 'ARRAY', items: { type: 'STRING' } },
    reescritas: { type: 'ARRAY', items: { type: 'OBJECT', properties: { mudanca: { type: 'STRING' }, original: { type: 'STRING' }, sugestao: { type: 'STRING' } }, required: ['mudanca', 'original', 'sugestao'] } },
  },
  required: ['fugaAoTema', 'estrutura', 'comandos', 'erros', 'riscos', 'repertorio', 'pontosFortes', 'reescritas'],
}

const limitar = (n: unknown, max: number) => Math.max(0, Math.min(max, Math.round((Number(n) || 0) * 100) / 100))

// Normaliza a resposta: um item por comando, nota dentro da faixa do nível, estrutura e NC calculados aqui (não pelo modelo).
export function normalizar(bruto: Record<string, unknown>, p: Pedido, modelo: string): Avaliacao {
  const porComando = (NC_MAX - MAX_ESTRUTURA) / p.comandos.length
  const b = bruto as unknown as Partial<Avaliacao>
  const linhaValida = (n: unknown) => Math.max(1, Math.min(p.linhas.length, Math.round(Number(n) || 1)))
  const comandos = p.comandos.map((c, i) => {
    const r: Partial<Avaliacao['comandos'][number]> = (b.comandos ?? [])[i] ?? { atendido: 'nao', nota: 0, comentario: 'Comando não avaliado.' }
    const atendido: Nivel = r.atendido && r.atendido in FAIXAS ? r.atendido : 'nao'
    const [min, max] = FAIXAS[atendido]
    const nota = pontos(Math.min(max * porComando, Math.max(min * porComando, Number(r.nota) || 0)))
    return {
      comando: c, partes: (r.partes ?? []).map(String), atendido, nota, maximo: pontos(porComando), comentario: String(r.comentario ?? ''),
      faltou: String(r.faltou ?? ''), erroConteudo: String(r.erroConteudo ?? ''),
    }
  })
  const falhas = (b.estrutura?.falhas ?? []).filter((f) => f && f.falha).map((f) => ({ falha: String(f.falha), desconto: Math.max(0.5, Math.min(1, Number(f.desconto) || 0.5)) }))
  const estrutura = { nota: limitar(MAX_ESTRUTURA - falhas.reduce((s, f) => s + f.desconto, 0), MAX_ESTRUTURA), maximo: MAX_ESTRUTURA, comentario: String(b.estrutura?.comentario ?? ''), falhas }
  const fuga = !!b.fugaAoTema
  const erros = (b.erros ?? []).filter((e) => e && e.trecho).map((e) => ({
    linha: linhaValida(e.linha), trecho: String(e.trecho), correcao: String(e.correcao ?? ''),
    tipo: (['grafia', 'morfossintaxe', 'propriedade vocabular'].includes(e.tipo as string) ? e.tipo : 'morfossintaxe') as Avaliacao['erros'][number]['tipo'],
    explicacao: String(e.explicacao ?? ''),
  }))
  const nc = fuga ? 0 : Math.round((estrutura.nota + comandos.reduce((s, c) => s + c.nota, 0)) * 100) / 100
  return {
    fugaAoTema: fuga, estrutura, comandos, erros, nc, modelo,
    riscos: (b.riscos ?? []).filter((r) => r && r.trecho).map((r) => ({ linha: linhaValida(r.linha), trecho: String(r.trecho), correcao: String(r.correcao ?? ''), motivo: String(r.motivo ?? '') })),
    repertorio: String(b.repertorio ?? ''),
    pontosFortes: (b.pontosFortes ?? []).map(String).slice(0, 5),
    melhorias: [],
    reescritas: (b.reescritas ?? []).filter((r) => r && r.original && r.sugestao).slice(0, 3).map((r) => ({ mudanca: String(r.mudanca ?? ''), original: String(r.original), sugestao: String(r.sugestao) })),
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
    let escritas = 0
    p = {
      tema: String(b.tema ?? '').slice(0, 300),
      comandos: (b.comandos ?? []).map(String).filter(Boolean).slice(0, 6).map((c) => c.slice(0, 400)),
      motivadores: (b.motivadores ?? []).map(String).filter(Boolean).slice(0, 4).map((m) => m.slice(0, 1500)),
      linhas: (b.linhas ?? []).map((l) => String(l).slice(0, 200)).filter((l) => (escritas += l.trim() ? 1 : 0) <= MAX_LINHAS),
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
