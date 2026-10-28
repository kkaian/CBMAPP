import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Rico } from '../components/Rico'
import { EscolherQuantidade, useQuantidade } from '../components/Quantidade'
import { Botao, Cabecalho, Card, Carregando, Pill, StatusPill } from '../components/ui'
import { acharTopico, carregarMateria, materiaDoTopico, useAsync, useIndice } from '../lib/conteudo'
import { diaLocal } from '../lib/datas'
import { registrarLeitura } from '../lib/estudo'
import { ACERTOS_PARA_LEITURA, STATUS_INFO, diagnosticar, situacaoLeitura } from '../lib/stats'
import { useLeituras, useRespostas } from '../lib/useDados'

type Aba = 'resumo' | 'teoria' | 'manias' | 'questoes'

export default function Topico() {
  const { cod = '' } = useParams()
  const { dados: ind } = useIndice()
  const { dados: mat } = useAsync(() => carregarMateria(materiaDoTopico(cod)), [cod])
  const respostas = useRespostas()
  const leituras = useLeituras()
  const [aba, setAba] = useState<Aba | null>(null)
  const [qtd, setQtd] = useQuantidade()

  if (!ind || !mat || !respostas || !leituras) return <Carregando />
  const info = acharTopico(ind, cod)
  if (!info) return <Carregando texto="Tópico não encontrado." />

  const conteudo = mat.conteudos[cod] ?? {}
  const itens = mat.questoes.filter((q) => q.topico === cod)
  const diag = diagnosticar(respostas.filter((r) => r.topico === cod))
  const lidoHoje = leituras.some((l) => l.topico === cod && diaLocal(new Date(l.criadaEm)) === diaLocal())
  const ultimaLeitura = leituras.filter((l) => l.topico === cod).map((l) => l.criadaEm).sort().pop()
  const sitLeitura = situacaoLeitura(cod, leituras, respostas)
  const abaAtual: Aba = aba ?? (conteudo.resumo ? 'resumo' : 'questoes')

  const abas: { id: Aba; rotulo: string; tem: boolean }[] = [
    { id: 'resumo', rotulo: 'Resumo', tem: !!conteudo.resumo },
    { id: 'teoria', rotulo: 'Teoria', tem: !!conteudo.teoria },
    { id: 'manias', rotulo: 'Manias da banca', tem: !!conteudo.manias },
    { id: 'questoes', rotulo: `Questões (${itens.length})`, tem: true },
  ]

  return (
    <>
      <Cabecalho titulo={info.nome} sub={`${info.materia.nome} › ${cod}`} />
      <div className="flex flex-wrap gap-1.5 mb-3">
        <StatusPill status={diag.status} acerto={diag.acerto} />
        <Pill>{diag.respondidas} respostas</Pill>
        <Pill>{itens.length} itens no banco</Pill>
      </div>
      <div className="border-l-[3px] border-amarelo bg-[#2a2716] rounded-md px-2.5 py-2 text-[13px] mb-3">
        {STATUS_INFO[diag.status].recomendacao}
        {diag.status === 'critico' && (
          <> <a className="text-azul" target="_blank" rel="noreferrer" href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`${info.nome} aula concurso`)}`}>Buscar videoaula ›</a></>
        )}
      </div>

      <div className="flex gap-1.5 overflow-x-auto mb-3 -mx-4 px-4">
        {abas.map((a) => (
          <button key={a.id} onClick={() => setAba(a.id)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-[13px] border ${abaAtual === a.id ? 'bg-texto text-[#111] border-texto' : 'border-linha text-suave'} ${a.tem ? '' : 'opacity-40'}`}>
            {a.rotulo}
          </button>
        ))}
      </div>

      {abaAtual !== 'questoes' && (
        <>
          <Card>
            {conteudo[abaAtual]
              ? <Rico texto={conteudo[abaAtual]!} />
              : <div className="text-suave text-sm">Conteúdo deste tópico ainda não foi produzido. Ele entra conforme a produção avança (exatas primeiro).</div>}
          </Card>
          {(abaAtual === 'resumo' || abaAtual === 'teoria') && conteudo[abaAtual] && (
            <Botao variante="secundario" disabled={lidoHoje} onClick={() => registrarLeitura(cod, abaAtual)}>
              {lidoHoje ? '✔ Lido hoje' : 'Marcar como lido'}
            </Botao>
          )}
          {ultimaLeitura && <div className="text-suave text-xs text-center mt-2">Última leitura: {new Date(ultimaLeitura).toLocaleDateString('pt-BR')}</div>}
          {sitLeitura && (
            <div className={`text-xs text-center mt-1 ${sitLeitura.valida ? 'text-verde' : 'text-suave'}`}>
              {sitLeitura.valida
                ? '✔ Leitura confirmada: valeu XP'
                : `Leitura pendente: ${sitLeitura.acertos}/${ACERTOS_PARA_LEITURA} acertos neste tópico para contar como lida`}
            </div>
          )}
        </>
      )}

      {abaAtual === 'questoes' && (
        itens.length ? (
          <div className="space-y-2">
            <EscolherQuantidade max={itens.length} valor={Math.min(qtd, itens.length)} onChange={setQtd} />
            <Botao to={`/quiz?modo=topico&t=${cod}&n=${Math.min(qtd, itens.length)}`}>Responder {Math.min(qtd, itens.length)} {Math.min(qtd, itens.length) === 1 ? 'item' : 'itens'}</Botao>
            <div className="text-suave text-xs text-center pt-1">Primeiro os nunca respondidos, depois os que você errou.</div>
          </div>
        ) : (
          <Card className="text-suave text-sm">Ainda não há itens neste tópico.</Card>
        )
      )}
    </>
  )
}
