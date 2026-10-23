import { useEffect, useState } from 'react'
import { useInstalacao } from '../lib/instalar'
import { ativarPush, desativarPush, lerEstadoPush, mudarHoraPush, pushSuportado, testarNotificacao, type EstadoPush } from '../lib/push'
import { modoLocal } from '../lib/supabase'
import { Card } from './ui'

const botao = 'flex-1 py-2 rounded-lg bg-card2 text-sm disabled:opacity-40'

export function CardInstalar({ compacto = false }: { compacto?: boolean }) {
  const { estado, instalar } = useInstalacao()
  if (estado === 'instalado') {
    return compacto ? null : <Card className="text-sm"><b>📲 App instalado</b><div className="text-suave">Você está usando o app pela tela inicial.</div></Card>
  }
  return (
    <Card className="text-sm">
      <div className="flex items-center gap-3">
        <span className="text-2xl">📲</span>
        <div className="flex-1">
          <b>Instalar na tela inicial</b>
          <div className="text-suave text-[13px]">Abre como app, em tela cheia, e funciona sem internet.</div>
        </div>
      </div>
      {estado === 'disponivel' && <button onClick={() => void instalar()} className="w-full mt-3 py-2.5 rounded-xl bg-destaque text-white font-bold">Instalar app</button>}
      {estado === 'ios' && <div className="text-suave text-[13px] mt-2">No iPhone: toque em <b className="text-texto">Compartilhar</b> (quadrado com seta) › <b className="text-texto">Adicionar à Tela de Início</b>. Use o Safari.</div>}
      {estado === 'manual' && <div className="text-suave text-[13px] mt-2">No Chrome do celular: menu <b className="text-texto">⋮</b> › <b className="text-texto">Instalar app</b> (ou "Adicionar à tela inicial"). Se o botão não aparecer, abra o site uma segunda vez.</div>}
    </Card>
  )
}

export function CardNotificacoes() {
  const [estado, setEstado] = useState<EstadoPush | null>(null)
  const [ocupado, setOcupado] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)
  const suportado = typeof window !== 'undefined' && pushSuportado()

  useEffect(() => { if (suportado) void lerEstadoPush().then(setEstado) }, [suportado])

  async function executar(f: () => Promise<void>, ok?: string) {
    setOcupado(true); setMsg(null)
    try { await f(); if (ok) setMsg(ok); setEstado(await lerEstadoPush()) } catch (e) { setMsg((e as Error).message) } finally { setOcupado(false) }
  }

  return (
    <Card className="text-sm">
      <div className="flex items-center gap-3">
        <span className="text-2xl">🔔</span>
        <div className="flex-1">
          <b>Lembrete diário</b>
          <div className="text-suave text-[13px]">Avisa no horário escolhido se você ainda não bateu a meta do dia, com as revisões pendentes.</div>
        </div>
      </div>
      {!suportado && <div className="text-suave text-[13px] mt-2">Este navegador não suporta notificações. No iPhone, instale o app na tela inicial primeiro (iOS 16.4 ou mais novo).</div>}
      {suportado && modoLocal && <div className="text-suave text-[13px] mt-2">Disponível quando o login estiver configurado.</div>}
      {suportado && !modoLocal && estado && (
        <>
          <label className="flex justify-between items-center mt-3">
            <span>Horário</span>
            <select value={estado.hora} disabled={ocupado}
              onChange={(e) => { const h = Number(e.target.value); setEstado({ ...estado, hora: h }); if (estado.ativo) void executar(() => mudarHoraPush(h), 'Horário atualizado.') }}
              className="bg-card2 rounded-lg px-2 py-1">
              {Array.from({ length: 18 }, (_, i) => i + 6).map((h) => <option key={h} value={h}>{String(h).padStart(2, '0')}:00</option>)}
            </select>
          </label>
          <div className="flex gap-2 mt-3">
            {estado.ativo
              ? <button disabled={ocupado} onClick={() => void executar(desativarPush, 'Lembrete desligado.')} className={botao}>Desligar</button>
              : <button disabled={ocupado} onClick={() => void executar(() => ativarPush(estado.hora), 'Lembrete ligado.')} className="flex-1 py-2 rounded-lg bg-destaque text-white font-bold text-sm disabled:opacity-40">Ligar lembrete</button>}
            <button disabled={ocupado || estado.permissao !== 'granted'} onClick={() => void executar(testarNotificacao)} className={botao}>Testar</button>
          </div>
          <div className="text-suave text-[12px] mt-2">
            {estado.ativo ? `Ligado para ${String(estado.hora).padStart(2, '0')}:00 (horário de Maceió). Pode atrasar alguns minutos.` : estado.permissao === 'denied' ? 'Notificações bloqueadas: libere nas configurações do navegador.' : 'Desligado.'}
          </div>
        </>
      )}
      {msg && <div className="text-[13px] mt-2">{msg}</div>}
    </Card>
  )
}
