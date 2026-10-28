import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Rico } from '../components/Rico'
import { Barra, Botao, Card, Carregando, Pill } from '../components/ui'
import { carregarMateria, materiaDoTopico } from '../lib/conteudo'
import { gravarConfig, lerConfig } from '../lib/db'
import { registrarResposta } from '../lib/estudo'
import { itensDaMateria, itensDaTrilha, itensDeRevisao, itensDoTopico, itensRelampago } from '../lib/selecao'
import type { Confianca, Grupo, ModoEstudo, Questao, RegistroResposta, Resposta } from '../lib/types'

const CONFIANCAS: { id: Confianca; rotulo: string; tecla: string }[] = [
  { id: 'certeza', rotulo: '✅ Certeza', tecla: '1' },
  { id: 'duvida', rotulo: '🤔 Dúvida', tecla: '2' },
  { id: 'chute', rotulo: '🎲 Chute', tecla: '3' },
]

export default function Quiz() {
  const [params] = useSearchParams()
  const nav = useNavigate()
  const modo = params.get('modo') ?? 'topico'
  const n = Number(params.get('n') ?? 10)
  const [itens, setItens] = useState<Questao[] | null>(null)
  const [grupos, setGrupos] = useState<Record<string, Grupo>>({})
  const [i, setI] = useState(0)
  const [confianca, setConfianca] = useState<Confianca | null>(null)
  const [registro, setRegistro] = useState<RegistroResposta | null>(null)
  const [feitos, setFeitos] = useState<RegistroResposta[]>([])
  const inicio = useRef(Date.now())
  const [segundos, setSegundos] = useState(0)

  const modoEstudo: ModoEstudo = modo === 'revisao' ? 'revisao' : modo === 'relampago' ? 'relampago' : modo === 'trilha' ? 'trilha' : 'treino'

  useEffect(() => {
    let vivo = true
    const carregar =
      modo === 'revisao' ? itensDeRevisao(n)
      : modo === 'relampago' ? itensRelampago(n)
      : modo === 'materia' ? itensDaMateria(params.get('m') ?? '', n)
      : modo === 'trilha' ? itensDaTrilha((params.get('t') ?? '').split(',').filter(Boolean), 5)
      : itensDoTopico(params.get('t') ?? '', n)
    carregar.then(async (qs) => {
      const cods = [...new Set(qs.map((q) => materiaDoTopico(q.topico)))]
      const gs: Record<string, Grupo> = {}
      for (const c of cods) for (const g of (await carregarMateria(c)).grupos) gs[g.id] = g
      if (!vivo) return
      setGrupos(gs)
      setItens(qs)
      inicio.current = Date.now()
    })
    return () => { vivo = false }
  }, [modo, n, params])

  useEffect(() => {
    if (registro) return
    const t = setInterval(() => setSegundos(Math.floor((Date.now() - inicio.current) / 1000)), 1000)
    return () => clearInterval(t)
  }, [registro, i])

  const q = itens?.[i]

  const gravando = useRef(false)
  const responder = useCallback(async (r: Resposta) => {
    if (!q || registro || gravando.current) return
    if (r !== 'B' && !confianca) return
    gravando.current = true // evita gravar duas vezes com toque duplo
    try {
      const reg = await registrarResposta(q, r, confianca, Date.now() - inicio.current, modoEstudo)
      setRegistro(reg)
      setFeitos((f) => [...f, reg])
    } finally {
      gravando.current = false
    }
  }, [q, registro, confianca, modoEstudo])

  const proximo = useCallback(() => {
    setRegistro(null)
    setConfianca(null)
    setI((x) => x + 1)
    setSegundos(0)
    inicio.current = Date.now()
    window.scrollTo(0, 0)
  }, [])

  // atalhos no computador: 1/2/3 confiança, C/E/B resposta, Enter próximo
  useEffect(() => {
    function tecla(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      const k = e.key.toLowerCase()
      if (registro) { if (k === 'enter' || k === ' ') { e.preventDefault(); proximo() } return }
      const c = CONFIANCAS.find((x) => x.tecla === k)
      if (c) setConfianca(c.id)
      if (k === 'c') void responder('C')
      if (k === 'e') void responder('E')
      if (k === 'b') void responder('B')
    }
    window.addEventListener('keydown', tecla)
    return () => window.removeEventListener('keydown', tecla)
  }, [registro, responder, proximo])

  async function reportar() {
    if (!q) return
    const motivo = window.prompt('O que está errado nesta questão? (gabarito, enunciado, comentário…)')
    if (!motivo) return
    const lista = await lerConfig<{ itemId: string; motivo: string; em: string }[]>('reportes', [])
    await gravarConfig('reportes', [...lista, { itemId: q.id, motivo, em: new Date().toISOString() }])
    window.alert('Anotado. A lista de reportes fica em Mais › Perfil.')
  }

  if (!itens) return <Carregando />
  if (itens.length === 0) {
    return (
      <div className="pt-10 text-center">
        <div className="text-4xl mb-2">{modo === 'revisao' ? '🎉' : '📭'}</div>
        <div className="font-semibold mb-1">{modo === 'revisao' ? 'Nenhuma revisão pendente hoje.' : 'Nenhum item disponível aqui ainda.'}</div>
        <div className="text-suave text-sm mb-6">{modo === 'revisao' ? 'O caderno de erros está em dia.' : 'O banco deste tópico ainda está sendo produzido.'}</div>
        <Botao variante="secundario" onClick={() => nav(-1)}>Voltar</Botao>
      </div>
    )
  }
  if (!q) return <Resultado feitos={feitos} onSair={() => (modo === 'trilha' ? nav('/questoes', { replace: true }) : nav(-1))} />

  const grupo = q.grupo ? grupos[q.grupo] : null
  const mostraGrupo = grupo && (i === 0 || itens[i - 1]?.grupo !== q.grupo)
  const acertou = registro?.correta === 1
  const titulo = modo === 'revisao' ? 'Revisão' : modo === 'relampago' ? '⚡ Relâmpago' : modo === 'trilha' ? `🧭 Trilha · ${q.topico}` : q.topico

  return (
    <>
      <div className="flex justify-between items-center text-sm text-suave">
        <button onClick={() => nav(-1)} className="px-1 -ml-1">✕</button>
        <span>{titulo} · item {i + 1} de {itens.length}</span>
        <span>⏱ {Math.floor(segundos / 60)}:{String(segundos % 60).padStart(2, '0')}</span>
      </div>
      <div className="my-2.5"><Barra valor={i / itens.length} /></div>

      <div className="flex gap-1.5 mb-2">
        <Pill>{q.topico}</Pill>
        <Pill>{['', 'fácil', 'média', 'difícil'][q.dificuldade]}</Pill>
        {q.status === 'revisar' && <Pill cor="yellow">gabarito em revisão</Pill>}
      </div>

      {grupo && (
        <Card className={`text-[14px] text-suave ${mostraGrupo ? '' : 'opacity-70'}`}><Rico texto={grupo.texto} /></Card>
      )}
      <Card className="text-[16px] leading-relaxed"><Rico texto={q.enunciado} /></Card>

      {!registro && (
        <>
          <div className="text-suave text-[13px] mt-3 mb-1.5">1. Quão seguro você está?</div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {CONFIANCAS.map((c) => (
              <button key={c.id} onClick={() => setConfianca(c.id)}
                className={`py-3 rounded-xl border-2 text-[13px] ${confianca === c.id ? 'border-azul bg-[#1b2740]' : 'border-linha bg-card'}`}>
                {c.rotulo}
              </button>
            ))}
          </div>
          <div className="text-suave text-[13px] mb-1.5">2. Sua resposta{!confianca && <span> (escolha a confiança primeiro)</span>}</div>
          <div className="grid grid-cols-3 gap-2">
            <button disabled={!confianca} onClick={() => responder('C')} className="py-3.5 rounded-xl border-2 border-verde bg-card font-bold disabled:opacity-35">CERTO</button>
            <button disabled={!confianca} onClick={() => responder('E')} className="py-3.5 rounded-xl border-2 border-destaque bg-card font-bold disabled:opacity-35">ERRADO</button>
            <button onClick={() => responder('B')} className="py-3.5 rounded-xl border-2 border-linha bg-card font-bold">Branco</button>
          </div>
          <div className="hidden md:block text-center text-xs text-suave mt-3">Atalhos: 1/2/3 confiança · C, E ou B para responder · Enter para avançar</div>
        </>
      )}

      {registro && (
        <>
          <Card className={`mt-3 border ${registro.correta === null ? 'border-linha' : acertou ? 'border-verde/50' : 'border-destaque/50'}`}>
            {registro.correta === null
              ? <b>Em branco (0)</b>
              : acertou ? <b className="text-verde">✔ Acertou (+1)</b> : <b className="text-destaque">✘ Errou (−1)</b>}
            <span className="text-suave text-sm"> · gabarito: {q.gabarito === 'C' ? 'CERTO' : 'ERRADO'}</span>
            {(registro.correta !== 1 || registro.confianca === 'chute') && <div className="text-suave text-[13px] mt-1">Foi para o caderno de erros (volta amanhã).</div>}
            {registro.correta === 0 && registro.confianca === 'certeza' && <div className="text-amarelo text-[13px] mt-1">⚠️ Errou com certeza: esse é o tipo de erro que mais custa na prova.</div>}
          </Card>
          <Card>
            <div className="font-semibold mb-1">Comentário</div>
            <Rico texto={q.comentario} className="text-[14px]" />
          </Card>
          <div className="flex gap-2">
            <Botao variante="secundario" onClick={reportar} className="!w-auto px-4">⚑</Botao>
            <Botao onClick={proximo}>{i + 1 < itens.length ? 'Próximo ›' : 'Ver resultado'}</Botao>
          </div>
        </>
      )}
    </>
  )
}

function Resultado({ feitos, onSair }: { feitos: RegistroResposta[]; onSair: () => void }) {
  const acertos = feitos.filter((r) => r.correta === 1).length
  const erros = feitos.filter((r) => r.correta === 0).length
  const brancos = feitos.filter((r) => r.correta === null).length
  const liquida = acertos - erros
  const errosCerteza = feitos.filter((r) => r.correta === 0 && r.confianca === 'certeza').length
  const chutes = feitos.filter((r) => r.confianca === 'chute' && r.correta !== null)
  return (
    <div className="pt-4">
      <h2 className="text-[22px] font-bold mb-3">Resultado</h2>
      <div className="grid grid-cols-3 gap-2 mb-2.5">
        <Card className="!mb-0 text-center"><div className="text-2xl font-bold text-verde">{acertos}</div><div className="text-suave text-xs">certos</div></Card>
        <Card className="!mb-0 text-center"><div className="text-2xl font-bold text-destaque">{erros}</div><div className="text-suave text-xs">errados</div></Card>
        <Card className="!mb-0 text-center"><div className="text-2xl font-bold">{brancos}</div><div className="text-suave text-xs">brancos</div></Card>
      </div>
      <Card>
        <div className="flex justify-between"><span>Nota Cebraspe (certos − errados)</span><b className={liquida >= 0 ? 'text-verde' : 'text-destaque'}>{liquida > 0 ? '+' : ''}{liquida}</b></div>
        <div className="flex justify-between text-sm text-suave mt-1"><span>Acerto entre os respondidos</span><span>{acertos + erros ? Math.round((acertos / (acertos + erros)) * 100) : 0}%</span></div>
        {chutes.length > 0 && <div className="flex justify-between text-sm text-suave mt-1"><span>Chutes certos</span><span>{chutes.filter((r) => r.correta === 1).length} de {chutes.length}</span></div>}
      </Card>
      {errosCerteza > 0 && <Card className="text-sm">⚠️ <b>{errosCerteza}</b> {errosCerteza === 1 ? 'erro' : 'erros'} com certeza. Eles já estão no caderno de erros com prioridade.</Card>}
      <Botao onClick={onSair}>Concluir</Botao>
    </div>
  )
}
