import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { registerSW } from 'virtual:pwa-register'
import './index.css'
import './lib/instalar' // escuta o convite de instalação desde o início
import { AuthProvider, useAuth } from './auth'
import Shell from './components/Shell'
import { Carregando } from './components/ui'
import Admin from './pages/Admin'
import Aguardando from './pages/Aguardando'
import Desempenho from './pages/Desempenho'
import EmBreve from './pages/EmBreve'
import Erros from './pages/Erros'
import Estudar from './pages/Estudar'
import Inicio from './pages/Inicio'
import Login from './pages/Login'
import Mais from './pages/Mais'
import Materia from './pages/Materia'
import Perfil from './pages/Perfil'
import Questoes from './pages/Questoes'
import Ranking, { PerfilColega } from './pages/Ranking'
import Quiz from './pages/Quiz'
import Redacao from './pages/Redacao'
import { RedacaoModelo, RedacaoRepertorio } from './pages/RedacaoExtras'
import Simulado from './pages/Simulado'
import Simulados from './pages/Simulados'
import Topico from './pages/Topico'

registerSW({ immediate: true })

// Rotas com # (ex.: /#/t/FIS-12): funcionam offline e na Vercel sem configuração extra.
const router = createHashRouter([
  {
    element: <Shell />,
    children: [
      { path: '/', element: <Inicio /> },
      { path: '/estudar', element: <Estudar /> },
      { path: '/m/:cod', element: <Materia /> },
      { path: '/t/:cod', element: <Topico /> },
      { path: '/questoes', element: <Questoes /> },
      { path: '/desempenho', element: <Desempenho /> },
      { path: '/mais', element: <Mais /> },
      { path: '/erros', element: <Erros /> },
      { path: '/perfil', element: <Perfil /> },
      { path: '/em-breve', element: <EmBreve /> },
      { path: '/redacao', element: <Redacao /> },
      { path: '/redacao/modelo/:id', element: <RedacaoModelo /> },
      { path: '/redacao/repertorio/:id', element: <RedacaoRepertorio /> },
      { path: '/simulados', element: <Simulados /> },
      { path: '/ranking', element: <Ranking /> },
      { path: '/ranking/:id', element: <PerfilColega /> },
      { path: '/admin', element: <Admin /> },
    ],
  },
  { path: '/quiz', element: <div className="max-w-lg mx-auto px-4 pt-4 pb-10"><Quiz /></div> },
  { path: '/simulado/:id', element: <div className="max-w-lg mx-auto px-4 pt-4 pb-10"><Simulado /></div> },
])

function Portao() {
  const { pronto, logado, perfil } = useAuth()
  if (!pronto) return <Carregando />
  if (!logado) return <Login />
  if (!perfil) return <Carregando texto="Conectando… (na primeira vez é preciso internet)" />
  if (perfil.status !== 'aprovado') return <Aguardando />
  return <RouterProvider router={router} />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Portao />
    </AuthProvider>
  </StrictMode>,
)
