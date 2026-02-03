import { Outlet } from "react-router-dom";
import { useContext, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { AuthContext } from "../../contexts/AuthContext";
import { getNavItems } from "./dashboard.data";

export default function DashboardLayout() {
    const { usuario, handleLogout } = useContext(AuthContext);
    
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const sidebarRef = useRef<HTMLElement | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = useMemo(() => getNavItems(usuario.tipo), [usuario.tipo]);

    const activeKey = useMemo(() => {
        const found = navItems.find(item => item.to === location.pathname);
        return found?.key ?? "dashboard";
    }, [location.pathname, navItems]);

    const roleLabel = useMemo(() => {
        if (usuario.tipo === "ADMIN") return "Administrador(a)";
        if (usuario.tipo === "MEDICO") return "Médico(a)";
        if (usuario.tipo === "ASSISTENTE") return "Assistente";
        return "Usuário";
    }, [usuario.tipo]);

    const onLogout = () => {
        handleLogout();
        navigate("/login", { replace: true });
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Sidebar
                sidebarOpen={sidebarOpen}
                sidebarRef={sidebarRef}
                navItems={navItems}
                activeKey={activeKey}
                onClose={() => setSidebarOpen(false)}
                onLogout={onLogout}
                userName={usuario.nome || "Usuário"}
                roleLabel={roleLabel}
            />

            <Topbar
                sidebarOpen={sidebarOpen}
                onToggleSidebar={() => setSidebarOpen(v => !v)}
                userName={usuario.nome || "Usuário"}
                roleLabel={roleLabel}
            />

            <main
                className={`transition-[margin-left] duration-300 ${sidebarOpen ? "ml-64" : "ml-0"
                    }`}
            >
                <div>
                    {/* AQUI entram Dashboard, Agenda, Notificações, etc */}
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
