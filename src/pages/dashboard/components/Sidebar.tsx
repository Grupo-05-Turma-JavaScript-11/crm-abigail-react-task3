import React, { type RefObject } from "react";
import type { NavItem } from "../dashboard.types";
import { COLORS, classNames } from "../dashboard.theme";
import NavRow from "./ui/NavRow";

type Props = {
    sidebarOpen: boolean;
    sidebarRef: RefObject<HTMLElement | null>;
    navItems: NavItem[];
    activeKey: string;
    onClose: () => void;
    onLogout: () => void;
    userName: string;
    roleLabel: string;
};

export default function Sidebar({
    sidebarOpen,
    sidebarRef,
    navItems,
    activeKey,
    onClose,
    onLogout,
    userName,
    roleLabel,
}: Props) {
    return (
        <aside
            ref={sidebarRef}
            className={classNames(
                "fixed left-0 top-0 z-50 h-full w-64 border-r bg-white shadow-sm transition-transform duration-300",
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}
            style={{ borderColor: "#0123401a" }}
            aria-label="Menu lateral"
        >
            <div className="flex h-full flex-col p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 group cursor-default">
                        <div className="w-9 h-9 bg-[#012340] rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
                            <span className="text-white font-bold italic">A</span>
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-[#012340] transition-colors duration-300 group-hover:text-[#45C4B0]">
                            Abgail
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex h-9 w-9 items-center justify-center cursor-pointer"
                        style={{ borderColor: "#01234026", color: COLORS.base }}
                        aria-label="Fechar menu"
                        title="Fechar menu"
                    >
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M6 6l12 12" />
                            <path d="M18 6L6 18" />
                        </svg>
                    </button>
                </div>

                <div className="mt-6 space-y-2">
                    {navItems.map((item) => (
                        <NavRow key={item.key} item={item} onNavigate={onClose} />
                    ))}
                </div>

                <div className="mt-auto rounded-2xl border p-3" style={{ borderColor: "#0123401a", backgroundColor: "#01234008" }}>
                    <p className="text-sm font-semibold" style={{ color: COLORS.base }}>
                        {userName || "Usuário"}
                    </p>
                    <p className="text-xs" style={{ color: "#012340a6" }}>
                        {roleLabel}
                    </p>

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
            </div>
        </aside>
    );
}
