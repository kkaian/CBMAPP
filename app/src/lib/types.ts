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

export interface DadosMateria {
  questoes: Questao[]
  grupos: Grupo[]
  conteudos: Record<string, ConteudoTopico>
  temas?: TemaRedacao[]
}

// ---- registros locais (IndexedDB) e no Supabase ----

export type ModoEstudo = 'treino' | 'revisao' | 'relampago'

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
