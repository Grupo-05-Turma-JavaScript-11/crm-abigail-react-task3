import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
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
import Atendimentos from "./pages/atendimento/atendimento";
import ListaPacientes from "./pages/pacientes/ListaPacientes";
import NovoPaciente from "./pages/pacientes/NovoPaciente";
import EditarPaciente from "./pages/pacientes/EditarPaciente";
import Feature from "./pages/funcionalidades/Feature";
import { ToastAlerta } from "./utils/ToastAlerta";
import { ToastContainer } from "react-toastify";



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
    ToastAlerta("Você precisa está logado!", "erro");
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          {/* ROTAS PÚBLICAS */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastrar" element={<Cadastro />} />
            <Route path="/funcionalidades" element={<Feature />} />
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

            {/* Agenda: ADMIN, MEDICO, ASSISTENTE */}
            <Route
              path="agenda-medica"
              element={
                <ProtectedRoute
                  allowedRoles={["ADMIN", "MEDICO", "ASSISTENTE"]}
                >
                  <div className="min-h-screen bg-slate-50 p-6">Agenda </div>
                </ProtectedRoute>
              }
            />

            {/* Recepção: ADMIN, ASSISTENTE */}
            <Route
              path="recepcao"
              element={
                <ProtectedRoute allowedRoles={["ADMIN", "ASSISTENTE"]}>
                  <div className="min-h-screen bg-slate-50 p-6">Recepção </div>
                </ProtectedRoute>
              }
            />

            {/* Configurações: ADMIN apenas */}
            <Route
              path="configuracoes"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <div className="min-h-screen bg-slate-50 p-6">
                    Configurações
                  </div>
                </ProtectedRoute>
              }
            />

            {/* Notificações: todos logados */}
            <Route
              path="notificacoes"
              element={
                <ProtectedRoute
                  allowedRoles={["ADMIN", "MEDICO", "ASSISTENTE"]}
                >
                  <div className="min-h-screen bg-slate-50 p-6">
                    Notificações{" "}
                  </div>
                </ProtectedRoute>
              }
            />

            {/* Novo atendimento: ADMIN, MEDICO e ASSISTENTE) */}
            <Route
              path="atendimentos"
              element={
                <ProtectedRoute
                  allowedRoles={["ADMIN", "MEDICO", "ASSISTENTE"]}
                >
                  <Atendimentos />
                </ProtectedRoute>
              }
            />

            <Route
              path="pacientes"
              element={
                <ProtectedRoute
                  allowedRoles={["ADMIN", "MEDICO", "ASSISTENTE"]}
                >
                  <ListaPacientes />
                </ProtectedRoute>
              }
            />

            <Route
              path="pacientes/novo"
              element={
                <ProtectedRoute
                  allowedRoles={["ADMIN", "MEDICO", "ASSISTENTE"]}
                >
                  <NovoPaciente />
                </ProtectedRoute>
              }
            />

            <Route
              path="pacientes/:id"
              element={
                <ProtectedRoute
                  allowedRoles={["ADMIN", "MEDICO", "ASSISTENTE"]}
                >
                  <EditarPaciente />
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
