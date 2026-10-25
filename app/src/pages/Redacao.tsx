import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Botao, Cabecalho, Card, Carregando, Pill, Secao } from '../components/ui'
import { carregarMateria, useAsync, useIndice } from '../lib/conteudo'
import type { TemaRedacao } from '../lib/types'
import { useLeituras } from '../lib/useDados'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../lib/db'
import { errosFrequentes } from '../lib/redacao'

const CHECKLIST = [
  'Respondi todos os comandos, na ordem e de forma explícita?',
  'Cada parágrafo de desenvolvimento abre sinalizando o comando?',
  'Está em 3ª pessoa, sem opinião pessoal?',
  'Introdução anuncia os comandos e a conclusão sintetiza?',
  'Proposta de intervenção só se algum comando pediu?',
  'Nenhum dado, número ou citação inventada?',
  'Conferi crase, concordância e vírgula entre sujeito e verbo?',
  'Entre 25 e 30 linhas, sem passar de 30?',
  'Nenhuma marca de identificação no texto?',
]

export default function Redacao() {
  const nav = useNavigate()
  const { dados: ind } = useIndice()
  const { dados: red } = useAsync(() => carregarMateria('RED'), [])
  const leituras = useLeituras()
  const [aberto, setAberto] = useState<number | null>(null)
  const [nc, setNc] = useState('22')
  const [ne, setNe] = useState('4')
  const [tl, setTl] = useState('28')

  if (!ind || !red || !leituras) return <Carregando />
  const materia = ind.edital.materias.find((m) => m.codigo === 'RED')
  const temas = red.temas ?? []
  const modelos = red.modelos ?? []
  const repertorio = red.repertorio ?? []
  const lidos = new Set(leituras.map((l) => l.topico))

  const n = Number(nc.replace(',', '.')), e = Number(ne), t = Number(tl)
  const valido = n >= 0 && n <= 30 && e >= 0 && t > 0 && t <= 30
  const npd = valido ? Math.max(0, n - (6 * e) / t) : null

  function sortear() {
    const tema = temas[Math.floor(Math.random() * temas.length)]
    setAberto(tema.id)
    setTimeout(() => document.getElementById(`tema-${tema.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }

  return (
    <>
      <Cabecalho titulo="Redação" sub="Discursiva · até 30 linhas · 30 pontos · mínimo 15" />

      <Card>
        <div className="font-semibold mb-1">Calculadora da nota (fórmula do edital)</div>
        <div className="text-suave text-[13px] mb-2">NPD = NC − 6 × NE ÷ TL</div>
        <div className="grid grid-cols-3 gap-2">
          <Campo rotulo="NC (0–30)" valor={nc} onChange={setNc} />
          <Campo rotulo="Erros (NE)" valor={ne} onChange={setNe} />
          <Campo rotulo="Linhas (TL)" valor={tl} onChange={setTl} />
        </div>
        {npd !== null ? (
          <div className="flex items-center justify-between mt-2">
            <span className="text-[26px] font-bold">{npd.toFixed(2).replace('.', ',')}</span>
            <Pill cor={npd >= 15 ? 'green' : 'red'}>{npd >= 15 ? 'aprovado (≥ 15)' : 'eliminado (< 15)'}</Pill>
          </div>
        ) : <div className="text-suave text-sm mt-2">Preencha NC até 30 e linhas entre 1 e 30.</div>}
        {valido && <div className="text-suave text-xs mt-1">Cada erro está custando {(6 / t).toFixed(2).replace('.', ',')} ponto.</div>}
      </Card>

      <Botao onClick={() => nav('/redacao/escrever')} className="mb-2.5">✍️ Corrigir uma redação (IA ou nota manual)</Botao>

      <MinhasRedacoes />

      <Secao>Redações-modelo · {modelos.length}</Secao>
      <div className="text-suave text-[13px] mb-2">Textos completos, de 28 a 30 linhas, com o comentário de cada parágrafo: qual comando responde, como o repertório foi amarrado e por que pontua.</div>
      {modelos.map((m) => (
        <Card key={m.id} onClick={() => nav(`/redacao/modelo/${m.id}`)} className="flex items-center gap-3">
          <span className="text-2xl">📄</span>
          <div className="flex-1 min-w-0">
            <div className="font-semibold leading-snug">{m.titulo}</div>
            <div className="text-suave text-[12px] truncate">{m.repertorio.slice(0, 3).join(' · ')}</div>
          </div>
          <span className="text-suave">›</span>
        </Card>
      ))}

      <Secao>Repertório comentado · {repertorio.length}</Secao>
      <div className="text-suave text-[13px] mb-2">Quem é o autor, o contexto da obra, a ideia central, os conceitos e frases prontas por tema.</div>
      <div className="grid grid-cols-2 gap-2 mb-2.5">
        {repertorio.map((r) => (
          <Card key={r.id} onClick={() => nav(`/redacao/repertorio/${r.id}`)} className={`!mb-0 ${r.coringa ? 'border border-amarelo/50 col-span-2' : ''}`}>
            <div className="font-semibold leading-snug">{r.coringa ? '★ ' : ''}{r.nome}</div>
            <div className="text-suave text-[12px] leading-snug mt-0.5"><i>{r.obra}</i> ({r.ano})</div>
          </Card>
        ))}
      </div>

      <Secao>Estudar</Secao>
      {materia?.topicos.map((tp) => (
        <Card key={tp.codigo} onClick={() => nav(`/t/${tp.codigo}`)} className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="text-suave text-xs">{tp.codigo}</div>
            <div className="font-semibold leading-snug">{tp.nome}</div>
          </div>
          {lidos.has(tp.codigo) && <span className="text-verde text-sm">✔</span>}
          <span className="text-suave">›</span>
        </Card>
      ))}
      <Botao variante="secundario" to="/quiz?modo=materia&m=RED&n=10">Treinar técnica · 10 itens C/E</Botao>

      <Secao>Temas · {temas.length}</Secao>
      <Botao onClick={sortear} className="mb-2.5">🎲 Sortear um tema para escrever</Botao>
      {temas.map((tema) => (
        <Tema key={tema.id} tema={tema} aberto={aberto === tema.id} onToggle={() => setAberto(aberto === tema.id ? null : tema.id)}
          modelo={modelos.find((m) => m.tema === tema.id)?.id} onAbrir={(para) => nav(para)} />
      ))}

      <Secao>Checklist antes de entregar</Secao>
      <Card className="text-sm">
        {CHECKLIST.map((c) => <div key={c} className="py-1 border-b border-linha last:border-b-0">☐ {c}</div>)}
      </Card>
    </>
  )
}

function Campo({ rotulo, valor, onChange }: { rotulo: string; valor: string; onChange: (v: string) => void }) {
  return (
    <label className="text-[12px] text-suave">
      {rotulo}
      <input inputMode="decimal" value={valor} onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 p-2 rounded-lg bg-card2 text-texto text-[16px] outline-none" />
    </label>
  )
}

function Tema({ tema, aberto, onToggle, modelo, onAbrir }: {
  tema: TemaRedacao; aberto: boolean; onToggle: () => void; modelo?: number; onAbrir: (para: string) => void
}) {
  return (
    <div id={`tema-${tema.id}`}>
      <Card onClick={onToggle}>
        <div className="flex gap-2 items-start">
          <span className="text-suave text-sm w-6 shrink-0">{tema.id}.</span>
          <div className="flex-1 font-semibold leading-snug">{tema.titulo}</div>
          <span className="text-suave">{aberto ? '▾' : '▸'}</span>
        </div>
        {aberto && (
          <div className="mt-3 text-[14px]" onClick={(e) => e.stopPropagation()}>
            <div className="text-suave text-xs uppercase tracking-wide mb-1">Comandos</div>
            <ol className="list-decimal pl-5 space-y-1 mb-3">{tema.comandos.map((c) => <li key={c}>{c}</li>)}</ol>
            <div className="text-suave text-xs uppercase tracking-wide mb-1">Ganchos de repertório</div>
            <ul className="list-disc pl-5 space-y-1 text-suave">
              {tema.ganchos.map((g) => <li key={g}>{g.replace(/\[confirme[^\]]*\]/g, '')}{/\[confirme/.test(g) && <span className="text-amarelo"> (confirme o dado atual)</span>}</li>)}
            </ul>
            <div className="text-suave text-xs mt-3">
              Coringa: <button className="underline" onClick={() => onAbrir('/redacao/repertorio/darcy')}>Darcy Ribeiro, <i>O Povo Brasileiro</i></button> (desigualdade estrutural).
            </div>
            {modelo && <button onClick={() => onAbrir(`/redacao/modelo/${modelo}`)} className="mt-2 w-full py-2 rounded-xl bg-card2 text-[13px]">📄 Ver a redação-modelo deste tema</button>}
            <button onClick={() => onAbrir(`/redacao/escrever?tema=${tema.id}`)} className="mt-2 w-full py-2 rounded-xl bg-card2 text-[13px]">✍️ Escrevi sobre este tema: corrigir</button>
          </div>
        )}
      </Card>
    </div>
  )
}

function MinhasRedacoes() {
  const nav = useNavigate()
  const lista = useLiveQuery(() => db.redacoes.orderBy('criadaEm').reverse().toArray(), [])
  const redacoes = (lista ?? []).filter((r) => !r.excluida)
  if (!redacoes.length) return null
  const notas = redacoes.filter((r) => r.npd != null).slice(0, 12).reverse()
  const freq = errosFrequentes(redacoes).slice(0, 5)
  const media = notas.length ? notas.reduce((s, r) => s + r.npd!, 0) / notas.length : null
  return (
    <>
      <Secao>Minhas redações · {redacoes.length}</Secao>
      {notas.length >= 2 && (
        <Card>
          <div className="flex justify-between text-xs text-suave mb-1"><span>NPD das últimas {notas.length}</span><span>tracejado = mínimo (15)</span></div>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-20">
            <line x1="0" x2="100" y1={100 - (15 / 30) * 100} y2={100 - (15 / 30) * 100} stroke="#9aa1ae" strokeDasharray="2 2" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
            <polyline fill="none" stroke="#e5484d" strokeWidth="2" vectorEffect="non-scaling-stroke"
              points={notas.map((r, i) => `${(i / (notas.length - 1)) * 100},${100 - (Math.min(30, r.npd!) / 30) * 100}`).join(' ')} />
          </svg>
          <div className="flex justify-between text-[12px] text-suave mt-1"><span>média {media!.toFixed(1).replace('.', ',')}</span><span>última <b className="text-texto">{notas[notas.length - 1].npd!.toFixed(1).replace('.', ',')}</b></span></div>
        </Card>
      )}
      {freq.length > 0 && (
        <Card className="text-sm">
          <div className="font-semibold mb-1">Seus erros mais frequentes</div>
          {freq.map((f) => <div key={f.nome} className="flex justify-between py-0.5"><span>{f.nome}</span><b>{f.n}×</b></div>)}
        </Card>
      )}
      {redacoes.slice(0, 8).map((r) => (
        <Card key={r.id} onClick={() => nav(r.npd != null ? `/redacao/r/${r.id}` : `/redacao/escrever?id=${r.id}`)} className="flex justify-between items-center gap-2">
          <div className="min-w-0">
            <div className="font-semibold leading-snug truncate">{r.tema || 'Sem tema'}</div>
            <div className="text-suave text-[12px]">{new Date(r.criadaEm).toLocaleDateString('pt-BR')} · {r.origem === 'ia' ? 'IA' : r.origem === 'manual' ? 'nota manual' : 'rascunho'}</div>
          </div>
          {r.npd != null
            ? <b className={r.npd >= 15 ? 'text-verde' : 'text-destaque'}>{r.npd.toFixed(1).replace('.', ',')}</b>
            : <span className="text-suave text-sm">›</span>}
        </Card>
      ))}
    </>
  )
}
