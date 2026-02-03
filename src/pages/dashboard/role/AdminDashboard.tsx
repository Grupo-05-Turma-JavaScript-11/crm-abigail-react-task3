import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";

import PageHeader from "../components/PageHeader";
import StatsSection from "../components/StatsSection";
import AgendaCard from "../components/AgendaCard";
import ActivitiesCard from "../components/ActivitiesCard";
import BottomSection from "../components/BottomSection";
import DashboardFooter from "../components/DashboardFooter";

import type { StatCard, AgendaItem, ActivityItem } from "../dashboard.types";

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

    if (s.includes("confirm")) return "Confirmado";
    if (s.includes("atend")) return "Em Atendimento";
    if (s.includes("cancel")) return "Cancelado";

    // fila / pendente / aguardando etc -> trata como agendado 
    return "Agendado";
}

function isToday(date: Date | null): boolean {
    if (!date) return false;
    const now = new Date();
    return date.toDateString() === now.toDateString();
}

export default function AdminDashboard() {
    const { usuario } = useContext(AuthContext);
    const navigate = useNavigate();

    // Dados crus do backend (não tipa como Paciente/Atendimento aqui)
    const [rawPacientes, setRawPacientes] = useState<any[]>([]);
    const [rawAtendimentos, setRawAtendimentos] = useState<any[]>([]);

    // Controle exigido pelo AgendaCard
    const [periodoAtivo, setPeriodoAtivo] = useState<"Dia" | "Semana" | "Mês">("Dia");

    useEffect(() => {
        buscar("/pacientes", setRawPacientes, { headers: { Authorization: usuario.token } });
        buscar("/atendimentos", setRawAtendimentos, { headers: { Authorization: usuario.token } });
    }, [usuario.token]);

    // Converte backend -> AgendaItem (UI)
    const agenda: AgendaItem[] = useMemo(() => {
        return rawAtendimentos.map((a: any) => {
            const date = safeDate(a.dataHora ?? a.data_hora ?? a.data ?? a.horario ?? a.dateTime);

            const patientName =
                a.paciente?.nome ??
                a.paciente?.name ??
                a.pacienteNome ??
                a.nomePaciente ??
                a.patient ??
                "—";

            const type =
                a.motivo ??
                a.tipo ??
                a.tipoAtendimento ??
                a.especialidade ??
                a.descricao ??
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

    // KPIs (UI) — compatíveis com StatCard
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
            <PageHeader onNew={() => navigate("/atendimentos/novo")} />

            <StatsSection statCards={statCards} />

            <section className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
                <AgendaCard
                    agenda={agenda}
                    periodoAtivo={periodoAtivo}
                    setPeriodoAtivo={setPeriodoAtivo}
                />

                <ActivitiesCard activities={activities} />
            </section>

            <BottomSection shortcuts={[] as any[]} kpis={[] as any[]} />

            <DashboardFooter />
        </>
    );
}
