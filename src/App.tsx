import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useContext, type ReactNode } from "react";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

import Home from "./pages/home/Home";
import Sobre from "./pages/sobre/Sobre";
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";

import Dashboard from "./pages/dashboard/Dashboard";
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

function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
    const { usuario } = useContext(AuthContext);

    if (!usuario?.token) return <Navigate to="/login" replace />;

    if (allowedRoles && !allowedRoles.includes(usuario.tipo)) {
        return <Navigate to="/" replace />;
    }
    return <>{children}</>;
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
                        element={
                            <ProtectedRoute allowedRoles={["admin", "medico", "assistente"]}>
                                <DashboardLayout />
                            </ProtectedRoute>
                        }
                    >
                        {/* Ajuste os paths conforme suas rotas reais */}
                        <Route path="/dashboard-admin" element={<Dashboard />} />
                        <Route path="/agenda-medica" element={
                            <div className="min-h-screen bg-slate-50 p-6">
                                Agenda (placeholder)
                            </div>}
                        />
                        <Route path="/recepcao" element={
                            <div className="min-h-screen bg-slate-50 p-6">
                                Recepção (placeholder)
                            </div>}
                        />
                        <Route path="/configuracoes" element={
                            <div className="min-h-screen bg-slate-50 p-6">
                                Configurações (placeholder)
                            </div>}
                        />
                        <Route path="/notificacoes" element={
                            <div className="min-h-screen bg-slate-50 p-6">
                                Notificações (placeholder)
                            </div>}
                        />
                        <Route path="/atndimentos/novo" element={
                            <div className="min-h-screen bg-slate-50 p-6">
                                Novo atendimento (placeholder)
                            </div>}
                        />
                    </Route>

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

