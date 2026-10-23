import { useState, type FormEvent } from 'react'
import { useAuth } from '../auth'
import { usuarioValido } from '../lib/supabase'

export default function Login() {
  const { entrar, cadastrar } = useAuth()
  const [aba, setAba] = useState<'entrar' | 'cadastrar'>('entrar')
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [confirma, setConfirma] = useState('')
  const [codigo, setCodigo] = useState('')
  const [erro, setErro] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)

  async function enviar(e: FormEvent) {
    e.preventDefault()
    setErro(null)
    if (!usuarioValido(usuario)) return setErro('Usuário: 3 a 30 caracteres, só letras, números, ponto, hífen ou sublinhado.')
    if (senha.length < 6) return setErro('A senha precisa ter pelo menos 6 caracteres.')
    if (aba === 'cadastrar' && senha !== confirma) return setErro('As senhas não conferem.')
    if (aba === 'cadastrar' && !codigo.trim()) return setErro('Informe o código de convite.')
    setEnviando(true)
    const msg = aba === 'entrar' ? await entrar(usuario, senha) : await cadastrar(usuario, senha, codigo)
    setEnviando(false)
    if (msg) setErro(msg)
  }

  const campo = 'w-full p-3 rounded-xl border border-linha bg-card text-texto mb-2.5 outline-none focus:border-azul'
  return (
    <div className="max-w-sm mx-auto px-4 pt-16">
      <div className="text-center mb-8">
        <div className="text-[34px] font-bold tracking-wide">CBM<span className="text-destaque">APP</span></div>
        <div className="text-suave text-sm">CBM/AL 2026 · Praça Combatente</div>
      </div>
      <div className="flex justify-center gap-1.5 mb-4">
        {(['entrar', 'cadastrar'] as const).map((a) => (
          <button key={a} onClick={() => { setAba(a); setErro(null) }}
            className={`px-4 py-1.5 rounded-full text-sm border ${aba === a ? 'bg-texto text-[#111] border-texto' : 'border-linha text-suave'}`}>
            {a === 'entrar' ? 'Entrar' : 'Cadastrar'}
          </button>
        ))}
      </div>
      <form onSubmit={enviar}>
        <input className={campo} placeholder="Usuário" autoCapitalize="none" autoComplete="username" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
        <input className={campo} placeholder="Senha" type="password" autoComplete={aba === 'entrar' ? 'current-password' : 'new-password'} value={senha} onChange={(e) => setSenha(e.target.value)} />
        {aba === 'cadastrar' && (
          <>
            <input className={campo} placeholder="Confirmar senha" type="password" autoComplete="new-password" value={confirma} onChange={(e) => setConfirma(e.target.value)} />
            <input className={campo} placeholder="Código de convite" autoCapitalize="characters" autoComplete="off" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
            <p className="text-suave text-xs -mt-1 mb-2.5">Depois do cadastro, sua conta fica aguardando a aprovação do administrador.</p>
          </>
        )}
        {erro && <div className="text-[#ff8a8d] text-sm mb-2.5">{erro}</div>}
        <button disabled={enviando} className="w-full py-3 rounded-xl bg-destaque text-white font-bold disabled:opacity-50">
          {enviando ? 'Aguarde…' : aba === 'entrar' ? 'Entrar' : 'Criar conta'}
        </button>
      </form>
      <p className="text-suave text-xs text-center mt-5">Você fica conectado neste aparelho, inclusive sem internet.</p>
    </div>
  )
}
