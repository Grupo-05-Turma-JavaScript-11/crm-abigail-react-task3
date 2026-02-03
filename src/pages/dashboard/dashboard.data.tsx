import React from "react";
import type { ActivityItem, AgendaItem, NavItem, StatCard } from "./dashboard.types";
import { COLORS } from "./dashboard.theme";

export const toneStyles = {
    info: { bg: "#01234008", dot: COLORS.aqua, fg: COLORS.base },
    success: { bg: "#9aeba32e", dot: COLORS.darkGreen, fg: COLORS.base },
    warning: { bg: "#45c4b01a", dot: COLORS.mid, fg: COLORS.base },
} as const;

export function getNavItems(tipo?: string): NavItem[] {
    const items: NavItem[] = [
        {
            key: "dashboard",
            label: "Dashboard",
            to: "/dashboard",
            icon: (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h7v7H4z" />
                    <path d="M13 4h7v4h-7z" />
                    <path d="M13 10h7v10h-7z" />
                    <path d="M4 13h7v7H4z" />
                </svg>
            ),
        },
        {
            key: "agenda",
            label: "Agenda",
            to: "/dashboard/agenda-medica",
            icon: (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 3v3M17 3v3" />
                    <path d="M4 8h16" />
                    <path d="M6 6h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
                </svg>
            ),
        },
        {
            key: "recepcao",
            label: "Recepção",
            to: "/dashboard/recepcao",
            icon: (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 21h18" />
                    <path d="M6 21V8a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v13" />
                    <path d="M9 10h6" />
                    <path d="M9 14h6" />
                </svg>
            ),
        },
        {
            key: "configuracoes",
            label: "Configurações",
            to: "/dashboard/configuracoes",
            icon: (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                    <path d="M19.4 15a7.9 7.9 0 0 0 .1-1 7.9 7.9 0 0 0-.1-1l2-1.6-2-3.4-2.4 1a8.3 8.3 0 0 0-1.7-1l-.4-2.6H9.1L8.7 8a8.3 8.3 0 0 0-1.7 1l-2.4-1-2 3.4L4.6 13a7.9 7.9 0 0 0-.1 1 7.9 7.9 0 0 0 .1 1l-2 1.6 2 3.4 2.4-1a8.3 8.3 0 0 0 1.7 1l.4 2.6h5.8l.4-2.6a8.3 8.3 0 0 0 1.7-1l2.4 1 2-3.4-2-1.6z" />
                </svg>
            ),
        },
    ];

    // Filtragem por perfil
    if (tipo === "admin") return items;     // vê e entra em tudo

    if (tipo === "medico") {    // acessa dashboard, agenda própria e notificações
        return items.filter(i => i.key !== "recepcao" && i.key !== "configuracoes");
    }

    if (tipo === "assistente") {    // vê agenda, recepção e atribuições administrativas de recepção
        return items.filter(i => i.key !== "configuracoes");
    }


    return items;
}

export function getStatCards(): StatCard[] {
    return [
        {
            key: "pacientes",
            title: "Pacientes",
            value: "1.284",
            note: "ativos",
            accent: COLORS.aqua,
            icon: (
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a3 3 0 0 0-2-2.82" />
                    <path d="M17 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            ),
        },
        {
            key: "consultas",
            title: "Consultas Hoje",
            value: "12",
            note: "agendadas",
            accent: COLORS.lightGreen,
            icon: (
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 3v3M17 3v3" />
                    <path d="M4 8h16" />
                    <path d="M6 6h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
                    <path d="M8 12h4" />
                    <path d="M8 16h6" />
                </svg>
            ),
        },
        {
            key: "pendentes",
            title: "Atendimentos Pendentes",
            value: "3",
            note: "na fila",
            accent: COLORS.mid,
            icon: (
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a7 7 0 0 1 4 12c-.6.5-1 1.2-1 2H9c0-.8-.4-1.5-1-2A7 7 0 0 1 12 2z" />
                    <path d="M9 18h6" />
                    <path d="M10 22h4" />
                </svg>
            ),
        },
        {
            key: "faturamento",
            title: "Faturamento (mês)",
            value: "R$ 38.420,00",
            note: "estimado",
            accent: COLORS.darkGreen,
            icon: (
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 1v22" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6" />
                </svg>
            ),
        },
    ];
}

export function getAgenda(): AgendaItem[] {
    return [
        { id: "a1", time: "09:00", patient: "Marina Souza", type: "Retorno", status: "Confirmado" },
        { id: "a2", time: "09:30", patient: "Carlos Eduardo", type: "Exame", status: "Em Atendimento" },
        { id: "a3", time: "10:00", patient: "Fernanda Lima", type: "Consulta", status: "Agendado" },
        { id: "a4", time: "10:30", patient: "João Pedro", type: "Retorno", status: "Agendado" },
        { id: "a5", time: "11:00", patient: "Ana Beatriz", type: "Consulta", status: "Cancelado" },
    ];
}

export function getActivities(): ActivityItem[] {
    return [
        { id: "n1", time: "há 5 min", title: "Novo paciente cadastrado", description: "Marina Souza foi adicionada à base.", tone: "success" },
        { id: "n2", time: "há 20 min", title: "Consulta confirmada", description: "Carlos Eduardo confirmou presença.", tone: "info" },
        { id: "n3", time: "há 1 h", title: "Atenção: atraso", description: "Fila de atendimento com 10 min de atraso.", tone: "warning" },
    ];
}

export function getShortcuts() {
    return [
        { key: "novo-paciente", label: "Novo paciente", icon: "👤" },
        { key: "novo-retorno", label: "Agendar Retorno", icon: "🗓️" },
        { key: "novo-exame", label: "Registrar exame", icon: "🧾" },
        { key: "mensagens", label: "Mensagens", icon: "💬" },
    ];
}

export function getKpis() {
    return [
        { key: "atendimentos", label: "Atendimentos concluídos", value: "18", bar: 72, color: COLORS.aqua },
        { key: "tempo", label: "Tempo médio por consulta", value: "22 min", bar: 55, color: COLORS.lightGreen },
        { key: "cancelamentos", label: "Cancelamentos", value: "2", bar: 18, color: COLORS.mid },
    ];
}
