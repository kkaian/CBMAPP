export type Gabarito = 'C' | 'E'
export type Resposta = Gabarito | 'B' // B = em branco
export type Confianca = 'certeza' | 'duvida' | 'chute'
export type Armadilha = 'numero' | 'absoluto' | 'inversao' | 'competencia' | 'excecao' | 'outro'

export interface Questao {
  id: string
  topico: string
  grupo?: string
  enunciado: string
  gabarito: Gabarito
  comentario: string
  dificuldade: 1 | 2 | 3
  tipo: 'conceito' | 'calculo' | 'situacao' | 'interpretacao'
  armadilha?: Armadilha | null
  origem: string
  status: 'ok' | 'revisar'
}

export interface Grupo {
  id: string
  texto: string
}

export interface ConteudoTopico {
  resumo?: string
  teoria?: string
  manias?: string
}

export interface Topico {
  codigo: string
  nome: string
}

export interface Materia {
  codigo: string
  nome: string
  prova: 'P1' | 'P2' | 'P3'
  itensProva: number
  exatas: boolean
  metaPorTopico: number
  topicos: Topico[]
}

export interface Edital {
  concurso: string
  cargo: string
  banca: string
  dataProva: string
  provas: { codigo: string; nome: string; itens: number; minimo: number }[]
  minimoTotal: number
  materias: Materia[]
}

export interface IndiceConteudo {
  versao: string
  edital: Edital
  resumo: Record<string, { itens: number; revisar: number }>
  temConteudo: Record<string, boolean>
}

export interface TemaRedacao {
  id: number
  eixo: string // tópico RED-xx
  titulo: string
  ganchos: string[]
  comandos: string[]
}

export interface Repertorio {
  id: string
  nome: string
  obra: string
  ano: number
  coringa?: boolean
  quem: string
  contexto: string
  ideia: string
  conceitos: { termo: string; explicacao: string }[]
  encaixa: string[]
  aplicacoes: { tema: string; frase: string }[]
  citacoes: { texto: string; situacao: string; nota: string }[]
  cuidados: string
}

export interface RedacaoModelo {
  id: number
  tema?: number // id em temas.json
  titulo: string
  repertorio: string[]
  paragrafos: { papel: string; texto: string; nota: string }[]
  destaques: string[]
}

export interface DadosMateria {
  questoes: Questao[]
  grupos: Grupo[]
  conteudos: Record<string, ConteudoTopico>
  temas?: TemaRedacao[]
  repertorio?: Repertorio[]
  modelos?: RedacaoModelo[]
}

// ---- registros locais (IndexedDB) e no Supabase ----

export type ModoEstudo = 'treino' | 'revisao' | 'relampago' | 'simulado'

export interface RegistroResposta {
  id: string
  itemId: string
  topico: string
  materia: string
  resposta: Resposta
  correta: 0 | 1 | null // null = em branco
  confianca: Confianca | null
  armadilha: Armadilha | null
  tempoMs: number
  modo: ModoEstudo
  criadaEm: string // ISO
  sincronizada: 0 | 1
}

export interface RegistroRevisao {
  itemId: string
  topico: string
  etapa: number // índice em INTERVALOS
  proxima: string | null // AAAA-MM-DD; null = saiu do caderno
  atualizadaEm: string
  sincronizada: 0 | 1
}

export interface RegistroLeitura {
  id: string
  topico: string
  aba: 'resumo' | 'teoria'
  criadaEm: string
  sincronizada: 0 | 1
}

// ---- simulados ----

export type TipoSimulado = 'drive' | 'completo' | 'mini' | 'fracos'

export interface RespostaSimulado {
  r: Resposta
  c: Confianca | null
}

export interface RegistroSimulado {
  id: string
  tipo: TipoSimulado
  titulo: string
  itens: string[] // ids na ordem da prova
  respostas: Record<string, RespostaSimulado> // só os itens marcados (C, E ou branco)
  tempos: Record<string, number> // tempo acumulado em cada item (ms)
  limiteMs: number
  gastoMs: number // tempo de prova (só conta com a tela aberta)
  atual: number // índice do item em que parou
  status: 'andamento' | 'concluido' | 'descartado'
  iniciadoEm: string
  concluidoEm: string | null
  resumo?: { nota: number; itens: number; passou: boolean } // gravado ao entregar, para o histórico
  atualizadaEm: string
  sincronizada: 0 | 1
}

// ---- redações escritas pelo usuário ----

export type TipoErro = 'grafia' | 'morfossintaxe' | 'propriedade vocabular'

export interface AvaliacaoIA {
  fugaAoTema: boolean
  estrutura: { nota: number; maximo: number; comentario: string }
  comandos: { comando: string; atendido: 'sim' | 'parcial' | 'nao'; nota: number; maximo: number; comentario: string }[]
  erros: { linha: number; trecho: string; correcao: string; tipo: TipoErro; explicacao: string }[]
  repertorio: string
  pontosFortes: string[]
  melhorias: string[]
  reescritas: { original: string; sugestao: string }[]
  nc: number
  modelo: string
}

export interface RegistroRedacao {
  id: string
  temaId: number | null // id em temas.json; null = tema próprio
  tema: string
  comandos: string[]
  texto: string // uma linha da folha por linha
  origem: 'rascunho' | 'ia' | 'manual'
  avaliacao: AvaliacaoIA | null
  errosRecusados: number[] // índices de avaliacao.erros que o usuário não considerou erro
  nc: number | null
  ne: number | null
  npd: number | null
  criadaEm: string
  atualizadaEm: string
  excluida?: boolean
  sincronizada: 0 | 1
}
