import React from "react";

type BenefitItemProps = { text: string };

function BenefitItem({ text }: BenefitItemProps) {
    return (
        <li className="flex items-start gap-3">
            <svg className="w-5 h-5 text-[#9AEBA3] flex-shrink-0" viewBox="0 0 24 24" fill="none">
                <path
                    d="M5 12l4 4L19 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            {text}
        </li>
    );
}

export function HeroBenefits() {
    const items = [
        "Prontuário eletrônico com IA para apoio à decisão clínica",
        "Gestão completa de agendas e atendimentos",
        "Relacionamento e comunicação inteligente com pacientes",
        "Segurança, compliance e auditoria de eventos clínicos",
    ];

    return (
        <ul className="mt-4 grid grid-cols-1 sm:grid-cols-1 gap-3 text-sm text-white/90 text-justify">
            {items.map((text) => (
                <BenefitItem key={text} text={text} />
            ))}
        </ul>
    );
}
