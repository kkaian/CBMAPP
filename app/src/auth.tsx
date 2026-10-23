import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { emailInterno, modoLocal, nomeDeUsuario, supabase } from './lib/supabase'
import { limparDadosLocais, sincronizar } from './lib/sync'

interface Auth {
  pronto: boolean
  logado: boolean
  usuario: string
  entrar: (usuario: string, senha: string) => Promise<string | null>
  cadastrar: (usuario: string, senha: string) => Promise<string | null>
  sair: () => Promise<void>
}

const Ctx = createContext<Auth | null>(null)

function traduzir(msg: string): string {
  if (/invalid login credentials/i.test(msg)) return 'Usuário ou senha incorretos.'
  if (/already registered|already exists/i.test(msg)) return 'Esse usuário já existe.'
  if (/signups? not allowed|signup is disabled/i.test(msg)) return 'Novos cadastros estão bloqueados.'
  if (/password should be at least/i.test(msg)) return 'A senha precisa ter pelo menos 6 caracteres.'
  if (/email not confirmed/i.test(msg)) return 'Conta criada, mas a confirmação de e-mail está ligada no Supabase. Desligue em Authentication > Sign In / Providers > Email.'
  if (/fetch|network/i.test(msg)) return 'Sem conexão com o servidor. Tente de novo com internet.'
  return msg
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [sessao, setSessao] = useState<Session | null>(null)
  const [pronto, setPronto] = useState(modoLocal)

  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => {
      setSessao(data.session)
      setPronto(true)
      if (data.session) void sincronizar()
    })
    const { data } = supabase.auth.onAuthStateChange((evento, s) => {
      setSessao(s)
      if (evento === 'SIGNED_IN') void sincronizar()
    })
    return () => data.subscription.unsubscribe()
  }, [])

  const valor: Auth = {
    pronto,
    logado: modoLocal || !!sessao,
    usuario: modoLocal ? 'modo local' : nomeDeUsuario(sessao?.user.email),
    async entrar(usuario, senha) {
      if (!supabase) return null
      const { error } = await supabase.auth.signInWithPassword({ email: emailInterno(usuario), password: senha })
      return error ? traduzir(error.message) : null
    },
    async cadastrar(usuario, senha) {
      if (!supabase) return null
      const { data, error } = await supabase.auth.signUp({ email: emailInterno(usuario), password: senha })
      if (error) return traduzir(error.message)
      if (!data.session) return traduzir('email not confirmed')
      return null
    },
    async sair() {
      if (!supabase) return
      await sincronizar()
      await supabase.auth.signOut()
      await limparDadosLocais()
    },
  }
  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>
}

export function useAuth() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useAuth fora do AuthProvider')
  return c
}
