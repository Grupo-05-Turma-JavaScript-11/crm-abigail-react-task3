import { UserCircle } from "lucide-react";
import type Atendimento from "../../../models/Atendimento";

interface AtendimentoCardProps {
  atendimento: Atendimento;
  onChangeStatus: (id: number) => void;
}

function AtendimentoCard({ atendimento, onChangeStatus }: AtendimentoCardProps) {
  return (
    <div
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all"
    >
      <div className="p-5">
        <div className="flex gap-4 items-center mb-4">
          <div className="h-14 w-14 rounded-full overflow-hidden bg-[#9AEBA3]/20 flex-shrink-0 border-2 border-[#45C4B0]/20">
            {atendimento.foto ? (
              <img
                src={atendimento.foto}
                alt={atendimento.pacientenome}
                className="h-full w-full object-cover"
              />
            ) : (
              <UserCircle
                className="h-full w-full text-[#45C4B0]"
                strokeWidth={1.5}
              />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-[#012340] truncate">
              {atendimento.pacientenome}
            </h3>
            <p className="text-xs text-[#025959] font-medium flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#45C4B0]"></span>
              {atendimento.motivo}
            </p>
          </div>
        </div>

        <button
          onClick={() => onChangeStatus(atendimento.id)}
          className={`w-full py-2 rounded-lg text-sm font-bold transition-colors mb-0 ${
            atendimento.status === "Agendado"
              ? "bg-[#F8FAFC] text-[#025959] border border-[#9AEBA3]"
              : atendimento.status === "Em Tratamento"
              ? "bg-[#9AEBA3] text-[#012340]"
              : "bg-[#025959] text-white"
          }`}
        >
          Status: {atendimento.status}
        </button>
      </div>
    </div>
  );
}

export default AtendimentoCard;
