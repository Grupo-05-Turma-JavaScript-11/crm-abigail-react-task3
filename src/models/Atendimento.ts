
import type { PacienteFormData } from "./Paciente";
import type { Usuario } from "./Usuario";


export default interface Atendimento {
    id: number;
    dataHora: string;
    motivo: string;
    status: 'AGENDADO' | 'EM TRATAMENTO' | 'FINALIZADO' | 'CANCELADO';
    formaPagamento: 'PARTICULAR' | 'CONVENIO';
    observacao?: string;
    foto ?: string;
    paciente?: PacienteFormData | null;
    usuario?: Usuario | null;
  }