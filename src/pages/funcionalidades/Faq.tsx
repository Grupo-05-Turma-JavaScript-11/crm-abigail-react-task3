import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const Faq: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      question: "Como funciona o prontuário eletrônico?",
      answer: "O prontuário é totalmente digital e criptografado, permitindo anexar exames, histórico de consultas e prescrições de forma segura."
    },
    {
      question: "É possível gerenciar mais de uma unidade da clínica?",
      answer: "Sim, o sistema permite a gestão multi-clínicas, onde você pode alternar entre unidades e centralizar o faturamento."
    },
    {
      question: "O sistema envia lembretes de consulta?",
      answer: "Sim, enviamos notificações automáticas via WhatsApp e E-mail para reduzir a taxa de absenteísmo dos pacientes."
    }
  ];

  return (
    <section className="w-full max-w-3xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
        Perguntas Frequentes
      </h2>
      
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div 
            key={index} 
            className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm"
          >
            <button
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              className="w-full flex justify-between items-center p-5 text-left hover:bg-slate-50 transition-colors"
            >
              <span className="font-semibold text-slate-700">
                {item.question}
              </span>
              <span className={`transform transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </span>
            </button>

            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                activeIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-5 pt-0 text-slate-600 leading-relaxed border-t border-slate-100">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faq;