import { useContext, useState } from "react";
import { Search, Plus } from "lucide-react";
import AtendimentoCard from "../../../components/atendimentos/cardAtendimentos/AtendimentoCard";
import type Atendimento from "../../../models/Atendimento";

// Tipagem básica

const Atendimentos = () => {
  const [showModal, setShowModal] = useState(false);
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("Todos");

  const proximoStatus = (id: number) => {
    const ordem: Atendimento["status"][] = [
      "Agendado",
      "Em Tratamento",
      "Finalizado",
    ];

    setAtendimentos((prev) =>
      prev.map((atend) => {
        if (atend.id === id) {
          const indexAtual = ordem.indexOf(atend.status);
          const novoStatus =
            indexAtual === -1 || indexAtual === ordem.length - 1
              ? "Agendado"
              : ordem[indexAtual + 1];

          return { ...atend, status: novoStatus };
        }
        return atend;
      })
    );
  };

  // Exemplo de estado inicial
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([
    {
      id: 1,
      motivo: "Check-up Geral",
      status: "Agendado",
      dataHora: "2024-05-20T14:00",
      formaPagamento: "Particular",
      observacao: "Paciente em jejum",
      paciente: null,
      medico: null,
      idMedico: 1,
      pacientenome: "Joao",
    },
  ]);

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
              onChangeStatus={proximoStatus}
            />
          ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl">
            <h2 className="text-xl font-bold mb-4 text-[#012340]">
              Novo Atendimento
            </h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="datetime-local"
                  className="border p-2 rounded w-full border-[#9AEBA3]"
                />
                <select className="border p-2 rounded w-full border-[#9AEBA3]">
                  <option>Particular</option>
                  <option>Convênio</option>
                </select>
              </div>
              {/* Aqui entrariam os inputs de Autocomplete para Médico e Paciente */}
              <input
                type="text"
                placeholder="Pesquisar Médico..."
                className="border p-2 rounded w-full border-[#9AEBA3]"
              />
              <input
                type="text"
                placeholder="Pesquisar Paciente..."
                className="border p-2 rounded w-full border-[#9AEBA3]"
              />
              <textarea
                placeholder="Observações"
                className="border p-2 rounded w-full h-24 border-[#9AEBA3]"
              />

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#45C4B0] text-white px-6 py-2 rounded-lg font-bold"
                >
                  Criar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Atendimentos;
