import { useMemo, useState } from "react";

import PageHeader from "./components/PageHeader";
import StatsSection from "./components/StatsSection";
import AgendaCard from "./components/AgendaCard";
import ActivitiesCard from "./components/ActivitiesCard";
import BottomSection from "./components/BottomSection";
import DashboardFooter from "./components/DashboardFooter";

import {
    getStatCards,
    getAgenda,
    getActivities,
    getShortcuts,
    getKpis,
} from "./dashboard.data";

export default function Dashboard() {

    const [periodoAtivo, setPeriodoAtivo] = useState<"Dia" | "Semana" | "Mês">("Dia");

    const statCards = useMemo(() => getStatCards(), []);
    const agenda = useMemo(() => getAgenda(), []);
    const activities = useMemo(() => getActivities(), []);
    const shortcuts = useMemo(() => getShortcuts(), []);
    const kpis = useMemo(() => getKpis(), []);

    return (
        <>
            <PageHeader onNew={() => { }} />

            <StatsSection statCards={statCards} />

            <section className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
                <AgendaCard
                    agenda={agenda}
                    periodoAtivo={periodoAtivo}
                    setPeriodoAtivo={setPeriodoAtivo}
                />

                <ActivitiesCard activities={activities} />
            </section>

            <BottomSection shortcuts={shortcuts} kpis={kpis} />

            <DashboardFooter />
        </>
    );
}
