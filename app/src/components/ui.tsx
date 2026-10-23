import type { ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { STATUS_INFO, type Status } from '../lib/stats'

export function Card({ children, className = '', onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  return (
    <div onClick={onClick} className={`bg-card rounded-2xl p-3.5 mb-2.5 ${onClick ? 'cursor-pointer active:bg-card2' : ''} ${className}`}>
      {children}
    </div>
  )
}

export function Secao({ children }: { children: ReactNode }) {
  return <h3 className="text-[12px] font-semibold uppercase tracking-wide text-suave mt-5 mb-2">{children}</h3>
}

const CORES_PILL: Record<string, string> = {
  red: 'bg-[#3a1d20] text-[#ff8a8d]',
  orange: 'bg-[#3a2a1a] text-[#ffb877]',
  yellow: 'bg-[#3a3419] text-[#f7d96b]',
  green: 'bg-[#173324] text-[#6fdc98]',
  gray: 'bg-[#2a2e37] text-suave',
  blue: 'bg-[#1b2740] text-[#8ab4ff]',
}

export function Pill({ cor = 'gray', children }: { cor?: string; children: ReactNode }) {
  return <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${CORES_PILL[cor]}`}>{children}</span>
}

export function StatusPill({ status, acerto }: { status: Status; acerto?: number | null }) {
  const s = STATUS_INFO[status]
  return (
    <Pill cor={s.cor}>
      {s.emoji} {s.rotulo}
      {acerto != null && status !== 'semdados' ? ` · ${Math.round(acerto * 100)}%` : ''}
    </Pill>
  )
}

export const COR_BARRA: Record<string, string> = {
  red: 'bg-destaque', orange: 'bg-laranja', yellow: 'bg-amarelo', green: 'bg-verde', gray: 'bg-cinza', blue: 'bg-azul',
}

export function Barra({ valor, cor = 'red' }: { valor: number; cor?: string }) {
  return (
    <div className="h-2 bg-card2 rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${COR_BARRA[cor]}`} style={{ width: `${Math.max(0, Math.min(1, valor)) * 100}%` }} />
    </div>
  )
}

export function Anel({ valor, centro, legenda }: { valor: number; centro: string; legenda: string }) {
  const v = Math.max(0, Math.min(1, valor))
  return (
    <svg viewBox="0 0 36 36" className="w-24 h-24 shrink-0">
      <circle cx="18" cy="18" r="15.9" fill="none" stroke="#272c37" strokeWidth="3.5" />
      <circle cx="18" cy="18" r="15.9" fill="none" stroke={v >= 1 ? '#3fb970' : '#e5484d'} strokeWidth="3.5" strokeDasharray={`${v * 100} 100`} strokeLinecap="round" transform="rotate(-90 18 18)" />
      <text x="18" y="17.5" textAnchor="middle" fill="#eef0f4" fontSize="7.5" fontWeight="700">{centro}</text>
      <text x="18" y="23" textAnchor="middle" fill="#9aa1ae" fontSize="3.6">{legenda}</text>
    </svg>
  )
}

export function Botao({ children, onClick, variante = 'primario', className = '', disabled, to }: {
  children: ReactNode; onClick?: () => void; variante?: 'primario' | 'secundario'; className?: string; disabled?: boolean; to?: string
}) {
  const cls = `block w-full py-3 px-3 rounded-xl font-bold text-center disabled:opacity-40 ${variante === 'primario' ? 'bg-destaque text-white active:brightness-90' : 'bg-card2 text-texto active:bg-linha'} ${className}`
  if (to) return <Link to={to} className={cls}>{children}</Link>
  return <button type="button" onClick={onClick} disabled={disabled} className={cls}>{children}</button>
}

export function Cabecalho({ titulo, sub, voltar = true }: { titulo: string; sub?: string; voltar?: boolean }) {
  const nav = useNavigate()
  return (
    <div className="mb-3">
      {voltar && (
        <button onClick={() => nav(-1)} className="text-suave text-sm mb-1 -ml-1 px-1">‹ Voltar</button>
      )}
      {sub && <div className="text-suave text-sm">{sub}</div>}
      <h2 className="text-[22px] font-bold leading-tight">{titulo}</h2>
    </div>
  )
}

export function Carregando({ texto = 'Carregando…' }: { texto?: string }) {
  return <div className="text-suave text-center py-16">{texto}</div>
}

export function pct(v: number | null | undefined) {
  return v == null ? '—' : `${Math.round(v * 100)}%`
}
