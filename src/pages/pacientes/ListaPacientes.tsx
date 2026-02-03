import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Pencil, Trash2, Users, Search } from "lucide-react"; // Ícones CRM
import { AuthContext } from "../../contexts/AuthContext";
import type { PacienteFormData } from "../../models/Paciente";
import { buscar, deletar } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";


const ListaPacientes = () => {
  const [pacientes, setPacientes] = useState<PacienteFormData[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

 useEffect(() => {
    buscarPacientes();
  }, []);

  const excluirPaciente = async (id: number) => {
    if (!window.confirm("Deseja realmente excluir este paciente? Esta ação não pode ser desfeita.")) return;

    try {
      await deletar(`/pacientes/${id}`,{ headers: { Authorization: token } } );
      setPacientes((prev) => prev.filter(p => p.id !== id));
      
      ToastAlerta("Paciente excluído com sucesso!", "sucesso");
    } catch (error) {
      console.error(error);
      ToastAlerta("Erro ao excluir paciente. Verifique se existem dependências vinculadas.", "erro");
    }
  };

  const buscarPacientes = async () => {
    try {
    await buscar("/pacientes", setPacientes, { headers: { Authorization: token } });

    } catch (error) {
      console.error(error);
      ToastAlerta("Erro ao buscar pacientes", "erro");
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  };

  return (
    <div className=" min-h-screen w-full bg-gradient-to-br from-[#0f172a] via-[#134e4a] to-[#2D7A78] p-4 md:p-8 overflow-hidden">
      <div className="max-w-6xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl ">
        
        {/* Cabeçalho da Listagem */}
        <div className="p-6 border-b rounded-md bg-white flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Users className="text-[#2D7A78]" />
              Gestão de Pacientes
            </h1>
            <p className="text-gray-500 text-sm">Visualize e gerencie todos os pacientes cadastrados.</p>
          </div>
          
          <Link
            to="/dashboard/pacientes/novo"
            className="flex items-center gap-2 bg-[#2D7A78] hover:bg-[#246361] text-white px-6 py-2.5 rounded-lg font-bold transition-all shadow-lg shadow-teal-900/20 active:scale-95"
          >
            <UserPlus size={20} />
            Novo Paciente
          </Link>
        </div>

        {/* Tabela Estilizada */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 uppercase text-xs font-bold tracking-wider">
                <th className="px-6 py-4">Paciente</th>
                <th className="px-6 py-4">Documento</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-100 bg-white">
              {pacientes.length > 0 ? (
                pacientes.map((paciente) => (
                  <tr key={paciente.id} className="hover:bg-teal-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-800">{paciente.nome}</div>
                      <div className="text-sm text-gray-500">{paciente.email || "Sem e-mail"}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 font-mono text-sm">
                      {paciente.documento}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
                        Ativo
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        <Link
                          to={`/dashboard/pacientes/${paciente.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors shadow-sm border border-transparent hover:border-blue-100"
                          title="Editar Paciente"
                        >
                          <Pencil size={18} />
                        </Link>
                        <button
                          onClick={() => excluirPaciente(paciente.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors shadow-sm border border-transparent hover:border-red-100"
                          title="Excluir Paciente"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    Nenhum paciente encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Rodapé da Tabela */}
        <div className=" rounded-md p-4 bg-gray-50 border-t text-sm text-gray-500 text-center">
          Total de {pacientes.length} pacientes listados
        </div>
      </div>
    </div>
  );
};

export default ListaPacientes;