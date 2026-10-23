import { useEffect, useState } from 'react'
import type { DadosMateria, IndiceConteudo, Materia, Questao } from './types'

// O conteúdo vem de app/public/data (gerado por scripts/build-conteudo.mjs)
// e fica no cache do service worker para funcionar offline.
let indice: Promise<IndiceConteudo> | null = null
const materias = new Map<string, Promise<DadosMateria>>()

export function carregarIndice(): Promise<IndiceConteudo> {
  indice ??= fetch('/data/index.json').then((r) => {
    if (!r.ok) throw new Error('Não foi possível carregar o conteúdo')
    return r.json()
  })
  return indice
}

export function carregarMateria(codigo: string): Promise<DadosMateria> {
  let p = materias.get(codigo)
  if (!p) {
    p = fetch(`/data/${codigo}.json`).then((r) => {
      if (!r.ok) throw new Error(`Não foi possível carregar ${codigo}`)
      return r.json()
    })
    materias.set(codigo, p)
  }
  return p
}

export async function carregarTodas(): Promise<Record<string, DadosMateria>> {
  const ind = await carregarIndice()
  const pares = await Promise.all(ind.edital.materias.map(async (m) => [m.codigo, await carregarMateria(m.codigo)] as const))
  return Object.fromEntries(pares)
}

export function materiaDoTopico(topico: string): string {
  return topico.split('-')[0]
}

export function acharTopico(ind: IndiceConteudo, codigo: string): { materia: Materia; nome: string } | null {
  const materia = ind.edital.materias.find((m) => m.codigo === materiaDoTopico(codigo))
  const t = materia?.topicos.find((t) => t.codigo === codigo)
  return materia && t ? { materia, nome: t.nome } : null
}

export async function questoesPorId(ids: string[]): Promise<Questao[]> {
  const cods = [...new Set(ids.map((id) => materiaDoTopico(id)))]
  const dados = await Promise.all(cods.map(carregarMateria))
  const mapa = new Map<string, Questao>()
  for (const d of dados) for (const q of d.questoes) mapa.set(q.id, q)
  return ids.map((id) => mapa.get(id)).filter((q): q is Questao => !!q)
}

export function useAsync<T>(fn: () => Promise<T>, deps: unknown[]): { dados: T | null; erro: string | null } {
  const [estado, setEstado] = useState<{ dados: T | null; erro: string | null }>({ dados: null, erro: null })
  useEffect(() => {
    let vivo = true
    fn().then(
      (dados) => vivo && setEstado({ dados, erro: null }),
      (e: Error) => vivo && setEstado({ dados: null, erro: e.message }),
    )
    return () => { vivo = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return estado
}

export function useIndice() {
  return useAsync(carregarIndice, [])
}
