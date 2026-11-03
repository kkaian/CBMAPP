import { useLiveQuery } from 'dexie-react-hooks'
import { useEffect, useState } from 'react'
import { calcularConquistas } from '../lib/conquistas'
import { useIndice } from '../lib/conteudo'
import { db, gravarConfig, lerConfig } from '../lib/db'
import { ouvirSync } from '../lib/sync'
import { useLeituras, useMetaDiaria, useRespostas, useRevisoes } from '../lib/useDados'

interface Nova { icone: string; nome: string; grupo: string }

// Aviso de conquista desbloqueada, por cima de qualquer tela.
// - Guarda no aparelho os nomes já vistos ("conquistas.vistas").
// - Na primeira vez (sem nada guardado), só registra as que já existem, sem avisar.
// - Com login, espera a primeira sincronização da sessão: o histórico baixado de outro aparelho não vira aviso.
// - Espera 1,5 s sem mudanças antes de comparar (a entrega de um simulado grava 120 respostas seguidas).
export default function AvisoConquista({ abrirPerfil }: { abrirPerfil: () => void }) {
  const { dados: ind } = useIndice()
  const respostas = useRespostas()
  const leituras = useLeituras()
  const revisoes = useRevisoes()
  const meta = useMetaDiaria()
  const simulados = useLiveQuery(() => db.simulados.where('status').equals('concluido').toArray(), [])
  const redacoes = useLiveQuery(() => db.redacoes.toArray(), [])
  const [sincronizado, setSincronizado] = useState(false)
  const [fila, setFila] = useState<Nova[]>([])

  useEffect(() => ouvirSync((s) => {
    if (s.status === 'local' || s.status === 'ok' || s.status === 'erro' || (s.status === 'pendente' && s.mensagem)) setSincronizado(true)
  }), [])

  useEffect(() => {
    if (!sincronizado || !ind || !respostas || !leituras || !revisoes || !simulados || !redacoes) return
    const timer = setTimeout(() => {
      void (async () => {
        const atuais = calcularConquistas({ ind, respostas, leituras, revisoes, simulados, redacoes, metaDiaria: meta })
          .flatMap((g) => g.itens.filter((c) => c.ok).map((c) => ({ icone: c.icone, nome: c.nome, grupo: g.titulo })))
        const vistas = await lerConfig<string[] | null>('conquistas.vistas', null)
        if (vistas === null) { await gravarConfig('conquistas.vistas', atuais.map((c) => c.nome)); return }
        const novas = atuais.filter((c) => !vistas.includes(c.nome))
        if (!novas.length) return
        await gravarConfig('conquistas.vistas', [...vistas, ...novas.map((c) => c.nome)])
        setFila((f) => [...f, ...novas.filter((n) => !f.some((x) => x.nome === n.nome))])
      })()
    }, 1500)
    return () => clearTimeout(timer)
  }, [sincronizado, ind, respostas, leituras, revisoes, simulados, redacoes, meta])

  const atual = fila[0]
  if (!atual) return null
  const proxima = () => setFila((f) => f.slice(1))
  const restantes = fila.length - 1

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6" role="dialog" aria-modal="true" aria-label="Conquista desbloqueada" onClick={proxima}>
      <div className="w-full max-w-sm rounded-2xl border border-amarelo/50 bg-card p-6 text-center shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="text-amarelo text-xs font-bold uppercase tracking-wide">Conquista desbloqueada</div>
        <div className="text-6xl my-4">{atual.icone}</div>
        <div className="text-xl font-bold leading-snug">{atual.nome}</div>
        <div className="text-suave text-[13px] mt-1">{atual.grupo}</div>
        <button type="button" onClick={proxima} className="mt-5 w-full py-3 rounded-xl bg-destaque text-white font-bold">
          {restantes > 0 ? `Próxima (+${restantes})` : 'Continuar'}
        </button>
        <button type="button" onClick={() => { setFila([]); abrirPerfil() }} className="mt-2 w-full py-2 text-suave text-sm">Ver todas as conquistas</button>
      </div>
    </div>
  )
}
