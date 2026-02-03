import React from "react";
import type { AgendaItem } from "../../dashboard.types";
import { COLORS } from "../../dashboard.theme";

export default function StatusBadge({ status }: { status: AgendaItem["status"] }) {
    const map = {
        AGENDADO: { bg: "#9aeba32e", fg: COLORS.darkGreen, border: "#9aeba35c" },
        "Em Atendimento": { bg: "#45c4b01f", fg: COLORS.mid, border: "#45c4b05e" },
        FINALIZADO: { bg: "#01234008", fg: COLORS.base, border: "#0123401f" },
        CANCELADO: { bg: "#01234008", fg: "#01234099", border: "#0123401a" },
    } as const;

    const s = map[status];

    return (
        <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold" style={{ backgroundColor: s.bg, color: s.fg, borderColor: s.border }}>
            {status}
        </span>
    );
}
