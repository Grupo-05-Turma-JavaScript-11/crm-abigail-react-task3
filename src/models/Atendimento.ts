import type Paciente from "./Paciente";
import type { Usuario } from "./Usuario";


export default interface Atendimento {
    id: number;
    dataHora: string;
    motivo: string;
    status: 'Agendado' | 'Em Tratamento' | 'Finalizado' | 'Cancelado';
    formaPagamento: 'Particular' | 'Convênio';
    observacao?: string;
    foto ?: string;
    paciente?: Paciente | null;
    medico?: Usuario | null;
    idMedico?: number;
    pacientenome?: string;
  }