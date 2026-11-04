import { db } from './db'
import { diaLocal, somarDias } from './datas'
import { materiaDoTopico } from './conteudo'
import { INTERVALOS, estaNoCaderno } from './stats'
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

// Regras do caderno de erros (as fases são os INTERVALOS: 1, 3 e 7 dias):
// - errou ou deixou em branco → entra (ou volta) para a fase 1 (revisar amanhã)
// - fora do caderno, acertou no chute → entra na fase 1
// - no caderno, acertou com certeza ou com dúvida → avança uma fase; depois da última, sai do caderno
//   (o acerto com dúvida também aparece no caderno de dúvidas, que é montado a partir das respostas)
// - no caderno, acertou no chute → repete a mesma fase
// - vale em qualquer modo (refazer o tópico conta como revisita), menos no mesmo dia em que o item mudou
// (espelhado em proximoEstado, em stats.ts, que recalcula o XP a partir do histórico)
async function atualizarRevisao(q: Questao, reg: RegistroResposta) {
  const hoje = diaLocal()
  const atual = await db.revisoes.get(q.id)
  const agora = new Date().toISOString()
  const novo = { itemId: q.id, topico: q.topico, etapa: 0, proxima: somarDias(hoje, INTERVALOS[0]), atualizadaEm: agora, sincronizada: 0 as const }

  if (reg.correta !== 1) { await db.revisoes.put(novo); return }
  if (!atual || !estaNoCaderno(atual)) {
    if (reg.confianca === 'chute') await db.revisoes.put(novo)
    return
  }
  if (diaLocal(new Date(atual.atualizadaEm)) === hoje) return

  const etapa = reg.confianca === 'chute' ? atual.etapa : atual.etapa + 1
  const proxima = etapa >= INTERVALOS.length ? null : somarDias(hoje, INTERVALOS[etapa])
  await db.revisoes.put({ ...atual, etapa, proxima, atualizadaEm: agora, sincronizada: 0 })
}

export async function registrarLeitura(topico: string, aba: 'resumo' | 'teoria') {
  await db.leituras.add({ id: crypto.randomUUID(), topico, aba, criadaEm: new Date().toISOString(), sincronizada: 0 })
  agendarSincronizacao()
}
