import { useForm } from "react-hook-form";
import { useNavigate} from "react-router-dom";
import { UserPlus, ArrowLeft } from "lucide-react"; // Opcional: ícones trazem ar de CRM

import type { PacienteFormData } from "../../../models/Paciente";
import { cadastrar } from "../../../services/Service";
import { useContext, useState } from "react";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { AuthContext } from "../../../contexts/AuthContext";

const NovoPaciente = () => {
  const navigate = useNavigate();

  const { usuario } = useContext(AuthContext);
  const token = usuario.token;

  const {
    formState: { errors },
  } = useForm<PacienteFormData>({
    defaultValues: {
      convenio: false,
    },
  });

  const [paciente, setPaciente] = useState<PacienteFormData>({
    id: 0,
    nome: "",
    dataNascimento: "",
    sexo: "M",
    documento: "",
    email: "",
    telefone: "",
    convenio: false,
    observacoes: "",
  } as PacienteFormData);

  const onSubmit = async () => {
    console.log("Dados que serão enviados:", paciente); // Verifique se os dados estão certos

    try {
      // Removi a trava do IF apenas para teste:
      await cadastrar("/pacientes", paciente, setPaciente, {
        headers: { Authorization: token },
      });

      ToastAlerta("Paciente cadastrado com sucesso", "sucesso");
      navigate("/dashboard/pacientes");
    } catch (error: any) {
      console.error("Erro detalhado:", error.response?.data || error.message);
      ToastAlerta("Erro ao cadastrar o paciente", "erro");
    }
  };

  return (
    /* Fundo com Gradiente da aplicação */
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#134e4a] to-[#2D7A78] p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
        {/* Cabeçalho do Formulário */}
        <div className="bg-white border-b px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <UserPlus className="text-[#2D7A78]" />
              Novo Paciente
            </h1>
            <p className="text-gray-500 text-sm">
              Preencha os dados para criar o prontuário.
            </p>
          </div>
          <button
            onClick={() => navigate("/dashboard/pacientes")}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="p-8 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nome Completo */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Nome Completo
              </label>
              <input
                type="text"
                name="nome"
                value={paciente.nome}
                onChange={(e) =>
                  setPaciente({ ...paciente, nome: e.target.value })
                }
                placeholder="Ex: João Silva"
                className={`w-full border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#2D7A78] outline-none transition-all ${
                  errors.nome ? "border-red-500" : "border"
                }`}
              />
              {errors.nome && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.nome.message}
                </span>
              )}
            </div>

            {/* Documento */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                CPF / Documento
              </label>
              <input
                type="text"
                name="documento"
                value={paciente.documento}
                onChange={(e) =>
                  setPaciente({ ...paciente, documento: e.target.value })
                }
                placeholder="000.000.000-00"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#2D7A78] outline-none"
              />
            </div>

            {/* Data Nascimento */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Data de Nascimento
              </label>
              <input
                type="date"
                name="dataNascimento"
                value={paciente.dataNascimento}
                onChange={(e) =>
                  setPaciente({ ...paciente, dataNascimento: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#2D7A78] outline-none"
              />
            </div>

            {/* Sexo */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Gênero
              </label>
              <select
                name="sexo"
                value={paciente.sexo}
                onChange={(e) =>
                  setPaciente({ ...paciente, sexo: e.target.value as "M" | "F" | "O" })
                }
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#2D7A78] outline-none bg-white"
              >
                <option value="">Selecione</option>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
                <option value="O">Outro</option>
              </select>
            </div>

            {/* Telefone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Telefone / WhatsApp
              </label>
              <input
                type="text"
                name="telefone"
                value={paciente.telefone}
                onChange={(e) =>
                  setPaciente({ ...paciente, telefone: e.target.value })
                }
                placeholder="(00) 00000-0000"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#2D7A78] outline-none"
              />
            </div>

            {/* E-mail */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                value={paciente.email}
                onChange={(e) =>
                  setPaciente({ ...paciente, email: e.target.value })
                }
                placeholder="paciente@email.com"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#2D7A78] outline-none"
              />
            </div>

            {/* Convênio Checkbox */}
            <div className="md:col-span-2 flex items-center p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <input
                type="checkbox"
                id="convenio"
                name="convenio"
                checked={paciente.convenio}
                onChange={(e) =>
                  setPaciente({ ...paciente, convenio: e.target.checked })
                }
                className="w-5 h-5 text-[#2D7A78] border-gray-300 rounded focus:ring-[#2D7A78]"
              />
              <label
                htmlFor="convenio"
                className="ml-3 text-sm font-medium text-gray-700 cursor-pointer"
              >
                O paciente possui plano de saúde / convênio ativo?
              </label>
            </div>

            {/* Observações */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Observações Médicas
              </label>
              <textarea
                name="observacoes"
                value={paciente.observacoes}
                onChange={(e) =>
                  setPaciente({ ...paciente, observacoes: e.target.value })
                }
                rows={3}
                placeholder="Alergias, histórico ou notas importantes..."
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#2D7A78] outline-none"
              />
            </div>
          </div>

          {/* Ações */}
          <div className="flex justify-end gap-4 pt-6 border-t mt-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard/pacientes")}
              className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-8 py-2.5 bg-[#2D7A78] hover:bg-[#246361] text-white rounded-lg font-bold shadow-lg shadow-teal-900/20 transition-all transform active:scale-95"
            >
              Salvar Cadastro
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NovoPaciente;
