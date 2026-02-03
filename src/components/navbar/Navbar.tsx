import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // 1. DESCOMENTADO: Necessário para acessar os dados do usuário logado
  const { usuario, handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    ToastAlerta('O Usuário foi desconectado com sucesso!', 'info')
    navigate("/");
  }

  if (location.pathname === "/login" || location.pathname === "/cadastrar") {
    return null;
  }

  if (usuario.token === "" || location.pathname === "/") {
    return (
      <div className="w-full flex justify-center py-4 bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
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

          <div className="flex items-center gap-6 text-[#012340]">
            <Link to="/">
              <div className="relative font-bold text-sm group transition-colors hover:text-[#45C4B0] cursor-pointer">
                HOME
              </div>
            </Link>

            <Link to="/sobre">
              <div className="relative font-bold text-sm group transition-colors hover:text-[#45C4B0] cursor-pointer">
                SOBRE NÓS
              </div>
            </Link>

            {/* 2. CORREÇÃO: Bloco fechado corretamente para funcionalidades restritas */}

                <Link to="/funcionalidades">
                  <div className="relative font-bold text-sm group transition-colors hover:text-[#45C4B0] cursor-pointer">
                    FUNCIONALIDADES
                  </div>
                </Link>
              

            {/* 3. CORREÇÃO: Se NÃO houver token (deslogado), mostra Login/Cadastro */}
            {usuario.token === "" ? (
              <>
                <Link to="/login">
                  <div className="font-bold text-sm hover:text-[#45C4B0] transition-colors px-4 cursor-pointer">
                    LOGIN
                  </div>
                </Link>

                <Link to="/cadastrar">
                  <div className="bg-[#45C4B0] text-[#012340] text-sm font-bold px-6 py-2 rounded-full hover:bg-[#9AEBA3] transition-all shadow-md active:scale-95">
                    CADASTRO
                  </div>
                </Link>
              </>
            ) : (
              /* Botão de Logout caso esteja logado */
              <button
                onClick={logout}
                className="font-bold text-sm text-red-500 hover:text-red-700 transition-colors px-4"
              >
                SAIR
              </button>
            )}
          </div>
        </div>

        <style>{`
                @keyframes shine {
                    100% { left: 125%; }
                }
            `}</style>
      </div>
    );
  }
}
export default Navbar;
