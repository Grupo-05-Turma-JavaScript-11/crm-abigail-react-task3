import React from "react";
import { COLORS } from "../dashboard.theme";
import { useNavigate } from "react-router-dom";

type Props = {
    onNew: () => void;
};

export default function PageHeader({ onNew }: Props) {
    
    const navigate = useNavigate();

    return (
        <div className=" px-4 py-6 sm:px-6 lg:px-8 mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
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
                onClick={() => navigate("/dashboard/atendimentos")}
                className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold shadow-sm transition 
                    hover:shadow-md focus:outline-none focus:ring-2 cursor-pointer"
                style={{ backgroundColor: COLORS.mid, color: "white" }}
                aria-label="Novo Atendimento"
                title="Novo Atendimento"                
            >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14" />
                    <path d="M5 12h14" />
                </svg>
                Novo Atendimento
            </button>
        </div>
    );
}
