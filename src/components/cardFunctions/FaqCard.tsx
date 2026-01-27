import { useState } from "react";
import type FaqItem from "../../models/Faq";

interface FaqCardProps {
    item: FaqItem;
}
function FaqCard({ item }: FaqCardProps) {
    
    const [activeItem, setActiveItem] = useState<FaqItem | null>(null);

    return (
        <div 
            onMouseEnter={() => setActiveItem(item)}
            onMouseLeave={() => setActiveItem(null)}
            className="group border border-slate-200 rounded-xl bg-white shadow-md hover:border-[#03A63C] transition-all duration-300 cursor-pointer"
        >
            <div className="w-full flex justify-between items-center p-6 text-left">
                <span className={`font-bold text-lg transition-colors ${activeItem ? 'text-[#025959]' : 'text-[#012340]'}`}>
                    {item.pergunta}
                </span>
              
                <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${activeItem ? 'bg-[#04D939] text-white rotate-180' : 'bg-slate-100 text-[#012340]'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
            </div>

            <div 
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    activeItem ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="p-6 pt-0 text-slate-600 border-t border-slate-50 leading-relaxed text-justify">
                    <p className="pl-4 border-l-4 border-[#027333]">
                        {item.resposta}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default FaqCard;