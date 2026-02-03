import React from "react";
import { COLORS } from "../dashboard.theme";
import Avatar from "./ui/Avatar";
import { Link, useNavigate } from "react-router-dom";

type Props = {
    sidebarOpen: boolean;
    onToggleSidebar: () => void;
    userName: string;
    roleLabel: string;
};

export default function Topbar({ sidebarOpen, onToggleSidebar, userName, roleLabel }: Props) {

    const navigate = useNavigate();
    
    return (
        <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur" style={{ borderColor: "#0123401a" }}>
            <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onToggleSidebar}
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

                    <Link to={"/dashboard"}>
                    <div className="flex items-center gap-2 group cursor-pointer">
                        
                        <div className="w-9 h-9 bg-[#012340] rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
                            <span className="text-white font-bold italic">A</span>
                        </div>

                        <span className="text-2xl font-black tracking-tighter text-[#012340] transition-colors duration-300 group-hover:text-[#45C4B0]">
                            Abgail
                        </span>
                    </div>
                    </Link>

                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => navigate("/dashboard/notificacoes")}
                        className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-white transition hover:shadow-sm 
               focus:outline-none focus:ring-2 cursor-pointer"
                        style={{ borderColor: "#01234026", color: COLORS.base }}
                        aria-label="Notificações"
                        title="Notificações"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
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
                                {userName || "Usuário"}
                            </p>
                            <p className="text-xs" style={{ color: "#012340a6" }}>
                                {roleLabel}
                            </p>
                        </div>
                        <Avatar />
                    </div>

                    <div className="sm:hidden">
                        <Avatar />
                    </div>
                </div>
            </div>
        </header>
    );
}
