import React from "react";
import { Title } from "../titleabout/Title";
import { HeroBenefits } from "./HeroBenefits";

type AboutHeroProps = {
    heroImg: string;
};

export function AboutHero({ heroImg }: AboutHeroProps) {
    return (
        <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="space-y-6">
                <span className="inline-flex items-center gap-3 bg-[#45C4B0]/10 text-[#45C4B0] rounded-full px-3 py-1 text-[1.5rem] text-justify font-medium">
                    Software médico • Eleve a gestão da sua clínica
                </span>

                <Title />

                <p className="text-[#9AEBA3]/90 max-w-full text-justify">
                    Do prontuário eletrônico com IA ao relacionamento humanizado com o
                    paciente, o CRM Abgail é um software médico completo para seus
                    objetivos como médico.
                </p>

                <div className="flex flex-wrap gap-3">
                    <a
                        href="/contato"
                        className="inline-flex items-center gap-2 bg-[#45C4B0] text-[#012340] font-semibold px-5 py-3 rounded-lg shadow-md hover:brightness-95 transition"
                        aria-label="Fale conosco - CRM Abgail"
                    >
                        Fale com um especialista
                    </a>

                    <a
                        href="#valores"
                        className="inline-flex items-center gap-2 border border-white/20 px-5 py-3 rounded-lg hover:bg-white/5 transition"
                        aria-label="Conheça nossos valores"
                    >
                        Nossos valores
                    </a>
                </div>

                <HeroBenefits />
            </div>

            <div className="flex justify-center lg:justify-end">
                <img
                    src={heroImg}
                    alt="Ilustração sobre o CRM Abgail"
                    className="w-full max-w-2x1 scale-105 lg:scale-100 rounded-2xl shadow-2xl border border-white/5"
                />
            </div>
        </div>
    );
}
