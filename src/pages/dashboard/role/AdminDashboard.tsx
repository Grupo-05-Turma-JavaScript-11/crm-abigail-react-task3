import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";
import { buscar} from "../../../services/Service";

import PageHeader from "../components/PageHeader";
import StatsSection from "../components/StatsSection";
import AgendaCard from "../components/AgendaCard";
import ActivitiesCard from "../components/ActivitiesCard";
import BottomSection from "../components/BottomSection";
import DashboardFooter from "../components/DashboardFooter";

import type { StatCard, AgendaItem, ActivityItem } from "../dashboard.types";
import type Atendimento from "../../../models/Atendimento";
import type { PacienteFormData } from "../../../models/Paciente";

function safeDate(value: any): Date | null {
    if (!value) return null;
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
}

function formatTimeBR(date: Date | null): string {
    if (!date) return "--:--";
    return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

function mapStatus(raw: any): AgendaItem["status"] {
    const s = String(raw ?? "").trim().toLowerCase();
    if (s.includes("agen")) return "AGENDADO";
    if (s.includes("aten")) return "EM TRATAMENTO";
    if (s.includes("final")) return "FINALIZADO";
    return "CANCELADO";
}

function isToday(date: Date | null): boolean {
    if (!date) return false;
    const now = new Date();
    return date.toDateString() === now.toDateString();
}

export default function AdminDashboard() {
    const { usuario } = useContext(AuthContext);
    const navigate = useNavigate();

    const [rawPacientes, setRawPacientes] = useState<PacienteFormData[]>([]);
    const [rawAtendimentos, setRawAtendimentos] = useState<Atendimento[]>([]);
    const [periodoAtivo, setPeriodoAtivo] = useState<"Dia" | "Semana" | "Mês">("Dia");

    useEffect(() => {
        buscar("/pacientes", setRawPacientes, {header: {Authorization: usuario.token}});
        buscar("/atendimentos", setRawAtendimentos, {header: {Authorization: usuario.token}});
    }, [usuario.token]);

    // Admin vê agenda global (para gestão/auditoria, não para prontuário)
    const agenda: AgendaItem[] = useMemo(() => {
        return rawAtendimentos.map((a: any) => {
            const date = safeDate(a.dataHora ?? a.data_hora ?? a.data ?? a.horario ?? a.dateTime);

            const patientName =
                a.paciente?.nome ??
                a.pacienteNome ??
                a.nomePaciente ??
                "—";

            const type =
                a.especialidade ??
                a.tipoAtendimento ??
                a.motivo ??
                a.tipo ??
                "Consulta";

            return {
                id: String(a.id ?? a._id ?? crypto?.randomUUID?.() ?? Math.random()),
                time: formatTimeBR(date),
                patient: String(patientName),
                type: String(type),
                status: mapStatus(a.status),
            };
        });
    }, [rawAtendimentos]);

    const statCards: StatCard[] = useMemo(() => {
        const atendHoje = rawAtendimentos.filter((a: any) => {
            const date = safeDate(a.dataHora ?? a.data_hora ?? a.data ?? a.horario ?? a.dateTime);
            return isToday(date);
        });

        const pendentes = atendHoje.filter((a: any) => {
            const s = String(a.status ?? "").toLowerCase();
            return s.includes("pend") || s.includes("fila") || s.includes("aguard");
        });

        return [
            {
                key: "pacientes",
                title: "Pacientes",
                value: String(rawPacientes.length),
                note: "cadastrados",
                accent: "aqua",
                icon: <span />,
            },
            {
                key: "hoje",
                title: "Atendimentos hoje",
                value: String(atendHoje.length),
                note: "clínica inteira",
                accent: "blue",
                icon: <span />,
            },
            {
                key: "pendentes",
                title: "Pendentes",
                value: String(pendentes.length),
                note: "fila / aguardando",
                accent: "amber",
                icon: <span />,
            },
        ];
    }, [rawPacientes.length, rawAtendimentos]);

    const activities: ActivityItem[] = [];

    return (
        <>
            {/* Admin: ação principal = gestão */}
            <PageHeader onNew={() => navigate("/dashboard/configuracoes")} />

            <StatsSection statCards={statCards} />

            <section className="px-4 py-6 sm:px-6 lg:px-8 mt-6  grid grid-cols-1 gap-4 xl:grid-cols-3">
                <AgendaCard agenda={agenda} periodoAtivo={periodoAtivo} setPeriodoAtivo={setPeriodoAtivo} />
                <ActivitiesCard activities={activities} />
            </section>

            <BottomSection shortcuts={[] as any[]} kpis={[] as any[]} />

            <DashboardFooter />
        </>
    );
}
