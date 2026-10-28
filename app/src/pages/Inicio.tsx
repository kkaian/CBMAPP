import { useLiveQuery } from 'dexie-react-hooks'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth'
import { CardInstalar } from '../components/Extras'
import { Anel, Botao, Card, Carregando, Pill, Secao } from '../components/ui'
import { acharTopico, useIndice } from '../lib/conteudo'
import { db } from '../lib/db'
import { diaLocal, diasEntre, formatarDia } from '../lib/datas'
import { calcularStreak, calcularXp, condecoracoes, diasComEstudo, metasMensais, montarMissao, patente } from '../lib/stats'
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
  const simulados = useLiveQuery(() => db.simulados.where('status').equals('concluido').toArray(), [])
  const redacoes = useLiveQuery(() => db.redacoes.toArray(), [])

  if (erro) return <Carregando texto={erro} />
  if (!ind || !respostas || !revisoes || !leituras) return <Carregando />

  const hoje = diaLocal()
  const faltam = diasEntre(hoje, ind.edital.dataProva)
  const streak = calcularStreak(diasComEstudo(respostas))
  const xp = calcularXp(respostas, leituras)
  const pat = patente(xp)
  const cond = condecoracoes(xp)
  const m = montarMissao(ind, respostas, revisoes, leituras, meta)
  const foco = m.focoTopico ? acharTopico(ind, m.focoTopico) : null
  const leitura = m.leituraTopico ? acharTopico(ind, m.leituraTopico) : null
  const sugerida = m.materiaSugerida ? ind.edital.materias.find((x) => x.codigo === m.materiaSugerida) ?? null : null
  const leituraMarcadaHoje = !!m.leituraTopico && leituras.some((l) => l.topico === m.leituraTopico && diaLocal(new Date(l.criadaEm)) === hoje)
  const mensais = metasMensais(respostas, simulados ?? [], redacoes ?? [], hoje)
  const mesNome = new Date().toLocaleDateString('pt-BR', { month: 'long' })
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
            {pat.proximaXp
              ? <div className="text-suave">faltam {(pat.proximaXp - xp).toLocaleString('pt-BR')} XP para {pat.proximaNome}</div>
              : <div className="text-suave">{cond.obtidas.length ? `${cond.obtidas.map((c) => c.icone).join('')} · ` : ''}próxima: {cond.proxima.nome}</div>}
          </div>
        </div>
      </Card>

      <Secao>Missão do dia</Secao>
      <Card>
        {leitura && m.leituraTopico && (
          <Tarefa feita={m.leituraFeita} titulo={`Resumo · ${m.leituraTopico} ${leitura.nome}`}
            sub={m.leituraFeita ? 'lido hoje e confirmado com 10 acertos'
              : m.leituraAcertos > 0 || leituraMarcadaHoje ? `lido · faltam ${Math.max(0, 10 - m.leituraAcertos)} acertos no tópico para contar`
              : 'leia o resumo e depois acerte 10 itens do tópico'}
            onClick={() => nav(`/t/${m.leituraTopico}`)} />
        )}
        {foco && m.focoTopico && (
          <Tarefa feita={m.focoFeitos >= m.focoMeta} titulo={`${m.focoMeta} itens · ${m.focoTopico} ${foco.nome}`}
            sub={`${Math.min(m.focoFeitos, m.focoMeta)} de ${m.focoMeta} feitos`}
            onClick={() => nav(`/quiz?modo=topico&t=${m.focoTopico}&n=${Math.max(5, m.focoMeta - m.focoFeitos)}`)} />
        )}
        <Tarefa feita={m.semanaFeitas.length >= m.semanaMeta}
          titulo={`Semana · ${Math.min(m.semanaFeitas.length, m.semanaMeta)} de ${m.semanaMeta} matérias`}
          sub={m.semanaFeitas.length >= m.semanaMeta ? 'meta semanal batida'
            : `${m.semanaMeta - m.semanaFeitas.length} a visitar até domingo${sugerida ? ` · sugestão de hoje: ${sugerida.nome}` : ''} (5+ itens em cada)`}
          onClick={sugerida ? () => nav(`/m/${sugerida.codigo}`) : undefined} />
        <Tarefa feita={m.revisaoPendentes === 0} titulo={m.revisaoPendentes ? `Revisão · ${m.revisaoPendentes} itens do caderno de erros` : 'Revisão em dia'}
          sub={m.revisaoPendentes ? 'vencem hoje' : m.revisaoFeitas ? `${m.revisaoFeitas} revisados hoje` : 'nada pendente'}
          onClick={m.revisaoPendentes ? () => nav('/quiz?modo=revisao&n=20') : undefined} />
      </Card>

      <Secao>Metas do mês · {mesNome}</Secao>
      <Card>
        <MetaMes titulo="1 simulado completo (120 itens)" meta={mensais.simulado} rotulo="simulado" onClick={() => nav('/simulados')} />
        <MetaMes titulo="1 redação corrigida" meta={mensais.redacao} rotulo="redação" onClick={() => nav('/redacao/escrever')} />
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

function MetaMes({ titulo, meta, rotulo, onClick }: { titulo: string; meta: { feitosNoMes: number; pendentes: number }; rotulo: string; onClick: () => void }) {
  const plural = (n: number) => `${n} ${rotulo === 'redação' ? (n === 1 ? 'redação' : 'redações') : n === 1 ? 'simulado' : 'simulados'}`
  const sub = meta.pendentes === 0
    ? meta.feitosNoMes ? `feito este mês${meta.feitosNoMes > 1 ? ` (${meta.feitosNoMes})` : ''}` : 'em dia'
    : `${meta.feitosNoMes ? `${meta.feitosNoMes} feito este mês · ` : ''}${plural(meta.pendentes)} ${meta.pendentes === 1 ? 'pendente' : 'pendentes'}${meta.pendentes > 1 || meta.feitosNoMes ? ' (acumulado dos meses anteriores)' : ''}`
  return <Tarefa feita={meta.pendentes === 0} titulo={titulo} sub={sub} onClick={onClick} />
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
