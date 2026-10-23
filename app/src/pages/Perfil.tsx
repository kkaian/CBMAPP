import { useLiveQuery } from 'dexie-react-hooks'
import { Barra, Cabecalho, Card, Carregando, Secao } from '../components/ui'
import { useIndice } from '../lib/conteudo'
import { gravarConfig, lerConfig } from '../lib/db'
import {
  PATENTES, calcularStreak, calcularXp, diagnosticoPorTopico, diasComEstudo, noCaderno, patente,
} from '../lib/stats'
import { useLeituras, useMetaDiaria, useRespostas, useRevisoes } from '../lib/useDados'

export default function Perfil() {
  const { dados: ind } = useIndice()
  const respostas = useRespostas()
  const leituras = useLeituras()
  const revisoes = useRevisoes()
  const meta = useMetaDiaria()
  const reportes = useLiveQuery(() => lerConfig<{ itemId: string; motivo: string; em: string }[]>('reportes', []), [])
  if (!ind || !respostas || !leituras || !revisoes) return <Carregando />

  const xp = calcularXp(respostas, leituras)
  const p = patente(xp)
  const streak = calcularStreak(diasComEstudo(respostas))
  const porMateria = (m: string) => respostas.filter((r) => r.materia === m).length
  const diag = diagnosticoPorTopico(respostas)
  const rlmVerde = ind.edital.materias.find((m) => m.codigo === 'RLM')!.topicos.every((t) => diag[t.codigo]?.status === 'dominado')
  const ultimos30 = new Set([...diasComEstudo(respostas)])

  const conquistas = [
    { icone: '🎯', nome: 'Primeiro item', ok: respostas.length >= 1 },
    { icone: '💯', nome: '100 itens', ok: respostas.length >= 100 },
    { icone: '🏅', nome: '1.000 itens', ok: respostas.length >= 1000 },
    { icone: '🔥', nome: '7 dias seguidos', ok: streak.dias >= 7 },
    { icone: '🏆', nome: '30 dias seguidos', ok: streak.dias >= 30 },
    { icone: '⚛️', nome: '100 itens de Física', ok: porMateria('FIS') >= 100 },
    { icone: '🧪', nome: '100 itens de Química', ok: porMateria('QUI') >= 100 },
    { icone: '🧮', nome: '100 itens de Matemática', ok: porMateria('MAT') >= 100 },
    { icone: '🧠', nome: 'Raciocínio Lógico todo verde', ok: rlmVerde },
    { icone: '📕', nome: 'Caderno de erros zerado (com 20+ revisões)', ok: noCaderno(revisoes).length === 0 && respostas.filter((r) => r.modo === 'revisao').length >= 20 },
    { icone: '📖', nome: '10 resumos lidos', ok: new Set(leituras.map((l) => l.topico)).size >= 10 },
    { icone: '📅', nome: '20 dias de estudo', ok: ultimos30.size >= 20 },
  ]

  return (
    <>
      <Cabecalho titulo="Perfil" />
      <Card>
        <div className="flex justify-between"><b>{p.nome}</b><span className="text-suave text-sm">{xp.toLocaleString('pt-BR')}{p.proximaXp ? ` / ${p.proximaXp.toLocaleString('pt-BR')}` : ''} XP</span></div>
        <div className="my-2"><Barra valor={p.proximaXp ? (xp - p.base) / (p.proximaXp - p.base) : 1} cor="yellow" /></div>
        <div className="text-suave text-[12px] leading-relaxed">
          {PATENTES.map(([n], i) => <span key={n} className={i === p.nivel ? 'text-texto font-bold' : ''}>{n}{i < PATENTES.length - 1 ? ' → ' : ''}</span>)}
        </div>
        <div className="text-suave text-xs mt-2">XP: 10 por item (branco 4), +5 por acerto com certeza, +3 por revisão, 20 por leitura.</div>
      </Card>

      <Secao>Conquistas · {conquistas.filter((c) => c.ok).length}/{conquistas.length}</Secao>
      <div className="grid grid-cols-4 gap-2">
        {conquistas.map((c) => (
          <div key={c.nome} title={c.nome} className={`bg-card rounded-xl p-2 text-center ${c.ok ? '' : 'opacity-30 grayscale'}`}>
            <div className="text-2xl">{c.icone}</div>
            <div className="text-[10px] leading-tight text-suave mt-1">{c.nome}</div>
          </div>
        ))}
      </div>

      <Secao>Configurações</Secao>
      <Card className="text-sm">
        <label className="flex justify-between items-center">
          <span>Meta diária (itens)</span>
          <select value={meta} onChange={(e) => void gravarConfig('metaDiaria', Number(e.target.value))} className="bg-card2 rounded-lg px-2 py-1">
            {[20, 30, 40, 50, 60, 80, 100].map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </label>
        <div className="flex justify-between mt-2"><span>Data da prova</span><b>{ind.edital.dataProva.split('-').reverse().join('/')}</b></div>
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
