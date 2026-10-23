// Datas sempre no fuso do aparelho, no formato AAAA-MM-DD.
export function diaLocal(d: Date = new Date()): string {
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

export function somarDias(dia: string, n: number): string {
  const [a, m, d] = dia.split('-').map(Number)
  return diaLocal(new Date(a, m - 1, d + n))
}

export function diasEntre(de: string, ate: string): number {
  const [a1, m1, d1] = de.split('-').map(Number)
  const [a2, m2, d2] = ate.split('-').map(Number)
  return Math.round((Date.UTC(a2, m2 - 1, d2) - Date.UTC(a1, m1 - 1, d1)) / 86400000)
}

// segunda-feira da semana do dia (semana de segunda a domingo)
export function inicioSemana(dia: string): string {
  const [a, m, d] = dia.split('-').map(Number)
  const dt = new Date(a, m - 1, d)
  const dow = (dt.getDay() + 6) % 7
  return somarDias(dia, -dow)
}

export function formatarDia(dia: string): string {
  const [a, m, d] = dia.split('-').map(Number)
  return new Date(a, m - 1, d).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit' })
}
