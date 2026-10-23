import { useNavigate, useParams } from 'react-router-dom'
import { Botao, Cabecalho, Card, Carregando, StatusPill } from '../components/ui'
import { useIndice } from '../lib/conteudo'
import { diagnosticoPorTopico } from '../lib/stats'
import { useRespostas } from '../lib/useDados'

export default function Materia() {
  const { cod = '' } = useParams()
  const { dados: ind } = useIndice()
  const respostas = useRespostas()
  const nav = useNavigate()
  if (!ind || !respostas) return <Carregando />
  const m = ind.edital.materias.find((x) => x.codigo === cod)
  if (!m) return <Carregando texto="Matéria não encontrada." />

  const diag = diagnosticoPorTopico(respostas.filter((r) => r.materia === cod))
  const itensMateria = m.topicos.reduce((s, t) => s + (ind.resumo[t.codigo]?.itens ?? 0), 0)

  return (
    <>
      <Cabecalho titulo={m.nome} sub={`${m.prova} · ~${m.itensProva} itens na prova`} />
      {itensMateria > 0 && <Botao className="mb-4" to={`/quiz?modo=materia&m=${cod}&n=15`}>Treinar {m.nome} · 15 itens misturados</Botao>}
      {m.topicos.map((t) => {
        const d = diag[t.codigo]
        const itens = ind.resumo[t.codigo]?.itens ?? 0
        return (
          <Card key={t.codigo} onClick={() => nav(`/t/${t.codigo}`)}>
            <div className="text-suave text-xs">{t.codigo}</div>
            <div className="font-semibold leading-snug mb-1.5">{t.nome}</div>
            <div className="flex flex-wrap gap-1.5 items-center">
              <StatusPill status={d?.status ?? 'semdados'} acerto={d?.acerto} />
              <span className="text-suave text-xs">{itens} itens · {d?.respondidas ?? 0} respostas{ind.temConteudo[t.codigo] ? ' · 📖 resumo' : ''}</span>
            </div>
          </Card>
        )
      })}
    </>
  )
}
