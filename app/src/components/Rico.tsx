import { useMemo } from 'react'
import katex from 'katex'
import { marked } from 'marked'

// Renderiza texto com Markdown e fórmulas. Fórmulas usam \( ... \) (na linha) e \[ ... \] (em destaque).
// O cifrão ($) não é usado como delimitador para não conflitar com "R$".
function renderizar(texto: string, emLinha: boolean): string {
  const formulas: string[] = []
  const marcado = texto.replace(/\\\[([\s\S]+?)\\\]|\\\(([\s\S]+?)\\\)/g, (_, bloco: string | undefined, linha: string | undefined) => {
    const html = katex.renderToString((bloco ?? linha ?? '').trim(), { displayMode: !!bloco, throwOnError: false, output: 'html' })
    formulas.push(html)
    return `@@F${formulas.length - 1}@@`
  })
  const html = emLinha ? (marked.parseInline(marcado) as string) : (marked.parse(marcado) as string)
  return html.replace(/@@F(\d+)@@/g, (_, i: string) => formulas[Number(i)])
}

export function Rico({ texto, emLinha = false, className = '' }: { texto: string; emLinha?: boolean; className?: string }) {
  const html = useMemo(() => renderizar(texto, emLinha), [texto, emLinha])
  const Tag = emLinha ? 'span' : 'div'
  return <Tag className={`rico ${className}`} dangerouslySetInnerHTML={{ __html: html }} />
}
