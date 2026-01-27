import React from "react";
import { ResultMetricCard } from "./ResultMetricCard";

export function ResultsAside() {
    const metrics = [
        {
            value: "30%",
            label: "menos tempo por consulta",
            width: "30%",
            gradient: "linear-gradient(90deg,#45C4B0,#9AEBA3)",
        },
        {
            value: "18%",
            label: "mais retornos de pacientes",
            width: "18%",
            gradient: "linear-gradient(90deg,#027333,#45C4B0)",
        },
        {
            value: "25%",
            label: "mais produtividade da equipe",
            width: "25%",
            gradient: "linear-gradient(90deg,#025959,#45C4B0)",
        },
    ];

    const bullets = [
        "Prontuário inteligente e resumos automatizados",
        "Comunicação unificada com o paciente",
    ];

    return (
        <aside className="p-4 bg-white/4 rounded-2xl flex flex-col space-y-3 w-fit mx-auto lg:mx-0">
            <div>
                <h3 className="text-[1.4rem] font-bold text-[#9AEBA3]">Resultados esperados</h3>
                <p className="mt-1 text-white/80 text-[1rem] leading-tight max-w-full text-justify">
                    Impacto prático e mensurável no dia a dia da clínica, com menos tarefas
                    administrativas, equipes mais sincronizadas e pacientes mais satisfeitos.
                </p>
            </div>

            <div className="grid grid-cols-3 gap-1.5 w-full items-stretch">
                {metrics.map((m) => (
                    <ResultMetricCard
                        key={m.value}
                        value={m.value}
                        label={m.label}
                        width={m.width}
                        gradient={m.gradient}
                    />
                ))}
            </div>

            <ul className="mt-3 space-y-2 text-sm text-white/90">
                {bullets.map((text) => (
                    <li key={text} className="flex items-start gap-2">
                        <svg
                            className="w-4 h-4 text-[#45C4B0] flex-shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden
                        >
                            <path
                                d="M5 13l4 4L19 7"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span>{text}</span>
                    </li>
                ))}
            </ul>

            <div className="mt-4">
                <p className="text-sm text-white/70">
                    Quer ver em ação? Agende uma demonstração personalizada.
                </p>
                <a
                    href="#"
                    className="mt-3 inline-block w-full text-center bg-[#45C4B0] text-[#012340] px-3 py-2 rounded-lg font-semibold hover:brightness-95 transition"
                    aria-label="Solicitar demonstração"
                >
                    Solicitar demo
                </a>
            </div>
        </aside>
    );
}
