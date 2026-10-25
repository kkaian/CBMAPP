import Dexie, { type Table } from 'dexie'
import type { RegistroLeitura, RegistroResposta, RegistroRevisao, RegistroSimulado } from './types'

// Banco local do aparelho. Tudo é gravado aqui primeiro (funciona offline)
// e depois enviado ao Supabase pela sincronização.
class BancoLocal extends Dexie {
  respostas!: Table<RegistroResposta, string>
  revisoes!: Table<RegistroRevisao, string>
  leituras!: Table<RegistroLeitura, string>
  simulados!: Table<RegistroSimulado, string>
  config!: Table<{ chave: string; valor: unknown }, string>

  constructor() {
    super('cbmapp')
    this.version(1).stores({
      respostas: '&id, itemId, topico, materia, criadaEm, sincronizada',
      revisoes: '&itemId, topico, proxima, sincronizada',
      leituras: '&id, topico, sincronizada',
      config: '&chave',
    })
    this.version(2).stores({
      simulados: '&id, status, iniciadoEm, sincronizada',
    })
  }
}

export const db = new BancoLocal()

export async function lerConfig<T>(chave: string, padrao: T): Promise<T> {
  const r = await db.config.get(chave)
  return (r?.valor as T) ?? padrao
}

export async function gravarConfig(chave: string, valor: unknown) {
  await db.config.put({ chave, valor })
}
