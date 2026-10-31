import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Rico } from '../components/Rico'
import { Barra, Botao, Card, Carregando, Pill } from '../components/ui'
import { carregarMateria, materiaDoTopico, questoesPorId } from '../lib/conteudo'
import { db } from '../lib/db'
import { entregarSimulado, formatarDuracao, salvarSimulado } from '../lib/simulado'
import type { Confianca, Grupo, Questao, RegistroSimulado, Resposta } from '../lib/types'
import ResultadoSimulado from './ResultadoSimulado'

const CONFIANCAS: { id: Confianca; rotulo: string }[] = [
  { id: 'certeza', rotulo: '✅ Certeza' },
  { id: 'duvida', rotulo: '🤔 Dúvida' },
  { id: 'chute', rotulo: '🎲 Chute' },
]

export default function Simulado() {
  const { id = '' } = useParams()
  const [sim, setSim] = useState<RegistroSimulado | null | undefined>(undefined)
  const [questoes, setQuestoes] = useState<Questao[] | null>(null)
  const [grupos, setGrupos] = useState<Record<string, Grupo>>({})

  useEffect(() => {
    let vivo = true
    void (async () => {
      const s = await db.simulados.get(id)
      if (!s) { if (vivo) setSim(null); return }
      const qs = await questoesPorId(s.itens)
      const gs: Record<string, Grupo> = {}
      for (const c of new Set(qs.map((q) => materiaDoTopico(q.topico)))) for (const g of (await carregarMateria(c)).grupos) gs[g.id] = g
      if (!vivo) return
      setGrupos(gs)
      setQuestoes(qs)
      setSim(s)
    })()
    return () => { vivo = false }
  }, [id])

  if (sim === null) return <div className="pt-10 text-center text-suave">Simulado não encontrado neste aparelho.</div>
  if (!sim || !questoes) return <Carregando />
  if (sim.status === 'andamento') return <Prova inicial={sim} questoes={questoes} grupos={grupos} onEntregue={setSim} />
  if (sim.status === 'descartado') return <div className="pt-10 text-center text-suave">Este simulado foi descartado.</div>
  return <ResultadoSimulado sim={sim} questoes={questoes} grupos={grupos} />
}

function Prova({ inicial, questoes, grupos, onEntregue }: {
  inicial: RegistroSimulado; questoes: Questao[]; grupos: Record<string, Grupo>; onEntregue: (s: RegistroSimulado) => void
}) {
  const nav = useNavigate()
  const [sim, setSim] = useState(inicial)
  const [folha, setFolha] = useState(false)
  const [entregando, setEntregando] = useState(false)
  const simRef = useRef(sim)
  simRef.current = sim
  const ultimoTique = useRef(Date.now())
  const sujo = useRef(false)
  const encerrado = useRef(false)
  const avanco = useRef<ReturnType<typeof setTimeout> | null>(null)

  const q = questoes[sim.atual]
  const restante = sim.limiteMs - sim.gastoMs
  const respondidos = questoes.filter((x) => sim.respostas[x.id] && sim.respostas[x.id].r !== 'B').length
  const marcados = questoes.filter((x) => sim.respostas[x.id]).length

  const salvar = useCallback(async () => {
    if (!sujo.current || encerrado.current) return
    sujo.current = false
    await salvarSimulado(simRef.current)
  }, [])

  const entregar = useCallback(async () => {
    if (entregando) return
    encerrado.current = true
    setEntregando(true)
    await entregarSimulado(simRef.current, questoes)
    const final = await db.simulados.get(simRef.current.id)
    if (final) onEntregue(final)
    window.scrollTo(0, 0)
  }, [entregando, questoes, onEntregue])

  // relógio: só corre com a tela visível; o tempo do item atual também é contado
  useEffect(() => {
    ultimoTique.current = Date.now()
    const t = setInterval(() => {
      const agora = Date.now()
      const dt = Math.min(agora - ultimoTique.current, 5000) // celular dormindo não conta
      ultimoTique.current = agora
      if (document.visibilityState !== 'visible') return
      setSim((s) => {
        const item = questoes[s.atual]?.id
        sujo.current = true
        return { ...s, gastoMs: s.gastoMs + dt, tempos: item ? { ...s.tempos, [item]: (s.tempos[item] ?? 0) + dt } : s.tempos }
      })
    }, 1000)
    const autosave = setInterval(() => void salvar(), 5000)
    const aoEsconder = () => { if (document.visibilityState === 'hidden') void salvar() }
    document.addEventListener('visibilitychange', aoEsconder)
    return () => { clearInterval(t); clearInterval(autosave); document.removeEventListener('visibilitychange', aoEsconder); void salvar() }
  }, [questoes, salvar])

  // tempo esgotado → entrega automática
  useEffect(() => {
    if (restante <= 0 && !entregando) void entregar()
  }, [restante, entregando, entregar])

  function ir(i: number) {
    if (avanco.current) clearTimeout(avanco.current)
    sujo.current = true
    setSim((s) => ({ ...s, atual: Math.max(0, Math.min(questoes.length - 1, i)) }))
    setFolha(false)
    window.scrollTo(0, 0)
  }

  // avança sozinho, exceto no último item; um novo toque cancela o avanço anterior para não pular item
  function avancar() {
    if (avanco.current) clearTimeout(avanco.current)
    if (sim.atual + 1 < questoes.length) avanco.current = setTimeout(() => ir(simRef.current.atual + 1), 250)
  }

  function marcar(r: Resposta) {
    if (avanco.current) clearTimeout(avanco.current)
    sujo.current = true
    setSim((s) => {
      const atual = s.respostas[q.id]
      return { ...s, respostas: { ...s.respostas, [q.id]: { r, c: r === 'B' ? null : atual?.c ?? null } } }
    })
    // Certo ou Errado espera a segurança; o branco não tem o que marcar
    if (r === 'B') avancar()
  }

  function confiar(c: Confianca) {
    sujo.current = true
    setSim((s) => {
      const atual = s.respostas[q.id]
      if (!atual || atual.r === 'B') return s
      return { ...s, respostas: { ...s.respostas, [q.id]: { r: atual.r, c: atual.c === c ? null : c } } }
    })
    // desmarcar não avança
    if (avanco.current) clearTimeout(avanco.current)
    if (resp?.r && resp.r !== 'B' && resp.c !== c) avancar()
  }

  function pedirEntrega() {
    const faltam = questoes.length - marcados
    const msg = faltam
      ? `Entregar agora? ${faltam} ${faltam === 1 ? 'item não marcado conta' : 'itens não marcados contam'} como branco (valem 0).`
      : 'Entregar o simulado?'
    if (window.confirm(msg)) void entregar()
  }

  async function sair() {
    await salvar()
    nav(-1)
  }

  if (entregando) return <Carregando texto="Corrigindo…" />

  const resp = sim.respostas[q.id]
  const marcada = resp?.r ?? null
  const grupo = q.grupo ? grupos[q.grupo] : null
  const novoTexto = grupo && questoes[sim.atual - 1]?.grupo !== q.grupo
  const pouco = restante < 10 * 60_000

  return (
    <>
      <div className="flex justify-between items-center text-sm text-suave">
        <button onClick={sair} className="px-1 -ml-1" aria-label="Sair e continuar depois">✕</button>
        <span>{sim.titulo} · {sim.atual + 1}/{questoes.length}</span>
        <span className={pouco ? 'text-destaque font-bold' : ''}>⏳ {formatarDuracao(restante)}</span>
      </div>
      <div className="my-2.5"><Barra valor={respondidos / questoes.length} cor="blue" /></div>

      <div className="flex gap-1.5 mb-2 items-center">
        <Pill>{materiaDoTopico(q.topico)}</Pill>
        <span className="text-suave text-xs">{respondidos} de {questoes.length} respondidos</span>
      </div>

      {grupo && (
        <Card className={`text-[14px] text-suave ${novoTexto ? '' : 'opacity-80'}`}><Rico texto={grupo.texto} /></Card>
      )}
      <Card className="text-[16px] leading-relaxed">
        <div className="text-suave text-xs mb-1">Item {sim.atual + 1}</div>
        <Rico texto={q.enunciado} />
      </Card>

      <div className="grid grid-cols-3 gap-2 mt-3">
        <button onClick={() => marcar('C')} className={`py-3.5 rounded-xl border-2 font-bold ${marcada === 'C' ? 'border-verde bg-[#173324]' : 'border-linha bg-card'}`}>CERTO</button>
        <button onClick={() => marcar('E')} className={`py-3.5 rounded-xl border-2 font-bold ${marcada === 'E' ? 'border-destaque bg-[#3a1d20]' : 'border-linha bg-card'}`}>ERRADO</button>
        <button onClick={() => marcar('B')} className={`py-3.5 rounded-xl border-2 font-bold ${marcada === 'B' ? 'border-azul bg-[#1b2740]' : 'border-linha bg-card'}`}>Branco</button>
      </div>
      <div className="text-suave text-[12px] mt-3 mb-1.5">Sua segurança: ao marcar, passa para o próximo item</div>
      <div className="grid grid-cols-3 gap-2">
        {CONFIANCAS.map((c) => (
          <button key={c.id} disabled={!marcada || marcada === 'B'} onClick={() => confiar(c.id)}
            className={`py-2 rounded-xl border text-[12px] disabled:opacity-35 ${resp?.c === c.id ? 'border-azul bg-[#1b2740]' : 'border-linha bg-card'}`}>
            {c.rotulo}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4">
        <Botao variante="secundario" disabled={sim.atual === 0} onClick={() => ir(sim.atual - 1)}>‹ Anterior</Botao>
        <Botao variante="secundario" onClick={() => setFolha((f) => !f)}>Folha</Botao>
        {sim.atual + 1 < questoes.length
          ? <Botao variante="secundario" onClick={() => ir(sim.atual + 1)}>Próximo ›</Botao>
          : <Botao onClick={pedirEntrega}>Entregar</Botao>}
      </div>

      {folha && (
        <Card className="mt-3">
          <div className="flex justify-between items-center mb-2">
            <b>Folha de respostas</b>
            <span className="text-suave text-xs">toque para ir ao item</span>
          </div>
          <div className="grid grid-cols-8 gap-1.5">
            {questoes.map((x, i) => {
              const r = sim.respostas[x.id]
              const v = r?.r ?? null
              const cor = v === 'C' ? 'bg-[#173324] text-[#6fdc98]' : v === 'E' ? 'bg-[#3a1d20] text-[#ff8a8d]' : v === 'B' ? 'bg-[#1b2740] text-[#8ab4ff]' : 'bg-card2 text-suave'
              return (
                <button key={x.id} onClick={() => ir(i)}
                  className={`h-9 rounded-lg text-[11px] font-semibold ${cor} ${i === sim.atual ? 'ring-2 ring-texto' : ''}`}>
                  {i + 1}{v && v !== 'B' ? v : ''}
                </button>
              )
            })}
          </div>
          <div className="text-suave text-[11px] mt-2">Verde = Certo · vermelho = Errado · azul = branco marcado · cinza = não respondido</div>
          <div className="mt-3"><Botao onClick={pedirEntrega}>Entregar simulado</Botao></div>
        </Card>
      )}
      <div className="text-suave text-[11px] text-center mt-4">O relógio só corre com esta tela aberta. Ao sair, o simulado fica salvo para continuar depois.</div>
    </>
  )
}
