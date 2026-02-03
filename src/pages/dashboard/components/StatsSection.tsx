import React from "react";
import type { StatCard } from "../dashboard.types";
import { COLORS } from "../dashboard.theme";

export default function StatsSection({ statCards }: { statCards: StatCard[] }) {
    return (
        <section className="px-4 py-6 sm:px-6 lg:px-8 mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {statCards.map((card) => (
                <div key={card.key} className="rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md" style={{ borderColor: "#0123401a" }}>
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

                        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border" style={{ backgroundColor: "#01234008", borderColor: "#0123401a", color: card.accent }} aria-hidden="true">
                            {card.icon}
                        </div>
                    </div>

                    <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full" style={{ width: "68%", backgroundColor: card.accent }} />
                    </div>
                </div>
            ))}
        </section>
    );
}
