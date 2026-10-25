import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Cabecalho, Card, Carregando, Pill, Secao } from '../components/ui'
import { carregarMateria, useAsync } from '../lib/conteudo'

const PALAVRAS_POR_LINHA = 11 // média de uma linha manuscrita da folha

function useRed() {
  return useAsync(() => carregarMateria('RED'), []).dados
}

export function RedacaoModelo() {
  const { id } = useParams()
  const red = useRed()
  const nav = useNavigate()
  const [comentarios, setComentarios] = useState(true)
  if (!red) return <Carregando />
  const m = red.modelos?.find((x) => String(x.id) === id)
  if (!m) return (<><Cabecalho titulo="Redação-modelo" /><Card className="text-sm text-suave">Modelo não encontrado.</Card></>)
  const tema = red.temas?.find((t) => t.id === m.tema)
  const palavras = m.paragrafos.reduce((s, p) => s + p.texto.split(/\s+/).length, 0)
  const repertorio = red.repertorio ?? []

  return (
    <>
      <Cabecalho titulo={m.titulo} sub="Redação-modelo comentada" />

      {tema && (
        <Card className="text-[14px]">
          <div className="text-suave text-xs uppercase tracking-wide mb-1">Comandos do tema</div>
          <ol className="list-decimal pl-5 space-y-1">{tema.comandos.map((c) => <li key={c}>{c}</li>)}</ol>
        </Card>
      )}

      <div className="flex flex-wrap gap-1.5 mb-2.5">
        <Pill>{m.paragrafos.length} parágrafos</Pill>
        <Pill>{palavras} palavras</Pill>
        <Pill>≈ {Math.round(palavras / PALAVRAS_POR_LINHA)} linhas manuscritas</Pill>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <button onClick={() => setComentarios(true)} className={`py-2 rounded-xl border text-[13px] ${comentarios ? 'border-azul bg-[#1b2740]' : 'border-linha bg-card'}`}>Com comentários</button>
        <button onClick={() => setComentarios(false)} className={`py-2 rounded-xl border text-[13px] ${!comentarios ? 'border-azul bg-[#1b2740]' : 'border-linha bg-card'}`}>Texto corrido</button>
      </div>

      {comentarios ? m.paragrafos.map((p, i) => (
        <Card key={i}>
          <Pill cor={p.papel.startsWith('Comando') ? 'blue' : 'gray'}>{p.papel}</Pill>
          <p className="text-[15px] leading-relaxed mt-2 indent-6">{p.texto}</p>
          <div className="mt-2.5 pt-2 border-t border-linha text-[13px] text-suave"><span className="text-amarelo">💡 </span>{p.nota}</div>
        </Card>
      )) : (
        <Card className="text-[15px] leading-relaxed">
          {m.paragrafos.map((p, i) => <p key={i} className="indent-6 mb-2 last:mb-0">{p.texto}</p>)}
        </Card>
      )}

      <Secao>Por que funciona</Secao>
      <Card className="text-sm">
        <ul className="list-disc pl-5 space-y-1">{m.destaques.map((d) => <li key={d}>{d}</li>)}</ul>
      </Card>

      <Secao>Repertório usado</Secao>
      <Card className="text-sm">
        {m.repertorio.map((r) => {
          const autor = repertorio.find((a) => r.includes(a.nome))
          return (
            <div key={r} onClick={autor ? () => nav(`/redacao/repertorio/${autor.id}`) : undefined}
              className={`py-1.5 border-b border-linha last:border-b-0 flex justify-between ${autor ? 'cursor-pointer' : ''}`}>
              <span>{r}</span>{autor && <span className="text-suave">ver ›</span>}
            </div>
          )
        })}
      </Card>
      <div className="text-suave text-[12px]">Use o modelo para estudar a estrutura, e não para decorar: na prova, os comandos serão outros. Contagem de linhas aproximada (≈ {PALAVRAS_POR_LINHA} palavras por linha); confira com a sua letra.</div>
    </>
  )
}

export function RedacaoRepertorio() {
  const { id } = useParams()
  const red = useRed()
  const nav = useNavigate()
  if (!red) return <Carregando />
  const r = red.repertorio?.find((x) => x.id === id)
  if (!r) return (<><Cabecalho titulo="Repertório" /><Card className="text-sm text-suave">Não encontrado.</Card></>)
  const modelos = (red.modelos ?? []).filter((m) => m.repertorio.some((x) => x.includes(r.nome)))

  return (
    <>
      <Cabecalho titulo={r.nome} sub={`${r.obra} (${r.ano})`} />
      {r.coringa && <div className="mb-2.5"><Pill cor="yellow">★ sua citação coringa</Pill></div>}

      <Card className="text-[14px]">
        <div className="font-semibold mb-1">Quem foi</div>
        <div className="text-suave">{r.quem}</div>
      </Card>
      <Card className="text-[14px]">
        <div className="font-semibold mb-1">Contexto da obra</div>
        <div className="text-suave">{r.contexto}</div>
      </Card>
      <Card className="text-[14px] border border-azul/40">
        <div className="font-semibold mb-1">Ideia central</div>
        <div>{r.ideia}</div>
      </Card>

      {r.conceitos.length > 0 && (
        <>
          <Secao>Conceitos-chave</Secao>
          {r.conceitos.map((c) => (
            <Card key={c.termo} className="text-[14px]"><b>{c.termo}</b><div className="text-suave mt-0.5">{c.explicacao}</div></Card>
          ))}
        </>
      )}

      <Secao>Encaixa em</Secao>
      <div className="flex flex-wrap gap-1.5 mb-2">{r.encaixa.map((e) => <Pill key={e} cor="blue">{e}</Pill>)}</div>

      <Secao>Como aplicar (frases prontas, em paráfrase)</Secao>
      {r.aplicacoes.map((a) => (
        <Card key={a.tema} className="text-[14px]">
          <div className="text-suave text-xs uppercase tracking-wide mb-1">{a.tema}</div>
          <div className="leading-relaxed">{a.frase}</div>
        </Card>
      ))}

      {r.citacoes.length > 0 && (
        <>
          <Secao>Citações literais (cuidado)</Secao>
          {r.citacoes.map((c) => (
            <Card key={c.texto} className="text-[14px] border border-amarelo/30">
              <div className="italic">“{c.texto}”</div>
              <div className="text-amarelo text-[12px] mt-1">{c.situacao}</div>
              <div className="text-suave text-[13px] mt-1">{c.nota}</div>
            </Card>
          ))}
        </>
      )}

      <Card className="text-[14px] mt-3">
        <div className="font-semibold mb-1">⚠️ Cuidados</div>
        <div className="text-suave">{r.cuidados}</div>
      </Card>

      {modelos.length > 0 && (
        <>
          <Secao>Aparece nas redações-modelo</Secao>
          {modelos.map((m) => (
            <Card key={m.id} onClick={() => nav(`/redacao/modelo/${m.id}`)} className="flex justify-between items-center text-sm">
              <span>{m.titulo}</span><span className="text-suave">›</span>
            </Card>
          ))}
        </>
      )}
    </>
  )
}
