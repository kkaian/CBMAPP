import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Botao, Cabecalho, Card, Carregando, Pill, Secao } from '../components/ui'
import { carregarMateria, useAsync, useIndice } from '../lib/conteudo'
import type { TemaRedacao } from '../lib/types'
import { useLeituras } from '../lib/useDados'

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

      <Card className="text-sm">
        <div className="font-semibold mb-1">Correção por IA · em breve</div>
        <div className="text-suave">Você vai digitar o texto exatamente como escreveu na folha, informar as linhas, e a IA aponta os erros e calcula a nota pela fórmula acima. Por enquanto, escreva na folha e use a calculadora.</div>
      </Card>

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
        <Tema key={tema.id} tema={tema} aberto={aberto === tema.id} onToggle={() => setAberto(aberto === tema.id ? null : tema.id)} />
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

function Tema({ tema, aberto, onToggle }: { tema: TemaRedacao; aberto: boolean; onToggle: () => void }) {
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
            <div className="text-suave text-xs mt-3">Coringa: Darcy Ribeiro, <i>O Povo Brasileiro</i> (desigualdade estrutural). Veja RED-05.</div>
          </div>
        )}
      </Card>
    </div>
  )
}
