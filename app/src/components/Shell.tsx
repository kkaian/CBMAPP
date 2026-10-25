import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const ABAS = [
  { para: '/', icone: '🏠', rotulo: 'Início', prefixos: ['/'] },
  { para: '/estudar', icone: '📚', rotulo: 'Estudar', prefixos: ['/estudar', '/m/', '/t/'] },
  { para: '/questoes', icone: '✅', rotulo: 'Questões', prefixos: ['/questoes', '/simulados'] },
  { para: '/desempenho', icone: '📈', rotulo: 'Desempenho', prefixos: ['/desempenho'] },
  { para: '/mais', icone: '☰', rotulo: 'Mais', prefixos: ['/mais', '/erros', '/perfil', '/em-breve', '/redacao', '/admin', '/ranking'] },
]

export default function Shell() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  const ativa = ABAS.find((a) => a.prefixos.some((p) => (p === '/' ? pathname === '/' : pathname.startsWith(p))))?.para
  return (
    <div className="max-w-lg mx-auto min-h-full">
      <main className="px-4 pt-4 pb-28" style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}>
        <Outlet />
      </main>
      <nav className="fixed bottom-0 inset-x-0 bg-[#12141a] border-t border-linha" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="max-w-lg mx-auto flex justify-around h-16 items-center">
          {ABAS.map((a) => (
            <NavLink key={a.para} to={a.para} className={`flex flex-col items-center gap-0.5 text-[11px] ${ativa === a.para ? 'text-texto' : 'text-suave'}`}>
              <span className="text-xl leading-none">{a.icone}</span>
              {a.rotulo}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
