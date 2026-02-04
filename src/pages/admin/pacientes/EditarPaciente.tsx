import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { UserCog, ArrowLeft, Loader2 } from "lucide-react"; // Ícones para o estilo CRM
import { AuthContext } from "../../../contexts/AuthContext";
import type { PacienteFormData } from "../../../models/Paciente";
import { atualizar, buscarPorId } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";


const EditarPaciente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

    const { usuario } = useContext(AuthContext);
    const token = usuario.token;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PacienteFormData>();

  const carregarPaciente = async () => {
    try {
      console.log(token)
      const dados = await buscarPorId<PacienteFormData>(`/pacientes/${id}`, { headers: { Authorization: token } });
      reset(dados);
    } catch (error) {
       ToastAlerta("Erro ao carregar o paciente", "erro");
      console.log(error)
      navigate("/pacientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   carregarPaciente();
  }, [id, reset, navigate]);

  const onSubmit = async (data: PacienteFormData) => {
    try {
      console.log(data)
      // 1. Chamada para a service passando a rota com ID e os dados do form
      await atualizar(`/pacientes`, data, { headers: { Authorization: token } });
      
      // 2. Feedback de sucesso
      ToastAlerta("Paciente atualizado com sucesso!", "sucesso");
      
      // 3. Redirecionamento
      navigate("/dashboard/pacientes");
    } catch (error) {
      ToastAlerta("Erro ao atualizar paciente. Verifique os dados e tente novamente.", "erro");
      console.error("Erro ao atualizar:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center text-white">
        <Loader2 className="animate-spin mb-4" size={48} />
        <p className="font-medium">Carregando dados do prontuário...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#134e4a] to-[#2D7A78] p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header Identidade CRM */}
        <div className="bg-white border-b px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <UserCog className="text-[#2D7A78]" />
              Editar Paciente
            </h1>
            <p className="text-gray-500 text-sm">Atualize os dados cadastrais do paciente.</p>
          </div>
          <button 
            onClick={() => navigate("/dashboard/pacientes")}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Nome Completo */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nome Completo</label>
              <input
                {...register("nome", { required: "Nome obrigatório" })}
                className={`w-full border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#2D7A78] outline-none transition-all ${errors.nome ? 'border-red-500' : 'border'}`}
              />
              {errors.nome && <span className="text-red-500 text-xs mt-1">{errors.nome.message}</span>}
            </div>

            {/* Documento */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">CPF / Documento</label>
              <input
                {...register("documento", { required: "Documento obrigatório" })}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#2D7A78] outline-none"
              />
            </div>

            {/* Data Nascimento */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Data de Nascimento</label>
              <input
                type="date"
                {...register("dataNascimento", { required: true })}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#2D7A78] outline-none"
              />
            </div>

            {/* Sexo */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Gênero</label>
              <select
                {...register("sexo", { required: true })}
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
              <label className="block text-sm font-semibold text-gray-700 mb-1">Telefone</label>
              <input
                {...register("telefone")}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#2D7A78] outline-none"
              />
            </div>

            {/* E-mail */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">E-mail</label>
              <input
                {...register("email")}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#2D7A78] outline-none"
              />
            </div>

            {/* Checkbox Convênio */}
            <div className="md:col-span-2 flex items-center p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <input 
                type="checkbox" 
                id="convenio"
                {...register("convenio")} 
                className="w-5 h-5 text-[#2D7A78] border-gray-300 rounded focus:ring-[#2D7A78]"
              />
              <label htmlFor="convenio" className="ml-3 text-sm font-medium text-gray-700 cursor-pointer">
                Paciente possui convênio médico ativo
              </label>
            </div>

            {/* Observações */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Observações / Histórico</label>
              <textarea
                {...register("observacoes")}
                rows={3}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#2D7A78] outline-none"
              />
            </div>
          </div>

          {/* Botões de Ação */}
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
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarPaciente;