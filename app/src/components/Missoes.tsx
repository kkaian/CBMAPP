import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react'
import { Card, Pill } from './ui'
import { gravarConfig, lerConfig } from '../lib/db'
import { diaLocal, inicioSemana } from '../lib/datas'

// ---------- tipos de missão e cores ----------

export type Periodo = 'dia' | 'semana' | 'mes'

export const PERIODO: Record<Periodo, { rotulo: string; pill: string; faixa: string }> = {
  dia: { rotulo: 'Dia', pill: 'blue', faixa: 'bg-azul' },
  semana: { rotulo: 'Semana', pill: 'orange', faixa: 'bg-laranja' },
  mes: { rotulo: 'Mês', pill: 'yellow', faixa: 'bg-amarelo' },
}

export interface ItemMissao {
  chave: string
  periodo: Periodo
  titulo: string
  sub: string
  feita: boolean
  onClick?: () => void
  pessoal?: boolean
  risco?: string // o que se perde se não cumprir no prazo
  onRemover?: () => void
  onMarcar?: () => void
}

export function LinhaMissao({ m }: { m: ItemMissao }) {
  const p = PERIODO[m.periodo]
  const clicavel = m.onClick || m.onMarcar
  return (
    <div className="flex gap-3 items-center py-3 border-t border-linha first:border-t-0 first:pt-1 last:pb-1">
      <div className={`w-1 self-stretch rounded-full ${p.faixa} ${m.feita ? 'opacity-40' : ''}`} />
      <button
        type="button"
        aria-label={m.feita ? 'feita' : 'marcar como feita'}
        onClick={m.onMarcar}
        disabled={!m.onMarcar}
        className={`w-[22px] h-[22px] rounded-full border-2 shrink-0 flex items-center justify-center text-[12px] text-white ${m.feita ? 'bg-verde border-verde' : 'border-cinza'} ${m.onMarcar ? '' : 'cursor-default'}`}
      >
        {m.feita ? '✓' : ''}
      </button>
      <div onClick={m.onClick ?? m.onMarcar} className={`flex-1 min-w-0 ${clicavel ? 'cursor-pointer' : ''}`}>
        <div className="flex items-center gap-1.5 mb-0.5">
          <Pill cor={p.pill}>{p.rotulo}</Pill>
          {m.pessoal && <span className="text-suave text-[11px]">✎ sua</span>}
        </div>
        <div className={`font-semibold leading-snug ${m.feita ? 'text-suave line-through decoration-1' : ''}`}>{m.titulo}</div>
        {m.sub && <div className="text-suave text-[13px]">{m.sub}</div>}
        {m.risco && !m.feita && <div className="text-destaque/80 text-[11px] mt-0.5">⏳ {m.risco}</div>}
      </div>
      {m.onRemover
        ? <button type="button" onClick={m.onRemover} aria-label="remover missão" className="text-suave px-1 text-lg leading-none">×</button>
        : m.onClick && <span className="text-suave">›</span>}
    </div>
  )
}

// ---------- missões pessoais (lembretes do próprio usuário) ----------

interface MissaoPessoal {
  id: string
  texto: string
  periodo: Periodo
  criadaEm: string
  concluidas: string[] // chaves dos períodos em que foi marcada (dia, semana ou mês)
}

const CHAVE_CONFIG = 'missoes.pessoais'

function chavePeriodo(periodo: Periodo, hoje = diaLocal()) {
  return periodo === 'dia' ? hoje : periodo === 'semana' ? inicioSemana(hoje) : hoje.slice(0, 7)
}

export function useMissoesPessoais(): { itens: ItemMissao[]; adicionar: (texto: string, periodo: Periodo) => void } {
  const lista = useLiveQuery(() => lerConfig<MissaoPessoal[]>(CHAVE_CONFIG, []), []) ?? []
  const salvar = (nova: MissaoPessoal[]) => void gravarConfig(CHAVE_CONFIG, nova)
  const itens = lista.map((x): ItemMissao => {
    const chave = chavePeriodo(x.periodo)
    const feita = x.concluidas.includes(chave)
    return {
      chave: x.id,
      periodo: x.periodo,
      titulo: x.texto,
      sub: feita ? 'feita' : x.periodo === 'dia' ? 'toque para marcar hoje' : x.periodo === 'semana' ? 'toque para marcar nesta semana' : 'toque para marcar neste mês',
      feita,
      pessoal: true,
      onMarcar: () => salvar(lista.map((y) => y.id !== x.id ? y : {
        ...y,
        concluidas: feita ? y.concluidas.filter((c) => c !== chave) : [...y.concluidas, chave].slice(-60),
      })),
      onRemover: () => { if (confirm(`Remover a missão "${x.texto}"?`)) salvar(lista.filter((y) => y.id !== x.id)) },
    }
  })
  const adicionar = (texto: string, periodo: Periodo) =>
    salvar([...lista, { id: crypto.randomUUID(), texto, periodo, criadaEm: new Date().toISOString(), concluidas: [] }])
  return { itens, adicionar }
}

export function NovaMissao({ onAdicionar }: { onAdicionar: (texto: string, periodo: Periodo) => void }) {
  const [aberto, setAberto] = useState(false)
  const [texto, setTexto] = useState('')
  const [periodo, setPeriodo] = useState<Periodo>('dia')
  if (!aberto) {
    return <button type="button" onClick={() => setAberto(true)} className="w-full text-left text-azul text-sm pt-3 mt-1 border-t border-linha">＋ Adicionar missão própria</button>
  }
  const ok = texto.trim().length > 0
  return (
    <div className="pt-3 mt-1 border-t border-linha space-y-2">
      <input
        autoFocus
        value={texto}
        maxLength={80}
        onChange={(e) => setTexto(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter' && ok) { onAdicionar(texto.trim(), periodo); setTexto(''); setAberto(false) } }}
        placeholder="Ex.: revisar o Estatuto, ler 1 redação-modelo…"
        className="w-full bg-card2 border border-linha rounded-lg px-3 py-2 text-sm"
      />
      <div className="flex gap-1.5 items-center">
        {(Object.keys(PERIODO) as Periodo[]).map((p) => (
          <button key={p} type="button" onClick={() => setPeriodo(p)}
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${periodo === p ? 'border-texto' : 'border-linha opacity-60'}`}>
            <Pill cor={PERIODO[p].pill}>{PERIODO[p].rotulo}</Pill>
          </button>
        ))}
        <div className="flex-1" />
        <button type="button" onClick={() => { setAberto(false); setTexto('') }} className="text-suave text-sm px-2">Cancelar</button>
        <button type="button" disabled={!ok} onClick={() => { onAdicionar(texto.trim(), periodo); setTexto(''); setAberto(false) }}
          className="bg-destaque text-white rounded-lg px-3 py-1.5 text-sm font-bold disabled:opacity-40">Adicionar</button>
      </div>
    </div>
  )
}

// ---------- barra de XP da tela inicial ----------

export function CartaoXp({ patenteNome, xp, base, proximaXp, proximaNome, multiplicador, ganhoHoje, medalhas }: {
  patenteNome: string; xp: number; base: number; proximaXp: number; proximaNome: string
  multiplicador: number; ganhoHoje: number; medalhas: string
}) {
  const frac = Math.max(0, Math.min(1, (xp - base) / (proximaXp - base)))
  const fmt = (n: number) => n.toLocaleString('pt-BR')
  const maximo = multiplicador >= 1
  return (
    <Card className="mt-3.5">
      <div className="flex justify-between items-baseline">
        <div>
          <div className="text-suave text-[11px] uppercase tracking-wide">Patente</div>
          <div className="text-lg font-bold leading-tight">🎖️ {patenteNome} {medalhas && <span className="text-base">{medalhas}</span>}</div>
        </div>
        <div className="text-right">
          <div className="font-bold">{fmt(xp)} XP</div>
          <div className={`text-[12px] ${ganhoHoje > 0 ? 'text-verde' : ganhoHoje < 0 ? 'text-destaque' : 'text-suave'}`}>
            {ganhoHoje > 0 ? '+' : ''}{fmt(ganhoHoje)} hoje
          </div>
        </div>
      </div>
      <div className="relative h-3.5 bg-card2 rounded-full overflow-hidden mt-2.5">
        <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-amarelo to-laranja transition-all duration-700" style={{ width: `${frac * 100}%` }} />
        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white/90 drop-shadow">{Math.floor(frac * 100)}%</div>
      </div>
      <div className="flex justify-between items-center mt-1.5 text-[12px]">
        <span className="text-suave">faltam <b className="text-texto">{fmt(Math.max(0, proximaXp - xp))}</b> para {proximaNome}</span>
        <Pill cor={maximo ? 'green' : 'orange'}>🔥 ×{multiplicador.toLocaleString('pt-BR', { minimumFractionDigits: 1 })}{maximo ? ' máx.' : ''}</Pill>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <div className="flex gap-1">
          {Array.from({ length: 7 }, (_, k) => (
            <div key={k} className={`w-5 h-1.5 rounded-full ${k < Math.round((multiplicador - 0.4) / 0.1) + 1 ? 'bg-laranja' : 'bg-card2'}`} />
          ))}
        </div>
        <span className="text-suave text-[11px]">{maximo ? 'sequência no máximo: mantenha!' : 'cada dia seguido rende mais XP'}</span>
      </div>
    </Card>
  )
}
