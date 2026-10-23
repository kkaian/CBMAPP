import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const chave = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

// Sem as variáveis de ambiente o app roda em "modo local": sem login e sem sincronizar.
export const supabase: SupabaseClient | null = url && chave ? createClient(url, chave) : null
export const modoLocal = !supabase

// O Supabase Auth exige e-mail. O app usa só usuário + senha e converte o usuário
// num e-mail interno que nunca recebe mensagens (confirmação de e-mail desligada no painel).
export function emailInterno(usuario: string) {
  return `${usuario.trim().toLowerCase()}@cbmapp.local`
}

export function usuarioValido(usuario: string) {
  return /^[a-z0-9._-]{3,30}$/.test(usuario.trim().toLowerCase())
}

export function nomeDeUsuario(email: string | undefined) {
  return email?.replace(/@cbmapp\.local$/, '') ?? ''
}
