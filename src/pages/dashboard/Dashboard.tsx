import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

// Define o formato de um item do menu lateral (sidebar)
type NavItem = {
    key: string;
    label: string;
    to: string;
    icon: React.ReactNode;
};

// Define o formato de um card de estatística
type StatCard = {
    key: string;
    title: string;
    value: string;
    note?: string;
    accent: string;
    icon: React.ReactNode;
};

// Define o formato de cada linha da agenda
type AgendaItem = {
    id: string;
    time: string;
    patient: string;
    type: string;
    status: "Confirmado" | "Em Atendimento" | "Agendado" | "Cancelado";
};

// Define o formato de atividades recentes (notificações)
type ActivityItem = {
    id: string;
    time: string;
    title: string;
    description: string;
    tone: "info" | "success" | "warning";
};

// Define as props do componente IconBadge
type IconBadgeProps = {
    children: React.ReactNode;
    className?: string;
    title?: string;
};

// Define as props do componente NavRow(...) (cada linha do menu)
type NavRowProps = {
    item: NavItem;
    active: boolean;
    onNavigate?: () => void;
};

// É um objeto de cores padrão do dashboard
const COLORS = {
    base: "#012340",
    mid: "#025959",
    darkGreen: "#027333",
    aqua: "#45C4B0",
    lightGreen: "#9AEBA3",
};

// Junta classes do Tailwind com segurança
function classNames(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

// Badge para ícones (padroniza tamanho/alinhamento)
function IconBadge({ children, className, title }: IconBadgeProps) {
    return (
        <span
            className={classNames("inline-flex items-center justify-center", className)}
            aria-hidden={title ? undefined : true}
            aria-label={title}
            title={title}
        >
            {children}
        </span>
    );
}

// Avatar do usuário (ícone de “pessoa”)
function Avatar({ name }: { name: string }) {
    return (
        <div
            className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold shadow-sm ring-2"
            style={{
                backgroundColor: COLORS.aqua,
                color: COLORS.base,
                borderColor: COLORS.lightGreen,
            }}
            aria-label={`Usuário ${name}`}
            title={name}
        >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round" aria-hidden="true"
            >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
            </svg>
        </div>
    );
}

// Badge de status (cor muda conforme o status)
function StatusBadge({ status }: { status: AgendaItem["status"] }) {
    const cfg = useMemo(() => {
        switch (status) {
            case "Confirmado":
                return { bg: COLORS.lightGreen, fg: COLORS.darkGreen };
            case "Em Atendimento":
                return { bg: COLORS.aqua, fg: COLORS.darkGreen };
            case "Agendado":
                return { bg: "#E5F6F3", fg: COLORS.darkGreen };
            case "Cancelado":
            default:
                return { bg: "#FEE2E2", fg: COLORS.darkGreen };
        }
    }, [status]);

    return (
        <span
            className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold"
            style={{ backgroundColor: cfg.bg, color: cfg.fg }}
        >
            {status}
        </span>
    );
}

// Linha do menu lateral (link com destaque quando ativo)
function NavRow({ item, active, onNavigate }: NavRowProps) {
    return (
        <Link
            to={item.to}
            onClick={onNavigate}
            className={classNames(
                "group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition",
                "hover:bg-[#45c4b01f]",
                active && "shadow-sm"
            )}
            style={{
                backgroundColor: active ? "#45c4b024" : undefined,
                color: active ? COLORS.base : "#012340d9",
            }}
        >
            <span
                className={classNames(
                    "inline-flex h-9 w-9 items-center justify-center rounded-xl border transition",
                    "group-hover:bg-[#45c4b02e] group-hover:border-[#45c4b059]",
                    active && "bg-[#45c4b02e] border-[#45c4b059]"
                )}
                style={{
                    color: active ? COLORS.mid : "#012340bf",
                }}
                aria-hidden="true"
            >
                {item.icon}
            </span>

            <span
                className={classNames(
                    "min-w-0 flex-1 truncate transition group-hover:text-[#012340f2]"
                )}
            >
                {item.label}
            </span>

            <span>
                <svg viewBox="0 0 24 24" className="h-4 w-4 opacity-60" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                </svg>
            </span>
        </Link>
    );
}

export default function Dashboard() {
    // ===== CONTEXTO / ROTAS =====
    const { usuario, handleLogout } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const isLoggedIn = usuario.token !== "";

    // ===== SIDEBAR OFF-CANVAS (ABRE/FECHA) =====
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

    // ===== ACESSIBILIDADE (FOCO NO SIDEBAR) =====
    const sidebarRef = useRef<HTMLElement | null>(null);

    // ===== EFEITO: FECHA SIDEBAR AO MUDAR ROTA =====
    useEffect(() => {
        setSidebarOpen(false);
    }, [location.pathname]);

    // ===== EFEITO: ESC FECHA + FOCO AO ABRIR =====
    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") setSidebarOpen(false);
        }
        window.addEventListener("keydown", onKeyDown);

        if (sidebarOpen) sidebarRef.current?.focus?.();

        return () => window.removeEventListener("keydown", onKeyDown);
    }, [sidebarOpen]);

    // ===== HANDLERS (SIDEBAR / LOGOUT) =====
    const handleToggleSidebar = () => setSidebarOpen((v) => !v);
    const handleCloseSidebar = () => setSidebarOpen(false);

    const onLogout = () => {
        handleLogout();
        navigate("/login", { replace: true });
    };

    // ===== BLOQUEIO (SEM TOKEN) =====
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    // ===== LABEL DE PERFIL (TIPO DO USUÁRIO) =====
    const roleLabel = useMemo(() => {
        if (usuario.tipo === "admin") return "Administrador(a)";
        if (usuario.tipo === "medico") return "Médico(a)";
        if (usuario.tipo === "assistente") return "Assistente";
        return "Usuário";
    }, [usuario.tipo]);

    // ===== MENU LATERAL (ITENS) =====
    const navItems: NavItem[] = useMemo(
        () => [
            {
                key: "dashboard",
                label: "Dashboard",
                to: "/", // manter coerente com a rota atual pós-login (admin)
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
                to: "/agenda-medica",
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
                to: "/recepcao",
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
                key: "config",
                label: "Configurações",
                to: "/dashboard-admin/config",
                icon: (
                    <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 
                    0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 
                    0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 
                    2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 
                    0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c0 .66.39 1.26 1 1.51H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                )
            },
        ],
        []
    );

    // ===== CARDS SUPERIORES (ESTATÍSTICAS) =====
    const statCards: StatCard[] = useMemo(
        () => [
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
        ],
        []
    );

    // ===== AGENDA (LISTA DO DIA) =====
    const agenda: AgendaItem[] = useMemo(
        () => [
            { id: "a1", time: "09:00", patient: "Maria Oliveira", type: "Consulta", status: "Confirmado" },
            { id: "a2", time: "09:30", patient: "Pedro Souza", type: "Retorno", status: "Em Atendimento" },
            { id: "a3", time: "10:00", patient: "Fernanda Lima", type: "Consulta", status: "Agendado" },
            { id: "a4", time: "10:30", patient: "Ana Costa", type: "Exame", status: "Cancelado" },
            { id: "a5", time: "11:00", patient: "Carlos Mendes", type: "Consulta", status: "Confirmado" },
        ],
        []
    );

    // ===== ATIVIDADES RECENTES (NOTIFICAÇÕES) =====
    const activities: ActivityItem[] = useMemo(
        () => [
            { id: "r1", time: "Agora", title: "Paciente aguardando atendimento", description: "Carlos Mendes chegou e está na recepção.", tone: "info" },
            { id: "r2", time: "10 min", title: "Consulta atrasada", description: "Retorno de Pedro Souza passou do horário previsto.", tone: "warning" },
            { id: "r3", time: "35 min", title: "Prontuário atualizado", description: "Anotações adicionadas para Maria Oliveira.", tone: "success" },
            { id: "r4", time: "1h", title: "2 exames pendentes", description: "Resultados aguardando anexação ao prontuário.", tone: "info" },
        ],
        []
    );

    // ===== BOTÕES DE ATALHOS =====
    const shortcuts = useMemo(
        () => [
            { key: "novo-paciente", label: "Novo Paciente", icon: "➕" },
            { key: "novo-retorno", label: "Agendar Retorno", icon: "🗓️" },
            { key: "anexar-exame", label: "Anexar Exame", icon: "📎" },
            { key: "financeiro", label: "Resumo Financeiro", icon: "💳" },
        ],
        []
    );

    // ===== KPIS (BARRAS) =====
    const kpis = useMemo(
        () => [
            { key: "tempo-medio", label: "Tempo médio de espera", value: "12 min", bar: 48, color: COLORS.aqua },
            { key: "taxa-cancel", label: "Taxa de cancelamento (dia)", value: "8%", bar: 22, color: COLORS.mid },
            { key: "ocupacao", label: "Ocupação do dia", value: "74%", bar: 74, color: COLORS.darkGreen },
        ],
        []
    );

    // ===== TONS VISUAIS (INFO / SUCCESS / WARNING) =====
    const toneStyles = useMemo(() => {
        return {
            info: { dot: COLORS.aqua, bg: "#E6FBF7", fg: COLORS.base },
            success: { dot: COLORS.lightGreen, bg: "#EAFBF0", fg: COLORS.darkGreen },
            warning: { dot: "#ff0404", bg: "#FFF7ED", fg: "#7C2D12" },
        } as const;
    }, []);

    // Período selecionado (UI)
    const [periodoAtivo, setPeriodoAtivo] = useState<"Dia" | "Semana" | "Mês">("Dia");

    return (

        <div className="min-h-screen bg-slate-100">

            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-slate-10 cursor-pointer"
                    onClick={handleCloseSidebar}
                    aria-hidden="true"
                />
            )}

            {/* ===== SIDEBAR (OFF-CANVAS) ===== */}
            <aside
                ref={(el) => {
                    sidebarRef.current = el;
                }}
                tabIndex={-1}
                className={classNames(
                    "fixed left-0 top-0 z-40 h-full w-64 overflow-hidden border-r bg-white shadow-sm transition-transform duration-300 focus:outline-none",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
                style={{ borderColor: "#0123401a" }}
                aria-label="Menu lateral"
            >
                {/* ===== SIDEBAR: CABEÇALHO ===== */}
                <div className="flex h-16 items-center justify-between px-3">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 group cursor-default">
                            <div className="w-10 h-10 bg-[#012340] rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
                                <span className="text-white font-bold italic">A</span>
                            </div>

                            <span className="text-2xl font-black tracking-tighter text-[#012340] transition-colors duration-300 group-hover:text-[#45C4B0]">
                                Abgail
                            </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleCloseSidebar}
                        className="inline-flex h-9 w-9 items-center justify-center cursor-pointer"
                        style={{ color: COLORS.base }}
                        aria-label="Fechar menu"
                        title="Fechar menu"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                        >
                            <path d="M6 6l12 12" />
                            <path d="M18 6L6 18" />
                        </svg>
                    </button>
                </div>

                {/* ===== SIDEBAR: MENU ===== */}
                <nav className="px-2 pb-4">
                    <p className="px-3 pb-2 pt-1 text-[14px] font-semibold uppercase tracking-wider" style={{ color: "#0123408c" }}>
                        Menu
                    </p>

                    <ul className="space-y-1">
                        {navItems.map((item) => {
                            const isActive =
                                item.to === "/"
                                    ? location.pathname === "/"
                                    : location.pathname.startsWith(item.to);

                            return (
                                <li key={item.key}>
                                    <NavRow
                                        item={item}
                                        active={isActive}
                                        onNavigate={() => setSidebarOpen(false)}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* ===== SIDEBAR: PERFIL + LOGOUT ===== */}
                <div className="absolute bottom-0 left-0 right-0 border-t p-3" style={{ borderColor: "#0123401a" }}>
                    <div className="flex items-center gap-3">
                        <Avatar name={usuario.nome || "Usuário"} />
                        <div className="min-w-0">
                            <p className="truncate text-x font-semibold" style={{ color: COLORS.base }}>
                                {usuario.nome || "Usuário"}
                            </p>
                            <p className="truncate text-xs" style={{ color: "#012340a6" }}>
                                {roleLabel}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onLogout}
                        className="mt-3 inline-flex w-full items-center justify-center rounded-xl border px-3 py-2 text-sm font-semibold transition 
                                    hover:shadow-sm focus:outline-none focus:ring-2 cursor-pointer"
                        style={{ borderColor: "#01234024", backgroundColor: COLORS.mid, color: "white" }}
                        aria-label="Sair"
                        title="Sair"
                    >
                        Sair
                    </button>
                </div>
            </aside>

            {/* ===== OVERLAY (MOBILE) ===== */}
            {sidebarOpen ? (
                <button
                    type="button"
                    className="fixed inset-0 z-30 bg-black/25 sm:hidden"
                    aria-label="Fechar menu lateral"
                    onClick={handleCloseSidebar}
                />
            ) : null}

            {/* ===== TOPBAR ===== */}
            <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur" style={{ borderColor: "#0123401a" }}>
                <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6">
                    {/* ===== TOPBAR: ESQUERDA ===== */}
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={handleToggleSidebar}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-white transition hover:shadow-sm 
                                        focus:outline-none focus:ring-2 cursor-pointer"
                            style={{ borderColor: "#01234026", color: COLORS.base }}
                            aria-label={sidebarOpen ? "Fechar menu lateral" : "Abrir menu lateral"}
                            title={sidebarOpen ? "Fechar menu" : "Abrir menu"}
                        >
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
                                {sidebarOpen ? (
                                    <>
                                        <path d="M6 6l12 12" />
                                        <path d="M18 6L6 18" />
                                    </>
                                ) : (
                                    <>
                                        <path d="M4 7h16" />
                                        <path d="M4 12h16" />
                                        <path d="M4 17h16" />
                                    </>
                                )}
                            </svg>
                        </button>

                        <div className="flex items-center gap-2 group cursor-default">
                            <div className="w-9 h-9 bg-[#012340] rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
                                <span className="text-white font-bold italic">A</span>
                            </div>

                            <span className="text-2xl font-black tracking-tighter text-[#012340] transition-colors duration-300 group-hover:text-[#45C4B0]">
                                Abgail
                            </span>
                        </div>

                    </div>

                    {/* ===== TOPBAR: DIREITA ===== */}
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-white transition hover:shadow-sm 
                                        focus:outline-none focus:ring-2 cursor-pointer"
                            style={{ borderColor: "#01234026", color: COLORS.base }}
                            aria-label="Notificações"
                            title="Notificações"
                        >
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
                                <path d="M13.73 21a2 2 0 01-3.46 0" />
                            </svg>
                            <span
                                className="absolute -right-1 -top-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1 text-[11px] font-bold"
                                style={{ backgroundColor: COLORS.darkGreen, color: "white" }}
                            >
                                3
                            </span>
                        </button>

                        <div className="hidden items-center gap-3 sm:flex">
                            <div className="text-right leading-tight">
                                <p className="text-sm font-semibold" style={{ color: COLORS.base }}>
                                    {usuario.nome || "Usuário"}
                                </p>
                                <p className="text-xs" style={{ color: "#012340a6" }}>
                                    {roleLabel}
                                </p>
                            </div>
                            <Avatar name={usuario.nome || "Usuário"} />
                        </div>

                        <div className="sm:hidden">
                            <Avatar name={usuario.nome || "Usuário"} />
                        </div>
                    </div>
                </div>
            </header>

            {/* ===== CONTEÚDO (EMPURRA NO DESKTOP) ===== */}
            <div className={classNames("transition-[margin-left] duration-300", sidebarOpen ? "sm:ml-64" : "sm:ml-0")}>
                <main className="w-full px-4 py-6 sm:px-6">
                    {/* ===== CABEÇALHO DA PÁGINA + CTA ===== */}
                    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-xl font-bold" style={{ color: COLORS.base }}>
                                Dashboard
                            </h1>
                            <p className="text-sm" style={{ color: "#012340a6" }}>
                                Visão geral do dia e próximos atendimentos.
                            </p>
                        </div>

                        <button
                            type="button"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold shadow-sm transition 
                                        hover:shadow-md focus:outline-none focus:ring-2 cursor-pointer"
                            style={{ backgroundColor: COLORS.mid, color: "white" }}
                            aria-label="Novo Atendimento"
                            title="Novo Atendimento"
                            onClick={() => navigate("/agenda-medica")}
                        >
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 5v14" />
                                <path d="M5 12h14" />
                            </svg>
                            Novo Atendimento
                        </button>
                    </div>

                    {/* ===== CARDS DE ESTATÍSTICAS ===== */}
                    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {statCards.map((card) => (
                            <div
                                key={card.key}
                                className="rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md"
                                style={{ borderColor: "#0123401a" }}
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <p className="text-sm font-semibold" style={{ color: "#012340bf" }}>
                                            {card.title}
                                        </p>
                                        <p className="mt-2 text-2xl font-extrabold" style={{ color: COLORS.base }}>
                                            {card.value}
                                        </p>
                                        {card.note ? (
                                            <p className="mt-1 text-xs" style={{ color: "#01234099" }}>
                                                {card.note}
                                            </p>
                                        ) : null}
                                    </div>

                                    <div
                                        className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border"
                                        style={{
                                            backgroundColor: "#01234008",
                                            borderColor: "#0123401a",
                                            color: card.accent,
                                        }}
                                        aria-hidden="true"
                                    >
                                        {card.icon}
                                    </div>
                                </div>

                                <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                                    <div className="h-full rounded-full" style={{ width: "68%", backgroundColor: card.accent }} />
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* ===== GRID PRINCIPAL ===== */}
                    <section className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
                        {/* ===== AGENDA (LISTA) ===== */}
                        <div className="rounded-2xl border bg-white p-4 shadow-sm xl:col-span-2" style={{ borderColor: "#0123401a" }}>
                            <div className="mb-4 flex items-center justify-between gap-3">
                                <div>
                                    <h2 className="text-base font-bold" style={{ color: COLORS.base }}>
                                        Agenda do dia
                                    </h2>
                                    <p className="text-xs" style={{ color: "#012340a6" }}>
                                        Próximas consultas e status.
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setPeriodoAtivo("Dia")}
                                        className="cursor-pointer rounded-xl border bg-white px-3 py-2 text-xs font-semibold transition hover:bg-slate-50"
                                        style={{
                                            borderColor: "#0123401f",
                                            color: periodoAtivo === "Dia" ? COLORS.base : "#012340b3",
                                            backgroundColor: periodoAtivo === "Dia" ? "#0123400d" : "white",
                                        }}
                                    >
                                        Dia
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setPeriodoAtivo("Semana")}
                                        className="cursor-pointer rounded-xl border bg-white px-3 py-2 text-xs font-semibold transition hover:bg-slate-50"
                                        style={{
                                            borderColor: "#0123401f",
                                            color: periodoAtivo === "Semana" ? COLORS.base : "#012340b3",
                                            backgroundColor: periodoAtivo === "Semana" ? "#0123400d" : "white",
                                        }}
                                    >
                                        Semana
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setPeriodoAtivo("Mês")}
                                        className="cursor-pointer hidden rounded-xl border bg-white px-3 py-2 text-xs font-semibold transition hover:bg-slate-50 sm:inline-flex"
                                        style={{
                                            borderColor: "#0123401f",
                                            color: periodoAtivo === "Mês" ? COLORS.base : "#012340b3",
                                            backgroundColor: periodoAtivo === "Mês" ? "#0123400d" : "white",
                                        }}
                                    >
                                        Mês
                                    </button>
                                </div>

                            </div>

                            <div className="divide-y" style={{ borderColor: "#01234014" }}>
                                {agenda.map((item) => (
                                    <div key={item.id} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="inline-flex h-10 w-14 items-center justify-center rounded-xl border text-sm font-bold"
                                                style={{
                                                    borderColor: "#0123401f",
                                                    backgroundColor: "#01234008",
                                                    color: COLORS.base,
                                                }}
                                            >
                                                {item.time}
                                            </div>

                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-semibold" style={{ color: COLORS.base }}>
                                                    {item.patient}
                                                </p>
                                                <p className="text-xs" style={{ color: "#012340a6" }}>
                                                    {item.type}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between gap-3 sm:justify-end">
                                            <StatusBadge status={item.status} />
                                            <button
                                                type="button"
                                                className="inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold 
                                                            transition hover:shadow-sm cursor-pointer"
                                                style={{
                                                    borderColor: "#01234024",
                                                    backgroundColor: "white",
                                                    color: item.status === "Em Atendimento" ? COLORS.mid : COLORS.base,
                                                }}
                                                aria-label={`Ação para ${item.patient}`}
                                            >
                                                <IconBadge>
                                                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M10 8h10" />
                                                        <path d="M10 12h10" />
                                                        <path d="M10 16h10" />
                                                        <path d="M4 8h2" />
                                                        <path d="M4 12h2" />
                                                        <path d="M4 16h2" />
                                                    </svg>
                                                </IconBadge>
                                                Ver
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ===== ATIVIDADES RECENTES ===== */}
                        <div className="rounded-2xl border bg-white p-4 shadow-sm" style={{ borderColor: "#0123401a" }}>
                            <div className="mb-4">
                                <h2 className="text-base font-bold" style={{ color: COLORS.base }}>
                                    Atividades recentes
                                </h2>
                                <p className="text-xs" style={{ color: "#012340a6" }}>
                                    Alertas e atualizações rápidas.
                                </p>
                            </div>

                            <ul className="space-y-3">
                                {activities.map((a) => {
                                    const tone = toneStyles[a.tone];
                                    return (
                                        <li
                                            key={a.id}
                                            className="rounded-2xl border p-3"
                                            style={{ borderColor: "#0123401a", backgroundColor: tone.bg }}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="mt-1 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: tone.dot }} aria-hidden="true" />
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <p className="truncate text-sm font-semibold" style={{ color: tone.fg }}>
                                                            {a.title}
                                                        </p>
                                                        <span className="shrink-0 text-[11px] font-semibold" style={{ color: "rgba(1,35,64,0.60)" }}>
                                                            {a.time}
                                                        </span>
                                                    </div>
                                                    <p className="mt-1 text-xs" style={{ color: "rgba(1,35,64,0.70)" }}>
                                                        {a.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>

                            <div className="mt-4">
                                <button
                                    type="button"
                                    className="w-full rounded-2xl px-4 py-2 text-sm font-semibold shadow-sm transition hover:shadow-md 
                                                focus:outline-none focus:ring-2 cursor-pointer"
                                    style={{ backgroundColor: COLORS.aqua, color: COLORS.base }}
                                >
                                    Ver todas as notificações
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* ===== ÁREA INFERIOR ===== */}
                    <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
                        {/* ===== ATALHOS RÁPIDOS ===== */}
                        <div className="rounded-2xl border bg-white p-4 shadow-sm" style={{ borderColor: "#0123401a" }}>
                            <h3 className="text-sm font-bold" style={{ color: COLORS.base }}>
                                Atalhos rápidos
                            </h3>
                            <p className="mt-1 text-xs" style={{ color: "#012340a6" }}>
                                Ações comuns do dia a dia.
                            </p>

                            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                {shortcuts.map((b) => (
                                    <button
                                        key={b.key}
                                        type="button"
                                        className="flex items-center gap-3 rounded-2xl border bg-white px-4 py-3 text-left text-sm font-semibold transition 
                                                    hover:bg-slate-50 hover:shadow-sm cursor-pointer"
                                        style={{ borderColor: "#0123401f", color: COLORS.base }}
                                    >
                                        <span
                                            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border text-base"
                                            style={{ borderColor: "#0123401a", backgroundColor: "#9aeba32e" }}
                                            aria-hidden="true"
                                        >
                                            {b.icon}
                                        </span>
                                        <span className="truncate">{b.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* ===== RESUMO OPERACIONAL ===== */}
                        <div className="rounded-2xl border bg-white p-4 shadow-sm" style={{ borderColor: "#0123401a" }}>
                            <h3 className="text-sm font-bold" style={{ color: COLORS.base }}>
                                Resumo operacional
                            </h3>
                            <p className="mt-1 text-xs" style={{ color: "#012340a6" }}>
                                Indicadores simples para decisão rápida.
                            </p>

                            <div className="mt-4 space-y-3">
                                {kpis.map((kpi) => (
                                    <div key={kpi.key} className="rounded-2xl border p-3" style={{ borderColor: "#0123401a" }}>
                                        <div className="flex items-center justify-between gap-3">
                                            <p className="text-sm font-semibold" style={{ color: "#012340cc" }}>
                                                {kpi.label}
                                            </p>
                                            <p className="text-sm font-bold" style={{ color: COLORS.base }}>
                                                {kpi.value}
                                            </p>
                                        </div>
                                        <div className="mt-2 h-2 w-full rounded-full bg-slate-100">
                                            <div className="h-full rounded-full" style={{ width: `${kpi.bar}%`, backgroundColor: kpi.color }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ===== RODAPÉ INTERNO DO DASHBOARD ===== */}
                    <footer className="mt-8 pb-8 text-center text-sm" style={{ color: "#0123408c" }}>
                        © {new Date().getFullYear()} Abgail • Dashboard interno
                    </footer>
                </main>
            </div>
        </div>
    );
}
