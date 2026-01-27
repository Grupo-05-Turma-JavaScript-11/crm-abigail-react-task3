import React from 'react';
import { faqData } from '../../constants/FaqItems';
import FaqCard from '../../components/cardFunctions/FaqCard';

const Faq: React.FC = () => {


 return (
    <section className="w-full max-w-4xl mx-auto py-16 px-6 bg-transparent">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-[#012340] mb-4">Perguntas Frequentes</h2>
        <div className="w-24 h-1 bg-[#04D939] mx-auto rounded-full"></div>
      </div>
      
      <div className="grid gap-4">
        {faqData.map((item) => (
          <FaqCard key={item.pergunta} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Faq;

