import { useLiveQuery } from 'dexie-react-hooks'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth'
import { CardInstalar } from '../components/Extras'
import { CartaoXp, LinhaMissao, NovaMissao, useMissoesPessoais, type ItemMissao } from '../components/Missoes'
import { Anel, Botao, Card, Carregando, Pill, Secao } from '../components/ui'
import { acharTopico, useIndice } from '../lib/conteudo'
import { db } from '../lib/db'
import { diaLocal, diasEntre, formatarDia, somarDias } from '../lib/datas'
import { calcularStreak, condecoracoes, extratoXp, diasComEstudo, metasMensais, montarMissao, patente } from '../lib/stats'
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
  const pessoais = useMissoesPessoais()

  if (erro) return <Carregando texto={erro} />
  if (!ind || !respostas || !revisoes || !leituras) return <Carregando />

  const hoje = diaLocal()
  const faltam = diasEntre(hoje, ind.edital.dataProva)
  const streak = calcularStreak(diasComEstudo(respostas))
  const ext = extratoXp({ respostas, leituras, simulados: simulados ?? [], redacoes: redacoes ?? [], metaDiaria: meta }, hoje)
  const xp = ext.total
  const pat = patente(xp)
  const cond = condecoracoes(xp)
  const m = montarMissao(ind, respostas, revisoes, leituras, meta)
  const foco = m.focoTopico ? acharTopico(ind, m.focoTopico) : null
  const leitura = m.leituraTopico ? acharTopico(ind, m.leituraTopico) : null
  const sugerida = m.materiaSugerida ? ind.edital.materias.find((x) => x.codigo === m.materiaSugerida) ?? null : null
  const leituraMarcadaHoje = !!m.leituraTopico && leituras.some((l) => l.topico === m.leituraTopico && diaLocal(new Date(l.criadaEm)) === hoje)
  const mensais = metasMensais(respostas, simulados ?? [], redacoes ?? [], hoje)
  const mesNome = new Date().toLocaleDateString('pt-BR', { month: 'long' })
  const plural = (n: number, um: string, varios: string) => `${n} ${n === 1 ? um : varios}`
  const subMes = (meta: { feitosNoMes: number; pendentes: number }, um: string, varios: string) =>
    meta.pendentes === 0
      ? meta.feitosNoMes ? `feito este mês${meta.feitosNoMes > 1 ? ` (${meta.feitosNoMes})` : ''}` : 'em dia'
      : `${meta.feitosNoMes ? `${meta.feitosNoMes} feito este mês · ` : ''}${plural(meta.pendentes, um, varios)} ${meta.pendentes === 1 ? 'pendente' : 'pendentes'}${meta.pendentes > 1 || meta.feitosNoMes ? ' (acumulado dos meses anteriores)' : ''}`
  // só mostra o que venceu há pouco: a meta de ontem e a da última semana ou mês (até 7 dias depois)
  const ontem = somarDias(hoje, -1)
  const metasPerdidas = ext.penalidadesMetas.filter((p) => (p.tipo === 'dia' ? p.dia >= ontem : p.dia >= somarDias(hoje, -7)))
  const missoes: ItemMissao[] = [
    ...(leitura && m.leituraTopico ? [{
      chave: 'leitura', periodo: 'dia' as const, feita: m.leituraFeita,
      titulo: `Resumo · ${m.leituraTopico} ${leitura.nome}`,
      sub: m.leituraFeita ? 'lido hoje e confirmado com 10 acertos'
        : m.leituraAcertos > 0 || leituraMarcadaHoje ? `lido · faltam ${Math.max(0, 10 - m.leituraAcertos)} acertos no tópico para contar`
        : 'leia o resumo e depois acerte 10 itens do tópico',
      onClick: () => nav(`/t/${m.leituraTopico}`),
    }] : []),
    ...(foco && m.focoTopico ? [{
      chave: 'foco', periodo: 'dia' as const, feita: m.focoFeitos >= m.focoMeta,
      titulo: `${m.focoMeta} itens · ${m.focoTopico} ${foco.nome}`,
      sub: `${Math.min(m.focoFeitos, m.focoMeta)} de ${m.focoMeta} feitos`,
      onClick: () => nav(`/quiz?modo=topico&t=${m.focoTopico}&n=${Math.max(5, m.focoMeta - m.focoFeitos)}`),
    }] : []),
    {
      chave: 'meta', obrigatoria: true, periodo: 'dia', feita: m.itensHoje >= m.metaItens,
      titulo: `Meta diária · ${m.metaItens} itens`, sub: `${Math.min(m.itensHoje, m.metaItens)} de ${m.metaItens} hoje`,
    },
    {
      chave: 'revisao', periodo: 'dia', feita: m.revisaoPendentes === 0,
      titulo: m.revisaoPendentes ? `Revisão · ${m.revisaoPendentes} itens do caderno de erros` : 'Revisão em dia',
      sub: m.revisaoPendentes ? 'vencem hoje' : m.revisaoFeitas ? `${m.revisaoFeitas} revisados hoje` : 'nada pendente',
      onClick: m.revisaoPendentes ? () => nav('/quiz?modo=revisao&n=20') : undefined,
    },
    {
      chave: 'semana', obrigatoria: true, periodo: 'semana', feita: m.semanaFeitas.length >= m.semanaMeta,
      titulo: `${Math.min(m.semanaFeitas.length, m.semanaMeta)} de ${m.semanaMeta} matérias`,
      sub: m.semanaFeitas.length >= m.semanaMeta ? 'meta semanal batida'
        : `${m.semanaMeta - m.semanaFeitas.length} a visitar até domingo${sugerida ? ` · sugestão de hoje: ${sugerida.nome}` : ''} (5+ itens em cada)`,
      onClick: sugerida ? () => nav(`/m/${sugerida.codigo}`) : undefined,
    },
    {
      chave: 'simulado', obrigatoria: true, periodo: 'mes', feita: mensais.simulado.pendentes === 0,
      titulo: `1 simulado completo · ${mesNome}`, sub: subMes(mensais.simulado, 'simulado', 'simulados'),
      onClick: () => nav('/simulados'),
    },
    {
      chave: 'trilha', obrigatoria: true, periodo: 'mes', feita: mensais.revisao.pendentes === 0,
      titulo: `1 trilha de revisão · ${mesNome}`, sub: subMes(mensais.revisao, 'trilha', 'trilhas'),
      onClick: () => nav('/trilha'),
    },
    {
      chave: 'redacao', obrigatoria: true, periodo: 'mes', feita: mensais.redacao.pendentes === 0,
      titulo: `1 redação corrigida · ${mesNome}`, sub: subMes(mensais.redacao, 'redação', 'redações'),
      onClick: () => nav('/redacao/escrever'),
    },
    ...pessoais.itens,
  ]
  const ordemPeriodo = { dia: 0, semana: 1, mes: 2 }
  missoes.sort((a, b) => ordemPeriodo[a.periodo] - ordemPeriodo[b.periodo] || Number(!!a.pessoal) - Number(!!b.pessoal) || Number(!a.obrigatoria) - Number(!b.obrigatoria))
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
        </div>
      </Card>

      <CartaoXp
        patenteNome={pat.nome}
        xp={xp}
        base={pat.proximaXp ? pat.base : cond.obtidas[cond.obtidas.length - 1]?.xp ?? pat.base}
        proximaXp={pat.proximaXp ?? cond.proxima.xp}
        proximaNome={pat.proximaNome ?? cond.proxima.nome}
        multiplicador={ext.multiplicadorHoje}
        ganhoHoje={ext.porDia[hoje] ?? 0}
        medalhas={cond.obtidas.map((c) => c.icone).join('')}
      />

      <Secao>Missões</Secao>
      <Card>
        {missoes.map((x) => <LinhaMissao key={x.chave} m={x} />)}
        <NovaMissao onAdicionar={pessoais.adicionar} />
      </Card>

      <div className="flex gap-2">
        <Botao to="/quiz?modo=relampago&n=5">⚡ Relâmpago · 5 itens</Botao>
        <Botao variante="secundario" to="/estudar">Escolher tópico</Botao>
      </div>

      {ext.emRisco > 0 && m.itensHoje === 0 && (
        <Card className="mt-3 border border-laranja/40 text-sm">🔥 Estude hoje para manter a sequência de {streak.dias} {streak.dias === 1 ? 'dia' : 'dias'}. Se ela quebrar, você perde {ext.emRisco} XP.</Card>
      )}
      {metasPerdidas.length > 0 && (
        <Card className="mt-3 border border-destaque/40 text-sm">
          <div>⏰ <b>Meta não cumprida no prazo</b>: −{metasPerdidas.reduce((t, p) => t + p.xp, 0)} XP</div>
          {metasPerdidas.map((p) => <div key={p.tipo + p.dia + p.descricao} className="text-suave text-[13px]">· {p.descricao} (−{p.xp})</div>)}
        </Card>
      )}
      {ext.penalidades.some((p) => p.dia === hoje) && (
        <Card className="mt-3 border border-destaque/40 text-sm">💔 A sequência quebrou: −{ext.penalidades.filter((p) => p.dia === hoje).reduce((t, p) => t + p.xp, 0)} XP. Ela recomeça hoje em ×0,4 e volta ao máximo em 7 dias.</Card>
      )}

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
