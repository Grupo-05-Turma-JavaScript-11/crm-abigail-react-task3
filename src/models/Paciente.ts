export interface Paciente {
  id: number;
  nome: string;
  dataNascimento: string;
  sexo: 'M' | 'F' | 'O';
  documento: string;
  email?: string;
  telefone?: string;
  convenio: boolean;
  observacoes?: string;
  status: string;
}

export interface PacienteFormData {
  nome: string;
  dataNascimento: string;
  sexo: 'M' | 'F' | 'O';
  documento: string;
  email?: string;
  telefone?: string;
  convenio: boolean;
  observacoes?: string;
  status: string;
}