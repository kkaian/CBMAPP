import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Rico } from '../components/Rico'
import { Botao, Card, Carregando, Pill, Secao } from '../components/ui'
import { acharTopico, materiaDoTopico, useIndice } from '../lib/conteudo'
import { calcularNota, formatarDuracao, valeChutar, type Placar } from '../lib/simulado'
import type { Grupo, Questao, RegistroSimulado } from '../lib/types'
import { useRespostas } from '../lib/useDados'

type Filtro = 'errados' | 'brancos' | 'todos'

export default function ResultadoSimulado({ sim, questoes, grupos }: { sim: RegistroSimulado; questoes: Questao[]; grupos: Record<string, Grupo> }) {
  const { dados: ind } = useIndice()
  const respostas = useRespostas()
  const nav = useNavigate()
  const [filtro, setFiltro] = useState<Filtro | null>(null)
  if (!ind || !respostas) return <Carregando />

  const nota = calcularNota(sim, questoes, ind.edital)
  // chutes de fora deste simulado (as respostas dele foram gravadas na entrega)
  const chute = valeChutar(respostas.filter((r) => !(r.modo === 'simulado' && sim.concluidoEm && r.criadaEm >= sim.concluidoEm)))
  const respondidos = nota.total.certos + nota.total.errados
  const mediaItem = sim.itens.length ? sim.gastoMs / sim.itens.length : 0

  // onde perdi mais pontos: tópicos com mais erros
  const errosPorTopico = new Map<string, number>()
  for (const q of questoes) {
    const r = sim.respostas[q.id]?.r
    if (r && r !== 'B' && r !== q.gabarito) errosPorTopico.set(q.topico, (errosPorTopico.get(q.topico) ?? 0) + 1)
  }
  const piores = [...errosPorTopico.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5)

  return (
    <div className="pt-1">
      <button onClick={() => nav('/simulados')} className="text-suave text-sm mb-1 -ml-1 px-1">‹ Simulados</button>
      <div className="text-suave text-sm">{new Date(sim.iniciadoEm).toLocaleDateString('pt-BR')} · {sim.itens.length} itens</div>
      <h2 className="text-[22px] font-bold leading-tight mb-3">{sim.titulo}</h2>

      <Card className={`border ${nota.passou ? 'border-verde/50' : 'border-destaque/50'}`}>
        <div className="flex justify-between items-center">
          <div>
            <div className="text-suave text-xs">Nota objetiva (certos − errados)</div>
            <div className={`text-3xl font-bold ${nota.total.nota >= nota.minimoTotal ? 'text-verde' : 'text-destaque'}`}>{nota.total.nota}</div>
          </div>
          <Pill cor={nota.passou ? 'green' : 'red'}>{nota.passou ? '✔ acima dos mínimos' : '✘ abaixo do mínimo'}</Pill>
        </div>
        <div className="text-suave text-[13px] mt-1">
          Mínimo {nota.proporcional ? 'proporcional ' : ''}do total: {fmt(nota.minimoTotal)}
          {nota.proporcional && ' (regra do edital ajustada ao tamanho deste simulado)'}
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-2 mb-2.5">
        {nota.provas.filter((p) => p.placar.itens > 0).map((p) => (
          <Card key={p.codigo} className="!mb-0">
            <div className="text-suave text-xs">{p.codigo} · {p.placar.itens} itens</div>
            <div className={`text-2xl font-bold ${p.placar.nota >= p.minimo ? 'text-verde' : 'text-destaque'}`}>{p.placar.nota}</div>
            <div className="text-suave text-[12px]">mínimo {fmt(p.minimo)}</div>
          </Card>
        ))}
      </div>
      <div className="text-suave text-[12px] mb-3">Na prova real ainda conta a redação (P3, mínimo 15 de 30).</div>

      <div className="grid grid-cols-3 gap-2 mb-2.5">
        <Card className="!mb-0 text-center"><div className="text-2xl font-bold text-verde">{nota.total.certos}</div><div className="text-suave text-xs">certos</div></Card>
        <Card className="!mb-0 text-center"><div className="text-2xl font-bold text-destaque">{nota.total.errados}</div><div className="text-suave text-xs">errados</div></Card>
        <Card className="!mb-0 text-center"><div className="text-2xl font-bold">{nota.total.brancos}</div><div className="text-suave text-xs">brancos</div></Card>
      </div>

      <Card className="text-sm">
        <Linha rotulo="Tempo de prova" valor={`${formatarDuracao(sim.gastoMs)} de ${formatarDuracao(sim.limiteMs)}`} />
        <Linha rotulo="Média por item" valor={formatarDuracao(mediaItem)} />
        <Linha rotulo="Acerto entre os respondidos" valor={respondidos ? `${Math.round((nota.total.certos / respondidos) * 100)}%` : '—'} />
      </Card>

      {nota.total.brancos > 0 && (
        <Card className="text-sm">
          <div className="font-semibold mb-1">Os brancos foram boa escolha?</div>
          {chute ? (
            chute.acerto > 0.5
              ? <span>Seus chutes acertam <b>{Math.round(chute.acerto * 100)}%</b> ({chute.n} chutes). Acima de 50%, chutar rende em média <b>+{fmt((2 * chute.acerto - 1) * nota.total.brancos)}</b> ponto(s) nesses {nota.total.brancos} brancos: vale arriscar mais.</span>
              : <span>Seus chutes acertam <b>{Math.round(chute.acerto * 100)}%</b> ({chute.n} chutes). Abaixo de 50%, chutar tira ponto: deixar em branco foi a escolha certa.</span>
          ) : <span className="text-suave">Ainda não há chutes suficientes (mínimo 10) para saber. Marque 🎲 quando chutar nos treinos.</span>}
        </Card>
      )}

      <Secao>Por matéria</Secao>
      <Card className="!p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-suave text-xs">
            <tr><th className="text-left p-2.5 font-normal">Matéria</th><th className="font-normal">C</th><th className="font-normal">E</th><th className="font-normal">B</th><th className="font-normal pr-2.5 text-right">Nota</th></tr>
          </thead>
          <tbody>
            {nota.materias.map((m) => (
              <tr key={m.codigo} className="border-t border-linha">
                <td className="p-2.5">{m.nome}<span className="text-suave text-xs"> · {m.placar.itens}</span></td>
                <td className="text-center text-verde">{m.placar.certos}</td>
                <td className="text-center text-destaque">{m.placar.errados}</td>
                <td className="text-center">{m.placar.brancos}</td>
                <td className={`text-right pr-2.5 font-bold ${corNota(m.placar)}`}>{m.placar.nota}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {piores.length > 0 && (
        <>
          <Secao>Onde perdi mais pontos</Secao>
          {piores.map(([t, n]) => (
            <Card key={t} onClick={() => nav(`/t/${t}`)} className="flex justify-between items-center text-sm">
              <span><b>{t}</b> <span className="text-suave">{acharTopico(ind, t)?.nome}</span></span>
              <span className="text-destaque whitespace-nowrap ml-2">−{n} ›</span>
            </Card>
          ))}
        </>
      )}

      <Secao>Revisar itens</Secao>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {(['errados', 'brancos', 'todos'] as Filtro[]).map((f) => (
          <button key={f} onClick={() => setFiltro(filtro === f ? null : f)}
            className={`py-2 rounded-xl border text-[13px] ${filtro === f ? 'border-azul bg-[#1b2740]' : 'border-linha bg-card'}`}>
            {f === 'errados' ? `Errados (${nota.total.errados})` : f === 'brancos' ? `Brancos (${nota.total.brancos})` : 'Todos'}
          </button>
        ))}
      </div>
      {filtro && <Revisao sim={sim} questoes={questoes} grupos={grupos} filtro={filtro} />}

      <div className="text-suave text-[12px] my-3">As respostas entraram no seu diagnóstico, e os erros, brancos e chutes foram para o caderno de erros.</div>
      <Botao onClick={() => nav('/simulados')}>Concluir</Botao>
    </div>
  )
}

function Revisao({ sim, questoes, grupos, filtro }: { sim: RegistroSimulado; questoes: Questao[]; grupos: Record<string, Grupo>; filtro: Filtro }) {
  const lista = questoes
    .map((q, i) => ({ q, i, r: sim.respostas[q.id]?.r ?? 'B' }))
    .filter(({ q, r }) => filtro === 'todos' || (filtro === 'brancos' ? r === 'B' : r !== 'B' && r !== q.gabarito))
  if (!lista.length) return <div className="text-suave text-sm text-center py-4">Nenhum item aqui.</div>
  return (
    <>
      {lista.map(({ q, i, r }) => {
        const certo = r === q.gabarito
        const grupo = q.grupo ? grupos[q.grupo] : null
        return (
          <Card key={q.id} className={`border ${r === 'B' ? 'border-linha' : certo ? 'border-verde/40' : 'border-destaque/40'}`}>
            <div className="flex justify-between text-xs text-suave mb-1">
              <span>Item {i + 1} · {q.topico}</span>
              <span>
                você: <b className={r === 'B' ? '' : certo ? 'text-verde' : 'text-destaque'}>{r === 'B' ? 'branco' : r === 'C' ? 'CERTO' : 'ERRADO'}</b>
                {' · '}gabarito: <b>{q.gabarito === 'C' ? 'CERTO' : 'ERRADO'}</b>
              </span>
            </div>
            {grupo && (
              <details className="text-[13px] text-suave mb-1.5">
                <summary className="cursor-pointer">Texto-base ({materiaDoTopico(q.topico)})</summary>
                <Rico texto={grupo.texto} />
              </details>
            )}
            <Rico texto={q.enunciado} className="text-[15px]" />
            <div className="border-t border-linha mt-2 pt-2 text-[13px]"><Rico texto={q.comentario} /></div>
          </Card>
        )
      })}
    </>
  )
}

function Linha({ rotulo, valor }: { rotulo: string; valor: string }) {
  return <div className="flex justify-between py-0.5"><span className="text-suave">{rotulo}</span><b>{valor}</b></div>
}

function corNota(p: Placar) {
  if (!p.itens) return ''
  const r = p.nota / p.itens
  return r >= 0.5 ? 'text-verde' : r >= 0.2 ? 'text-amarelo' : 'text-destaque'
}

function fmt(n: number) {
  return Number.isInteger(n) ? String(n) : n.toLocaleString('pt-BR', { maximumFractionDigits: 1 })
}
