import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Carregando, Pill, Secao, StatusPill, pct } from '../components/ui'
import { useIndice } from '../lib/conteudo'
import {
  ARMADILHA_ROTULO, MIN_RESPOSTAS, armadilhasMaisErradas, chutesPorMateria, diagnosticoPorTopico,
  excessoConfianca, serieSemanal,
} from '../lib/stats'
import { useRespostas } from '../lib/useDados'

export default function Desempenho() {
  const { dados: ind } = useIndice()
  const respostas = useRespostas()
  const [materia, setMateria] = useState<string>('')
  if (!ind || !respostas) return <Carregando />

  if (respostas.length === 0) {
    return (
      <>
        <h2 className="text-[22px] font-bold mb-3">Desempenho</h2>
        <Card className="text-suave text-sm">Ainda não há respostas. Responda alguns itens e o diagnóstico aparece aqui.</Card>
      </>
    )
  }

  const nomeMateria = Object.fromEntries(ind.edital.materias.map((m) => [m.codigo, m.nome]))
  const julgadas = respostas.filter((r) => r.correta !== null)
  const acertoGeral = julgadas.length ? julgadas.filter((r) => r.correta === 1).length / julgadas.length : null
  const liquida = (respostas.filter((r) => r.correta === 1).length - respostas.filter((r) => r.correta === 0).length) / respostas.length
  const materiasComDados = ind.edital.materias.filter((m) => respostas.some((r) => r.materia === m.codigo))
  const mSel = materia || materiasComDados[0]?.codigo || ''
  const doFiltro = respostas.filter((r) => r.materia === mSel)
  const serie = serieSemanal(mSel ? doFiltro : respostas)
  const diag = diagnosticoPorTopico(doFiltro)
  const chutes = chutesPorMateria(respostas)
  const excesso = excessoConfianca(respostas)
  const armadilhas = armadilhasMaisErradas(respostas).slice(0, 4)
  const topicosMateria = ind.edital.materias.find((m) => m.codigo === mSel)?.topicos ?? []

  return (
    <>
      <h2 className="text-[22px] font-bold mb-3">Desempenho</h2>
      <div className="grid grid-cols-2 gap-2">
        <Card className="!mb-0"><div className="text-suave text-sm">Acerto geral</div><div className="text-[28px] font-bold">{pct(acertoGeral)}</div><div className="text-suave text-xs">{julgadas.length} itens julgados</div></Card>
        <Card className="!mb-0"><div className="text-suave text-sm">Nota líquida</div><div className="text-[28px] font-bold">{liquida >= 0 ? '+' : ''}{liquida.toFixed(2).replace('.', ',')}</div><div className="text-suave text-xs">(certos − errados) ÷ feitos</div></Card>
      </div>

      <div className="flex gap-1.5 overflow-x-auto mt-4 -mx-4 px-4">
        {materiasComDados.map((m) => (
          <button key={m.codigo} onClick={() => setMateria(m.codigo)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-[13px] border ${mSel === m.codigo ? 'bg-texto text-[#111] border-texto' : 'border-linha text-suave'}`}>
            {m.nome}
          </button>
        ))}
      </div>

      <Secao>{nomeMateria[mSel]} · acerto por semana</Secao>
      <Card><Grafico serie={serie} /></Card>

      <Secao>{nomeMateria[mSel]} · tópicos</Secao>
      <Card>
        {topicosMateria.filter((t) => diag[t.codigo]).length === 0 && <div className="text-suave text-sm">Sem respostas nesta matéria.</div>}
        {topicosMateria.filter((t) => diag[t.codigo]).map((t) => (
          <Link key={t.codigo} to={`/t/${t.codigo}`} className="flex justify-between items-center gap-2 py-2 border-b border-linha last:border-b-0">
            <span className="text-[13px] min-w-0"><span className="text-suave">{t.codigo}</span> {t.nome}</span>
            <StatusPill status={diag[t.codigo].status} acerto={diag[t.codigo].acerto} />
          </Link>
        ))}
        <div className="text-suave text-xs mt-2">Status aparece a partir de {MIN_RESPOSTAS} respostas no tópico, pelas 30 mais recentes.</div>
      </Card>

      <Secao>Vale a pena chutar?</Secao>
      <Card className="text-sm">
        {chutes.length === 0 && <div className="text-suave">Marque "chute" quando chutar: aqui aparece onde seus chutes compensam.</div>}
        {chutes.map((c) => (
          <div key={c.materia} className="flex justify-between items-center py-1">
            <span>{nomeMateria[c.materia]}</span>
            <span className="text-right">
              {c.total < 10
                ? <span className="text-suave">{c.total} chutes (mín. 10)</span>
                : <>acertam <b>{pct(c.acerto)}</b> <Pill cor={c.acerto > 0.5 ? 'green' : 'red'}>{c.acerto > 0.5 ? 'arrisque' : 'deixe em branco'}</Pill></>}
            </span>
          </div>
        ))}
        <div className="text-suave text-xs mt-2">No Cebraspe um chute só compensa com mais de 50% de acerto (valor esperado = 2p − 1).</div>
      </Card>

      <Secao>Excesso de confiança · 7 dias</Secao>
      <Card className="text-sm">
        {excesso.length === 0
          ? <span className="text-suave">Nenhum erro marcado como certeza nos últimos 7 dias. 👌</span>
          : <>⚠️ <b>{excesso.length}</b> {excesso.length === 1 ? 'item marcado' : 'itens marcados'} como <b>certeza</b> e errados. Na prova, são os que tiram ponto sem você perceber. Eles já estão no <Link to="/erros" className="text-azul">caderno de erros ›</Link></>}
      </Card>

      {armadilhas.length > 0 && (
        <>
          <Secao>Pegadinhas em que você mais cai</Secao>
          <Card className="text-sm">
            {armadilhas.map((a) => (
              <div key={a.armadilha} className="flex justify-between py-0.5"><span>{ARMADILHA_ROTULO[a.armadilha]}</span><b>{pct(a.pct)}</b></div>
            ))}
          </Card>
        </>
      )}
    </>
  )
}

function Grafico({ serie }: { serie: { semana: string; acerto: number | null; total: number }[] }) {
  const W = 300, H = 120, x0 = 24, y = (v: number) => 100 - v * 85
  const pts = serie.map((s, i) => ({ x: x0 + (i * (W - x0 - 12)) / Math.max(1, serie.length - 1), ...s }))
  const linha = pts.filter((p) => p.acerto !== null).map((p) => `${p.x},${y(p.acerto!)}`).join(' ')
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {[0.5, 0.85].map((v) => (
        <g key={v}>
          <line x1={x0} x2={W} y1={y(v)} y2={y(v)} stroke="#333946" strokeDasharray="3 3" />
          <text x="0" y={y(v) + 3} fill="#9aa1ae" fontSize="9">{v * 100}%</text>
        </g>
      ))}
      <polyline fill="none" stroke="#e5484d" strokeWidth="2.5" points={linha} />
      {pts.map((p) => (
        <g key={p.semana}>
          {p.acerto !== null && <circle cx={p.x} cy={y(p.acerto)} r="3.5" fill="#e5484d" />}
          <text x={p.x} y="114" textAnchor="middle" fill="#9aa1ae" fontSize="8.5">{p.semana.slice(8, 10)}/{p.semana.slice(5, 7)}</text>
        </g>
      ))}
    </svg>
  )
}
