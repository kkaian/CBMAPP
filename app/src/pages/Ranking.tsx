import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Barra, Cabecalho, Card, Carregando, Pill, Secao, pct } from '../components/ui'
import { useIndice } from '../lib/conteudo'
import { diaLocal, inicioSemana } from '../lib/datas'
import { buscarRanking, publicarResumo, type LinhaRanking } from '../lib/ranking'
import { PATENTES } from '../lib/stats'
import { modoLocal, supabase } from '../lib/supabase'

type Estado = { linhas: LinhaRanking[]; eu: string | null } | { erro: string }

// Carrega o ranking (publica antes o próprio resumo, para aparecer atualizado)
function useRanking(): Estado | null {
  const [estado, setEstado] = useState<Estado | null>(null)
  useEffect(() => {
    let vivo = true
    void (async () => {
      if (modoLocal || !supabase) { setEstado({ erro: 'O ranking precisa do login (modo local ativo).' }); return }
      if (!navigator.onLine) { setEstado({ erro: 'Sem internet: o ranking só abre conectado.' }); return }
      try {
        await publicarResumo().catch(() => undefined)
        const [{ data }, linhas] = await Promise.all([supabase.auth.getUser(), buscarRanking()])
        if (vivo) setEstado({ linhas, eu: data.user?.id ?? null })
      } catch (e) {
        if (vivo) setEstado({ erro: `Não foi possível carregar o ranking: ${(e as Error).message}` })
      }
    })()
    return () => { vivo = false }
  }, [])
  return estado
}

// XP da semana só vale se o resumo foi publicado nesta semana (segunda a domingo)
function xpSemana(l: LinhaRanking): number {
  return inicioSemana(diaLocal(new Date(l.atualizadoEm))) === inicioSemana(diaLocal()) ? l.dados.xpSemana : 0
}

function itensSemana(l: LinhaRanking): number {
  return inicioSemana(diaLocal(new Date(l.atualizadoEm))) === inicioSemana(diaLocal()) ? l.dados.itensSemana : 0
}

const MEDALHAS = ['🥇', '🥈', '🥉']

export default function Ranking() {
  const estado = useRanking()
  const nav = useNavigate()
  const [aba, setAba] = useState<'semana' | 'total'>('semana')
  if (!estado) return <Carregando />
  if ('erro' in estado) return (<><Cabecalho titulo="Ranking" /><Card className="text-sm text-suave">{estado.erro}</Card></>)

  const visiveis = estado.linhas.filter((l) => l.visivel || l.userId === estado.eu)
  const valor = (l: LinhaRanking) => (aba === 'semana' ? xpSemana(l) : l.dados.xp)
  const ordenadas = [...visiveis].sort((a, b) => valor(b) - valor(a) || b.dados.xp - a.dados.xp)
  const eu = estado.linhas.find((l) => l.userId === estado.eu)

  return (
    <>
      <Cabecalho titulo="Ranking" sub="XP de quem estuda com o app" />
      <div className="grid grid-cols-2 gap-2 mb-3">
        {(['semana', 'total'] as const).map((a) => (
          <button key={a} onClick={() => setAba(a)}
            className={`py-2 rounded-xl border text-[13px] ${aba === a ? 'border-azul bg-[#1b2740]' : 'border-linha bg-card'}`}>
            {a === 'semana' ? 'Esta semana' : 'Geral'}
          </button>
        ))}
      </div>

      {ordenadas.length <= 1 && (
        <Card className="text-sm text-suave">
          Por enquanto só você está aqui. Quando seu amigo criar a conta (com o código de convite) e você aprovar em Mais › Administração, ele aparece no ranking.
        </Card>
      )}

      {ordenadas.map((l, i) => {
        const souEu = l.userId === estado.eu
        return (
          <Card key={l.userId} onClick={() => nav(`/ranking/${l.userId}`)} className={`flex items-center gap-3 ${souEu ? 'border border-azul/50' : ''}`}>
            <div className="w-8 text-center text-xl">{MEDALHAS[i] ?? <span className="text-suave text-base">{i + 1}º</span>}</div>
            <div className="flex-1 min-w-0">
              <div className="truncate"><b>{l.usuario}</b>{souEu && <span className="text-suave"> (você)</span>}</div>
              <div className="text-suave text-[12px]">{l.dados.patente} · 🔥 {l.dados.streak} · {itensSemana(l)} itens na semana</div>
            </div>
            <div className="text-right">
              <div className="font-bold">{valor(l).toLocaleString('pt-BR')}</div>
              <div className="text-suave text-[11px]">XP{aba === 'semana' ? ' na semana' : ''}</div>
            </div>
          </Card>
        )
      })}

      {eu && !eu.visivel && <div className="text-suave text-[12px] mt-2">Você está oculto: os colegas não veem seu perfil. Mude em Perfil.</div>}
      <div className="text-suave text-[12px] mt-3">A semana vai de segunda a domingo. O ranking mostra só totais (XP, itens, acerto, conquistas), nunca as respostas.</div>
    </>
  )
}

export function PerfilColega() {
  const { id = '' } = useParams()
  const estado = useRanking()
  const { dados: ind } = useIndice()
  if (!estado || !ind) return <Carregando />
  if ('erro' in estado) return (<><Cabecalho titulo="Perfil" /><Card className="text-sm text-suave">{estado.erro}</Card></>)
  const l = estado.linhas.find((x) => x.userId === id)
  if (!l) return (<><Cabecalho titulo="Perfil" /><Card className="text-sm text-suave">Perfil não encontrado ou oculto.</Card></>)
  const souEu = l.userId === estado.eu
  const eu = souEu ? null : estado.linhas.find((x) => x.userId === estado.eu) ?? null
  const d = l.dados
  const prox = PATENTES[d.nivel + 1]
  const base = PATENTES[d.nivel][1]

  return (
    <>
      <Cabecalho titulo={l.usuario} sub={souEu ? 'Como os colegas veem você' : `Atualizado em ${new Date(l.atualizadoEm).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}`} />
      <Card>
        <div className="flex justify-between"><b>{d.patente}</b><span className="text-suave text-sm">{d.xp.toLocaleString('pt-BR')}{prox ? ` / ${prox[1].toLocaleString('pt-BR')}` : ''} XP</span></div>
        <div className="mt-2"><Barra valor={prox ? (d.xp - base) / (prox[1] - base) : 1} cor="yellow" /></div>
      </Card>

      <Secao>{eu ? `Comparando com você` : 'Números'}</Secao>
      <Card className="!p-0 overflow-hidden">
        <table className="w-full text-sm">
          {eu && <thead className="text-suave text-xs"><tr><th /><th className="font-normal p-2 text-right">{l.usuario}</th><th className="font-normal p-2 pr-3 text-right">você</th></tr></thead>}
          <tbody>
            {[
              ['XP na semana', (x: LinhaRanking) => xpSemana(x).toLocaleString('pt-BR')],
              ['Itens na semana', (x: LinhaRanking) => String(itensSemana(x))],
              ['Acerto na semana', (x: LinhaRanking) => pct(itensSemana(x) ? x.dados.acertoSemana : null)],
              ['Sequência', (x: LinhaRanking) => `🔥 ${x.dados.streak} ${x.dados.streak === 1 ? 'dia' : 'dias'}`],
              ['Dias de estudo', (x: LinhaRanking) => String(x.dados.diasEstudo)],
              ['Itens no total', (x: LinhaRanking) => x.dados.itens.toLocaleString('pt-BR')],
              ['Conquistas', (x: LinhaRanking) => `${x.dados.conquistas.length}/${x.dados.totalConquistas}`],
              ['Simulados', (x: LinhaRanking) => String(x.dados.simulados.feitos)],
              ['Melhor simulado completo', (x: LinhaRanking) => x.dados.simulados.melhorCompleto == null ? '—' : String(x.dados.simulados.melhorCompleto)],
            ].map(([rotulo, f]) => {
              const fn = f as (x: LinhaRanking) => string
              return (
                <tr key={rotulo as string} className="border-t border-linha first:border-t-0">
                  <td className="p-2.5 text-suave">{rotulo as string}</td>
                  <td className="p-2.5 text-right font-bold">{fn(l)}</td>
                  {eu && <td className="p-2.5 pr-3 text-right">{fn(eu)}</td>}
                </tr>
              )
            })}
          </tbody>
        </table>
      </Card>

      {d.simulados.ultimo && (
        <Card className="text-sm flex justify-between items-center">
          <span><span className="text-suave">Último simulado:</span> {d.simulados.ultimo.titulo} <span className="text-suave">· {d.simulados.ultimo.itens} itens</span></span>
          <Pill cor={d.simulados.ultimo.passou ? 'green' : 'red'}>nota {d.simulados.ultimo.nota}</Pill>
        </Card>
      )}

      {d.materias.length > 0 && (
        <>
          <Secao>Acerto por matéria</Secao>
          <Card className="!p-0 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="text-suave text-xs"><tr><th className="text-left font-normal p-2.5">Matéria</th><th className="font-normal p-2 text-right">{eu ? l.usuario : 'acerto'}</th>{eu && <th className="font-normal p-2 pr-3 text-right">você</th>}</tr></thead>
              <tbody>
                {ind.edital.materias.filter((m) => d.materias.some((x) => x.codigo === m.codigo) || eu?.dados.materias.some((x) => x.codigo === m.codigo)).map((m) => {
                  const dele = d.materias.find((x) => x.codigo === m.codigo)
                  const meu = eu?.dados.materias.find((x) => x.codigo === m.codigo)
                  return (
                    <tr key={m.codigo} className="border-t border-linha">
                      <td className="p-2.5">{m.nome}</td>
                      <td className="p-2.5 text-right">{dele ? <><b>{pct(dele.acerto)}</b><span className="text-suave text-xs"> · {dele.itens}</span></> : '—'}</td>
                      {eu && <td className="p-2.5 pr-3 text-right">{meu ? <>{pct(meu.acerto)}<span className="text-suave text-xs"> · {meu.itens}</span></> : '—'}</td>}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </Card>
          <div className="text-suave text-[11px] -mt-1 mb-2">Acerto nas respostas recentes de cada tópico · número de itens respondidos.</div>
        </>
      )}

      <Secao>Conquistas · {d.conquistas.length}/{d.totalConquistas}</Secao>
      {d.conquistas.length ? (
        <div className="grid grid-cols-4 gap-2">
          {d.conquistas.map((c) => (
            <div key={c.nome} title={c.nome} className="bg-card rounded-xl p-2 text-center">
              <div className="text-2xl">{c.icone}</div>
              <div className="text-[10px] leading-tight text-suave mt-1">{c.nome}</div>
            </div>
          ))}
        </div>
      ) : <Card className="text-sm text-suave">Nenhuma ainda.</Card>}
    </>
  )
}
