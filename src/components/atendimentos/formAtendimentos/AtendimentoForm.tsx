import React, {
  useState,
  useEffect,
  useContext,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { X, Camera, UserCircle, Search } from "lucide-react";
import axios from "axios"; // Assumindo que você usa axios
import { useNavigate, useParams } from "react-router-dom";
import type Atendimento from "../../../models/Atendimento";
import { AuthContext } from "../../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";
import Popup from "reactjs-popup";

const AtendimentoForm = ({ isOpen, onClose, onRefresh }: any) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;
  const { id } = useParams<{ id: string }>();

  const [atendimento, setAtendimento] = useState<Atendimento>({
    id: 0,
    dataHora: "",
    formaPagamento: "Particular",
    status: "Agendado",
    motivo: "",
    foto: "",
    observacao: "",
  } as Atendimento);
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

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado!");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function atualizarEstado(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    // Lógica para atualizar campos simples ou aninhados
    if (name === "medico" || name === "paciente") {
      setAtendimento({
        ...atendimento,
        [name]: {
          ...(atendimento[name as keyof Atendimento] as object),
          id: value,
        },
      });
    } else {
      setAtendimento({
        ...atendimento,
        [name]: value,
      });
    }
  }

  async function gerarNovoAtendimento(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const endpoint = `/atendimentos`;
    const header = { headers: { Authorization: token } };

    try {
      if (id !== undefined) {
        await atualizar(endpoint, atendimento, setAtendimento, header);
        alert("Atualizado com sucesso!");
      } else {
        // Remova o ID 0 se sua API não aceitar para novos cadastros
        const { id, ...dadosParaEnvio } = atendimento;
        await cadastrar(endpoint, dadosParaEnvio, setAtendimento, header);
        alert("Cadastrado com sucesso!");
      }
      onClose(); // Fecha o modal após o sucesso
    } catch (error: any) {
      if (error.toString().includes("401")) handleLogout();
      else alert("Erro ao processar atendimento.");
    } finally {
      setIsLoading(false);
    }
  }

  function retornar() {
    navigate("/atendimento");
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <h1 className="text-4xl text-center my-8">
        {id === undefined ? "Cadastrar" : "Editar"}
      </h1>

      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
        <form className="p-6 space-y-4" onSubmit={gerarNovoAtendimento}>
          {/* Médico */}
          <div className="relative">
            <label className="text-xs font-bold text-[#025959]">Médico</label>
            <input
              type="text"
              value={atendimento.medico?.nome}
              name="medico"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
              placeholder="Digite o nome do médico..."
              className="border p-2 rounded-lg w-full border-[#9AEBA3] outline-none"
            />
          </div>

          {/* Paciente */}
          <div className="relative">
            <label className="text-xs font-bold text-[#025959]">Paciente</label>
            <input
              type="text"
              value={atendimento.paciente?.nome}
              name="paciente"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
              placeholder="Digite o nome do paciente..."
              className="border p-2 rounded-lg w-full border-[#9AEBA3] outline-none"
            />
          </div>

          {/* Data e Forma de Pagamento */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[#025959]">
                Data e Hora
              </label>
              <input
                type="datetime-local"
                name="dataHora"
                required
                className="border-2 border-slate-700 rounded p-2 w-full"
                value={atendimento.dataHora}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#025959]">
                Forma de Pagamento
              </label>
              <select
                value={atendimento.formaPagamento}
                name="formaPagamento"
                className="border p-2 rounded-lg border-[#9AEBA3] w-full"
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  atualizarEstado(e)
                }
              >
                <option value="Particular">Particular</option>
                <option value="Convênio">Convênio</option>
              </select>
            </div>
          </div>

          {/* Motivo */}
          <div>
            <label className="text-xs font-bold text-[#025959]">
              Motivo do Atendimento
            </label>
            <input
              type="text"
              name="motivo"
              value={atendimento.motivo}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
              placeholder="Ex: Consulta de rotina..."
              className="border p-2 rounded-lg w-full border-[#9AEBA3]"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="text-xs font-bold text-[#025959]">Status</label>
            <select
              name="status"
              value={atendimento.status}
              className="border p-2 rounded-lg w-full border-[#9AEBA3]"
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                atualizarEstado(e)
              }
              required
            >
              <option value="Agendado">Agendado</option>
              <option value="Em Tratamento">Em Tratamento</option>
              <option value="Finalizado">Finalizado</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>

          {/* Foto */}
          <div>
            <label className="text-xs font-bold text-[#025959]">Foto</label>
            <input
              type="text"
              name="foto"
              value={atendimento.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
              placeholder="URL da foto (opcional)"
              className="border p-2 rounded-lg w-full border-[#9AEBA3]"
            />
          </div>

          {/* Observação */}
          <div>
            <label className="text-xs font-bold text-[#025959]">
              Observações
            </label>
            <textarea
              value={atendimento.observacao}
              name="observacao"
              placeholder="Observações adicionais"
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                atualizarEstado(e)
              }
              className="border p-2 rounded-lg w-full h-20 border-[#9AEBA3]"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="w-1/2 py-2 bg-[#027333] text-white rounded-lg hover:bg-[#025959] flex justify-center"
            >
              {isLoading ? <ClipLoader size={20} color="#fff" /> : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AtendimentoForm;
