import { db } from './db'
import { diaLocal, somarDias } from './datas'
import { materiaDoTopico } from './conteudo'
import { INTERVALOS } from './stats'
import { agendarSincronizacao } from './sync'
import type { Confianca, ModoEstudo, Questao, RegistroResposta, Resposta } from './types'

export { INTERVALOS }

export async function registrarResposta(
  q: Questao,
  resposta: Resposta,
  confianca: Confianca | null,
  tempoMs: number,
  modo: ModoEstudo,
): Promise<RegistroResposta> {
  const correta = resposta === 'B' ? null : resposta === q.gabarito ? 1 : 0
  const reg: RegistroResposta = {
    id: crypto.randomUUID(),
    itemId: q.id,
    topico: q.topico,
    materia: materiaDoTopico(q.topico),
    resposta,
    correta,
    confianca: resposta === 'B' ? null : confianca,
    armadilha: q.armadilha ?? null,
    tempoMs,
    modo,
    criadaEm: new Date().toISOString(),
    sincronizada: 0,
  }
  await db.transaction('rw', db.respostas, db.revisoes, async () => {
    await db.respostas.add(reg)
    await atualizarRevisao(q, reg)
  })
  agendarSincronizacao()
  return reg
}

// Regras do caderno de erros:
// - errou, deixou em branco ou acertou no chute → entra (ou volta) para a etapa 0 (revisar amanhã)
// - acertou com certeza um item do caderno → avança uma etapa; depois da última, sai do caderno
// - acertou com dúvida um item do caderno → repete o mesmo intervalo
// - vale em qualquer modo (refazer o tópico conta como revisita), menos no mesmo dia em que o item mudou
async function atualizarRevisao(q: Questao, reg: RegistroResposta) {
  const hoje = diaLocal()
  const atual = await db.revisoes.get(q.id)
  const agora = new Date().toISOString()
  const precisaRever = reg.correta !== 1 || reg.confianca === 'chute'

  if (precisaRever) {
    await db.revisoes.put({ itemId: q.id, topico: q.topico, etapa: 0, proxima: somarDias(hoje, INTERVALOS[0]), atualizadaEm: agora, sincronizada: 0 })
    return
  }
  if (!atual || atual.proxima === null) return
  if (diaLocal(new Date(atual.atualizadaEm)) === hoje) return

  if (reg.confianca === 'certeza') {
    const etapa = atual.etapa + 1
    const proxima = etapa >= INTERVALOS.length ? null : somarDias(hoje, INTERVALOS[etapa])
    await db.revisoes.put({ ...atual, etapa, proxima, atualizadaEm: agora, sincronizada: 0 })
  } else {
    await db.revisoes.put({ ...atual, proxima: somarDias(hoje, INTERVALOS[Math.min(atual.etapa, INTERVALOS.length - 1)]), atualizadaEm: agora, sincronizada: 0 })
  }
}

export async function registrarLeitura(topico: string, aba: 'resumo' | 'teoria') {
  await db.leituras.add({ id: crypto.randomUUID(), topico, aba, criadaEm: new Date().toISOString(), sincronizada: 0 })
  agendarSincronizacao()
}
