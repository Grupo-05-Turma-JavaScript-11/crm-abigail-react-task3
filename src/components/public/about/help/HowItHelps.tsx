import React from "react";
import { HelpFeatureCard } from "./HelpFeatureCard";

export function HowItHelps() {
    const features = [
        {
            title: "Prontuário Inteligente",
            description:
                "Sugestões contextuais e resumos automatizados que aceleram a tomada de decisão.",
        },
        {
            title: "Agenda e Fluxo",
            description:
                "Agendamento simples, fila de espera e histórico de atendimentos por paciente.",
        },
        {
            title: "Comunicação",
            description:
                "Mensagens e lembretes com templates inteligentes e histórico centralizado.",
        },
        {
            title: "Segurança & Compliance",
            description:
                "Auditoria de eventos, controle de acesso e criptografia de dados clínicos.",
        },
    ];

    return (
        <div className="col-span-2 bg-white/3 rounded-2xl p-8 text-justify">
            <h2 className="text-[1.4rem] font-bold text-white">
                Como o CRM Abgail ajuda sua clínica
            </h2>

            <p className="mt-3 text-[1rem] text-white/90">
                Desenvolvido a partir de fluxos clínicos reais, o CRM Abgail integra
                agenda, prontuário e comunicação com o paciente em uma única interface. A
                plataforma oferece módulos independentes, permitindo que a clínica utilize
                apenas os recursos necessários, como gestão administrativa, atendimento,
                prontuário com inteligência artificial e relatórios clínicos.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {features.map((f) => (
                    <HelpFeatureCard key={f.title} title={f.title} description={f.description} />
                ))}
            </div>
        </div>
    );
}
