import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../../contexts/AuthContext";
import type UsuarioLogin from "../../models/UsuarioLogin";

function Login() {

    const navigate = useNavigate();
    const { usuario, handleLogin, isLoading } = useContext(AuthContext)
    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({
        id: 0,
        nome: '',
        email: '',
        senha: '',
        foto: '',
        token: '',
        tipo: ''
    }) 

    useEffect(() => {
        if (usuario.token !== "") {
            // Lógica de redirecionamento baseada no tipo
            switch (usuario.tipo) {
                case 'admin':
                    navigate('/dashboard-admin');
                    break;
                case 'medico':
                    navigate('/agenda-medica');
                    break;
                case 'assistente':
                    navigate('/recepcao');
                    break;
                default:
                    navigate('/home'); // Caso padrão
            }
        }
    }, [usuario, navigate]); // navigate é usado por boa prática

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        }) 
    }

    function login(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        handleLogin(usuarioLogin)
    } 

    return (
        <>
            <div className="bg-[#025959] grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-sans overflow-hidden">
                
                <div className="relative lg:block hidden w-full h-full overflow-hidden">
                    <div 
                        className="bg-[url('https://ik.imagekit.io/isa237/imagemLoginCRM?tr=f-png')] bg-no-repeat
                                   w-full h-full bg-cover bg-center transition-transform duration-[3s] hover:scale-110"
                    ></div>
                    <div className="absolute inset-0 bg-[#025959]/40 mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#025959]"></div>
                </div>

                <div className="flex justify-center items-center w-full p-4 animate-slide-up">
                    <form 
                        className="bg-[#012340]/40 backdrop-blur-md border border-white/10 p-10 rounded-[3rem] 
                                   w-full max-w-md shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col gap-6" 
                        onSubmit={login} 
                    >
                        <div className="text-center mb-2">
                            <h2 className="text-[#9AEBA3] text-5xl font-black italic tracking-tighter drop-shadow-sm">LOGIN</h2>
                            <p className="text-[#45C4B0] font-light tracking-[0.2em] text-xs mt-2 uppercase">Plataforma Abgail</p>
                        </div>

                        <div className="flex flex-col w-full gap-1.5">
                            <label htmlFor="usuario" className="text-white/70 text-xs font-bold ml-1 uppercase">E-mail</label>
                            <input
                                type="text"
                                id="usuario"
                                name="email"
                                placeholder="usuario@email.com"
                                className="bg-[#012340]/60 border border-white/10 rounded-2xl p-4 text-white outline-none 
                                           focus:border-[#45C4B0] focus:ring-1 focus:ring-[#45C4B0] transition-all"
                                value={usuarioLogin.email}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} 
                            />
                        </div>

                        <div className="flex flex-col w-full gap-1.5">
                            <label htmlFor="senha" className="text-white/70 text-xs font-bold ml-1 uppercase">Senha</label>
                            <input
                                type="password"
                                id="senha"
                                name="senha"
                                placeholder="********"
                                className="bg-[#012340]/60 border border-white/10 rounded-2xl p-4 text-white outline-none 
                                           focus:border-[#45C4B0] focus:ring-1 focus:ring-[#45C4B0] transition-all"
                                value={usuarioLogin.senha}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                        </div>

                        <button 
                            type='submit' 
                            className="w-full mt-4 rounded-2xl bg-[#45C4B0] hover:bg-[#9AEBA3] text-[#012340] font-black py-4 
                                       shadow-[0_10px_20px_rgba(69,196,176,0.2)] hover:shadow-[#9AEBA3]/40 
                                       transform hover:-translate-y-1 transition-all duration-300 flex justify-center items-center uppercase tracking-widest"
                        >
                            { isLoading ? 
                                <ClipLoader color="#012340" size={24} /> :
                                <span>Entrar</span>
                            }
                        </button>

                        <div className="w-full flex items-center gap-4 my-2 opacity-30">
                            <div className="h-[1px] bg-white flex-grow"></div>
                            <span className="text-white text-[10px] font-bold">SISTEMA SEGURO</span>
                            <div className="h-[1px] bg-white flex-grow"></div>
                        </div>

                        <p className="text-center text-white/80 text-sm">
                            Ainda não tem uma conta?{' '}
                            <Link to="/cadastro" className="text-[#9AEBA3] font-bold hover:text-[#45C4B0] underline decoration-[#45C4B0] transition-colors">
                                Cadastre-se
                            </Link>
                        </p>
                    </form>
                </div>
            </div>

            <style>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slide-up {
                    animation: slideUp 0.8s ease-out forwards;
                }
            `}</style>
        </>
    );
}

export default Login;