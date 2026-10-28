import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Rico } from '../components/Rico'
import { Barra, Botao, Card, Carregando, Pill } from '../components/ui'
import { acharTopico, carregarMateria, materiaDoTopico, useIndice } from '../lib/conteudo'
import { registrarLeitura } from '../lib/estudo'
import { topicosParaTrilha } from '../lib/selecao'

// Trilha de revisão: 6 tópicos que a pessoa não vê há mais tempo.
// Primeiro os resumos, um por tela (com "ok" no fim de cada), depois 30 itens (5 por tópico).
export default function Trilha() {
  const [params, setParams] = useSearchParams()
  const nav = useNavigate()
  const { dados: ind } = useIndice()
  const topicos = (params.get('t') ?? '').split(',').filter(Boolean)
  const etapa = Number(params.get('e') ?? 0)
  const [resumos, setResumos] = useState<Record<string, string>>({})

  // sorteia os tópicos uma vez e guarda na URL (recarregar a página não troca a trilha)
  useEffect(() => {
    if (topicos.length) return
    topicosParaTrilha(6).then((ts) => setParams({ t: ts.join(','), e: '0' }, { replace: true }))
  }, [topicos.length, setParams])

  useEffect(() => {
    if (!topicos.length) return
    let vivo = true
    Promise.all(topicos.map(async (t) => [t, (await carregarMateria(materiaDoTopico(t))).conteudos[t]?.resumo ?? ''] as const))
      .then((pares) => { if (vivo) setResumos(Object.fromEntries(pares)) })
    return () => { vivo = false }
  }, [params.get('t')]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!ind || !topicos.length || !Object.keys(resumos).length) return <Carregando texto="Montando a trilha…" />

  const t = topicos[etapa]
  const info = acharTopico(ind, t)
  const ultimo = etapa === topicos.length - 1

  const avancar = () => {
    void registrarLeitura(t, 'resumo')
    if (ultimo) nav(`/quiz?modo=trilha&t=${topicos.join(',')}&n=${topicos.length * 5}`, { replace: true })
    else {
      setParams({ t: topicos.join(','), e: String(etapa + 1) })
      window.scrollTo(0, 0)
    }
  }

  return (
    <>
      <div className="flex justify-between items-center text-sm text-suave">
        <button onClick={() => nav('/questoes')} className="px-1 -ml-1">✕</button>
        <span>🧭 Trilha de revisão · resumo {etapa + 1} de {topicos.length}</span>
        <span />
      </div>
      <div className="my-2.5"><Barra valor={etapa / (topicos.length + 1)} cor="blue" /></div>

      <div className="flex flex-wrap gap-1 mb-3">
        {topicos.map((x, i) => <Pill key={x} cor={i < etapa ? 'green' : i === etapa ? 'blue' : 'gray'}>{x}</Pill>)}
      </div>

      <div className="text-suave text-xs">{info?.materia.nome} · {t}</div>
      <h2 className="text-[20px] font-bold leading-tight mb-2">{info?.nome}</h2>
      <Card>{resumos[t] ? <Rico texto={resumos[t]} /> : <span className="text-suave text-sm">Sem resumo para este tópico.</span>}</Card>

      <Botao onClick={avancar}>{ultimo ? `Ok · começar as ${topicos.length * 5} questões` : 'Ok · próximo resumo ›'}</Botao>
      <div className="text-suave text-[12px] text-center mt-2">Depois dos {topicos.length} resumos vêm 5 itens de cada tópico, na mesma ordem.</div>
    </>
  )
}
