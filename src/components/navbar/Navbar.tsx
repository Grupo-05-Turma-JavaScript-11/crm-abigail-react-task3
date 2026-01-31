import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Importado useLocation
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {

    const navigate = useNavigate(); 
    const location = useLocation(); // Captura a rota atual

    // Extraído o 'usuario' para verificar o 'tipo' e 'token'
    const { usuario, handleLogout } = useContext(AuthContext) 

    function logout() {
        handleLogout()
        alert("O Usuário foi desconectado com sucesso!")
        navigate('/')
    }

    // Lógica para esconder a Navbar se estiver em '/login' ou '/cadastro'
    if (location.pathname === '/login' || location.pathname === '/cadastro') {
        return null; 
    }

    return (
            <div className='w-full flex justify-center py-4 bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm'> 
                <div className="container flex justify-between items-center text-lg mx-8">
                    <Link to="/">
                    <div className="flex items-center gap-2 group cursor-default">
                        <div className="w-10 h-10 bg-[#012340] rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
                            <span className="text-white font-bold italic">A</span>
                        </div>
                        
                        <span className="text-2xl font-black tracking-tighter text-[#012340] transition-colors duration-300 group-hover:text-[#45C4B0]">
                            Abgail
                        </span>
                    </div>
                    </Link>

                    <div className='flex items-center gap-6 text-[#012340]'>
                        <Link to="/">
                            <div className='relative font-bold text-sm group transition-colors hover:text-[#45C4B0] cursor-pointer'>
                                HOME
                                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#45C4B0] transition-all duration-300 group-hover:w-full"></span>
                            </div>
                        </Link>
                        
                        <Link to="/sobre">
                        <div className='relative font-bold text-sm group transition-colors hover:text-[#45C4B0] cursor-pointer'>
                            SOBRE NÓS
                            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#45C4B0] transition-all duration-300 group-hover:w-full"></span>
                        </div>
                        </Link>

                        {/* Visível para Médico e Admin */}
                        {(usuario.tipo === 'medico' || usuario.tipo === 'admin') && (
                            <Link to="/funcionalidades">
                                <div className='relative font-bold text-sm group transition-colors hover:text-[#45C4B0] cursor-pointer'>
                                    FUNCIONALIDADES
                                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#45C4B0] transition-all duration-300 group-hover:w-full"></span>
                                </div>
                            </Link>
                        )}

                        {/* Se NÃO estiver logado, mostra Login e Cadastro */}
                        {usuario.token === "" ? (
                            <>
                                <Link to="/login">
                                    <div className='font-bold text-sm hover:text-[#45C4B0] transition-colors px-4 cursor-pointer'>
                                        LOGIN
                                    </div>
                                </Link>

                                <Link to="/cadastro">
                                    <div className='relative overflow-hidden bg-[#45C4B0] text-[#012340] text-sm font-bold px-6 py-2 rounded-full hover:bg-[#9AEBA3] transition-all shadow-md active:scale-95 group cursor-pointer'>
                                        <span className="relative z-10">CADASTRO</span>
                                        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-40 group-hover:animate-[shine_1s_ease-in-out]" />
                                    </div>
                                </Link>
                            </>
                        ) : (
                            /* Se ESTIVER logado, mostra o botão Sair */
                            <Link to='' onClick={logout} className="rounded-xl text-[#012340] border border-[#012340] hover:bg-red-500/10 hover:border-red-500 px-4 py-2 text-sm font-bold transition-all duration-300 hover:underline">
                                SAIR
                            </Link>
                        )}
                    </div>
                </div>

                <style>{`
                    @keyframes shine {
                        100% { left: 125%; }
                    }
                `}</style>
            </div>
    )
}

export default Navbar;