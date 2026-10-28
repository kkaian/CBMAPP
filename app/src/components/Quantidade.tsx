import { useState } from 'react'

const CHAVE = 'cbmapp.quantidade'
const OPCOES = [5, 10, 20, 30, 50]

function lerPadrao(padrao: number) {
  try {
    const v = Number(localStorage.getItem(CHAVE))
    return v > 0 ? v : padrao
  } catch {
    return padrao
  }
}

// Quantidade de itens de um treino: escolha rápida (5, 10, 20…), "todos" ou um número digitado.
// A última escolha fica guardada no aparelho.
export function useQuantidade(padrao = 10): [number, (n: number) => void] {
  const [n, setN] = useState(() => lerPadrao(padrao))
  const definir = (v: number) => {
    setN(v)
    try { localStorage.setItem(CHAVE, String(v)) } catch { /* sem armazenamento: só vale nesta tela */ }
  }
  return [n, definir]
}

export function EscolherQuantidade({ max, valor, onChange }: { max: number; valor: number; onChange: (n: number) => void }) {
  const [digitando, setDigitando] = useState('')
  const opcoes = OPCOES.filter((o) => o < max)
  const chip = (ativo: boolean) =>
    `px-3 py-1.5 rounded-full text-sm font-semibold border ${ativo ? 'bg-destaque text-white border-destaque' : 'bg-card2 border-linha text-texto'}`
  return (
    <div className="mb-3">
      <div className="text-suave text-xs mb-1.5">Quantos itens?</div>
      <div className="flex flex-wrap gap-1.5 items-center">
        {opcoes.map((o) => (
          <button key={o} type="button" className={chip(valor === o)} onClick={() => { setDigitando(''); onChange(o) }}>{o}</button>
        ))}
        <button type="button" className={chip(valor === max)} onClick={() => { setDigitando(''); onChange(max) }}>Todos ({max})</button>
        <input
          type="number"
          inputMode="numeric"
          min={1}
          max={max}
          placeholder="outro"
          value={digitando}
          onChange={(e) => {
            setDigitando(e.target.value)
            const v = Math.floor(Number(e.target.value))
            if (v >= 1) onChange(Math.min(v, max))
          }}
          className="w-20 px-2 py-1.5 rounded-full text-sm bg-card2 border border-linha text-texto text-center"
        />
      </div>
    </div>
  )
}
