import { Botao, Cabecalho, Card, Carregando, Secao } from '../components/ui'
import { useIndice } from '../lib/conteudo'
import { diaLocal } from '../lib/datas'
import { INTERVALOS } from '../lib/estudo'
import { agruparPor, noCaderno, revisoesPendentes } from '../lib/stats'
import { useRevisoes } from '../lib/useDados'

export default function Erros() {
  const { dados: ind } = useIndice()
  const revisoes = useRevisoes()
  if (!ind || !revisoes) return <Carregando />
  const pendentes = revisoesPendentes(revisoes)
  const caderno = noCaderno(revisoes)
  const porMateria = agruparPor(caderno, (r) => r.topico.split('-')[0])
  const nome = Object.fromEntries(ind.edital.materias.map((m) => [m.codigo, m.nome]))
  const amanha = caderno.filter((r) => r.proxima! > diaLocal()).length

  return (
    <>
      <Cabecalho titulo="Caderno de erros" />
      <div className="grid grid-cols-2 gap-2 mb-2.5">
        <Card className="!mb-0"><div className="text-[28px] font-bold">{pendentes.length}</div><div className="text-suave text-sm">vencem hoje</div></Card>
        <Card className="!mb-0"><div className="text-[28px] font-bold">{caderno.length}</div><div className="text-suave text-sm">no caderno</div></Card>
      </div>
      <Card className="text-sm">
        Errou, deixou em branco ou acertou no chute → o item entra aqui. Ele volta em <b>{INTERVALOS.join(', ')} dias</b>.
        Acertou com certeza → avança. Errou de novo → volta ao começo. Acertar o item ao refazer um tópico também conta como revisita.
      </Card>
      <Botao to="/quiz?modo=revisao&n=30" disabled={!pendentes.length}>
        {pendentes.length ? `Revisar os ${pendentes.length} de hoje` : 'Nada para revisar hoje'}
      </Botao>
      {amanha > 0 && <div className="text-suave text-xs text-center mt-2">{amanha} itens agendados para os próximos dias.</div>}

      {caderno.length > 0 && (
        <>
          <Secao>Por matéria</Secao>
          <Card className="text-sm">
            {Object.entries(porMateria).sort((a, b) => b[1].length - a[1].length).map(([m, rs]) => (
              <div key={m} className="flex justify-between py-0.5"><span>{nome[m]}</span><b>{rs.length}</b></div>
            ))}
          </Card>
        </>
      )}
    </>
  )
}
