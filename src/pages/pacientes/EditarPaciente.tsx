import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { buscarPorId, atualizar } from "../../services/Service";
import type { PacienteFormData } from "../../models/Paciente";

const EditarPaciente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PacienteFormData>();

  useEffect(() => {
    const carregarPaciente = async () => {
      try {
        const dados = await buscarPorId<PacienteFormData>(
          `/pacientes/${id}`
        );
        reset(dados);
      } catch (error) {
        alert("Erro ao carregar paciente");
      } finally {
        setLoading(false);
      }
    };

    carregarPaciente();
  }, [id, reset]);

  const onSubmit = async (data: PacienteFormData) => {
    try {
      await atualizar(`/pacientes/${id}`, data);
      alert("Paciente atualizado com sucesso!");
      navigate("/pacientes");
    } catch (error) {
      alert("Erro ao atualizar paciente");
    }
  };

  if (loading) {
    return <p className="p-8">Carregando dados do paciente...</p>;
  }

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6">Editar Paciente</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("nome", { required: "Nome obrigatório" })}
            placeholder="Nome completo"
            className="w-full border p-3 rounded"
          />
          {errors.nome && <span className="text-red-500 text-sm">{errors.nome.message}</span>}

          <input
            {...register("documento", { required: "Documento obrigatório" })}
            placeholder="CPF / Documento"
            className="w-full border p-3 rounded"
          />

          <input
            type="date"
            {...register("dataNascimento", { required: true })}
            className="w-full border p-3 rounded"
          />

          <select
            {...register("sexo", { required: true })}
            className="w-full border p-3 rounded"
          >
            <option value="">Selecione o sexo</option>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
            <option value="O">Outro</option>
          </select>

          <input
            {...register("email")}
            placeholder="E-mail"
            className="w-full border p-3 rounded"
          />

          <input
            {...register("telefone")}
            placeholder="Telefone"
            className="w-full border p-3 rounded"
          />

          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("convenio")} />
            Possui convênio?
          </label>

          <textarea
            {...register("observacoes")}
            placeholder="Observações"
            className="w-full border p-3 rounded"
          />

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/pacientes")}
              className="px-5 py-2 border rounded"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-[#2D7A78] text-white rounded font-bold"
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
