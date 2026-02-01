import { createContext, type ReactNode, useEffect, useState } from "react"
import { login } from "../services/Service"
import type UsuarioLogin from "../models/UsuarioLogin"


interface AuthContextProps {
    usuario: UsuarioLogin
    handleLogout(): void
    handleLogin(usuario: UsuarioLogin): Promise<void>
    isLoading: boolean
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {

    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        email: "",
        foto: "",
        senha: "",
        tipo: "",
        token: ""
    });

    // 🔴 LOGIN FAKE TEMPORÁRIO PARA DESENVOLVIMENTO DO DASHBOARD
    useEffect(() => {        
        setUsuario({
            id: 1,
            nome: "Bruna",
            email: "bruna@fake.com",
            foto: "",
            senha: "",
            tipo: "admin",
            token: "fake-token"
        });
    }, []);

    const [isLoading, setIsLoading] = useState(false)

    async function handleLogin(usuarioLogin: UsuarioLogin) {
        setIsLoading(true)
        try {
            await login(`/usuarios/logar`, usuarioLogin, setUsuario)
            alert("O Usuário foi autenticado com sucesso!")
        } catch (error) {
            alert("Os Dados do usuário estão inconsistentes!")
        }
        setIsLoading(false)
    }

    function handleLogout() {
        setUsuario({
            id: 0,
            nome: "",
            email: "",
            senha: "",
            foto: "",
            tipo: "",
            token: ""
        })
    }

    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}