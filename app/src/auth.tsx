import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { emailInterno, modoLocal, nomeDeUsuario, supabase } from './lib/supabase'
import { definirAprovado, limparDadosLocais, sincronizar } from './lib/sync'

export interface Perfil {
  status: 'pendente' | 'aprovado'
  admin: boolean
}

interface Auth {
  pronto: boolean
  logado: boolean
  usuario: string
  perfil: Perfil | null
  entrar: (usuario: string, senha: string) => Promise<string | null>
  cadastrar: (usuario: string, senha: string, codigo: string) => Promise<string | null>
  sair: () => Promise<void>
  recarregarPerfil: () => Promise<void>
}

const Ctx = createContext<Auth | null>(null)
const CHAVE_PERFIL = 'cbmapp.perfil' // cópia local para abrir o app sem internet

function traduzir(msg: string): string {
  if (/invalid login credentials/i.test(msg)) return 'Usuário ou senha incorretos.'
  if (/already registered|already exists/i.test(msg)) return 'Esse usuário já existe.'
  if (/database error saving new user|CODIGO_CONVITE_INVALIDO/i.test(msg)) return 'Código de convite inválido.'
  if (/signups? not allowed|signup is disabled/i.test(msg)) return 'Novos cadastros estão bloqueados.'
  if (/password should be at least/i.test(msg)) return 'A senha precisa ter pelo menos 6 caracteres.'
  if (/email not confirmed/i.test(msg)) return 'Conta criada, mas a confirmação de e-mail está ligada no Supabase. Desligue em Authentication > Sign In / Providers > Email.'
  if (/fetch|network/i.test(msg)) return 'Sem conexão com o servidor. Tente de novo com internet.'
  return msg
}

function perfilSalvo(): Perfil | null {
  try { return JSON.parse(localStorage.getItem(CHAVE_PERFIL) ?? 'null') } catch { return null }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [sessao, setSessao] = useState<Session | null>(null)
  const [perfil, setPerfil] = useState<Perfil | null>(modoLocal ? { status: 'aprovado', admin: false } : perfilSalvo())
  const [pronto, setPronto] = useState(modoLocal)

  const carregarPerfil = useCallback(async (s: Session | null) => {
    if (!supabase || !s) return
    const { data, error } = await supabase.from('perfis').select('status, admin').eq('user_id', s.user.id).maybeSingle()
    if (error) return // sem internet: fica com a cópia local
    const p: Perfil = (data as Perfil | null) ?? { status: 'pendente', admin: false } // conta sem perfil: trata como pendente
    setPerfil(p)
    try { localStorage.setItem(CHAVE_PERFIL, JSON.stringify(p)) } catch { /* armazenamento indisponível */ }
    definirAprovado(p?.status === 'aprovado')
    if (p?.status === 'aprovado') void sincronizar()
  }, [])

  useEffect(() => {
    if (!supabase) return
    definirAprovado(perfilSalvo()?.status === 'aprovado')
    supabase.auth.getSession().then(async ({ data }) => {
      setSessao(data.session)
      await carregarPerfil(data.session)
      setPronto(true)
    })
    const { data } = supabase.auth.onAuthStateChange((evento, s) => {
      setSessao(s)
      if (evento === 'SIGNED_IN') void carregarPerfil(s)
    })
    return () => data.subscription.unsubscribe()
  }, [carregarPerfil])

  const valor: Auth = {
    pronto,
    logado: modoLocal || !!sessao,
    usuario: modoLocal ? 'modo local' : nomeDeUsuario(sessao?.user.email),
    perfil,
    async entrar(usuario, senha) {
      if (!supabase) return null
      const { error } = await supabase.auth.signInWithPassword({ email: emailInterno(usuario), password: senha })
      return error ? traduzir(error.message) : null
    },
    async cadastrar(usuario, senha, codigo) {
      if (!supabase) return null
      const { data, error } = await supabase.auth.signUp({
        email: emailInterno(usuario),
        password: senha,
        options: { data: { codigo_convite: codigo.trim() } },
      })
      if (error) return traduzir(error.message)
      if (!data.session) return traduzir('email not confirmed')
      return null
    },
    async sair() {
      if (!supabase) return
      if (perfil?.status === 'aprovado') await sincronizar()
      await supabase.auth.signOut()
      try { localStorage.removeItem(CHAVE_PERFIL) } catch { /* ignore */ }
      setPerfil(null)
      definirAprovado(false)
      await limparDadosLocais()
    },
    recarregarPerfil: () => carregarPerfil(sessao),
  }
  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>
}

export function useAuth() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useAuth fora do AuthProvider')
  return c
}
