import type { Usuario } from "./Usuario";

export interface PacienteFormData {
  id: number;
  nome: string;
  dataNascimento: string;
  sexo: 'M' | 'F' | 'O';
  documento: string;
  email?: string;
  telefone?: string;
  foto?: string;
  convenio: boolean;
  observacoes?: string;
  usuario?: Usuario;
}