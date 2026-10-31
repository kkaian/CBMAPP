import { useNavigate } from 'react-router-dom'
import { Botao, Cabecalho, Card, Carregando, Secao } from '../components/ui'
import { acharTopico, useIndice } from '../lib/conteudo'
import { agruparPor, cadernoDeDuvidas } from '../lib/stats'
import { useRespostas } from '../lib/useDados'

const POR_VEZ = 20

// Sem prazo e sem meta: só guarda os acertos na dúvida para a pessoa voltar quando quiser.
export default function Duvidas() {
  const { dados: ind } = useIndice()
  const respostas = useRespostas()
  const nav = useNavigate()
  if (!ind || !respostas) return <Carregando />
  const itens = cadernoDeDuvidas(respostas)
  const porMateria = agruparPor(itens, (r) => r.materia)

  return (
    <>
      <Cabecalho titulo="Caderno de dúvidas" sub={`${itens.length} ${itens.length === 1 ? 'item' : 'itens'}`} />
      <Card className="text-sm">
        Os acertos que você marcou como dúvida ficam aqui, sem prazo: às vezes foi um chute disfarçado.
        Acertou com certeza → soma só a diferença para a dúvida e o item sai. Errou → tira o valor normal e o item vai para o caderno de erros.
      </Card>
      {itens.length === 0
        ? <div className="text-suave text-sm text-center py-4">Nenhuma dúvida guardada por enquanto.</div>
        : <Botao variante="secundario" to={`/quiz?modo=duvidas&n=${POR_VEZ}`}>Voltar em {Math.min(POR_VEZ, itens.length)} ao acaso</Botao>}

      {itens.length > 0 && <Secao>Por matéria e tópico</Secao>}
      {ind.edital.materias.filter((m) => porMateria[m.codigo]).map((m) => {
        const porTopico = agruparPor(porMateria[m.codigo], (r) => r.topico)
        return (
          <Card key={m.codigo} className="!p-0 overflow-hidden text-sm">
            <button type="button" onClick={() => nav(`/quiz?modo=duvidas&n=${POR_VEZ}&m=${m.codigo}`)} className="flex w-full justify-between p-2.5 text-left font-semibold">
              <span>{m.nome}</span><span>{porMateria[m.codigo].length} ›</span>
            </button>
            {Object.entries(porTopico).sort(([a], [b]) => a.localeCompare(b)).map(([t, rs]) => (
              <button key={t} type="button" onClick={() => nav(`/quiz?modo=duvidas&n=${POR_VEZ}&t=${t}`)} className="flex w-full justify-between gap-2 px-2.5 py-1.5 text-left text-[13px] border-t border-linha">
                <span className="min-w-0"><b>{t}</b> <span className="text-suave">{acharTopico(ind, t)?.nome}</span></span>
                <span className="text-suave shrink-0">{rs.length} ›</span>
              </button>
            ))}
          </Card>
        )
      })}
    </>
  )
}
