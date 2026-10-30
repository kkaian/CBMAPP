import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Rico } from '../components/Rico'
import { Botao, Card, Carregando, Pill, Secao, StatusPill } from '../components/ui'
import { acharTopico, materiaDoTopico, useIndice } from '../lib/conteudo'
import { calcularNota, diagnosticarSimulado, formatarDuracao, valeChutar, type DiagnosticoSimulado, type NotaSimulado, type Placar, type Seguranca } from '../lib/simulado'
import { STATUS_INFO, diagnosticoPorTopico } from '../lib/stats'
import type { Grupo, Questao, RegistroSimulado } from '../lib/types'
import { useRespostas } from '../lib/useDados'

type Filtro = 'errados' | 'certeza' | 'inseguros' | 'brancos' | 'todos'

export default function ResultadoSimulado({ sim, questoes, grupos }: { sim: RegistroSimulado; questoes: Questao[]; grupos: Record<string, Grupo> }) {
  const { dados: ind } = useIndice()
  const respostas = useRespostas()
  const nav = useNavigate()
  const [filtro, setFiltro] = useState<Filtro | null>(null)
  if (!ind || !respostas) return <Carregando />

  const nota = calcularNota(sim, questoes, ind.edital)
  const diag = diagnosticarSimulado(sim, questoes)
  // chutes de fora deste simulado (as respostas dele foram gravadas na entrega)
  const chute = valeChutar(respostas.filter((r) => !(r.modo === 'simulado' && sim.concluidoEm && r.criadaEm >= sim.concluidoEm)))
  const respondidos = nota.total.certos + nota.total.errados
  const mediaItem = sim.itens.length ? sim.gastoMs / sim.itens.length : 0

  // o que este simulado mandou para o caderno de erros
  const paraCaderno = questoes.filter((q) => {
    const resp = sim.respostas[q.id]
    const r = resp?.r ?? 'B'
    return r === 'B' || r !== q.gabarito || resp?.c === 'chute'
  }).length

  return (
    <div className="pt-1">
      <button onClick={() => nav('/simulados?aba=historico')} className="text-suave text-sm mb-1 -ml-1 px-1">‹ Histórico</button>
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

      <Diagnostico d={diag} nota={nota} paraCaderno={paraCaderno} />

      <Secao>Revisar itens</Secao>
      <div className="grid grid-cols-2 gap-2 mb-3">
        {([
          ['errados', `Errados (${nota.total.errados})`],
          ['certeza', `Erros com certeza (${diag.errosCerteza.length})`],
          ['inseguros', `Acertos inseguros (${diag.inseguros.length})`],
          ['brancos', `Brancos (${nota.total.brancos})`],
          ['todos', `Todos (${sim.itens.length})`],
        ] as [Filtro, string][]).map(([f, rotulo]) => (
          <button key={f} onClick={() => setFiltro(filtro === f ? null : f)}
            className={`py-2 rounded-xl border text-[13px] ${filtro === f ? 'border-azul bg-[#1b2740]' : 'border-linha bg-card'}`}>
            {rotulo}
          </button>
        ))}
      </div>
      {filtro && <Revisao sim={sim} questoes={questoes} grupos={grupos} filtro={filtro} errosCerteza={diag.errosCerteza} inseguros={diag.inseguros} />}

      <div className="text-suave text-[12px] my-3">As respostas entraram no seu diagnóstico, e os erros, brancos e chutes foram para o caderno de erros.</div>
      <Botao onClick={() => nav('/simulados?aba=historico')}>Concluir</Botao>
    </div>
  )
}

function Revisao({ sim, questoes, grupos, filtro, errosCerteza, inseguros }: {
  sim: RegistroSimulado; questoes: Questao[]; grupos: Record<string, Grupo>; filtro: Filtro; errosCerteza: string[]; inseguros: string[]
}) {
  const lista = questoes
    .map((q, i) => ({ q, i, r: sim.respostas[q.id]?.r ?? 'B' }))
    .filter(({ q, r }) => {
      if (filtro === 'todos') return true
      if (filtro === 'brancos') return r === 'B'
      if (filtro === 'certeza') return errosCerteza.includes(q.id)
      if (filtro === 'inseguros') return inseguros.includes(q.id)
      return r !== 'B' && r !== q.gabarito
    })
  if (!lista.length) return <div className="text-suave text-sm text-center py-4">Nenhum item aqui.</div>
  return (
    <>
      {lista.map(({ q, i, r }) => {
        const certo = r === q.gabarito
        const grupo = q.grupo ? grupos[q.grupo] : null
        return (
          <Card key={q.id} className={`border ${r === 'B' ? 'border-linha' : certo ? 'border-verde/40' : 'border-destaque/40'}`}>
            <div className="flex justify-between gap-2 text-xs text-suave mb-1">
              <span>
                Item {i + 1} · {q.topico}
                {sim.respostas[q.id]?.c && <> · {SEGURANCA[sim.respostas[q.id].c!].rotulo}</>}
                {sim.tempos[q.id] > 0 && <> · {formatarDuracao(sim.tempos[q.id])}</>}
              </span>
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

const SEGURANCA: Record<Seguranca, { rotulo: string }> = {
  certeza: { rotulo: '✅ Certeza' },
  duvida: { rotulo: '🤔 Dúvida' },
  chute: { rotulo: '🎲 Chute' },
  sem: { rotulo: 'Sem marcar' },
}

function Diagnostico({ d, nota, paraCaderno }: { d: DiagnosticoSimulado; nota: NotaSimulado; paraCaderno: number }) {
  const { dados: ind } = useIndice()
  const respostas = useRespostas()
  const nav = useNavigate()
  const [materiaAberta, setMateriaAberta] = useState<string | null>(null)
  const [verTodos, setVerTodos] = useState(false)
  if (!ind || !respostas) return null

  const status = diagnosticoPorTopico(respostas)
  const revisar = d.topicos.filter((t) => t.errados + t.brancos + t.inseguros > 0)
  const mostrar = verTodos ? revisar : revisar.slice(0, 6)
  const faixas = (Object.keys(SEGURANCA) as Seguranca[]).filter((k) => d.seguranca[k].certos + d.seguranca[k].errados > 0)
  const pior = [...nota.materias].filter((m) => m.placar.itens > 0).sort((a, b) => a.placar.nota / a.placar.itens - b.placar.nota / b.placar.itens)[0]
  const nomeMateria = (cod: string) => nota.materias.find((m) => m.codigo === cod)?.nome ?? cod
  const leituras = [
    pior && pior.placar.errados + pior.placar.brancos > 0 && `Menor aproveitamento: ${pior.nome} (nota ${pior.placar.nota} em ${pior.placar.itens} ${pior.placar.itens === 1 ? 'item' : 'itens'}).`,
    d.errosCerteza.length > 0 && `${d.errosCerteza.length} ${d.errosCerteza.length === 1 ? 'erro' : 'erros'} com certeza: aqui você acha que sabe, e é onde mais perde ponto sem perceber.`,
    d.inseguros.length > 0 && `${d.inseguros.length} ${d.inseguros.length === 1 ? 'acerto' : 'acertos'} na dúvida ou no chute: o ponto veio, mas o assunto ainda não está firme.`,
    nota.total.brancos > 0 && `${nota.total.brancos} em branco: não tiraram ponto, mas também não somaram.`,
    faixas.length === 1 && faixas[0] === 'sem' && 'Você não marcou a segurança nas respostas. Marque na próxima prova para este diagnóstico ficar mais preciso.',
  ].filter(Boolean) as string[]

  return (
    <>
      <Secao>Diagnóstico</Secao>
      {leituras.length > 0 && (
        <Card className="text-sm space-y-1.5">
          {leituras.map((l) => <div key={l}>· {l}</div>)}
        </Card>
      )}

      {faixas.length > 0 && (
        <>
          <Secao>Segurança nas respostas</Secao>
          <Card className="!p-0 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="text-suave text-xs">
                <tr><th className="text-left p-2.5 font-normal">Você marcou</th><th className="font-normal">Certos</th><th className="font-normal">Errados</th><th className="font-normal pr-2.5 text-right">Acerto</th></tr>
              </thead>
              <tbody>
                {faixas.map((k) => {
                  const f = d.seguranca[k]
                  return (
                    <tr key={k} className="border-t border-linha">
                      <td className="p-2.5">{SEGURANCA[k].rotulo}</td>
                      <td className="text-center text-verde">{f.certos}</td>
                      <td className="text-center text-destaque">{f.errados}</td>
                      <td className="text-right pr-2.5 font-bold">{Math.round((f.certos / (f.certos + f.errados)) * 100)}%</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </Card>
        </>
      )}

      <Secao>Matérias e tópicos</Secao>
      <Card className="!p-0 overflow-hidden">
        <div className="flex text-suave text-xs p-2.5 pb-1.5">
          <span className="flex-1">Toque na matéria para ver os tópicos</span>
          <span className="w-6 text-center">C</span><span className="w-6 text-center">E</span><span className="w-6 text-center">B</span><span className="w-10 text-right">Nota</span>
        </div>
        {nota.materias.map((m) => (
          <div key={m.codigo} className="border-t border-linha">
            <button type="button" onClick={() => setMateriaAberta(materiaAberta === m.codigo ? null : m.codigo)} className="flex w-full items-center p-2.5 text-sm text-left">
              <span className="flex-1 min-w-0"><span className="text-suave text-xs mr-1">{materiaAberta === m.codigo ? '▾' : '▸'}</span>{m.nome}<span className="text-suave text-xs"> · {m.placar.itens}</span></span>
              <span className="w-6 text-center text-verde">{m.placar.certos}</span>
              <span className="w-6 text-center text-destaque">{m.placar.errados}</span>
              <span className="w-6 text-center">{m.placar.brancos}</span>
              <b className={`w-10 text-right ${corNota(m.placar)}`}>{m.placar.nota}</b>
            </button>
            {materiaAberta === m.codigo && d.topicos.filter((t) => t.materia === m.codigo).map((t) => (
              <button key={t.codigo} type="button" onClick={() => nav(`/t/${t.codigo}`)} className="flex w-full items-center px-2.5 py-1.5 text-[13px] text-left bg-card2">
                <span className="flex-1 min-w-0"><b>{t.codigo}</b> <span className="text-suave">{acharTopico(ind, t.codigo)?.nome}</span></span>
                <span className="w-6 text-center text-verde">{t.certos}</span>
                <span className="w-6 text-center text-destaque">{t.errados}</span>
                <span className="w-6 text-center">{t.brancos}</span>
                <span className="w-10 text-right font-semibold">{t.certos - t.errados}</span>
              </button>
            ))}
          </div>
        ))}
      </Card>

      <Secao>Tempo</Secao>
      <Card className="text-sm">
        {d.tempoMaterias.map((m) => (
          <Linha key={m.codigo} rotulo={nomeMateria(m.codigo)} valor={`${formatarDuracao(m.ms)} · ${formatarDuracao(m.ms / m.itens)} por item`} />
        ))}
        {d.maisLentos.length > 0 && (
          <div className="border-t border-linha mt-2 pt-2">
            <div className="text-suave text-xs mb-0.5">Onde você mais demorou</div>
            {d.maisLentos.map((x) => <Linha key={x.id} rotulo={`Item ${x.numero} · ${x.topico}`} valor={formatarDuracao(x.ms)} />)}
          </div>
        )}
      </Card>

      {revisar.length > 0 && (
        <>
          <Secao>O que revisar</Secao>
          <Card className="text-sm">
            Em ordem de prioridade. <b>{paraCaderno}</b> {paraCaderno === 1 ? 'item foi' : 'itens foram'} para o caderno de erros (errados, brancos e chutes) e
            {' '}{paraCaderno === 1 ? 'volta' : 'voltam'} amanhã em <b>Revisão</b>. O diagnóstico de cada tópico já conta este simulado.
          </Card>
          {mostrar.map((t) => {
            const st = status[t.codigo]
            const fraco = st && (st.status === 'critico' || st.status === 'construcao')
            const partes = [
              t.errados > 0 && `${t.errados} ${t.errados === 1 ? 'erro' : 'erros'}${t.errosCerteza ? ` (${t.errosCerteza} com certeza)` : ''}`,
              t.brancos > 0 && `${t.brancos} em branco`,
              t.inseguros > 0 && `${t.inseguros} ${t.inseguros === 1 ? 'acerto inseguro' : 'acertos inseguros'}`,
            ].filter(Boolean)
            return (
              <Card key={t.codigo} onClick={() => nav(`/t/${t.codigo}`)} className="text-sm">
                <div className="flex justify-between items-start gap-2">
                  <span><b>{t.codigo}</b> <span className="text-suave">{acharTopico(ind, t.codigo)?.nome}</span></span>
                  {st && <StatusPill status={st.status} acerto={st.acerto} />}
                </div>
                <div className="text-suave text-[12px] mt-1">{partes.join(' · ')}</div>
                {fraco && <div className="text-[12px] mt-1">{STATUS_INFO[st.status].recomendacao}</div>}
              </Card>
            )
          })}
          {revisar.length > mostrar.length && (
            <button onClick={() => setVerTodos(true)} className="text-suave text-sm w-full py-2">Ver todos os {revisar.length} tópicos ›</button>
          )}
        </>
      )}
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
