import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Botao, Cabecalho, Card, Carregando, Pill, Secao } from '../components/ui'
import { carregarMateria, useAsync, useIndice } from '../lib/conteudo'
import type { RegistroRedacao, TemaRedacao } from '../lib/types'
import { useLeituras } from '../lib/useDados'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../lib/db'
import { TOPICO_DO_ERRO, contarLinhas, errosFrequentes, excluirRedacao, resumoRedacoes } from '../lib/redacao'

const br = (n: number) => n.toFixed(1).replace('.', ',')

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
  const [params, setParams] = useSearchParams()
  const historico = params.get('aba') === 'historico'
  const lista = useLiveQuery(() => db.redacoes.orderBy('criadaEm').reverse().toArray(), [])

  if (!ind || !red || !leituras || !lista) return <Carregando />
  const redacoes = lista.filter((r) => !r.excluida)
  const corrigidas = redacoes.filter((r) => r.npd != null)
  const rascunhos = redacoes.filter((r) => r.npd == null)
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

      <div className="grid grid-cols-2 gap-2 mb-3">
        <button type="button" onClick={() => setParams({}, { replace: true })}
          className={`py-2 rounded-xl border text-sm font-semibold ${historico ? 'border-linha bg-card text-suave' : 'border-azul bg-[#1b2740]'}`}>Estudar e escrever</button>
        <button type="button" onClick={() => setParams({ aba: 'historico' }, { replace: true })}
          className={`py-2 rounded-xl border text-sm font-semibold ${historico ? 'border-azul bg-[#1b2740]' : 'border-linha bg-card text-suave'}`}>Histórico ({corrigidas.length})</button>
      </div>

      {historico ? <Historico corrigidas={corrigidas} totalTemas={temas.length} /> : <>
      <Rascunhos rascunhos={rascunhos} />

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
      </>}
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
            <TextosMotivadores textos={tema.motivadores} />
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

export function TextosMotivadores({ textos }: { textos?: TemaRedacao['motivadores'] }) {
  if (!textos?.length) return null
  return (
    <div className="mb-3">
      <div className="text-suave text-xs uppercase tracking-wide mb-1">Textos motivadores</div>
      {textos.map((t, i) => (
        <div key={t.fonte + i} className="bg-card2 rounded-lg p-2.5 mb-1.5 text-[13px] leading-relaxed">
          <div className="font-semibold text-suave text-[11px] mb-0.5">Texto {i + 1}</div>
          {t.texto}
          <div className="text-suave text-[11px] mt-1">{t.fonte}</div>
        </div>
      ))}
      <div className="text-suave text-[11px]">Servem de ponto de partida: use as ideias com as suas palavras, sem copiar trechos.</div>
    </div>
  )
}

function Rascunhos({ rascunhos }: { rascunhos: RegistroRedacao[] }) {
  const nav = useNavigate()
  async function excluir(r: RegistroRedacao) {
    if (window.confirm(`Excluir o rascunho "${r.tema || 'Sem tema'}"? O texto será perdido.`)) await excluirRedacao(r)
  }
  return (
    <>
      {rascunhos.map((r) => (
        <Card key={r.id} className="border border-azul/50">
          <b className="leading-snug">{r.tema || 'Sem tema'}</b> <Pill cor="blue">rascunho</Pill>
          <div className="text-suave text-[13px] mt-0.5">{new Date(r.criadaEm).toLocaleDateString('pt-BR')} · {contarLinhas(r.texto)} linhas</div>
          <div className="flex gap-2 mt-2.5">
            <button onClick={() => nav(`/redacao/escrever?id=${r.id}`)} className="flex-1 py-2.5 rounded-xl bg-destaque text-white font-bold">Continuar</button>
            <button onClick={() => excluir(r)} className="px-4 py-2.5 rounded-xl bg-card2 text-suave">Excluir</button>
          </div>
        </Card>
      ))}
    </>
  )
}

function Historico({ corrigidas, totalTemas }: { corrigidas: RegistroRedacao[]; totalTemas: number }) {
  const nav = useNavigate()
  if (!corrigidas.length) {
    return (
      <Card className="text-sm text-center py-6">
        <div className="text-2xl mb-1">✍️</div>
        <b>Nenhuma redação corrigida ainda</b>
        <div className="text-suave text-[13px] mt-1">Ao corrigir uma redação, ela aparece aqui com a nota, os comandos atendidos, os erros que mais se repetem e o que revisar.</div>
      </Card>
    )
  }
  const resumo = resumoRedacoes(corrigidas)
  const { sim, parcial, nao } = resumo.comandos
  return (
    <>
      <div className="grid grid-cols-3 gap-2 mb-2.5">
        <Card className="!mb-0 text-center"><div className="text-[22px] font-bold">{br(resumo.mediaNpd)}</div><div className="text-suave text-[12px]">média</div></Card>
        <Card className="!mb-0 text-center"><div className="text-[22px] font-bold">{br(resumo.melhor)}</div><div className="text-suave text-[12px]">melhor nota</div></Card>
        <Card className="!mb-0 text-center"><div className="text-[22px] font-bold">{resumo.acimaDoMinimo}/{resumo.total}</div><div className="text-suave text-[12px]">acima de 15</div></Card>
      </div>
      <EvolucaoNotas corrigidas={corrigidas} />
      <Card className="text-sm">
        <div className="font-semibold mb-1">De onde vem a sua nota</div>
        <div className="flex justify-between py-0.5"><span>Conteúdo (NC médio)</span><b>{br(resumo.mediaNc)} de 30</b></div>
        <div className="flex justify-between py-0.5"><span>Erros por redação</span><b>{br(resumo.mediaErros)}</b></div>
        <div className="flex justify-between py-0.5"><span>Os erros tiram, em média</span><b>{br(resumo.perdaPorErros)} ponto{resumo.perdaPorErros >= 2 ? 's' : ''}</b></div>
        {sim + parcial + nao > 0 && <div className="flex justify-between py-0.5"><span>Comandos atendidos</span><b>{sim} sim · {parcial} parcial · {nao} não</b></div>}
        <div className="flex justify-between py-0.5"><span>Temas escritos</span><b>{resumo.temasEscritos} de {totalTemas}</b></div>
      </Card>
      <ErrosParaRevisar redacoes={corrigidas} titulo="Seus erros mais frequentes" />
      <Secao>Redações corrigidas · {corrigidas.length}</Secao>
      {corrigidas.map((r) => (
        <Card key={r.id} onClick={() => nav(`/redacao/r/${r.id}`)} className="flex justify-between items-center gap-2">
          <div className="min-w-0">
            <div className="font-semibold leading-snug">{r.tema || 'Sem tema'}</div>
            <div className="text-suave text-[13px]">{new Date(r.criadaEm).toLocaleDateString('pt-BR')} · {r.origem === 'ia' ? 'IA' : 'nota manual'} · {contarLinhas(r.texto)} linhas</div>
            <div className="text-suave text-[13px]">NC {br(r.nc ?? 0)} · {r.ne ?? 0} {r.ne === 1 ? 'erro' : 'erros'}{r.avaliacao?.fugaAoTema ? ' · fuga ao tema' : ''}</div>
            <div className="text-azul text-[12px] mt-0.5">{r.origem === 'ia' ? 'Ver correção ›' : 'Ver nota e texto ›'}</div>
          </div>
          <div className="text-right shrink-0">
            <div className={`text-xl font-bold ${r.npd! >= 15 ? 'text-verde' : 'text-destaque'}`}>{br(r.npd!)}</div>
            <div className="text-suave text-[11px]">{r.npd! >= 15 ? 'acima do mínimo' : 'abaixo'}</div>
          </div>
        </Card>
      ))}
    </>
  )
}

// Erros por categoria, com atalho para o tópico de Português quando ele existe no edital
export function ErrosParaRevisar({ redacoes, titulo }: { redacoes: RegistroRedacao[]; titulo: string }) {
  const nav = useNavigate()
  const freq = errosFrequentes(redacoes).slice(0, 6)
  if (!freq.length) return null
  return (
    <Card className="text-sm">
      <div className="font-semibold mb-1">{titulo}</div>
      {freq.map((f) => {
        const topico = TOPICO_DO_ERRO[f.nome]
        return (
          <div key={f.nome} className="flex justify-between items-center gap-2 py-1">
            <span className="flex-1">{f.nome} <b>{f.n}×</b></span>
            {topico && <button type="button" onClick={() => nav(`/t/${topico}`)} className="text-azul text-[13px]">Revisar {topico} ›</button>}
          </div>
        )
      })}
    </Card>
  )
}

function EvolucaoNotas({ corrigidas }: { corrigidas: RegistroRedacao[] }) {
  const notas = corrigidas.slice(0, 12).reverse()
  if (notas.length < 2) return null
  return (
    <Card>
      <div className="flex justify-between text-xs text-suave mb-1"><span>NPD das últimas {notas.length}</span><span>tracejado = mínimo (15)</span></div>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-20">
        <line x1="0" x2="100" y1={100 - (15 / 30) * 100} y2={100 - (15 / 30) * 100} stroke="#9aa1ae" strokeDasharray="2 2" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
        <polyline fill="none" stroke="#e5484d" strokeWidth="2" vectorEffect="non-scaling-stroke"
          points={notas.map((r, i) => `${(i / (notas.length - 1)) * 100},${100 - (Math.min(30, r.npd!) / 30) * 100}`).join(' ')} />
      </svg>
      <div className="flex justify-end text-[12px] text-suave mt-1"><span>última <b className="text-texto">{br(notas[notas.length - 1].npd!)}</b></span></div>
    </Card>
  )
}
