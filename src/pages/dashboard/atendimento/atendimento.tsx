import { useContext, useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";
import AtendimentoCard from "../../../components/atendimentos/cardAtendimentos/AtendimentoCard";
import type Atendimento from "../../../models/Atendimento";
import AtendimentoForm from "../../../components/atendimentos/formAtendimentos/AtendimentoForm";
import axios from "axios";

// Tipagem básica

const Atendimentos = () => {

  const [filtroNome, setFiltroNome] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("Todos");
  const [showModal, setShowModal] = useState(false);

  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);

  // Função para buscar dados do backend
  const fetchAtendimentos = async () => {
    try {
      const response = await axios.get('/api/atendimentos');
      setAtendimentos(response.data);
    } catch (error) {
      console.error("Erro ao buscar atendimentos", error);
    }
  };

  useEffect(() => {
    fetchAtendimentos();
  }, []);

  const handleSalvarAtendimento = (dados: any) => {
    // Aqui você faria a chamada para sua API
    console.log("Salvando:", dados);
    setShowModal(false);
  };
  const proximoStatus = async (id: number, statusAtual: string) => {
    const ordem = ["Agendado", "Em Tratamento", "Finalizado"];
    const novoStatus = ordem[ordem.indexOf(statusAtual) + 1] || "Agendado";

    try {
      await axios.patch(`/api/atendimentos/${id}`, { status: novoStatus });
      fetchAtendimentos(); // Recarrega a lista
    } catch (error) {
      alert("Erro ao atualizar status");
    }
  };


  const [meusFiltros, setMeusFiltros] = useState(false);
  const medicoLogadoId = 123;

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
              className="bg-[#027333] hover:bg-[#025959] text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition-all active:scale-95"
            >
              <Plus size={20} /> Novo Atendimento
            </button>
          </div>
        </div>

        {/* Barra de Ações e Filtros */}
        <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-[#9AEBA3]/30">
          <button
            onClick={() => setMeusFiltros(!meusFiltros)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all border ${
              meusFiltros
                ? "bg-[#45C4B0] text-white border-[#45C4B0]"
                : "bg-white text-[#025959] border-[#9AEBA3] hover:bg-[#F8FAFC]"
            }`}
          >
            {meusFiltros
              ? "Exibindo: Meus Atendimentos"
              : "Ver Meus Atendimentos"}
          </button>

          <div className="h-8 w-px bg-gray-200 hidden md:block"></div>

          <div className="relative flex-1 min-w-[200px]">
            <Search
              className="absolute left-3 top-2.5 text-[#45C4B0]"
              size={18}
            />
            <input
              type="text"
              placeholder="Nome do paciente..."
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-[#9AEBA3] focus:ring-2 focus:ring-[#45C4B0] outline-none"
              onChange={(e) => setFiltroNome(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Grid de Cards com Foto */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl ">
        {atendimentos
          .filter(
            (a) =>
              ((filtroStatus === "Todos" || a.status === filtroStatus) &&
                a.pacientenome
                  .toLowerCase()
                  .includes(filtroNome.toLowerCase()) &&
                !meusFiltros) ||
              a.idMedico === medicoLogadoId
          ) // Lógica do novo botão
          .map((atend) => (
            <AtendimentoCard
              key={atend.id}
              atendimento={atend}
              onChangeStatus={() => proximoStatus(atend.id, atend.status)}
            />
          ))}
      </div>

      <AtendimentoForm
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        onRefresh={fetchAtendimentos} // Passa a função de refresh
      />
    </div>
  );
};

export default Atendimentos;
