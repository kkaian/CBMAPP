import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../auth'
import { Cabecalho, Card, Carregando, Pill, Secao } from '../components/ui'
import { supabase } from '../lib/supabase'

interface LinhaPerfil {
  user_id: string
  usuario: string
  status: 'pendente' | 'aprovado'
  admin: boolean
  criado_em: string
  aprovado_em: string | null
}

const ERROS: Record<string, string> = {
  SOMENTE_ADMIN: 'Só o administrador pode fazer isso.',
  CODIGO_CURTO: 'O código precisa ter pelo menos 4 caracteres.',
  NAO_PODE_REMOVER_A_SI: 'Você não pode remover a própria conta.',
}
const traduzir = (m: string) => Object.entries(ERROS).find(([k]) => m.includes(k))?.[1] ?? m

export default function Admin() {
  const { perfil } = useAuth()
  const [codigo, setCodigo] = useState<string | null>(null)
  const [novo, setNovo] = useState('')
  const [perfis, setPerfis] = useState<LinhaPerfil[] | null>(null)
  const [msg, setMsg] = useState<string | null>(null)
  const [ocupado, setOcupado] = useState(false)

  const carregar = useCallback(async () => {
    if (!supabase) return
    const [c, p] = await Promise.all([supabase.rpc('admin_ler_codigo'), supabase.rpc('admin_listar_perfis')])
    if (c.error || p.error) { setMsg(traduzir((c.error ?? p.error)!.message)); return }
    setCodigo(c.data as string)
    setPerfis(p.data as LinhaPerfil[])
  }, [])

  useEffect(() => { void carregar() }, [carregar])

  async function acao(f: () => PromiseLike<{ error: { message: string } | null }>, ok: string) {
    setOcupado(true); setMsg(null)
    const { error } = await f()
    setOcupado(false)
    if (error) { setMsg(traduzir(error.message)); return }
    setMsg(ok)
    await carregar()
  }

  if (!perfil?.admin) return <Carregando texto="Área restrita ao administrador." />
  if (!supabase) return <Carregando texto="Disponível só com o login configurado." />
  if (!perfis) return <Carregando texto={msg ?? 'Carregando…'} />

  const pendentes = perfis.filter((p) => p.status === 'pendente')
  const aprovados = perfis.filter((p) => p.status === 'aprovado')
  const data = (s: string) => new Date(s).toLocaleDateString('pt-BR')

  return (
    <>
      <Cabecalho titulo="Administração" sub="Convites e aprovações" />
      {msg && <Card className="text-sm">{msg}</Card>}

      <Secao>Código de convite</Secao>
      <Card>
        <div className="text-suave text-[13px]">Código atual</div>
        <div className="text-[22px] font-bold tracking-wide mb-3 select-all">{codigo}</div>
        <div className="flex gap-2">
          <input value={novo} onChange={(e) => setNovo(e.target.value)} placeholder="Novo código"
            autoCapitalize="characters" className="flex-1 p-2.5 rounded-lg bg-card2 text-texto outline-none min-w-0" />
          <button disabled={ocupado || novo.trim().length < 4}
            onClick={() => void acao(() => supabase!.rpc('admin_mudar_codigo', { novo: novo.trim() }), 'Código atualizado.').then(() => setNovo(''))}
            className="px-4 rounded-lg bg-destaque text-white font-bold disabled:opacity-40">Salvar</button>
        </div>
        <div className="text-suave text-xs mt-2">Quem tiver o código consegue se cadastrar, mas só entra depois que você aprovar. Trocar o código não afeta quem já tem conta.</div>
      </Card>

      <Secao>Aguardando aprovação · {pendentes.length}</Secao>
      {pendentes.length === 0 && <Card className="text-suave text-sm">Ninguém aguardando.</Card>}
      {pendentes.map((p) => (
        <Card key={p.user_id}>
          <div className="flex justify-between items-center">
            <b>{p.usuario}</b>
            <span className="text-suave text-xs">cadastro em {data(p.criado_em)}</span>
          </div>
          <div className="flex gap-2 mt-3">
            <button disabled={ocupado} onClick={() => void acao(() => supabase!.rpc('admin_aprovar', { alvo: p.user_id }), `${p.usuario} aprovado.`)}
              className="flex-1 py-2 rounded-lg bg-verde text-[#0b1a12] font-bold text-sm disabled:opacity-40">Aprovar</button>
            <button disabled={ocupado}
              onClick={() => { if (window.confirm(`Recusar ${p.usuario}? A conta será apagada.`)) void acao(() => supabase!.rpc('admin_remover', { alvo: p.user_id }), `${p.usuario} recusado.`) }}
              className="flex-1 py-2 rounded-lg bg-card2 text-[#ff8a8d] text-sm disabled:opacity-40">Recusar</button>
          </div>
        </Card>
      ))}

      <Secao>Com acesso · {aprovados.length}</Secao>
      <Card>
        {aprovados.map((p) => (
          <div key={p.user_id} className="flex items-center gap-2 py-2 border-b border-linha last:border-b-0">
            <div className="flex-1 min-w-0">
              <b>{p.usuario}</b> {p.admin && <Pill cor="yellow">admin</Pill>}
              <div className="text-suave text-xs">desde {data(p.aprovado_em ?? p.criado_em)}</div>
            </div>
            {!p.admin && (
              <button disabled={ocupado}
                onClick={() => { if (window.confirm(`Remover ${p.usuario}? A conta e todo o progresso dela serão apagados.`)) void acao(() => supabase!.rpc('admin_remover', { alvo: p.user_id }), `${p.usuario} removido.`) }}
                className="text-[#ff8a8d] text-sm px-2 disabled:opacity-40">Remover</button>
            )}
          </div>
        ))}
      </Card>
    </>
  )
}
