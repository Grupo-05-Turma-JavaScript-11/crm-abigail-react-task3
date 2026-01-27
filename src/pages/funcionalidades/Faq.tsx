
import React, { useState } from 'react';

interface FAQItem {
  pergunta: string;
  resposta: string;
}

const Faq: React.FC = () => {

    // Estado para armazenar o index do item ativo
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      pergunta: "Como os dados dos pacientes são protegidos?",
      resposta: "Utilizamos criptografia de ponta a ponta e armazenamento em nuvem segura, seguindo todas as normas da LGPD para garantir a privacidade dos dados médicos."
    },
    {
      pergunta: "O sistema funciona em dispositivos móveis?",
      resposta: "Sim! O CRM é totalmente responsivo, permitindo que médicos e secretárias acessem a agenda e prontuários via tablets ou smartphones."
    },
    {
      pergunta: "Como funciona o suporte técnico?",
      resposta: "Oferecemos suporte em tempo real via chat interno de segunda a sexta, das 08h às 18h, para ajudar com qualquer dúvida operacional."
    },
     {
      pergunta: "Como os dados dos pacientes são protegidos?",
      resposta: "Utilizamos criptografia de ponta a ponta e armazenamento em nuvem segura, seguindo todas as normas da LGPD para garantir a privacidade dos dados médicos."
    },
    {
      pergunta: "O sistema funciona em dispositivos móveis?",
      resposta: "Sim! O CRM é totalmente responsivo, permitindo que médicos e secretárias acessem a agenda e prontuários via tablets ou smartphones."
    },
    {
      pergunta: "Como funciona o suporte técnico?",
      resposta: "Oferecemos suporte em tempo real via chat interno de segunda a sexta, das 08h às 18h, para ajudar com qualquer dúvida operacional."
    }
    
  ];

 return (
    <section className="w-full max-w-4xl mx-auto py-16 px-6 bg-transparent">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-[#012340] mb-4">Perguntas Frequentes</h2>
        <div className="w-24 h-1 bg-[#04D939] mx-auto rounded-full"></div>
      </div>
      
      <div className="grid gap-4">
        {faqData.map((item, index) => (
          <div 
            key={index}
            // onMouseEnter: Abre a caixa ao passar o mouse
            onMouseEnter={() => setActiveIndex(index)}
            // onMouseLeave: Fecha a caixa ao tirar o mouse
            onMouseLeave={() => setActiveIndex(null)}
            className="group border border-slate-200 rounded-xl bg-white shadow-md hover:border-[#03A63C] transition-all duration-300 cursor-pointer"
          >
            {/* O botão agora é apenas visual, o hover já controla a lógica */}
            <div className="w-full flex justify-between items-center p-6 text-left">
              <span className={`font-bold text-lg transition-colors ${activeIndex === index ? 'text-[#025959]' : 'text-[#012340]'}`}>
                {item.pergunta}
              </span>
              
              <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-[#04D939] text-white rotate-180' : 'bg-slate-100 text-[#012340]'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
            </div>

            <div 
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                activeIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-6 pt-0 text-slate-600 border-t border-slate-50 leading-relaxed">
                <p className="pl-4 border-l-4 border-[#027333]">
                  {item.resposta}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faq;

