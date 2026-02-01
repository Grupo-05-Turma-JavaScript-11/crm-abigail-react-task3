export type Tipo = 'ADMIN' | 'MEDICO' | 'ASSISTENTE' | ''

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  crm?: string;
  foto?: string;
  tipo: Tipo
//   atendimento: Atendimento[] | null
}

// {/* LÓGICA PARA MODIFICAR AS COISAS (APENAS ADM) */}

// {(usuario.tipo === 'admin') && (
//   <button className="bg-red-500">Excluir Usuário</button>
// )}