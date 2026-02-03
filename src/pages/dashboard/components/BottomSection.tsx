import React from "react";
import { COLORS } from "../dashboard.theme";

type Shortcut = { key: string; label: string; icon: string };
type Kpi = { key: string; label: string; value: string; bar: number; color: string };

export default function BottomSection({ shortcuts, kpis }: { shortcuts: Shortcut[]; kpis: Kpi[] }) {
    return (
        <section className="px-4 py-6 sm:px-6 lg:px-8 mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
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
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border text-base" style={{ borderColor: "#0123401a", backgroundColor: "#9aeba32e" }}>
                                {b.icon}
                            </span>
                            <span className="truncate">{b.label}</span>
                        </button>
                    ))}
                </div>
            </div>

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
    );
}
