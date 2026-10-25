import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Barra, Cabecalho, Card, Carregando, Secao } from '../components/ui'
import { useIndice } from '../lib/conteudo'
import { db, gravarConfig, lerConfig } from '../lib/db'
import { calcularConquistas } from '../lib/conquistas'
import { definirVisivel } from '../lib/ranking'
import { modoLocal } from '../lib/supabase'
import { PATENTES, calcularXp, patente } from '../lib/stats'
import { useLeituras, useMetaDiaria, useRespostas, useRevisoes } from '../lib/useDados'

export default function Perfil() {
  const { dados: ind } = useIndice()
  const respostas = useRespostas()
  const leituras = useLeituras()
  const revisoes = useRevisoes()
  const meta = useMetaDiaria()
  const simulados = useLiveQuery(() => db.simulados.where('status').equals('concluido').toArray(), [])
  const visivel = useLiveQuery(() => lerConfig<boolean>('ranking.visivel', true), [])
  const [mudando, setMudando] = useState(false)
  const nav = useNavigate()
  const reportes = useLiveQuery(() => lerConfig<{ itemId: string; motivo: string; em: string }[]>('reportes', []), [])
  if (!ind || !respostas || !leituras || !revisoes) return <Carregando />

  const xp = calcularXp(respostas, leituras)
  const p = patente(xp)
  const grupos = calcularConquistas({ ind, respostas, leituras, revisoes, simulados: simulados ?? [] })
  const conquistas = grupos.flatMap((g) => g.itens)

  return (
    <>
      <Cabecalho titulo="Perfil" />
      {!modoLocal && <Card onClick={() => nav('/ranking')} className="flex justify-between items-center text-sm"><span>🏆 <b>Ranking</b> <span className="text-suave">· XP da semana e perfil dos colegas</span></span><span className="text-suave">›</span></Card>}
      <Card>
        <div className="flex justify-between"><b>{p.nome}</b><span className="text-suave text-sm">{xp.toLocaleString('pt-BR')}{p.proximaXp ? ` / ${p.proximaXp.toLocaleString('pt-BR')}` : ''} XP</span></div>
        <div className="my-2"><Barra valor={p.proximaXp ? (xp - p.base) / (p.proximaXp - p.base) : 1} cor="yellow" /></div>
        <div className="text-suave text-[12px] leading-relaxed">
          {PATENTES.map(([n], i) => <span key={n} className={i === p.nivel ? 'text-texto font-bold' : ''}>{n}{i < PATENTES.length - 1 ? ' → ' : ''}</span>)}
        </div>
        <div className="text-suave text-xs mt-2">XP: 10 por item (branco 4), +5 por acerto com certeza, +3 por revisão, 20 por leitura.</div>
      </Card>

      <Secao>Conquistas · {conquistas.filter((c) => c.ok).length}/{conquistas.length}</Secao>
      {grupos.map((g) => (
        <div key={g.titulo} className="mb-3">
          <div className="text-suave text-[12px] mb-1.5">{g.titulo} · {g.itens.filter((c) => c.ok).length}/{g.itens.length}</div>
          <div className="grid grid-cols-4 gap-2">
            {g.itens.map((c) => (
              <div key={c.nome} title={c.nome} className={`bg-card rounded-xl p-2 text-center ${c.ok ? '' : 'opacity-30 grayscale'}`}>
                <div className="text-2xl">{c.icone}</div>
                <div className="text-[10px] leading-tight text-suave mt-1">{c.nome}</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <Secao>Configurações</Secao>
      <Card className="text-sm">
        <label className="flex justify-between items-center">
          <span>Meta diária (itens)</span>
          <select value={meta} onChange={(e) => void gravarConfig('metaDiaria', Number(e.target.value))} className="bg-card2 rounded-lg px-2 py-1">
            {[20, 30, 40, 50, 60, 80, 100].map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </label>
        <div className="flex justify-between mt-2"><span>Data da prova</span><b>{ind.edital.dataProva.split('-').reverse().join('/')}</b></div>
        {!modoLocal && (
          <label className="flex justify-between items-center mt-2 gap-3">
            <span>Aparecer no ranking<div className="text-suave text-xs">Os colegas aprovados veem seu XP, sequência, acerto por matéria e conquistas (nunca as respostas).</div></span>
            <input type="checkbox" className="w-5 h-5 shrink-0" checked={visivel ?? true} disabled={mudando}
              onChange={async (e) => {
                setMudando(true)
                try { await definirVisivel(e.target.checked) } catch { window.alert('Sem conexão: a mudança vale na próxima sincronização.') } finally { setMudando(false) }
              }} />
          </label>
        )}
      </Card>

      {reportes && reportes.length > 0 && (
        <>
          <Secao>Questões reportadas · {reportes.length}</Secao>
          <Card className="text-sm">
            {reportes.map((r, i) => (
              <div key={i} className="py-1 border-b border-linha last:border-b-0"><b>{r.itemId}</b> <span className="text-suave">· {r.motivo}</span></div>
            ))}
            <div className="text-suave text-xs mt-2">Mande essa lista nas sessões de produção para corrigirmos os itens.</div>
          </Card>
        </>
      )}
    </>
  )
}
