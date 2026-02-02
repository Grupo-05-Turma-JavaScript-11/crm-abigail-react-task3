import React from "react";
import type { ActivityItem } from "../dashboard.types";
import { COLORS } from "../dashboard.theme";
import { toneStyles } from "../dashboard.data";

export default function ActivitiesCard({ activities }: { activities: ActivityItem[] }) {
    return (
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
                        <li key={a.id} className="rounded-2xl border p-3" style={{ borderColor: "#0123401a", backgroundColor: tone.bg }}>
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
    );
}
