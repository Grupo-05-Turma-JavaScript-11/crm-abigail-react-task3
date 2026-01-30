
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Sobre from './pages/sobre/Sobre';
import Feature from './pages/funcionalidades/Feature';
import Home from './pages/home/Home';
import Footer from './components/footer/Footer';
import Login from './pages/login/Login';
import Cadastro from './pages/cadastro/Cadastro';
import { AuthProvider } from './contexts/AuthContext';

import { Navigate } from 'react-router-dom';
import { useContext, type ReactNode } from 'react';
import { AuthContext } from './contexts/AuthContext';

// Componente para proteger rotas
interface ProtectedRouteProps {
  children: ReactNode
  allowedRoles?: string[]; // Tipos permitidos (ex: ['admin', 'medico'])
}

function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { usuario } = useContext(AuthContext);

  // Sem token? Vá pro login!
  if (usuario.token === "") {
    return <Navigate to="/login" />;
  }

  // Se a rota é restrita a certos tipos e o usuário não é um deles
  if (allowedRoles && !allowedRoles.includes(usuario.tipo)) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
          <Routes>
            {/* --- PÚBLICAS --- */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/sobre" element={<Sobre />} />

            {/* --- TODOS OS LOGADOS = EXEMPLOOO --- */}
            <Route path="/funcionalidades" element={ // não ta logado? Sai! vai logar!
              <ProtectedRoute>
                <Feature />
              </ProtectedRoute>
            } />

            {/* --- ROTAS EXCLUSIVAS: MÉDICO E ADMIN ---
            <Route path="/atendimento" element={
              <ProtectedRoute allowedRoles={['medico', 'admin']}>
                <Atendimento /> 
              </ProtectedRoute>
            } />

            --- ROTAS EXCLUSIVAS: ASSISTENTE E ADMIN ---
            <Route path="/agendamentos" element={
              <ProtectedRoute allowedRoles={['assistente', 'admin']}>
                <Agendamentos /> {/* Gerenciamento de agenda, por exemplo 
              </ProtectedRoute>
            } />

            {/* --- ROTAS EXCLUSIVAS: APENAS ADMIN ---
            <Route path="/painel-controle" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <PainelAdmin />
              </ProtectedRoute>
            } /> */}

          </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}