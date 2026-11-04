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
  const porFase = INTERVALOS.map((_, e) => caderno.filter((r) => r.etapa === e))

  return (
    <>
      <Cabecalho titulo="Caderno de erros" />
      <div className="grid grid-cols-2 gap-2 mb-2.5">
        <Card className="!mb-0"><div className="text-[28px] font-bold">{pendentes.length}</div><div className="text-suave text-sm">vencem hoje</div></Card>
        <Card className="!mb-0"><div className="text-[28px] font-bold">{caderno.length}</div><div className="text-suave text-sm">no caderno</div></Card>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-2.5">
        {porFase.map((rs, e) => (
          <Card key={e} className="!mb-0 text-center">
            <div className="text-suave text-[12px]">Fase {e + 1}</div>
            <div className="text-[24px] font-bold">{rs.length}</div>
            <div className="text-suave text-[11px]">volta em {INTERVALOS[e]} {INTERVALOS[e] === 1 ? 'dia' : 'dias'}{rs.length ? ` · ${rs.filter((r) => r.proxima! <= diaLocal()).length} hoje` : ''}</div>
          </Card>
        ))}
      </div>
      <Card className="text-sm">
        Errou, deixou em branco ou acertou no chute → o item entra na fase 1. As fases voltam em <b>{INTERVALOS.join(', ')} dias</b>.
        <ul className="list-disc pl-5 mt-1.5 space-y-0.5">
          <li>Acertou com certeza → avança uma fase. Depois da última, sai do caderno.</li>
          <li>Acertou com dúvida → avança uma fase e também vai para o caderno de dúvidas.</li>
          <li>Acertou no chute → fica na mesma fase.</li>
          <li>Errou ou deixou em branco → volta para a fase 1.</li>
        </ul>
        <div className="text-suave text-[12px] mt-1.5">O acerto vale XP conforme a fase: 1/3, 2/3 e cheio na fase {INTERVALOS.length}. Repetir a mesma fase não aumenta o valor. Acertar o item ao refazer um tópico também conta como revisita.</div>
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
