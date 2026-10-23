import { useLiveQuery } from 'dexie-react-hooks'
import { db, lerConfig } from './db'

// Dados de progresso do aparelho, atualizados automaticamente quando mudam.
export function useRespostas() {
  return useLiveQuery(() => db.respostas.orderBy('criadaEm').toArray(), [])
}

export function useRevisoes() {
  return useLiveQuery(() => db.revisoes.toArray(), [])
}

export function useLeituras() {
  return useLiveQuery(() => db.leituras.toArray(), [])
}

export const META_PADRAO = 40

export function useMetaDiaria() {
  return useLiveQuery(() => lerConfig<number>('metaDiaria', META_PADRAO), []) ?? META_PADRAO
}
