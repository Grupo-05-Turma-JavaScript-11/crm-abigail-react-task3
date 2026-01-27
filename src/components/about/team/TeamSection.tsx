import React from "react";
import { team } from "../../../constants/team";
import { TeamCard } from "./TeamCard";

export function TeamSection() {
    return (
        <section className="mt-12">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Nosso time</h2>
                <p className="text-white/80 text-sm p-2">
                    Profissionais multidisciplinares unidos pelo cuidado.
                </p>
            </div>

            <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-justify">
                {team.map((m) => (
                    <TeamCard key={m.name} member={m} />
                ))}
            </div>
        </section>
    );
}
