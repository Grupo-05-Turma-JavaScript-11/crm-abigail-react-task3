import type { Tipo } from "./Usuario";

export default interface UsuarioLogin {
    id: number;
    nome: string;
    email: string;
    foto: string;
    senha: string;
    tipo: Tipo
    token: string;
}