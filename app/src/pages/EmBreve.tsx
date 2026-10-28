import { useSearchParams } from 'react-router-dom'
import { Cabecalho, Card } from '../components/ui'

const DESCRICAO: Record<string, string> = {
  Simulados: 'Simulado completo (120 itens, 4h30), mini-simulado e simulado de pontos fracos, com a nota calculada pela regra do edital.',
  'Redação': 'Você digita o texto como escreveu na folha, informa as linhas, e a IA corrige com a fórmula do Cebraspe (NPD = NC − 6 × NE ÷ TL).',
  'Plano de estudos': 'Distribuição do edital até 24/01/2027 pelas suas horas disponíveis, ajustada pelo seu desempenho.',
}

export default function EmBreve() {
  const [p] = useSearchParams()
  const o = p.get('o') ?? 'Em breve'
  return (
    <>
      <Cabecalho titulo={o} />
      <Card className="text-sm">
        <div className="font-semibold mb-1">Em construção</div>
        <div className="text-suave">{DESCRICAO[o] ?? 'Esta parte entra nas próximas versões.'}</div>
      </Card>
    </>
  )
}
