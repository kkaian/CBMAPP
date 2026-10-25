import { useLiveQuery } from 'dexie-react-hooks'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Botao, Cabecalho, Card, Carregando, Pill, Secao } from '../components/ui'
import { carregarMateria, useAsync } from '../lib/conteudo'
import { db } from '../lib/db'
import {
  aplicarAvaliacao, calcularNpd, categoriaDoErro, contarLinhas, corrigirComIA, cotaIA, excluirRedacao,
  linhasDoTexto, montarPromptManual, novaRedacao, salvarRedacao,
} from '../lib/redacao'
import { modoLocal } from '../lib/supabase'
import type { RegistroRedacao } from '../lib/types'

const fmt = (n: number | null) => (n == null ? '—' : n.toLocaleString('pt-BR', { maximumFractionDigits: 2 }))

// ---------- escrever / editar ----------

export function RedacaoEscrever() {
  const [params] = useSearchParams()
  const nav = useNavigate()
  const { dados: red } = useAsync(() => carregarMateria('RED'), [])
  const idEdicao = params.get('id')
  const existente = useLiveQuery(async () => (idEdicao ? (await db.redacoes.get(idEdicao)) ?? null : null), [idEdicao])
  const [r, setR] = useState<RegistroRedacao | null>(null)
  const [outroTema, setOutroTema] = useState(false)
  const [comandosTexto, setComandosTexto] = useState('')
  const [cota, setCota] = useState<{ limite: number; usadas: number } | null>(null)
  const [estado, setEstado] = useState<'livre' | 'corrigindo'>('livre')
  const [erro, setErro] = useState<string | null>(null)
  const [manual, setManual] = useState<{ nc: string; ne: string } | null>(null)

  // inicializa (nova, a partir de um tema, ou edição)
  useEffect(() => {
    if (!red || r) return
    if (idEdicao) {
      if (existente === undefined) return
      if (existente) { setR(existente); setOutroTema(existente.temaId == null); setComandosTexto(existente.comandos.join('\n')) }
      return
    }
    const tema = red.temas?.find((t) => String(t.id) === params.get('tema')) ?? red.temas?.[0]
    setR(novaRedacao(tema ? { temaId: tema.id, tema: tema.titulo, comandos: tema.comandos } : {}))
  }, [red, existente, idEdicao, params, r])

  useEffect(() => { if (!modoLocal) void cotaIA().then(setCota) }, [])

  if (!red || !r) return <Carregando />
  const temas = red.temas ?? []
  const linhas = linhasDoTexto(r.texto)
  const tl = contarLinhas(r.texto)
  const restam = cota ? Math.max(0, cota.limite - cota.usadas) : null

  function escolherTema(valor: string) {
    if (valor === 'outro') { setOutroTema(true); setR((x) => x && { ...x, temaId: null, tema: '', comandos: [] }); setComandosTexto(''); return }
    const t = temas.find((x) => String(x.id) === valor)
    if (t) { setOutroTema(false); setR((x) => x && { ...x, temaId: t.id, tema: t.titulo, comandos: t.comandos }) }
  }

  function atual(): RegistroRedacao {
    return outroTema ? { ...r!, comandos: comandosTexto.split('\n').map((c) => c.trim()).filter(Boolean) } : r!
  }

  async function guardar() {
    const x = atual()
    // texto mudou depois de corrigido: a correção antiga deixa de valer
    const mudou = existente && existente.texto !== x.texto
    await salvarRedacao(mudou ? { ...x, origem: 'rascunho', avaliacao: null, errosRecusados: [], nc: null, ne: null, npd: null } : x)
    nav('/redacao', { replace: true })
  }

  async function corrigir() {
    const x = atual()
    if (!x.tema || !x.comandos.length) { setErro('Informe o tema e os comandos.'); return }
    if (tl < 7) { setErro('Escreva pelo menos 7 linhas.'); return }
    setErro(null)
    setEstado('corrigindo')
    try {
      const { avaliacao, limite, usadas } = await corrigirComIA(x)
      setCota({ limite, usadas })
      const final = aplicarAvaliacao({ ...x, errosRecusados: [] }, avaliacao, [])
      await salvarRedacao(final)
      nav(`/redacao/r/${final.id}`, { replace: true })
    } catch (e) {
      setErro((e as Error).message)
      setEstado('livre')
    }
  }

  async function copiar() {
    const x = atual()
    try {
      await navigator.clipboard.writeText(montarPromptManual(x))
      window.alert('Prompt copiado. Cole no Claude ou no ChatGPT e, depois, lance aqui o NC e o NE que ele der.')
    } catch {
      window.prompt('Copie o texto abaixo:', montarPromptManual(x))
    }
    setManual({ nc: '', ne: '' })
  }

  async function lancarManual() {
    if (!manual) return
    const nc = Number(manual.nc.replace(',', '.')), ne = Number(manual.ne)
    if (!(nc >= 0 && nc <= 30) || !(ne >= 0)) { setErro('NC entre 0 e 30 e NE a partir de 0.'); return }
    const x = { ...atual(), origem: 'manual' as const, nc, ne, npd: calcularNpd(nc, ne, tl) }
    await salvarRedacao(x)
    nav(`/redacao/r/${x.id}`, { replace: true })
  }

  if (estado === 'corrigindo') return <Carregando texto="A IA está corrigindo (uns 15 a 30 segundos)…" />

  return (
    <>
      <Cabecalho titulo={idEdicao ? 'Editar redação' : 'Corrigir uma redação'} sub="Digite exatamente como escreveu na folha" />

      <Card>
        <label className="text-suave text-[12px]">Tema</label>
        <select value={outroTema ? 'outro' : String(r.temaId ?? '')} onChange={(e) => escolherTema(e.target.value)}
          className="w-full mt-1 p-2 rounded-lg bg-card2 text-[14px]">
          {temas.map((t) => <option key={t.id} value={t.id}>{t.id}. {t.titulo}</option>)}
          <option value="outro">Outro tema (digitar)</option>
        </select>
        {outroTema ? (
          <>
            <input value={r.tema} onChange={(e) => setR({ ...r, tema: e.target.value })} placeholder="Título do tema"
              className="w-full mt-2 p-2 rounded-lg bg-card2 text-[14px] outline-none" />
            <textarea value={comandosTexto} onChange={(e) => setComandosTexto(e.target.value)} rows={3} placeholder="Um comando por linha"
              className="w-full mt-2 p-2 rounded-lg bg-card2 text-[14px] outline-none" />
          </>
        ) : (
          <ol className="list-decimal pl-5 mt-2 text-[13px] text-suave space-y-0.5">{r.comandos.map((c) => <li key={c}>{c}</li>)}</ol>
        )}
      </Card>

      <Card>
        <div className="flex justify-between text-[12px] text-suave mb-1">
          <span>Uma linha da folha = uma linha aqui (Enter no fim de cada linha)</span>
        </div>
        <textarea value={r.texto} onChange={(e) => setR({ ...r, texto: e.target.value })} rows={18} spellCheck={false}
          placeholder="Linha 1 da sua redação&#10;Linha 2…"
          className="w-full p-2 rounded-lg bg-card2 text-[15px] leading-relaxed outline-none font-[inherit]" />
        <div className="flex justify-between items-center mt-1.5 text-[13px]">
          <span className={tl > 30 ? 'text-destaque font-bold' : 'text-suave'}>{tl} {tl === 1 ? 'linha' : 'linhas'}{tl > 30 ? ' · passou de 30: o excedente é desconsiderado' : ''}</span>
          {linhas.some((l) => l.length > 95) && <span className="text-amarelo text-[12px]">linha muito longa? quebre como na folha</span>}
        </div>
      </Card>

      {erro && <Card className="text-sm border border-destaque/50 text-[#ff8a8d]">{erro}</Card>}

      {!modoLocal && (
        <Botao onClick={corrigir} className="mb-2" disabled={restam === 0}>
          🤖 Corrigir com IA{restam != null ? ` · ${restam} de ${cota!.limite} hoje` : ''}
        </Botao>
      )}
      <Botao variante="secundario" onClick={copiar} className="mb-2">📋 Copiar para correção (Claude ou ChatGPT)</Botao>
      {manual && (
        <Card>
          <div className="font-semibold text-sm mb-2">Lançar a nota da correção externa</div>
          <div className="grid grid-cols-3 gap-2 items-end">
            <label className="text-[12px] text-suave">NC (0–30)<input inputMode="decimal" value={manual.nc} onChange={(e) => setManual({ ...manual, nc: e.target.value })} className="w-full mt-1 p-2 rounded-lg bg-card2 text-texto outline-none" /></label>
            <label className="text-[12px] text-suave">Erros (NE)<input inputMode="numeric" value={manual.ne} onChange={(e) => setManual({ ...manual, ne: e.target.value })} className="w-full mt-1 p-2 rounded-lg bg-card2 text-texto outline-none" /></label>
            <button onClick={lancarManual} className="py-2 rounded-lg bg-destaque text-white font-bold">Salvar</button>
          </div>
          <div className="text-suave text-[12px] mt-1.5">TL = {tl} linhas (contado aqui).</div>
        </Card>
      )}
      <Botao variante="secundario" onClick={guardar}>Salvar rascunho</Botao>
      <div className="text-suave text-[12px] mt-3">
        A IA avalia o conteúdo por comando e aponta os erros; você confirma quais erros aceita e o app calcula a nota pela fórmula do edital. É uma estimativa: a correção real do Cebraspe é feita por dois examinadores.
      </div>
    </>
  )
}

// ---------- resultado ----------

export function RedacaoResultado() {
  const { id = '' } = useParams()
  const nav = useNavigate()
  const r = useLiveQuery(async () => (await db.redacoes.get(id)) ?? null, [id])
  const [verTexto, setVerTexto] = useState(false)
  const linhas = useMemo(() => (r ? linhasDoTexto(r.texto) : []), [r])
  if (r === undefined) return <Carregando />
  if (r === null || !r || r.excluida) return (<><Cabecalho titulo="Redação" /><Card className="text-sm text-suave">Redação não encontrada.</Card></>)

  const tl = contarLinhas(r.texto)
  const a = r.avaliacao
  const linhasComErro = new Set(a?.erros.filter((_, i) => !r.errosRecusados.includes(i)).map((e) => e.linha) ?? [])

  async function alternarErro(i: number) {
    if (!r || !a) return
    const recusados = r.errosRecusados.includes(i) ? r.errosRecusados.filter((x) => x !== i) : [...r.errosRecusados, i]
    await salvarRedacao(aplicarAvaliacao(r, a, recusados))
  }

  async function excluir() {
    if (r && window.confirm('Excluir esta redação do histórico?')) { await excluirRedacao(r); nav('/redacao', { replace: true }) }
  }

  return (
    <>
      <Cabecalho titulo={r.tema || 'Redação'} sub={`${new Date(r.criadaEm).toLocaleDateString('pt-BR')} · ${tl} linhas · ${r.origem === 'ia' ? 'corrigida pela IA' : r.origem === 'manual' ? 'nota lançada' : 'rascunho'}`} />

      {r.npd != null ? (
        <Card className={`border ${r.npd >= 15 ? 'border-verde/50' : 'border-destaque/50'}`}>
          <div className="flex justify-between items-center">
            <div>
              <div className="text-suave text-xs">NPD = NC − 6 × NE ÷ TL</div>
              <div className={`text-3xl font-bold ${r.npd >= 15 ? 'text-verde' : 'text-destaque'}`}>{fmt(r.npd)}</div>
            </div>
            <Pill cor={r.npd >= 15 ? 'green' : 'red'}>{r.npd >= 15 ? 'acima do mínimo (15)' : 'abaixo do mínimo (15)'}</Pill>
          </div>
          <div className="text-suave text-[13px] mt-1">NC {fmt(r.nc)} · NE {r.ne} · TL {tl} · cada erro custou {fmt(tl ? 6 / tl : 0)}</div>
        </Card>
      ) : (
        <Card className="text-sm">Rascunho sem correção. <button className="underline" onClick={() => nav(`/redacao/escrever?id=${r.id}`)}>Abrir para corrigir</button></Card>
      )}

      {a?.fugaAoTema && <Card className="text-sm border border-destaque/50">⚠️ A IA considerou <b>fuga ao tema</b>: na prova, isso zera a redação.</Card>}

      {a && (
        <>
          <Secao>Conteúdo · NC {fmt(a.nc)} de 30</Secao>
          {a.comandos.map((c, i) => (
            <Card key={i} className="text-[14px]">
              <div className="flex justify-between gap-2 items-start">
                <span className="text-suave text-[13px]">Comando {i + 1}: {c.comando}</span>
                <b className="whitespace-nowrap">{fmt(c.nota)} / {fmt(c.maximo)}</b>
              </div>
              <div className="mt-1"><Pill cor={c.atendido === 'sim' ? 'green' : c.atendido === 'parcial' ? 'yellow' : 'red'}>{c.atendido === 'sim' ? 'atendido' : c.atendido === 'parcial' ? 'parcial' : 'não atendido'}</Pill></div>
              <div className="mt-1.5">{c.comentario}</div>
            </Card>
          ))}
          <Card className="text-[14px]">
            <div className="flex justify-between"><span className="text-suave text-[13px]">Apresentação e estrutura textual</span><b>{fmt(a.estrutura.nota)} / {a.estrutura.maximo}</b></div>
            <div className="mt-1.5">{a.estrutura.comentario}</div>
          </Card>

          <Secao>Erros · {r.ne} {r.ne === 1 ? 'aceito' : 'aceitos'} de {a.erros.length}</Secao>
          <div className="text-suave text-[12px] mb-2">Toque em "não é erro" se discordar da IA: o NE e a nota são recalculados.</div>
          {a.erros.length === 0 && <Card className="text-sm text-suave">A IA não encontrou erros.</Card>}
          {a.erros.map((e, i) => {
            const recusado = r.errosRecusados.includes(i)
            return (
              <Card key={i} className={`text-[14px] ${recusado ? 'opacity-50' : ''}`}>
                <div className="flex justify-between items-center gap-2">
                  <span className="text-suave text-[12px]">Linha {e.linha} · {categoriaDoErro(e)}</span>
                  <button onClick={() => alternarErro(i)} className="text-[12px] px-2 py-1 rounded-lg bg-card2">{recusado ? 'contar como erro' : 'não é erro'}</button>
                </div>
                <div className="mt-1"><s className="text-[#ff8a8d]">{e.trecho}</s> → <b className="text-verde">{e.correcao}</b></div>
                <div className="text-suave text-[13px] mt-1">{e.explicacao}</div>
              </Card>
            )
          })}

          <Secao>Repertório</Secao>
          <Card className="text-[14px]">{a.repertorio}</Card>

          {a.pontosFortes.length > 0 && (<><Secao>Pontos fortes</Secao><Card className="text-[14px]"><ul className="list-disc pl-5 space-y-1">{a.pontosFortes.map((x) => <li key={x}>{x}</li>)}</ul></Card></>)}
          {a.melhorias.length > 0 && (<><Secao>Para melhorar</Secao><Card className="text-[14px]"><ul className="list-disc pl-5 space-y-1">{a.melhorias.map((x) => <li key={x}>{x}</li>)}</ul></Card></>)}
          {a.reescritas.length > 0 && (
            <>
              <Secao>Trechos reescritos</Secao>
              {a.reescritas.map((x, i) => (
                <Card key={i} className="text-[14px]">
                  <div className="text-suave line-through decoration-1">{x.original}</div>
                  <div className="mt-1.5">{x.sugestao}</div>
                </Card>
              ))}
            </>
          )}
          <div className="text-suave text-[11px] mt-1">Correção estimada por IA ({a.modelo}). Use como treino, não como nota oficial.</div>
        </>
      )}

      <Secao>Seu texto</Secao>
      <button onClick={() => setVerTexto((v) => !v)} className="text-suave text-sm mb-2">{verTexto ? 'Ocultar' : 'Mostrar'} o texto com as linhas ›</button>
      {verTexto && (
        <Card className="text-[14px] leading-relaxed">
          {linhas.map((l, i) => (
            <div key={i} className={`flex gap-2 ${linhasComErro.has(i + 1) ? 'bg-[#3a1d20] -mx-1 px-1 rounded' : ''}`}>
              <span className="text-suave w-6 shrink-0 text-right text-[12px] pt-0.5">{i + 1}</span><span>{l || ' '}</span>
            </div>
          ))}
        </Card>
      )}

      <div className="grid grid-cols-2 gap-2 mt-3">
        <Botao variante="secundario" onClick={() => nav(`/redacao/escrever?id=${r.id}`)}>Editar e corrigir de novo</Botao>
        <Botao variante="secundario" onClick={excluir}>Excluir</Botao>
      </div>
    </>
  )
}
