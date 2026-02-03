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
    return "Agendado";
}

function isToday(date: Date | null): boolean {
    if (!date) return false;
    const now = new Date();
    return date.toDateString() === now.toDateString();
}

export default function AssistenteDashboard() {
    const { usuario } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const token = usuario.token;
    const crypto = window.crypto;

    const [rawAtendimentos, setRawAtendimentos] = useState<any[]>([]);
    const [periodoAtivo, setPeriodoAtivo] = useState<"Dia" | "Semana" | "Mês">("Dia");

    useEffect(() => {
        buscar("/atendimentos", setRawAtendimentos, {headers: {Authorization: token}});
    }, [usuario.token]);

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

    const statCards: StatCard[] = useMemo(() => {
        const hoje = rawAtendimentos.filter((a: any) => {
            const date = safeDate(a.dataHora ?? a.data_hora ?? a.data ?? a.horario ?? a.dateTime);
            return isToday(date);
        });

        const confirmados = hoje.filter((a: any) => String(a.status ?? "").toLowerCase().includes("confirm"));
        const emAtendimento = hoje.filter((a: any) => String(a.status ?? "").toLowerCase().includes("atend"));
        const naFila = hoje.filter((a: any) => {
            const s = String(a.status ?? "").toLowerCase();
            return s.includes("fila") || s.includes("aguard") || s.includes("pend");
        });

        return [
            { key: "fila", title: "Na fila", value: String(naFila.length), note: "aguardando", accent: "amber", icon: <span /> },
            { key: "conf", title: "Confirmados", value: String(confirmados.length), note: "hoje", accent: "green", icon: <span /> },
            { key: "em", title: "Em atendimento", value: String(emAtendimento.length), note: "agora", accent: "aqua", icon: <span /> },
            { key: "hoje", title: "Atendimentos hoje", value: String(hoje.length), note: "total", accent: "blue", icon: <span /> },
        ];
    }, [rawAtendimentos]);

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
