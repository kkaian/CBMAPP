import { useState } from 'react'
import { useAuth } from '../auth'

// Mostrada para contas que ainda não foram aprovadas pelo administrador.
export default function Aguardando() {
  const { usuario, recarregarPerfil, sair } = useAuth()
  const [verificando, setVerificando] = useState(false)
  return (
    <div className="max-w-sm mx-auto px-4 pt-20 text-center">
      <div className="text-5xl mb-3">⏳</div>
      <h2 className="text-[22px] font-bold mb-2">Aguardando aprovação</h2>
      <p className="text-suave text-sm mb-6">
        A conta <b className="text-texto">{usuario}</b> foi criada. Assim que o administrador aprovar, o app libera o acesso.
      </p>
      <button disabled={verificando} onClick={async () => { setVerificando(true); await recarregarPerfil(); setVerificando(false) }}
        className="w-full py-3 rounded-xl bg-destaque text-white font-bold disabled:opacity-50 mb-2">
        {verificando ? 'Verificando…' : 'Já fui aprovado? Verificar'}
      </button>
      <button onClick={() => void sair()} className="w-full py-3 rounded-xl bg-card2">Sair</button>
    </div>
  )
}
