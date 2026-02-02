import { useContext, useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";
import AtendimentoCard from "../../../components/atendimentos/cardAtendimentos/AtendimentoCard";
import type Atendimento from "../../../models/Atendimento";
import AtendimentoForm from "../../../components/atendimentos/formAtendimentos/AtendimentoForm";
import { api, buscar } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

// Tipagem básica

const Atendimentos = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);
  const { usuario, handleLogout } = useContext(AuthContext); // Pega o usuário logado que tem o token
  const token = usuario.token;

  const [showModal, setShowModal] = useState(false);

  const [filtroNome, setFiltroNome] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("Todos");

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
      // CORREÇÃO 2: Busca os dados apenas se houver token
      buscarAtendimentos();
    }
  }, [token]);

  const buscarAtendimentos = async () => {
    try {
      // 2. Use a função 'buscar' passando o header com o token
      await buscar("/atendimentos", setAtendimentos, {
        headers: { Authorization: token }, // O seu service espera o header aqui
      });
    } catch (error) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 text-[#012340]">
      {/* Header com novo botão de filtro rápido */}
      <header className="flex flex-col gap-6 mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#025959]">
            Gestão de Atendimentos
          </h1>
          <div className="flex items-center gap-4">
            <select
              className="p-2 rounded-lg border border-[#9AEBA3] bg-white"
              onChange={(e) => setFiltroStatus(e.target.value)}
            >
              <option value="Todos">Todos os Status</option>
              <option value="Agendado">Agendado</option>
              <option value="Em Tratamento">Em Tratamento</option>
              <option value="Finalizado">Finalizado</option>
            </select>

            
              <button 
              onClick={() => setShowModal(true)}
              className="bg-[#027333] hover:bg-[#025959] text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition-all active:scale-95">
                <Plus size={20} /> Novo Atendimento
              </button>
          </div>
        </div>
      </header>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <AtendimentoForm
            onClose={() => {
              setShowModal(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Atendimentos;
