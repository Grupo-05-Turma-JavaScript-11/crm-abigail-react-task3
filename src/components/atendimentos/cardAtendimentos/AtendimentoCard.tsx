import { useState } from "react";
import { UserCircle, ChevronDown, ChevronUp } from "lucide-react";
import type Atendimento from "../../../models/Atendimento";
import { useNavigate } from "react-router-dom";
import AtendimentoForm from "../formAtendimentos/AtendimentoForm";

interface AtendimentoCardProps {
  atendimento: Atendimento;
  onChangeStatus: (id: number) => Promise<void> | void;
  onDelete: (id: number) => Promise<void> | void;
}

function AtendimentoCard({
  atendimento,
  onChangeStatus,
  onDelete,
}: AtendimentoCardProps){
  const [expandido, setExpandido] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  async function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();

    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este atendimento?"
    );

    if (!confirmar) return;

    try {
      setLoadingDelete(true);
      await onDelete(atendimento.id);
    } finally {
      setLoadingDelete(false);
    }
  }

  async function handleStatusChange(e: React.MouseEvent) {
    e.stopPropagation();

    try {
      setIsLoading(true);
      await onChangeStatus(atendimento.id);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      onClick={() => setExpandido(!expandido)}
      className={`
    bg-white rounded-2xl shadow-sm border border-gray-100 
    overflow-hidden hover:shadow-md transition-all cursor-pointer relative
    ${expandido ? "col-span-full" : ""}
  `}
    >
      <div className="p-5">
        <div className="flex gap-4 items-center mb-4">
          <div className="h-14 w-14 rounded-full overflow-hidden bg-[#9AEBA3]/20 flex-shrink-0 border-2 border-[#45C4B0]/20">
            {atendimento.foto ? (
              <img
                src={atendimento.foto}
                alt={atendimento.paciente?.nome || "Paciente"}
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
              {atendimento.paciente?.nome || "Paciente não informado"}
            </h3>

            <p className="text-xs text-[#025959] font-medium flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#45C4B0]"></span>
              {atendimento.formaPagamento}
            </p>
          </div>

          {expandido ? (
            <ChevronUp className="text-[#025959]" />
          ) : (
            <ChevronDown className="text-[#025959]" />
          )}
        </div>

        {/* ÁREA EXTRA – só aparece quando expandido */}
        {expandido && (
          <div>
            <button
              onClick={(e) => {
                e.stopPropagation(); // evita fechar o card ao clicar
                console.log("Editar atendimento:", atendimento.id);
                setShowModal(true);
                // Aqui você pode chamar uma função do pai depois
              }}
              className="absolute top-3 right-10 bg-[#025959] text-white px-3 py-1 rounded-lg text-xs hover:bg-[#027333] transition-all"
            >
              Editar
            </button>
            <button
              onClick={handleDelete}
              disabled={loadingDelete}
              className="bg-red-600 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-700 transition-all flex items-center gap-1"
            >
              {loadingDelete ? (
                <>
                  <svg
                    className="animate-spin h-3 w-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Excluindo...
                </>
              ) : (
                "Excluir"
              )}
            </button>

            <div className="mt-4 p-4 bg-[#F8FAFC] rounded-lg text-sm space-y-2">
              <p>
                <strong>Data e Hora:</strong>{" "}
                {new Date(atendimento.dataHora).toLocaleString()}
              </p>

              <p>
                <strong>Motivo:</strong> {atendimento.motivo}
              </p>

              {atendimento.observacao && (
                <p>
                  <strong>Observações:</strong> {atendimento.observacao}
                </p>
              )}

              {atendimento.usuario && (
                <p>
                  <strong>Médico responsável:</strong>{" "}
                  {atendimento.usuario.nome}
                </p>
              )}
            </div>
          </div>
        )}

        <button
          onClick={handleStatusChange}
          disabled={isLoading}
          className={`w-full py-2 cursor-pointer hover:shadow-md rounded-lg text-sm font-bold transition-colors mt-4 flex justify-center items-center gap-2 ${
            atendimento.status === "AGENDADO"
              ? "bg-[#F8FAFC] text-[#025959] border border-[#9AEBA3]"
              : atendimento.status === "EM TRATAMENTO"
              ? "bg-[#9AEBA3] text-[#012340]"
              : "bg-[#025959] text-white"
          }`}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Atualizando...
            </>
          ) : (
            <>Status: {atendimento.status}</>
          )}
        </button>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <AtendimentoForm
            onClose={() => setShowModal(false)}
            atendimentoInicial={atendimento}
          />
        </div>
      )}
    </div>
  );
}

export default AtendimentoCard;
