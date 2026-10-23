import { useNavigate } from 'react-router-dom'
import { Card, Carregando, Secao } from '../components/ui'
import { useIndice } from '../lib/conteudo'
import { revisoesPendentes } from '../lib/stats'
import { useRevisoes } from '../lib/useDados'

export default function Questoes() {
  const { dados: ind } = useIndice()
  const revisoes = useRevisoes()
  const nav = useNavigate()
  if (!ind || !revisoes) return <Carregando />
  const pendentes = revisoesPendentes(revisoes).length
  const total = Object.values(ind.resumo).reduce((s, r) => s + r.itens, 0)

  return (
    <>
      <h2 className="text-[22px] font-bold">Questões</h2>
      <div className="text-suave text-sm mb-3">{total.toLocaleString('pt-BR')} itens no banco</div>

      <Opcao icone="⚡" titulo="Relâmpago" sub="5 itens rápidos, puxando dos seus pontos fracos" onClick={() => nav('/quiz?modo=relampago&n=5')} />
      <Opcao icone="📕" titulo="Revisão do caderno de erros" sub={pendentes ? `${pendentes} itens vencem hoje` : 'nada pendente hoje'} onClick={() => nav('/quiz?modo=revisao&n=30')} />
      <Opcao icone="📝" titulo="Simulados" sub="em breve" onClick={() => nav('/em-breve?o=Simulados')} />
      <Opcao icone="✍️" titulo="Redação" sub="estudo, temas e calculadora da nota" onClick={() => nav('/redacao')} />

      <Secao>Por matéria</Secao>
      {ind.edital.materias.map((m) => {
        const itens = m.topicos.reduce((s, t) => s + (ind.resumo[t.codigo]?.itens ?? 0), 0)
        return (
          <Card key={m.codigo} onClick={() => nav(`/m/${m.codigo}`)} className="flex justify-between items-center">
            <span><b>{m.nome}</b>{m.exatas ? ' ⭐' : ''}</span>
            <span className="text-suave text-sm">{itens} itens ›</span>
          </Card>
        )
      })}
    </>
  )
}

function Opcao({ icone, titulo, sub, onClick }: { icone: string; titulo: string; sub: string; onClick: () => void }) {
  return (
    <Card onClick={onClick} className="flex items-center gap-3">
      <span className="text-2xl">{icone}</span>
      <div className="flex-1"><b>{titulo}</b><div className="text-suave text-[13px]">{sub}</div></div>
      <span className="text-suave">›</span>
    </Card>
  )
}
