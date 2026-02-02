import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { buscar, deletar } from "../../services/Service";
import type { Paciente } from "../../models/Paciente";

const ListaPacientes = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);

  useEffect(() => {
    buscar<Paciente[]>("/pacientes").then(setPacientes);
  }, []);

  const excluirPaciente = async (id: number) => {
    if (!window.confirm("Deseja excluir este paciente?")) return;

    try {
      await deletar(`/pacientes/${id}`);
      // Remove da tela sem recarregar
      setPacientes((prev) => prev.filter(p => p.id !== id));
    } catch {
      alert("Erro ao excluir paciente");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Pacientes</h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="p-3">Nome</th>
            <th className="p-3">Documento</th>
            <th className="p-3">Ações</th>
          </tr>
        </thead>

        <tbody>
          {pacientes.map((paciente) => (
            <tr key={paciente.id} className="border-t">

              {/* DADOS DO PACIENTE */}
              <td className="p-3">{paciente.nome}</td>
              <td className="p-3">{paciente.documento}</td>

              {/* 👇 AQUI FICAM OS BOTÕES */}
              <td className="p-3 flex gap-4">
                <Link
                  to={`/pacientes/${paciente.id}/editar`}
                  className="text-blue-600 font-semibold"
                >
                  Editar
                </Link>

                <button
                  onClick={() => excluirPaciente(paciente.id)}
                  className="text-red-600 font-semibold"
                >
                  Excluir
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaPacientes;
