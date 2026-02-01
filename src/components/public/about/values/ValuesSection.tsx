import React from "react";

export function ValuesSection() {
    return (
        <section id="valores" className="mt-16 bg-white/5 rounded-2xl p-8 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-3 text-justify">
                <div className="space-y-3">
                    <h3 className="text-xl font-bold text-[#45C4B0]">Nossa missão</h3>
                    <p className="text-white/90">
                        Empoderar clínicas e profissionais da saúde por meio de um software que
                        organiza processos, otimiza o tempo médico e eleva a experiência do
                        paciente, garantindo segurança, clareza e confiabilidade em cada etapa
                        do atendimento.
                    </p>
                </div>

                <div className="space-y-3">
                    <h3 className="text-xl font-bold text-[#45C4B0]">Nossa visão</h3>
                    <p className="text-white/90">
                        Tornar-se o CRM de referência para clínicas brasileiras, unindo cuidado
                        clínico, tecnologia escalável e o uso ético da inteligência artificial
                        como apoio à decisão e à gestão em saúde.
                    </p>
                </div>

                <div className="space-y-3">
                    <h3 className="text-xl font-bold text-[#45C4B0]">Nossos valores</h3>
                    <ul className="list-disc pl-5 text-white/90 space-y-1">
                        <li>Segurança e confiança</li>
                        <li>
                            Respeito à rotina médica, às necessidades do paciente e à complexidade
                            do atendimento em saúde
                        </li>
                        <li>Transparência e ética em IA</li>
                        <li>Foco em resultados reais para pacientes</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
