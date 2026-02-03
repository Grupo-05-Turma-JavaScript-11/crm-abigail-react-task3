import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useContext, type ReactNode } from "react";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

import Home from "./pages/home/Home";
import Sobre from "./pages/sobre/Sobre";
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";

import DashboardHome from "./pages/dashboard/DashboardHome";
import DashboardLayout from "./pages/dashboard/DashboardLayout";

import { AuthProvider, AuthContext } from "./contexts/AuthContext";

/* Layout público (site) */
function PublicLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
}

/* Proteção de rotas */
interface ProtectedRouteProps {
    children: ReactNode;
    allowedRoles?: string[];
}

type PropsPrivateRoute = {
  children: ReactNode;
};

function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
    const { usuario } = useContext(AuthContext);

    if (!usuario || (allowedRoles && !allowedRoles.includes(usuario.tipo))) {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
}

function PrivateRoute({ children }: PropsPrivateRoute) {
  const { usuario } = useContext(AuthContext);

  if (!usuario || !usuario.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* ROTAS PÚBLICAS */}
                    <Route element={<PublicLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/sobre" element={<Sobre />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/cadastro" element={<Cadastro />} />
                    </Route>

                    {/* ROTAS INTERNAS (DASHBOARD) */}
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <DashboardLayout />
                            </PrivateRoute>
                        }
                    >
                        {/* /dashboard */}
                        <Route index element={<DashboardHome />} />

                        {/* Agenda: admin, medico, assistente */}
                        <Route
                            path="agenda-medica"
                            element={
                                <ProtectedRoute allowedRoles={["admin", "medico", "assistente"]}>
                                    <div className="min-h-screen bg-slate-50 p-6">Agenda (placeholder)</div>
                                </ProtectedRoute>
                            }
                        />

                        {/* Recepção: admin, assistente */}
                        <Route
                            path="recepcao"
                            element={
                                <ProtectedRoute allowedRoles={["admin", "assistente"]}>
                                    <div className="min-h-screen bg-slate-50 p-6">Recepção (placeholder)</div>
                                </ProtectedRoute>
                            }
                        />

                        {/* Configurações: admin apenas */}
                        <Route
                            path="configuracoes"
                            element={
                                <ProtectedRoute allowedRoles={["admin"]}>
                                    <div className="min-h-screen bg-slate-50 p-6">Configurações (placeholder)</div>
                                </ProtectedRoute>
                            }
                        />

                        {/* Notificações: todos logados */}
                        <Route
                            path="notificacoes"
                            element={
                                <ProtectedRoute allowedRoles={["admin", "medico", "assistente"]}>
                                    <div className="min-h-screen bg-slate-50 p-6">Notificações (placeholder)</div>
                                </ProtectedRoute>
                            }
                        />

                        {/* Novo atendimento: admin, medico e assistente) */}
                        <Route
                            path="atendimentos/novo"
                            element={
                                <ProtectedRoute allowedRoles={["admin", "medico", "assistente"]}>
                                    <div className="min-h-screen bg-slate-50 p-6">Novo atendimento (placeholder)</div>
                                </ProtectedRoute>
                            }
                        />
                    </Route>

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}


