import React from "react";

export function AboutCta() {
    return (
        <section className="mt-12 bg-[#012340]/60 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
                <h3 className="text-xl font-bold text-white">
                    Pronto para transformar o atendimento da sua clínica?
                </h3>
                <p className="text-white/80 mt-2 text-sm">
                    Converse com nossa equipe e descubra como o CRM Abgail pode se encaixar
                    no seu fluxo.
                </p>
            </div>

            <div className="flex gap-3">
                <a
                    href="/contato"
                    className="inline-flex items-center gap-2 bg-[#45C4B0] text-[#012340] px-5 py-3 rounded-lg font-semibold hover:brightness-95 transition"
                >
                    Agendar conversa
                </a>
                <a
                    href="#"
                    className="inline-flex items-center gap-2 border border-white/20 px-5 py-3 rounded-lg hover:bg-white/5 transition"
                >
                    Ver roadmap
                </a>
            </div>
        </section>
    );
}
