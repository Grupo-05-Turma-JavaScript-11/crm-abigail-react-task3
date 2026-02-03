import type Atendimento from "./Atendimento";
import type { PacienteFormData } from "./Paciente";
import type { Tipo } from "./Usuario";

export default interface UsuarioLogin {
  id: number;
  nome: string;
  email: string;
  senha: string;
  crm?: string;
  foto?: string;
  tipo: Tipo;
  token: string;
  atendimento?: Atendimento[] | null;
  paciente?: PacienteFormData[] | null;
}