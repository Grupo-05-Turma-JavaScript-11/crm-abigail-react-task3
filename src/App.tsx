import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import { useContext, type ReactNode } from "react";

// Componentes globais (site público)
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

// Páginas públicas
import Home from "./pages/home/Home";
import Sobre from "./pages/sobre/Sobre";
import Feature from "./pages/funcionalidades/Feature";
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";

// Dashboard (layout próprio)
import Dashboard from "./pages/dashboard/Dashboard";

// Contexto de autenticação
import { AuthProvider, AuthContext } from "./contexts/AuthContext";

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


// AppContent decide quando mostrar Navbar e Footer
function AppContent() {

    // Hook para saber a rota atual
    const location = useLocation();

    // Verifica se a rota atual pertence à área interna (dashboard); se começar com "/dashboard", oculta Navbar e Footer
    const isInternalRoute =
        location.pathname.startsWith("/dashboard")

    return (
        <>
            {/* Navbar só aparece no site público */}
            {!isInternalRoute && <Navbar />}

            {/* Definição das rotas */}
            <Routes>

                {/* ROTAS PÚBLICAS */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/sobre" element={<Sobre />} />

                {/* ROTAS PROTEGIDAS (exemplo) */}

                {/* Dashboard Admin */}
                <Route
                    path="/dashboard-admin"
                    element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />

            </Routes>

            {/* Footer só aparece no site público */}
            {!isInternalRoute && <Footer />}
        </>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </AuthProvider>
    );
}
