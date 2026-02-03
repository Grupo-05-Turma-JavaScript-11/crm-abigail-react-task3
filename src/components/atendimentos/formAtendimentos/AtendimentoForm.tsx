import {
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import type Atendimento from "../../../models/Atendimento";
import type { Usuario } from "../../../models/Usuario";
import type { PacienteFormData } from "../../../models/Paciente";

function AtendimentoForm({
  onClose,
  atendimentoInicial,
}: {
  onClose?: () => void;
  atendimentoInicial?: Atendimento;
}) {
  const navigate = useNavigate();

  const [atendimento, setAtendimento] = useState<Atendimento>(
    atendimentoInicial ||
      ({
        id: 0,
        dataHora: "",
        motivo: "",
        status: "AGENDADO",
        formaPagamento: "PARTICULAR",
        observacao: "",
        foto: "",
        usuario: null,
        paciente: null,
      } as Atendimento)
  );

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [pacientes, setPacientes] = useState<PacienteFormData[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/atendimentos/${id}`, setAtendimento, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  function formatarParaInputDateTime(data: string | undefined) {
    if (!data) return "";
  
    const date = new Date(data);
  
    const ano = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const dia = String(date.getDate()).padStart(2, "0");
    const horas = String(date.getHours()).padStart(2, "0");
    const minutos = String(date.getMinutes()).padStart(2, "0");
  
    return `${ano}-${mes}-${dia}T${horas}:${minutos}`;
  }

  async function carregarUsuarios() {
    await buscar("/usuarios/all", setUsuarios, {
      headers: { Authorization: token },
    });
  }

  async function carregarPacientes() {
    await buscar("/pacientes", setPacientes, {
      headers: { Authorization: token },
    });
  }

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado!");
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    carregarUsuarios();
    carregarPacientes();

    if (!atendimentoInicial && id !== undefined) {
      buscarPorId(id);
    }
  }, [id, atendimentoInicial]);

  function atualizarEstado(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setAtendimento({
      ...atendimento,
      [e.target.name]: e.target.value,
    });
  }

  function selecionarUsuario(e: ChangeEvent<HTMLSelectElement>) {
    const userId = Number(e.target.value);
    const usuarioSelecionado = usuarios.find((u) => u.id === userId) || null;

    setAtendimento({
      ...atendimento,
      usuario: usuarioSelecionado,
    });
  }

  function selecionarPaciente(e: ChangeEvent<HTMLSelectElement>) {
    const pacienteId = Number(e.target.value);
    const pacienteSelecionado =
      pacientes.find((p) => p.id === pacienteId) || null;

    setAtendimento({
      ...atendimento,
      paciente: pacienteSelecionado,
    });
  }
  function retornar() {
    if (onClose) {
      onClose();
    } else {
      navigate("/atendimentos");
    }
  }

  async function gerarNovoAtendimento(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        ...atendimento,
        usuario: { id: atendimento.usuario?.id },
        paciente: { id: atendimento.paciente?.id },
      };

      if (id !== undefined) {
        await atualizar(`/atendimentos`, payload, {
          headers: { Authorization: token },
        });

        alert("Atendimento atualizado com sucesso!");
      } else {
        await cadastrar(`/atendimentos`, payload, setAtendimento, {
          headers: { Authorization: token },
        });

        alert("Atendimento cadastrado com sucesso!");
      }

      retornar();
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        alert("Erro ao salvar atendimento.");
      }
    }

    setIsLoading(false);
  }

  return (
    <div className="min-h-screen p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 border-t-4 border-[#025959]">
        <h1 className="text-2xl font-bold text-[#012340] mb-6 text-center italic">
          {id === undefined ? "Cadastrar Atendimento" : "Editar Atendimento"}
        </h1>

        <form onSubmit={gerarNovoAtendimento} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Médico */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-[#012340] mb-1">
                Médico
              </label>
              <select
                name="usuario"
                onChange={selecionarUsuario}
                value={atendimento.usuario?.id || ""}
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#45C4B0] outline-none transition"
              >
                <option value="">Selecione</option>
                {usuarios.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.nome}
                  </option>
                ))}
              </select>
            </div>

            {/* Paciente */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-[#012340] mb-1">
                Paciente
              </label>
              <select
                name="paciente"
                onChange={selecionarPaciente}
                value={atendimento.paciente?.id || ""}
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#45C4B0] outline-none transition"
              >
                <option value="">Selecione</option>
                {pacientes.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Data e Hora */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-[#012340] mb-1">
                Data e Hora
              </label>
              <input
                type="datetime-local"
                name="dataHora"
                value={formatarParaInputDateTime(atendimento.dataHora)}
                onChange={atualizarEstado}
                required
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#45C4B0] outline-none"
              />
            </div>

            {/* Motivo */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-[#012340] mb-1">
                Motivo
              </label>
              <input
                type="text"
                name="motivo"
                value={atendimento.motivo}
                onChange={atualizarEstado}
                required
                placeholder="Ex: Consulta de rotina"
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#45C4B0] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Status */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-[#012340] mb-1">
                Status
              </label>
              <select
                name="status"
                value={atendimento.status}
                onChange={atualizarEstado}
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#9AEBA3] outline-none"
              >
                <option value="AGENDADO">Agendado</option>
                <option value="EM TRATAMENTO">Em Tratamento</option>
                <option value="FINALIZADO">Finalizado</option>
                <option value="CANCELADO">Cancelado</option>
              </select>
            </div>

            {/* Forma de Pagamento */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-[#012340] mb-1">
                Forma de Pagamento
              </label>
              <select
                name="formaPagamento"
                value={atendimento.formaPagamento}
                onChange={atualizarEstado}
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#9AEBA3] outline-none"
              >
                <option value="PARTICULAR">Particular</option>
                <option value="CONVENIO">Convênio</option>
              </select>
            </div>
          </div>

          {/* Observação */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-[#012340] mb-1">
              Observação
            </label>
            <textarea
              name="observacao"
              value={atendimento.observacao}
              onChange={atualizarEstado}
              rows={3}
              className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#45C4B0] outline-none resize-none"
            />
          </div>

          {/* Botão */}
          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={retornar}
              className="cursor-pointer border border-[#027333] text-[#027333] hover:bg-[#FAFAF8] font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out hover:scale-[1.01]"
            >
              <span>Cancelar</span>
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#027333] hover:bg-[#025959] text-white font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-[1.01] flex justify-center items-center shadow-md"
            >
              {isLoading ? (
                <ClipLoader color="#ffffff" size={24} />
              ) : (
                <span className="uppercase tracking-wider">
                  {id === undefined
                    ? "Cadastrar Atendimento"
                    : "Atualizar Atendimento"}
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AtendimentoForm;
