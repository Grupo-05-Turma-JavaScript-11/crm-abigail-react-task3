import { GithubLogoIcon } from "@phosphor-icons/react";
import { Link, useLocation } from "react-router-dom";


function Footer() {
    const location = useLocation();
    // Função para garantir que a página sempre comece do topo ao clicar
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Lógica para esconder a Navbar se estiver em '/login' ou '/cadastro'
    if (location.pathname === '/login' || location.pathname === '/cadastro') {
        return null; // Retorna nada, logo, a Navbar não aparece nessas telas
    }

    return (
        <footer className="bg-[#012340] text-white pt-16 pb-8">
            <div className="container mx-auto px-8">
                
                {/* PARTE SUPERIOR: Grid de Conteúdo */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    
                    {/* Coluna 1: Marca e Slogan */}
                    <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
                        <Link to="/">
                        <div onClick={scrollToTop} className="flex items-center gap-2 group cursor-pointer w-fit">
                            <div className="w-8 h-8 bg-[#45C4B0] rounded flex items-center justify-center transition-transform group-hover:rotate-12">
                                <span className="text-[#012340] font-bold italic">A</span>
                            </div>
                            <span className="text-2xl font-black tracking-tighter text-white transition-colors group-hover:text-[#45C4B0]">
                                Abgail
                            </span>
                        </div>
                        </Link>

                        <p className="text-gray-400 text-sm leading-relaxed">
                            O CRM médico que humaniza a tecnologia para você focar no que importa: seus pacientes.
                        </p>
                    </div>

                    {/* Coluna 2: Navegação Rápida com Scroll */}
                    <div>
                        <h4 className="text-[#45C4B0] font-bold mb-6 text-sm uppercase tracking-widest">Navegação</h4>
                        <ul className="flex flex-col gap-4 text-sm text-gray-300">
                            <li>
                                <Link to="/" onClick={scrollToTop} className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-1">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/funcionalidades" onClick={scrollToTop} className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-1">
                                    Funcionalidades
                                </Link>
                            </li>
                            <li>
                                <Link to="/sobre" onClick={scrollToTop} className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-1">
                                    Sobre Nós
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Coluna 3: Suporte */}
                    <div>
                        <h4 className="text-[#45C4B0] font-bold mb-6 text-sm uppercase tracking-widest">Suporte</h4>
                        <ul className="flex flex-col gap-4 text-sm text-gray-300">
                            <li><button onClick={scrollToTop} className="hover:text-white hover:translate-x-1 transition-all">Central de Ajuda</button></li>
                            <li><button onClick={scrollToTop} className="hover:text-white hover:translate-x-1 transition-all">Privacidade</button></li>
                            <li><button onClick={scrollToTop} className="hover:text-white hover:translate-x-1 transition-all">Termos de Uso</button></li>
                        </ul>
                    </div>

                    {/* Coluna 4: Call to Action */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-[#45C4B0] font-bold mb-2 text-sm uppercase tracking-widest">Pronto para começar?</h4>
                        <p className="text-gray-400 text-sm">Experimente o futuro da gestão clínica agora mesmo.</p>
                        <button onClick={scrollToTop} className="mt-2 bg-[#45C4B0] text-[#012340] font-bold py-2 px-6 rounded-lg hover:bg-[#9AEBA3] transition-all active:scale-95 shadow-lg w-fit">
                            Criar conta grátis
                        </button>
                    </div>
                </div>

                {/* LINHA DIVISORA FINAL */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    
                    {/* Copyright */}
                    <p className="text-gray-500 text-xs">
                        © {new Date().getFullYear()} Abgail CRM. Todos os direitos reservados.
                    </p>

                    {/* GitHub Organization Link */}
                    <div className="flex items-center gap-4">
                        <span className="text-xs text-gray-500 font-medium italic">Acesse nosso repositório:</span>
                        <a 
                            href="https://github.com/Grupo-05-Turma-JavaScript-11/crm-abigail-react-task3" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-white hover:text-[#45C4B0] transition-all hover:scale-110"
                        >
                            <GithubLogoIcon size={32} weight="fill" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;