import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

import AdminDashboard from "./role/AdminDashboard";
import MedicoDashboard from "./role/MedicoDashboard";
import AssistenteDashboard from "./role/AssistenteDashboard";

export default function DashboardHome() {
    const { usuario } = useContext(AuthContext);

    if (!usuario || !usuario.tipo) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center text-slate-500">
                Carregando dashboard...
            </div>
        );
    }



    return (
        <>
            {usuario.tipo === "ADMIN" && <AdminDashboard />}
            {usuario.tipo === "MEDICO" && <MedicoDashboard />}
            {usuario.tipo === "ASSISTENTE" && <AssistenteDashboard />}
        </>
    );
}
