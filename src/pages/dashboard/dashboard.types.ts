import React from "react";

// Define o formato de um item do menu lateral (sidebar)
export type NavItem = {
    key: string;
    label: string;
    to: string;
    icon: React.ReactNode;
};

// Define o formato de um card de estatística
export type StatCard = {
    key: string;
    title: string;
    value: string;
    note?: string;
    accent: string;
    icon: React.ReactNode;
};

// Define o formato de cada linha da agenda
export type AgendaItem = {
    id: string;
    time: string;
    patient: string;
    type: string;
    status: "Confirmado" | "Em Atendimento" | "Agendado" | "Cancelado";
};

// Define o formato de atividades recentes (notificações)
export type ActivityItem = {
    id: string;
    time: string;
    title: string;
    description: string;
    tone: "info" | "success" | "warning";
};
