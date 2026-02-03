import { useContext, useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";
import AtendimentoCard from "../../components/atendimentos/cardAtendimentos/AtendimentoCard";
import type Atendimento from "../../models/Atendimento";
import AtendimentoForm from "../../components/atendimentos/formAtendimentos/AtendimentoForm";
import { api, atualizar, buscar, deletar } from "../../services/Service";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { set } from "react-hook-form";

// Tipagem básica

const Atendimentos = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [showModal, setShowModal] = useState(false);

  const [filtroNome, setFiltroNome] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("Todos");
  const [meusCards, setMeusCards] = useState(false);
  const [modo, setModo] = useState<"todos" | "meus">("todos");

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado!");
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    buscarAtendimentos();
  }, []);

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado!");
      navigate("/login");
    } else {
      buscarAtendimentos();
    }
  }, [token]);

  function filtrarMeusAtendimentos() {
    const meus = atendimentos.filter((a) => a.usuario?.id === usuario.id);

    setAtendimentos(meus);
  }

  const buscarAtendimentos = async () => {
    try {
      await buscar("/atendimentos", setAtendimentos, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const alterarStatus = async (id: number) => {
    try {
      await atualizar(
        `/atendimentos/${id}/status`,
        {},
        {
          headers: { Authorization: token },
        }
      );

      console.log("Status atualizado com sucesso");

      await buscarAtendimentos();
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  async function deletarAtendimento(id: number) {
    try {
      await deletar(`/atendimentos/${id}`, {
        headers: { Authorization: token },
      });

      alert("Atendimento excluído com sucesso!");

      // Atualiza a lista depois da exclusão
      buscarAtendimentos();
    } catch (error) {
      alert("Erro ao excluir atendimento");
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 text-[#012340]">
      <header className="flex flex-col gap-6 mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#025959]">
            Gestão de Atendimentos
          </h1>

          <div className="flex items-center gap-6">
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => {
                  setModo("todos");
                  buscarAtendimentos();
                }}
                className={` px-6 py-2.5 rounded-xl font-medium transition-all duration-300 cursor-pointer border
                  ${
                    modo === "todos"
                      ? "bg-[#E6F4F1] text-[#025959] border-[#025959] shadow-sm"
                      : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                  } `}
              >
                Todos os atendimentos
              </button>

              <button
                onClick={() => {
                  setModo("meus");
                  filtrarMeusAtendimentos();
                }}
                className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 cursor-pointer border
                  ${
                    modo === "meus"
                      ? "bg-[#EDF7ED] text-[#027333] border-[#027333] shadow-sm"
                      : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                  }`}
              >
                Meus atendimentos
              </button>
            </div>

            <select
              className="p-2 rounded-lg border border-[#9AEBA3] bg-white"
              onChange={(e) => setFiltroStatus(e.target.value)}
            >
              <option value="Todos">Todos os Status</option>
              <option value="AGENDADO">Agendado</option>
              <option value="EM TRATAMENTO">Em Tratamento</option>
              <option value="FINALIZADO">Finalizado</option>
            </select>

            <button
              onClick={() => setShowModal(true)}
              className="bg-[#027333] hover:bg-[#025959] text-white px-5 py-2.5 rounded-xl flex items-center gap-2"
            >
              <Plus size={20} /> Novo Atendimento
            </button>
          </div>
        </div>
      </header>

      <div className="relative flex-1 m-8">
        <Search className="absolute left-3 top-2.5 text-[#45C4B0]" size={18} />
        <input
          type="text"
          placeholder="Pesquisar paciente..."
          className="pl-10 pr-4 py-2 w-full rounded-lg border border-[#9AEBA3]"
          value={filtroNome}
          onChange={(e) => setFiltroNome(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {atendimentos
          .filter((at) => {
            // Se a busca estiver vazia, mostra todos (inclusive os sem paciente)
            if (filtroNome === "") return true;

            // Se houver busca, verifica se o paciente existe e se o nome coincide
            return at.paciente?.nome
              ?.toLowerCase()
              .includes(filtroNome.toLowerCase());
          })
          .filter((at) =>
            filtroStatus === "Todos" ? true : at.status === filtroStatus
          )
          .map((atendimento) => (
            <AtendimentoCard
              key={atendimento.id}
              atendimento={atendimento}
              onChangeStatus={alterarStatus}
              onDelete={deletarAtendimento}
            />
          ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
          <AtendimentoForm
            onClose={() => {
              setShowModal(false);
              buscarAtendimentos();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Atendimentos;
