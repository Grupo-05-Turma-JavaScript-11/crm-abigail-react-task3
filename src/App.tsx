import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import { useContext, type ReactNode } from "react";

// Componentes globais (site público)
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

// Páginas públicas
import Home from "./pages/home/Home";
import Sobre from "./pages/sobre/Sobre";
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";

// Dashboard (layout próprio)

// Contexto de autenticação
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import Feature from "./pages/funcionalidades/Feature";
import PublicLayout from "./pages/dashboard/PublicLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Atendimentos from "./pages/atendimento/atendimento";
import DashboardLayout from "./pages/dashboard/DashboardLayout";

// Proteção de rotas e Tipagem das Props
interface ProtectedRouteProps {
    children: ReactNode;        // componente protegido
    allowedRoles?: string[];    // tipos de usuário permitidos
}

// Componente que protege rotas
function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {

    // Usuário logado vem do AuthContext
    const { usuario } = useContext(AuthContext);

    // Se NÃO tem token → manda para login
    if (usuario.token === "") {
        return <Navigate to="/login" replace />;    // Replace evita que o usuário volte para uma página protegida sem login
    }

    // Se a rota exige papel específico e o usuário não tem
    if (allowedRoles && !allowedRoles.includes(usuario.tipo)) {
        return <Navigate to="/" replace />;
    }

    // Se passou nas validações, renderiza o conteúdo
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
            <Route path="/usuarios/cadastrar" element={<Cadastro />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/funcionalidades" element={ <Feature /> } />

            <Route path="/atendimentos" element={ <Atendimentos/>}/>

            <Route path="/dashboard" element={<DashboardHome/>}/>

            </Routes>
            <Footer />
        </ BrowserRouter>
      </AuthProvider>
    );
}


