import { useEffect, useState } from 'react'

// Instalação do app na tela inicial (PWA).
// O Chrome/Android dispara "beforeinstallprompt" uma vez; guardamos o evento para usar no botão.
interface EventoInstalacao extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

let evento: EventoInstalacao | null = null
const ouvintes = new Set<() => void>()
const avisar = () => ouvintes.forEach((f) => f())

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    evento = e as EventoInstalacao
    avisar()
  })
  window.addEventListener('appinstalled', () => { evento = null; avisar() })
}

export function estaInstalado() {
  return window.matchMedia('(display-mode: standalone)').matches || (navigator as { standalone?: boolean }).standalone === true
}

export function ehIOS() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent)
}

export type EstadoInstalacao = 'instalado' | 'disponivel' | 'ios' | 'manual'

export function useInstalacao() {
  const calcular = (): EstadoInstalacao => (estaInstalado() ? 'instalado' : evento ? 'disponivel' : ehIOS() ? 'ios' : 'manual')
  const [estado, setEstado] = useState<EstadoInstalacao>(calcular)
  useEffect(() => {
    const f = () => setEstado(calcular())
    ouvintes.add(f)
    return () => { ouvintes.delete(f) }
  }, [])
  async function instalar() {
    if (!evento) return
    await evento.prompt()
    await evento.userChoice
    evento = null
    avisar()
  }
  return { estado, instalar }
}
