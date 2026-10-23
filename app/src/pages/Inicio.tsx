import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth'
import { CardInstalar } from '../components/Extras'
import { Anel, Botao, Card, Carregando, Pill, Secao } from '../components/ui'
import { acharTopico, useIndice } from '../lib/conteudo'
import { diaLocal, diasEntre, formatarDia } from '../lib/datas'
import { calcularStreak, calcularXp, diasComEstudo, montarMissao, patente } from '../lib/stats'
import { useLeituras, useMetaDiaria, useRespostas, useRevisoes } from '../lib/useDados'

function saudacao() {
  const h = new Date().getHours()
  return h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite'
}

export default function Inicio() {
  const { dados: ind, erro } = useIndice()
  const respostas = useRespostas()
  const revisoes = useRevisoes()
  const leituras = useLeituras()
  const meta = useMetaDiaria()
  const { usuario } = useAuth()
  const nav = useNavigate()

  if (erro) return <Carregando texto={erro} />
  if (!ind || !respostas || !revisoes || !leituras) return <Carregando />

  const hoje = diaLocal()
  const faltam = diasEntre(hoje, ind.edital.dataProva)
  const streak = calcularStreak(diasComEstudo(respostas))
  const xp = calcularXp(respostas, leituras)
  const pat = patente(xp)
  const m = montarMissao(ind, respostas, revisoes, leituras, meta)
  const foco = m.focoTopico ? acharTopico(ind, m.focoTopico) : null
  const leitura = m.leituraTopico ? acharTopico(ind, m.leituraTopico) : null
  const nome = usuario && usuario !== 'modo local' ? `, ${usuario}` : ''

  return (
    <>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-suave text-sm capitalize">{formatarDia(hoje)}</div>
          <h2 className="text-[22px] font-bold">{saudacao()}{nome}</h2>
        </div>
        <Pill cor={streak.dias > 0 ? 'orange' : 'gray'}>🔥 {streak.dias} {streak.dias === 1 ? 'dia' : 'dias'}</Pill>
      </div>

      <Card className="flex items-center gap-3 mt-3.5">
        <Anel valor={m.itensHoje / m.metaItens} centro={`${m.itensHoje}/${m.metaItens}`} legenda="itens hoje" />
        <div>
          <div className="text-[28px] font-bold leading-none">{faltam} dias</div>
          <div className="text-suave text-sm">até a prova · {ind.edital.dataProva.split('-').reverse().join('/')}</div>
          <div className="text-sm mt-1.5">
            Patente: <b>{pat.nome}</b> · {xp.toLocaleString('pt-BR')} XP
            {pat.proximaXp && <div className="text-suave">faltam {(pat.proximaXp - xp).toLocaleString('pt-BR')} XP para {pat.proximaNome}</div>}
          </div>
        </div>
      </Card>

      <Secao>Missão do dia</Secao>
      <Card>
        {leitura && m.leituraTopico && (
          <Tarefa feita={m.leituraFeita} titulo={`Resumo · ${m.leituraTopico} ${leitura.nome}`} sub={m.leituraFeita ? 'lido hoje' : 'leia o resumo do tópico'}
            onClick={() => nav(`/t/${m.leituraTopico}`)} />
        )}
        {foco && m.focoTopico && (
          <Tarefa feita={m.focoFeitos >= m.focoMeta} titulo={`${m.focoMeta} itens · ${m.focoTopico} ${foco.nome}`}
            sub={`${Math.min(m.focoFeitos, m.focoMeta)} de ${m.focoMeta} feitos`}
            onClick={() => nav(`/quiz?modo=topico&t=${m.focoTopico}&n=${Math.max(5, m.focoMeta - m.focoFeitos)}`)} />
        )}
        <Tarefa feita={m.revisaoPendentes === 0} titulo={m.revisaoPendentes ? `Revisão · ${m.revisaoPendentes} itens do caderno de erros` : 'Revisão em dia'}
          sub={m.revisaoPendentes ? 'vencem hoje' : m.revisaoFeitas ? `${m.revisaoFeitas} revisados hoje` : 'nada pendente'}
          onClick={m.revisaoPendentes ? () => nav('/quiz?modo=revisao&n=20') : undefined} />
      </Card>

      <div className="flex gap-2">
        <Botao to="/quiz?modo=relampago&n=5">⚡ Relâmpago · 5 itens</Botao>
        <Botao variante="secundario" to="/estudar">Escolher tópico</Botao>
      </div>

      {m.itensHoje >= m.metaItens && (
        <Card className="mt-3 border border-verde/40">✅ Meta de hoje batida. Tudo o que fizer agora é bônus.</Card>
      )}

      {respostas.length === 0 && (
        <>
          <Secao>Primeiros passos</Secao>
          <Card className="text-sm text-suave">
            Responda itens em qualquer tópico. Antes de cada resposta, marque se tem <b className="text-texto">certeza</b>, <b className="text-texto">dúvida</b> ou se é <b className="text-texto">chute</b>: é isso que mostra, depois, onde vale arriscar e onde deixar em branco.
            O diagnóstico de cada tópico aparece a partir de 10 respostas.
          </Card>
        </>
      )}

      <div className="mt-4"><CardInstalar compacto /></div>

      <div className="text-center mt-4"><Link to="/desempenho" className="text-azul text-sm">Ver desempenho ›</Link></div>
    </>
  )
}

function Tarefa({ feita, titulo, sub, onClick }: { feita: boolean; titulo: string; sub: string; onClick?: () => void }) {
  return (
    <div onClick={onClick} className={`flex gap-3 items-center py-3 border-t border-linha first:border-t-0 first:pt-1 last:pb-1 ${onClick ? 'cursor-pointer' : ''}`}>
      <div className={`w-[22px] h-[22px] rounded-full border-2 shrink-0 ${feita ? 'bg-verde border-verde' : 'border-cinza'}`} />
      <div className="flex-1 min-w-0">
        <div className="font-semibold leading-snug">{titulo}</div>
        <div className="text-suave text-[13px]">{sub}</div>
      </div>
      {onClick && <span className="text-suave">›</span>}
    </div>
  )
}
