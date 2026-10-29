import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Cabecalho, Card, Carregando, Pill, Secao } from '../components/ui'
import { useIndice } from '../lib/conteudo'
import { db } from '../lib/db'
import {
  DRIVE, LIMITE_MINI, descartarSimulado, formatarDuracao, iniciarSimulado,
  montarCompleto, montarDrive, montarFracos, montarMini, montarPorMaterias, topicosFracos, type Montagem,
} from '../lib/simulado'
import type { RegistroSimulado } from '../lib/types'

export default function Simulados() {
  const nav = useNavigate()
  const simulados = useLiveQuery(() => db.simulados.orderBy('iniciadoEm').reverse().toArray(), [])
  const fracos = useLiveQuery(() => topicosFracos(), [])
  const [montando, setMontando] = useState<string | null>(null)
  if (!simulados) return <Carregando />

  const andamento = simulados.filter((s) => s.status === 'andamento')
  const concluidos = simulados.filter((s) => s.status === 'concluido')

  async function comecar(chave: string, montar: () => Promise<Montagem | null>) {
    if (montando) return
    if (andamento.length && !window.confirm('Você tem um simulado em andamento. Começar outro mesmo assim? (o atual continua salvo)')) return
    setMontando(chave)
    try {
      const m = await montar()
      if (!m || !m.itens.length) { window.alert('Não há itens suficientes para montar este simulado.'); return }
      nav(`/simulado/${await iniciarSimulado(m)}`)
    } finally {
      setMontando(null)
    }
  }

  async function descartar(s: RegistroSimulado) {
    if (window.confirm(`Descartar "${s.titulo}"? As respostas marcadas nele serão perdidas.`)) await descartarSimulado(s.id)
  }

  const ultimoDrive = (n: number) => concluidos.find((s) => s.tipo === 'drive' && s.titulo === `Simulado ${String(n).padStart(2, '0')}`)

  return (
    <>
      <Cabecalho titulo="Simulados" sub="Nota pela regra do edital: certos − errados" />

      {andamento.map((s) => {
        const marcados = Object.keys(s.respostas).length
        return (
          <Card key={s.id} className="border border-azul/50">
            <div className="flex justify-between items-start">
              <div>
                <b>{s.titulo}</b> <Pill cor="blue">em andamento</Pill>
                <div className="text-suave text-[13px] mt-0.5">{marcados} de {s.itens.length} marcados · restam {formatarDuracao(s.limiteMs - s.gastoMs)}</div>
              </div>
            </div>
            <div className="flex gap-2 mt-2.5">
              <button onClick={() => nav(`/simulado/${s.id}`)} className="flex-1 py-2.5 rounded-xl bg-destaque text-white font-bold">Continuar</button>
              <button onClick={() => descartar(s)} className="px-4 py-2.5 rounded-xl bg-card2 text-suave">Descartar</button>
            </div>
          </Card>
        )
      })}

      <Secao>Novo simulado</Secao>
      <Opcao icone="📝" titulo="Completo" sub="120 itens (50 da P1 + 70 da P2) · 4h30 · itens sorteados, priorizando os inéditos"
        carregando={montando === 'completo'} onClick={() => comecar('completo', montarCompleto)} />
      <Opcao icone="⏱️" titulo="Mini-simulado" sub={`30 itens proporcionais · ${LIMITE_MINI / 60_000} min · dá para fazer fora de casa`}
        carregando={montando === 'mini'} onClick={() => comecar('mini', montarMini)} />
      <Opcao icone="🎯" titulo="Pontos fracos"
        sub={fracos === undefined ? '…' : fracos.length ? `30 itens ${fracos.length === 1 ? 'do seu tópico' : `dos seus ${fracos.length} tópicos`} 🔴🟠 · 40 min` : 'disponível quando houver tópicos 🔴 ou 🟠 no diagnóstico'}
        desativado={!fracos?.length} carregando={montando === 'fracos'} onClick={() => comecar('fracos', () => montarFracos())} />

      <PorMaterias carregando={montando === 'materias'} onComecar={(cods, n) => comecar('materias', () => montarPorMaterias(cods, n))} />

      <Secao>Simulados 01–05 (caderno do Drive)</Secao>
      <div className="grid grid-cols-5 gap-2 mb-1">
        {DRIVE.map((n) => {
          const u = ultimoDrive(n)
          return (
            <button key={n} onClick={() => comecar(`drive${n}`, () => montarDrive(n))}
              className="bg-card rounded-xl py-3 text-center active:bg-card2">
              <div className="font-bold">{montando === `drive${n}` ? '…' : String(n).padStart(2, '0')}</div>
              <div className={`text-[11px] ${u ? (u.resumo?.passou ? 'text-verde' : 'text-destaque') : 'text-suave'}`}>{u?.resumo ? `nota ${u.resumo.nota}` : 'novo'}</div>
            </button>
          )
        })}
      </div>
      <div className="text-suave text-[12px] mb-2">120 itens cada, na ordem do caderno · 4h30. Os gráficos que faltavam no PDF viraram tabelas.</div>

      {concluidos.length > 0 && (
        <>
          <Secao>Histórico</Secao>
          <Evolucao simulados={concluidos} />
          {concluidos.map((s) => (
            <Card key={s.id} onClick={() => nav(`/simulado/${s.id}`)} className="flex justify-between items-center">
              <div>
                <b>{s.titulo}</b>
                <div className="text-suave text-[13px]">{new Date(s.concluidoEm ?? s.iniciadoEm).toLocaleDateString('pt-BR')} · {s.itens.length} itens · {formatarDuracao(s.gastoMs)}</div>
              </div>
              {s.resumo && (
                <div className="text-right">
                  <div className={`text-xl font-bold ${s.resumo.passou ? 'text-verde' : 'text-destaque'}`}>{s.resumo.nota}</div>
                  <div className="text-suave text-[11px]">{s.resumo.passou ? 'acima do mínimo' : 'abaixo'}</div>
                </div>
              )}
            </Card>
          ))}
        </>
      )}
    </>
  )
}

const TAMANHOS = [10, 20, 30, 50]

function PorMaterias({ carregando, onComecar }: { carregando: boolean; onComecar: (codigos: string[], n: number) => void }) {
  const { dados: ind } = useIndice()
  const [aberto, setAberto] = useState(false)
  const [escolhidas, setEscolhidas] = useState<string[]>([])
  const [n, setN] = useState(20)
  if (!aberto) {
    return <Opcao icone="🧪" titulo="Mini por matérias" sub="você escolhe uma ou mais matérias; os itens vêm misturados de todos os tópicos delas" onClick={() => setAberto(true)} />
  }
  if (!ind) return <Carregando />
  const materias = ind.edital.materias
    .map((m) => ({ ...m, itens: m.topicos.reduce((t, x) => t + (ind.resumo[x.codigo]?.itens ?? 0), 0) }))
    .filter((m) => m.itens > 0)
  const disponiveis = materias.filter((m) => escolhidas.includes(m.codigo)).reduce((t, m) => t + m.itens, 0)
  const alternar = (c: string) => setEscolhidas((e) => (e.includes(c) ? e.filter((x) => x !== c) : [...e, c]))
  const chip = (ativo: boolean) => `px-3 py-1.5 rounded-full text-sm font-semibold border ${ativo ? 'bg-destaque text-white border-destaque' : 'bg-card2 border-linha text-texto'}`
  const total = Math.min(n, disponiveis)
  return (
    <Card className="border border-azul/40">
      <div className="flex justify-between items-center mb-2">
        <b>🧪 Mini por matérias</b>
        <button onClick={() => setAberto(false)} className="text-suave text-sm px-1">fechar</button>
      </div>
      <div className="text-suave text-xs mb-1.5">Matérias ({escolhidas.length} escolhida{escolhidas.length === 1 ? '' : 's'})</div>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {materias.map((m) => (
          <button key={m.codigo} type="button" className={chip(escolhidas.includes(m.codigo))} onClick={() => alternar(m.codigo)}>{m.nome}</button>
        ))}
      </div>
      <div className="text-suave text-xs mb-1.5">Quantos itens?</div>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {TAMANHOS.map((t) => <button key={t} type="button" className={chip(n === t)} onClick={() => setN(t)}>{t}</button>)}
      </div>
      <button
        type="button"
        disabled={!escolhidas.length || carregando}
        onClick={() => onComecar(escolhidas, n)}
        className="w-full py-3 rounded-xl bg-destaque text-white font-bold disabled:opacity-40"
      >
        {carregando ? 'Montando…' : escolhidas.length ? `Começar · ${total} itens · ${formatarDuracao(total * 80_000)}` : 'Escolha pelo menos uma matéria'}
      </button>
      <div className="text-suave text-[11px] mt-2">Os itens são repartidos entre todos os tópicos das matérias escolhidas, priorizando os que você nunca respondeu. Nota pela regra do edital (certos − errados).</div>
    </Card>
  )
}

// Evolução: nota líquida em % dos itens (para comparar simulados de tamanhos diferentes)
function Evolucao({ simulados }: { simulados: RegistroSimulado[] }) {
  const pontos = simulados.filter((s) => s.resumo && s.resumo.itens).slice(0, 12).reverse()
  if (pontos.length < 2) return null
  const v = pontos.map((s) => s.resumo!.nota / s.resumo!.itens)
  const max = Math.max(0.6, ...v)
  const min = Math.min(0, ...v)
  const ref = 36 / 120 // mínimo do total na prova
  const y = (x: number) => 100 - ((x - min) / (max - min)) * 100
  return (
    <Card>
      <div className="flex justify-between text-xs text-suave mb-1">
        <span>Nota líquida (% dos itens)</span><span>tracejado = mínimo do edital (30%)</span>
      </div>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-24">
        <line x1="0" x2="100" y1={y(ref)} y2={y(ref)} stroke="#9aa1ae" strokeDasharray="2 2" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
        <polyline fill="none" stroke="#e5484d" strokeWidth="2" vectorEffect="non-scaling-stroke"
          points={v.map((x, i) => `${(i / (v.length - 1)) * 100},${y(x)}`).join(' ')} />
      </svg>
      <div className="flex justify-between text-[11px] text-suave">
        <span>{Math.round(v[0] * 100)}%</span><span>último: <b className="text-texto">{Math.round(v[v.length - 1] * 100)}%</b></span>
      </div>
    </Card>
  )
}

function Opcao({ icone, titulo, sub, onClick, desativado, carregando }: {
  icone: string; titulo: string; sub: string; onClick: () => void; desativado?: boolean; carregando?: boolean
}) {
  return (
    <Card onClick={desativado ? undefined : onClick} className={`flex items-center gap-3 ${desativado ? 'opacity-50' : ''}`}>
      <span className="text-2xl">{icone}</span>
      <div className="flex-1"><b>{titulo}</b><div className="text-suave text-[13px]">{carregando ? 'Montando…' : sub}</div></div>
      {!desativado && <span className="text-suave">›</span>}
    </Card>
  )
}
