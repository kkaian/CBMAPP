import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth'
import { CardInstalar, CardNotificacoes } from '../components/Extras'
import { Card, Carregando } from '../components/ui'
import { noCaderno, revisoesPendentes } from '../lib/stats'
import { ouvirSync, sincronizar, type EstadoSync } from '../lib/sync'
import { useRevisoes } from '../lib/useDados'

export default function Mais() {
  const nav = useNavigate()
  const revisoes = useRevisoes()
  const { usuario, sair, perfil } = useAuth()
  const [sync, setSync] = useState<EstadoSync | null>(null)
  useEffect(() => ouvirSync(setSync), [])
  if (!revisoes) return <Carregando />

  const itens = [
    { icone: '📕', titulo: 'Caderno de erros', sub: `${noCaderno(revisoes).length} itens · ${revisoesPendentes(revisoes).length} vencem hoje`, para: '/erros' },
    { icone: '🤔', titulo: 'Caderno de dúvidas', sub: 'acertos na dúvida, para voltar quando quiser', para: '/duvidas' },
    { icone: '🎖️', titulo: 'Perfil e conquistas', sub: 'patente, XP, meta diária', para: '/perfil' },
    { icone: '🏆', titulo: 'Ranking', sub: 'XP da semana e geral, perfil dos colegas', para: '/ranking' },
    { icone: '📝', titulo: 'Simulados', sub: 'completo, mini, pontos fracos e 01–05', para: '/simulados' },
    { icone: '✍️', titulo: 'Redação', sub: 'estudo, 30 temas, calculadora da nota', para: '/redacao' },
    { icone: '🗓️', titulo: 'Plano de estudos', sub: 'em breve', para: '/em-breve?o=Plano de estudos' },
    ...(perfil?.admin ? [{ icone: '🛡️', titulo: 'Administração', sub: 'código de convite e aprovação de contas', para: '/admin' }] : []),
  ]

  const textoSync: Record<EstadoSync['status'], string> = {
    local: 'Modo local: os dados ficam só neste aparelho (Supabase não configurado).',
    ok: `Sincronizado${sync?.ultima ? ` às ${new Date(sync.ultima).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}` : ''}.`,
    pendente: sync?.mensagem ?? 'Aguardando sincronização.',
    sincronizando: 'Sincronizando…',
    erro: `Erro ao sincronizar: ${sync?.mensagem ?? ''}`,
  }

  return (
    <>
      <h2 className="text-[22px] font-bold mb-3">Mais</h2>
      <CardInstalar />
      <CardNotificacoes />
      {itens.map((i) => (
        <Card key={i.para} onClick={() => nav(i.para)} className="flex items-center gap-3">
          <span className="text-2xl">{i.icone}</span>
          <div className="flex-1"><b>{i.titulo}</b><div className="text-suave text-[13px]">{i.sub}</div></div>
          <span className="text-suave">›</span>
        </Card>
      ))}
      <Card className="text-sm mt-5">
        <div className="flex justify-between items-center">
          <span className="text-suave">Conta</span><b>{usuario}</b>
        </div>
        {sync && <div className={`mt-2 ${sync.status === 'erro' ? 'text-[#ff8a8d]' : 'text-suave'}`}>{textoSync[sync.status]}</div>}
        {sync && sync.status !== 'local' && (
          <div className="flex gap-2 mt-3">
            <button onClick={() => void sincronizar()} className="flex-1 py-2 rounded-lg bg-card2">Sincronizar agora</button>
            <button onClick={() => { if (window.confirm('Sair desta conta? Os dados já sincronizados continuam salvos na nuvem.')) void sair() }} className="flex-1 py-2 rounded-lg bg-card2 text-[#ff8a8d]">Sair</button>
          </div>
        )}
      </Card>
    </>
  )
}
