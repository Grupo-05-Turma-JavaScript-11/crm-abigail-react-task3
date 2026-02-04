
import type { AgendaItem } from "../dashboard.types";
import { COLORS } from "../dashboard.theme";
import StatusBadge from "./ui/StatusBadge";
import IconBadge from "./ui/IconBadge";

type Periodo = "Dia" | "Semana" | "Mês";

type Props = {
    agenda: AgendaItem[];
    periodoAtivo: Periodo;
    setPeriodoAtivo: (p: Periodo) => void;
};

export default function AgendaCard({ agenda, periodoAtivo, setPeriodoAtivo }: Props) {
    return (
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
                                style={{ borderColor: "#0123401f", backgroundColor: "#01234008", color: COLORS.base }}
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
                                className="inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition hover:shadow-sm cursor-pointer"
                                style={{
                                    borderColor: "#01234024",
                                    backgroundColor: "white",
                                    color: item.status === "EM TRATAMENTO" ? COLORS.mid : COLORS.base,
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
    );
}
