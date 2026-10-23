import { useNavigate } from 'react-router-dom'
import { Barra, Card, Carregando, Pill, Secao, pct } from '../components/ui'
import { useIndice } from '../lib/conteudo'
import { STATUS_INFO, diagnosticoPorMateria, diagnosticoPorTopico, type Status } from '../lib/stats'
import { useRespostas } from '../lib/useDados'

const COR_MAPA: Record<Status, string> = {
  dominado: '#3fb970', bom: '#f2c94c', construcao: '#f2994a', critico: '#e5484d', semdados: '#2a2e37',
}

export default function Estudar() {
  const { dados: ind } = useIndice()
  const respostas = useRespostas()
  const nav = useNavigate()
  if (!ind || !respostas) return <Carregando />

  const diagT = diagnosticoPorTopico(respostas)
  const diagM = diagnosticoPorMateria(respostas)
  const todos = ind.edital.materias.flatMap((m) => m.topicos.map((t) => ({ ...t, materia: m.codigo })))
  const contagem = { dominado: 0, bom: 0, construcao: 0, critico: 0, semdados: 0 } as Record<Status, number>
  for (const t of todos) contagem[diagT[t.codigo]?.status ?? 'semdados']++

  const grupo = (prova: 'P1' | 'P2' | 'P3') => ind.edital.materias.filter((m) => m.prova === prova)

  return (
    <>
      <h2 className="text-[22px] font-bold mb-1">Estudar</h2>
      <Secao>Mapa do edital · {todos.length} tópicos</Secao>
      <Card>
        <div className="space-y-1.5">
          {ind.edital.materias.map((m) => (
            <div key={m.codigo} className="flex items-center gap-2">
              <span className="text-[11px] text-suave w-8 shrink-0">{m.codigo}</span>
              <div className="flex flex-wrap gap-[3px]">
                {m.topicos.map((t) => {
                  const st = diagT[t.codigo]?.status ?? 'semdados'
                  return (
                    <button key={t.codigo} title={`${t.codigo} ${t.nome} · ${STATUS_INFO[st].rotulo}`} onClick={() => nav(`/t/${t.codigo}`)}
                      className="w-[18px] h-[18px] rounded-[4px]" style={{ background: COR_MAPA[st] }} />
                  )
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 text-[13px] text-suave mt-3">
          <span>🟢 {contagem.dominado}</span><span>🟡 {contagem.bom}</span><span>🟠 {contagem.construcao}</span><span>🔴 {contagem.critico}</span><span>⚪ {contagem.semdados} sem dados</span>
        </div>
      </Card>

      {(['P2', 'P1'] as const).map((p) => (
        <div key={p}>
          <Secao>{p === 'P2' ? 'P2 · Específicos (70 itens)' : 'P1 · Básicos (50 itens)'}</Secao>
          {grupo(p).map((m) => {
            const d = diagM[m.codigo]
            const st = d?.status ?? 'semdados'
            const itens = m.topicos.reduce((s, t) => s + (ind.resumo[t.codigo]?.itens ?? 0), 0)
            return (
              <Card key={m.codigo} onClick={() => nav(`/m/${m.codigo}`)}>
                <div className="flex justify-between items-center">
                  <b>{m.nome}{m.exatas ? ' ⭐' : ''}</b>
                  <Pill cor={STATUS_INFO[st].cor}>{st === 'semdados' ? 'sem dados' : pct(d?.acerto)}</Pill>
                </div>
                <div className="text-suave text-[13px] mt-1 mb-2">{m.topicos.length} tópicos · {itens} itens no banco · ~{m.itensProva} na prova</div>
                <Barra valor={d?.acerto ?? 0} cor={STATUS_INFO[st].cor} />
              </Card>
            )
          })}
        </div>
      ))}

      <Secao>P3 · Discursiva (30 pontos)</Secao>
      <Card onClick={() => nav('/redacao')}>
        <div className="flex justify-between items-center">
          <b>Redação</b>
          <span className="text-suave text-sm">›</span>
        </div>
        <div className="text-suave text-[13px] mt-1">9 tópicos de estudo · 30 temas · calculadora da nota</div>
      </Card>
    </>
  )
}
