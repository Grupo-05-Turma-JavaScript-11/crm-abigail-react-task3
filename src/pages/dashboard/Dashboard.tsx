import React, { useMemo, useState } from "react";

/**
 * DASHBOARD (APENAS DASHBOARD)
 * - Sidebar colapsável com animação (desliza) + conteúdo "empurrado"
 * - KPIs
 * - Tabela de atendimentos do dia (agenda) + ações (mock)
 * - Busca + filtro por status
 * - Notificações + limpar
 * - Paleta: #012340 #025959 #027333 #45C4B0 #9AEBA3
 *
 * Requisitos:
 * - React + Tailwind
 * - Nada de services/hooks externos/context/api aqui
 */

// =======================
// Tipos
// =======================
type Status =
    | "AGENDADO"
    | "CONFIRMADO"
    | "EM_ATENDIMENTO"
    | "FINALIZADO"
    | "CANCELADO"
    | "FALTA";

type Tipo = "Consulta" | "Retorno" | "Exame";

type Consulta = {
    id: string;
    horario: string; // "09:30"
    paciente: string;
    profissional: string;
    tipo: Tipo;
    status: Status;
};

type Notificacao = {
    id: string;
    titulo: string;
    detalhe?: string;
    prioridade: "BAIXA" | "MEDIA" | "ALTA";
};

type MenuItem = {
    id: string;
    label: string;
    icon: React.ReactNode;
};

// =======================
// Mock (troque por API depois)
// =======================
const MOCK_CONSULTAS: Consulta[] = [
    { id: "1", horario: "08:00", paciente: "Maria Silva", profissional: "Dra. Paula", tipo: "Consulta", status: "CONFIRMADO" },
    { id: "2", horario: "08:30", paciente: "João Santos", profissional: "Dr. Renato", tipo: "Retorno", status: "AGENDADO" },
    { id: "3", horario: "09:00", paciente: "Aline Rocha", profissional: "Dra. Paula", tipo: "Consulta", status: "EM_ATENDIMENTO" },
    { id: "4", horario: "09:30", paciente: "Carlos Lima", profissional: "Dr. Renato", tipo: "Exame", status: "AGENDADO" },
    { id: "5", horario: "10:00", paciente: "Fernanda Alves", profissional: "Dra. Paula", tipo: "Consulta", status: "CANCELADO" },
    { id: "6", horario: "10:30", paciente: "Bruno Oliveira", profissional: "Dr. Renato", tipo: "Retorno", status: "FALTA" },
    { id: "7", horario: "11:00", paciente: "Patrícia Costa", profissional: "Dra. Paula", tipo: "Consulta", status: "FINALIZADO" },
];

const MOCK_NOTIFICACOES: Notificacao[] = [
    { id: "n1", titulo: "Paciente aguardando", detalhe: "Aline Rocha está em espera há 12 minutos.", prioridade: "ALTA" },
    { id: "n2", titulo: "Consulta atrasada", detalhe: "Agendamento das 09:30 ainda não iniciou.", prioridade: "MEDIA" },
    { id: "n3", titulo: "Pendência de prontuário", detalhe: "Há 2 atendimentos sem evolução registrada.", prioridade: "BAIXA" },
];

// =======================
// Paleta (constantes)
// =======================
const COLORS = {
    azulEscuro: "#012340",
    verdePetroleo: "#025959",
    verdeEscuro: "#027333",
    turquesa: "#45C4B0",
    verdeClaro: "#9AEBA3",
};

// =======================
// Ícones inline (simples e leves)
// =======================
function IconGrid() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
                d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z"
                fill="currentColor"
                opacity="0.9"
            />
        </svg>
    );
}
function IconCalendar() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
                d="M7 2v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7Zm12 8H5v10h14V10Z"
                fill="currentColor"
                opacity="0.9"
            />
        </svg>
    );
}
function IconUser() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
                d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5Z"
                fill="currentColor"
                opacity="0.9"
            />
        </svg>
    );
}
function IconClipboard() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
                d="M9 2h6a2 2 0 0 1 2 2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2-2Zm0 4h6V4H9v2Z"
                fill="currentColor"
                opacity="0.9"
            />
        </svg>
    );
}
function IconDoc() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
                d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8 1v5h5"
                fill="currentColor"
                opacity="0.9"
            />
        </svg>
    );
}
function IconChart() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
                d="M4 19h16v2H2V3h2v16Zm4-8h2v8H8v-8Zm5-6h2v14h-2V5Zm5 4h2v10h-2V9Z"
                fill="currentColor"
                opacity="0.9"
            />
        </svg>
    );
}
function IconCog() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
                d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm9 4-2.1.7a7.9 7.9 0 0 1-.6 1.5l1.3 1.8-1.4 1.4-1.8-1.3a7.9 7.9 0 0 1-1.5.6L13 21h-2l-.7-2.1a7.9 7.9 0 0 1-1.5-.6l-1.8 1.3-1.4-1.4 1.3-1.8a7.9 7.9 0 0 1-.6-1.5L3 12l2.1-.7a7.9 7.9 0 0 1 .6-1.5L4.4 8l1.4-1.4 1.8 1.3a7.9 7.9 0 0 1 1.5-.6L11 3h2l.7 2.1a7.9 7.9 0 0 1 1.5.6l1.8-1.3L20.4 8l-1.3 1.8a7.9 7.9 0 0 1 .6 1.5L21 12Z"
                fill="currentColor"
                opacity="0.9"
            />
        </svg>
    );
}
function IconChevron({ open }: { open: boolean }) {
    // quando aberto, aponta para esquerda (recolher). quando fechado, aponta para direita (abrir).
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            {open ? (
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            )}
        </svg>
    );
}

// =======================
// Helpers de UI
// =======================
function statusLabel(s: Status) {
    switch (s) {
        case "AGENDADO":
            return "Agendado";
        case "CONFIRMADO":
            return "Confirmado";
        case "EM_ATENDIMENTO":
            return "Em atendimento";
        case "FINALIZADO":
            return "Finalizado";
        case "CANCELADO":
            return "Cancelado";
        case "FALTA":
            return "Falta";
    }
}

function statusPillClass(s: Status) {
    switch (s) {
        case "CONFIRMADO":
            return "bg-[rgba(154,235,163,0.35)] text-[rgba(1,35,64,0.95)]";
        case "EM_ATENDIMENTO":
            return "bg-[rgba(69,196,176,0.25)] text-[rgba(1,35,64,0.95)]";
        case "FINALIZADO":
            return "bg-[rgba(2,115,51,0.15)] text-[rgba(1,35,64,0.95)]";
        case "CANCELADO":
            return "bg-red-100 text-red-700";
        case "FALTA":
            return "bg-amber-100 text-amber-800";
        case "AGENDADO":
        default:
            return "bg-black/5 text-black/70";
    }
}

function prioridadeBadgeClass(p: Notificacao["prioridade"]) {
    if (p === "ALTA") return "bg-red-100 text-red-700";
    if (p === "MEDIA") return "bg-amber-100 text-amber-800";
    return "bg-black/5 text-black/70";
}

function Card({ children }: { children: React.ReactNode }) {
    return <div className="rounded-2xl bg-white border border-black/5 shadow-sm">{children}</div>;
}

function Button({
    children,
    variant = "primary",
    disabled,
    onClick,
    title,
}: {
    children: React.ReactNode;
    variant?: "primary" | "ghost";
    disabled?: boolean;
    onClick?: () => void;
    title?: string;
}) {
    const base =
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition select-none";
    const styles =
        variant === "primary"
            ? "bg-[#012340] text-white hover:brightness-[1.05] disabled:opacity-60"
            : "bg-white border border-black/10 hover:bg-[rgba(154,235,163,0.20)] disabled:opacity-60";
    return (
        <button className={`${base} ${styles}`} onClick={onClick} disabled={disabled} title={title}>
            {children}
        </button>
    );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
    return (
        <div>
            <h3 className="font-semibold text-[rgba(1,35,64,0.95)]">{title}</h3>
            {subtitle ? <p className="text-sm text-black/60 mt-1">{subtitle}</p> : null}
        </div>
    );
}

function StatCard({
    label,
    value,
    accent,
}: {
    label: string;
    value: string | number;
    accent: "azul" | "petroleo" | "verde" | "turquesa";
}) {
    const gradient =
        accent === "azul"
            ? `from-[${COLORS.azulEscuro}] to-[${COLORS.verdePetroleo}]`
            : accent === "petroleo"
                ? `from-[${COLORS.verdePetroleo}] to-[${COLORS.turquesa}]`
                : accent === "verde"
                    ? `from-[${COLORS.verdeEscuro}] to-[${COLORS.verdeClaro}]`
                    : `from-[${COLORS.turquesa}] to-[${COLORS.verdeClaro}]`;

    return (
        <Card>
            <div className="p-4 relative overflow-hidden">
                <div className={`absolute -right-10 -top-10 h-28 w-28 rounded-full blur-2xl opacity-60 bg-gradient-to-br ${gradient}`} />
                <p className="text-xs font-medium text-black/60">{label}</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
            </div>
        </Card>
    );
}

// =======================
// Sidebar
// =======================
function Sidebar({
    open,
    activeId,
    onToggle,
    onSelect,
}: {
    open: boolean;
    activeId: string;
    onToggle: () => void;
    onSelect: (id: string) => void;
}) {
    const MENU: MenuItem[] = [
        { id: "dashboard", label: "Dashboard", icon: <IconGrid /> },
        { id: "agenda", label: "Agenda", icon: <IconCalendar /> },
        { id: "pacientes", label: "Pacientes", icon: <IconUser /> },
        { id: "atendimentos", label: "Atendimentos", icon: <IconClipboard /> },
        { id: "prontuarios", label: "Prontuários", icon: <IconDoc /> },
        { id: "financeiro", label: "Financeiro", icon: <IconChart /> },
        { id: "relatorios", label: "Relatórios", icon: <IconChart /> },
        { id: "config", label: "Configurações", icon: <IconCog /> },
    ];

    const widthOpen = 260;  // aberto
    const widthClosed = 64; // recolhido

    return (
        <aside
            className="fixed left-0 top-0 h-screen z-30 border-r border-black/5 bg-white shadow-sm"
            style={{
                width: open ? widthOpen : widthClosed,
                transition: "width 260ms ease",
            }}
        >
            {/* Topo (marca + toggle) */}
            <div className="h-16 flex items-center justify-between px-3 border-b border-black/5">
                <div className="flex items-center gap-2 overflow-hidden">
                    <div
                        className="h-9 w-9 rounded-xl grid place-items-center"
                        style={{
                            background: `linear-gradient(135deg, ${COLORS.azulEscuro}, ${COLORS.turquesa})`,
                            color: "white",
                        }}
                    >
                        <IconGrid />
                    </div>

                    <div
                        className="min-w-0"
                        style={{
                            opacity: open ? 1 : 0,
                            transform: open ? "translateX(0)" : "translateX(-6px)",
                            transition: "opacity 180ms ease, transform 180ms ease",
                            pointerEvents: open ? "auto" : "none",
                        }}
                    >
                        <p className="text-sm font-semibold text-[rgba(1,35,64,0.95)] leading-tight">
                            Clinic CRM
                        </p>
                        <p className="text-xs text-black/50 -mt-0.5">Painel</p>
                    </div>
                </div>

                {/* Toggle (setinha) */}
                <button
                    onClick={onToggle}
                    className="h-9 w-9 rounded-xl border border-black/10 grid place-items-center hover:bg-black/[0.03] transition"
                    title={open ? "Recolher menu" : "Abrir menu"}
                    style={{ color: COLORS.azulEscuro }}
                >
                    <IconChevron open={open} />
                </button>
            </div>

            {/* Menu */}
            <nav className="py-3">
                {MENU.map((item) => {
                    const isActive = item.id === activeId;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onSelect(item.id)}
                            className={[
                                "w-full flex items-center gap-3 px-3 py-2.5 transition rounded-xl mx-2",
                                isActive ? "bg-[rgba(69,196,176,0.20)]" : "hover:bg-black/[0.03]",
                            ].join(" ")}
                            style={{
                                color: isActive ? COLORS.azulEscuro : "rgba(0,0,0,0.70)",
                            }}
                            title={!open ? item.label : undefined}
                        >
                            <span className="h-9 w-9 rounded-xl grid place-items-center border border-black/5 bg-white">
                                <span style={{ color: isActive ? COLORS.azulEscuro : "rgba(0,0,0,0.65)" }}>
                                    {item.icon}
                                </span>
                            </span>

                            <span
                                className="text-sm font-medium whitespace-nowrap"
                                style={{
                                    opacity: open ? 1 : 0,
                                    transform: open ? "translateX(0)" : "translateX(-8px)",
                                    transition: "opacity 180ms ease, transform 180ms ease",
                                    pointerEvents: open ? "auto" : "none",
                                }}
                            >
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </nav>

            {/* Rodapé do sidebar */}
            <div
                className="absolute bottom-0 left-0 right-0 p-3 border-t border-black/5"
                style={{
                    opacity: open ? 1 : 0,
                    transform: open ? "translateY(0)" : "translateY(6px)",
                    transition: "opacity 180ms ease, transform 180ms ease",
                    pointerEvents: open ? "auto" : "none",
                }}
            >
                <div className="rounded-xl border border-black/5 p-3 bg-[rgba(154,235,163,0.16)]">
                    <p className="text-xs text-black/60">
                        Menu recolhível para manter a tela limpa e focada na rotina.
                    </p>
                </div>
            </div>
        </aside>
    );
}

// =======================
// Página Dashboard
// =======================
export default function Dashboard() {
    // Sidebar
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [activeMenuId, setActiveMenuId] = useState<string>("dashboard");

    // Dados
    const [consultas, setConsultas] = useState<Consulta[]>(MOCK_CONSULTAS);
    const [notificacoes, setNotificacoes] = useState<Notificacao[]>(MOCK_NOTIFICACOES);

    // UI states
    const [busca, setBusca] = useState<string>("");
    const [filtroStatus, setFiltroStatus] = useState<Status | "TODOS">("TODOS");

    // Dimensões do sidebar (para empurrar conteúdo)
    const SIDEBAR_W_OPEN = 260;
    const SIDEBAR_W_CLOSED = 64;

    // KPIs derivados
    const kpis = useMemo(() => {
        const consultasHoje = consultas.length;
        const emAtendimento = consultas.filter((c) => c.status === "EM_ATENDIMENTO").length;
        const finalizadas = consultas.filter((c) => c.status === "FINALIZADO").length;
        const faltasCancelamentos = consultas.filter((c) => c.status === "FALTA" || c.status === "CANCELADO").length;
        return { consultasHoje, emAtendimento, finalizadas, faltasCancelamentos };
    }, [consultas]);

    // Lista filtrada
    const consultasFiltradas = useMemo(() => {
        const q = busca.trim().toLowerCase();
        return consultas.filter((c) => {
            const passaStatus = filtroStatus === "TODOS" ? true : c.status === filtroStatus;
            const passaBusca =
                q.length === 0
                    ? true
                    : [c.paciente, c.profissional, c.horario, c.tipo, statusLabel(c.status)]
                        .join(" ")
                        .toLowerCase()
                        .includes(q);
            return passaStatus && passaBusca;
        });
    }, [consultas, busca, filtroStatus]);

    // Ações locais
    function addNotice(n: Omit<Notificacao, "id">) {
        const id =
            typeof crypto !== "undefined" && "randomUUID" in crypto
                ? crypto.randomUUID()
                : String(Date.now());
        setNotificacoes((prev) => [{ id, ...n }, ...prev]);
    }

    function iniciarAtendimento(id: string) {
        setConsultas((prev) =>
            prev.map((c) => (c.id === id ? { ...c, status: "EM_ATENDIMENTO" } : c))
        );
        addNotice({
            titulo: "Atendimento iniciado",
            detalhe: "O atendimento foi marcado como “Em atendimento”.",
            prioridade: "BAIXA",
        });
    }

    function finalizarAtendimento(id: string) {
        setConsultas((prev) =>
            prev.map((c) => (c.id === id ? { ...c, status: "FINALIZADO" } : c))
        );
        addNotice({
            titulo: "Atendimento finalizado",
            detalhe: "O atendimento foi marcado como “Finalizado”.",
            prioridade: "BAIXA",
        });
    }

    function limparNotificacoes() {
        setNotificacoes([]);
    }

    function resetFiltros() {
        setBusca("");
        setFiltroStatus("TODOS");
    }

    // Estilo para empurrar conteúdo conforme sidebar abre/fecha
    const contentLeft = sidebarOpen ? SIDEBAR_W_OPEN : SIDEBAR_W_CLOSED;

    return (
        <div className="min-h-screen bg-[#f7fbfa]">
            {/* Sidebar fixo (sempre presente, colapsável) */}
            <Sidebar
                open={sidebarOpen}
                activeId={activeMenuId}
                onToggle={() => setSidebarOpen((v) => !v)}
                onSelect={(id) => setActiveMenuId(id)}
            />

            {/* Conteúdo empurrado */}
            <div
                style={{
                    marginLeft: contentLeft,
                    transition: "margin-left 260ms ease",
                }}
            >
                {/* Header */}
                <header
                    className="border-b border-black/5"
                    style={{
                        background: `linear-gradient(120deg, rgba(1,35,64,0.10), rgba(69,196,176,0.16), rgba(154,235,163,0.18))`,
                    }}
                >
                    <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-[rgba(1,35,64,0.95)]">
                                Dashboard da Clínica
                            </h1>
                            <p className="text-sm text-black/60 mt-1">
                                Visão do dia, agenda organizada e ações rápidas — tudo em uma tela.
                            </p>
                            <p className="text-xs text-black/50 mt-2">
                                Menu lateral recolhível para manter foco (abra/feche pela setinha).
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <Button variant="ghost" onClick={limparNotificacoes} title="Limpar alertas">
                                Limpar alertas
                            </Button>
                            <Button variant="primary" onClick={resetFiltros} title="Limpar busca e filtro">
                                Reset filtros
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Main */}
                <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
                    {/* KPIs */}
                    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <StatCard label="Consultas hoje" value={kpis.consultasHoje} accent="azul" />
                        <StatCard label="Em atendimento" value={kpis.emAtendimento} accent="turquesa" />
                        <StatCard label="Finalizadas" value={kpis.finalizadas} accent="verde" />
                        <StatCard label="Faltas/Cancelamentos" value={kpis.faltasCancelamentos} accent="petroleo" />
                    </section>

                    {/* Layout: tabela + sidebar direita */}
                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Tabela */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card>
                                <div className="p-4">
                                    <SectionHeader
                                        title="Atendimentos de hoje"
                                        subtitle="Status claros para reduzir confusão e acelerar a rotina."
                                    />

                                    {/* Controles */}
                                    <div className="mt-4 flex flex-col sm:flex-row gap-2">
                                        <input
                                            value={busca}
                                            onChange={(e) => setBusca(e.target.value)}
                                            placeholder="Buscar por paciente, profissional, horário, tipo ou status..."
                                            className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:ring-4"
                                        />

                                        <select
                                            value={filtroStatus}
                                            onChange={(e) => setFiltroStatus(e.target.value as any)}
                                            className="sm:w-[220px] w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:ring-4"
                                        >
                                            <option value="TODOS">Todos os status</option>
                                            <option value="AGENDADO">Agendado</option>
                                            <option value="CONFIRMADO">Confirmado</option>
                                            <option value="EM_ATENDIMENTO">Em atendimento</option>
                                            <option value="FINALIZADO">Finalizado</option>
                                            <option value="CANCELADO">Cancelado</option>
                                            <option value="FALTA">Falta</option>
                                        </select>
                                    </div>

                                    {/* Tabela */}
                                    <div className="mt-4 overflow-auto">
                                        <table className="min-w-[760px] w-full text-sm">
                                            <thead>
                                                <tr className="text-left text-black/60">
                                                    <th className="pb-2 font-medium">Horário</th>
                                                    <th className="pb-2 font-medium">Paciente</th>
                                                    <th className="pb-2 font-medium">Profissional</th>
                                                    <th className="pb-2 font-medium">Tipo</th>
                                                    <th className="pb-2 font-medium">Status</th>
                                                    <th className="pb-2 font-medium text-right">Ações</th>
                                                </tr>
                                            </thead>

                                            <tbody className="divide-y divide-black/5">
                                                {consultasFiltradas.length === 0 ? (
                                                    <tr>
                                                        <td colSpan={6} className="py-8 text-center text-black/60">
                                                            Nenhum atendimento encontrado com esses filtros.
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    consultasFiltradas.map((c) => {
                                                        const disableStart =
                                                            c.status === "EM_ATENDIMENTO" ||
                                                            c.status === "FINALIZADO" ||
                                                            c.status === "CANCELADO" ||
                                                            c.status === "FALTA";
                                                        const disableFinish = c.status !== "EM_ATENDIMENTO";

                                                        return (
                                                            <tr key={c.id} className="hover:bg-black/[0.02]">
                                                                <td className="py-3 font-medium">{c.horario}</td>
                                                                <td className="py-3">{c.paciente}</td>
                                                                <td className="py-3">{c.profissional}</td>
                                                                <td className="py-3">{c.tipo}</td>
                                                                <td className="py-3">
                                                                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${statusPillClass(c.status)}`}>
                                                                        {statusLabel(c.status)}
                                                                    </span>
                                                                </td>
                                                                <td className="py-3">
                                                                    <div className="flex justify-end gap-2">
                                                                        <Button
                                                                            variant="ghost"
                                                                            onClick={() => iniciarAtendimento(c.id)}
                                                                            disabled={disableStart}
                                                                            title="Marcar como em atendimento"
                                                                        >
                                                                            Iniciar
                                                                        </Button>
                                                                        <Button
                                                                            variant="ghost"
                                                                            onClick={() => finalizarAtendimento(c.id)}
                                                                            disabled={disableFinish}
                                                                            title="Marcar como finalizado"
                                                                        >
                                                                            Finalizar
                                                                        </Button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    <p className="mt-3 text-xs text-black/50">
                                        *Dados mock apenas para demonstrar a experiência do dashboard.
                                    </p>
                                </div>
                            </Card>

                            {/* Valor (didático e persuasivo) */}
                            <Card>
                                <div className="p-4">
                                    <SectionHeader
                                        title="O que este dashboard resolve na prática?"
                                        subtitle="Organização do dia sem complicar com tecnologia."
                                    />
                                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        <div className="rounded-xl border border-black/5 p-3 bg-[rgba(154,235,163,0.18)]">
                                            <p className="text-sm font-medium text-[rgba(1,35,64,0.95)]">Clareza</p>
                                            <p className="text-xs text-black/60 mt-1">
                                                Indicadores e status evitam ruído na rotina.
                                            </p>
                                        </div>
                                        <div className="rounded-xl border border-black/5 p-3 bg-[rgba(69,196,176,0.16)]">
                                            <p className="text-sm font-medium text-[rgba(1,35,64,0.95)]">Fluxo</p>
                                            <p className="text-xs text-black/60 mt-1">
                                                Ações rápidas ajudam recepção e médico no dia a dia.
                                            </p>
                                        </div>
                                        <div className="rounded-xl border border-black/5 p-3 bg-[rgba(2,89,89,0.10)]">
                                            <p className="text-sm font-medium text-[rgba(1,35,64,0.95)]">Controle</p>
                                            <p className="text-xs text-black/60 mt-1">
                                                Uma tela para saber “como está o dia” em segundos.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Painel lateral (notificações + ajuda) */}
                        <aside className="space-y-6">
                            <Card>
                                <div className="p-4">
                                    <SectionHeader title="Alertas e notificações" subtitle="O sistema sinaliza o que exige atenção." />

                                    <ul className="mt-4 space-y-3">
                                        {notificacoes.length === 0 ? (
                                            <li className="text-sm text-black/60">Sem notificações no momento.</li>
                                        ) : (
                                            notificacoes.slice(0, 6).map((n) => (
                                                <li key={n.id} className="p-3 rounded-xl border border-black/5 bg-white">
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div>
                                                            <p className="text-sm font-medium">{n.titulo}</p>
                                                            {n.detalhe ? <p className="text-xs text-black/60 mt-1">{n.detalhe}</p> : null}
                                                        </div>
                                                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${prioridadeBadgeClass(n.prioridade)}`}>
                                                            {n.prioridade}
                                                        </span>
                                                    </div>
                                                </li>
                                            ))
                                        )}
                                    </ul>
                                </div>
                            </Card>

                            <Card>
                                <div className="p-4">
                                    <SectionHeader title="Busca rápida" subtitle="Sem navegar em várias telas." />
                                    <div className="mt-4 rounded-xl border border-black/5 p-3 bg-[rgba(69,196,176,0.10)]">
                                        <p className="text-xs text-black/60">Exemplos de busca:</p>
                                        <ul className="mt-2 text-sm text-[rgba(1,35,64,0.95)] space-y-1">
                                            <li>• “Dra. Paula”</li>
                                            <li>• “09:30”</li>
                                            <li>• “Em atendimento”</li>
                                            <li>• “Exame”</li>
                                        </ul>
                                    </div>
                                </div>
                            </Card>

                            <Card>
                                <div className="p-4">
                                    <p className="text-xs text-black/50">
                                        Paleta:{" "}
                                        <span className="font-medium">#012340</span> •{" "}
                                        <span className="font-medium">#025959</span> •{" "}
                                        <span className="font-medium">#027333</span> •{" "}
                                        <span className="font-medium">#45C4B0</span> •{" "}
                                        <span className="font-medium">#9AEBA3</span>
                                    </p>
                                    <p className="text-xs text-black/50 mt-2">
                                        Menu ativo: <span className="font-medium">{activeMenuId}</span>
                                    </p>
                                </div>
                            </Card>
                        </aside>
                    </section>
                </main>
            </div>
        </div>
    );
}
