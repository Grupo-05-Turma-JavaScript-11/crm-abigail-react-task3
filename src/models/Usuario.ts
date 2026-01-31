export type Tipo = 'admin' | 'medico' | 'assistente' | ''

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  foto: string;
  senha: string;
  tipo: Tipo
//   atendimento: Atendimento[] | null
}

// {/* LÓGICA PARA MODIFICAR AS COISAS (APENAS ADM) */}

// {(usuario.tipo === 'admin') && (
//   <button className="bg-red-500">Excluir Usuário</button>
// )}