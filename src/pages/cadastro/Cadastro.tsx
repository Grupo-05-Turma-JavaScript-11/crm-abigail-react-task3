import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { cadastrarUsuario } from "../../services/Service";
import type { Usuario } from "../../models/Usuario";

function Cadastro() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirmarSenha, setConfirmarSenha] = useState<string>("");

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    email: "",
    senha: "",
    tipo: "", // Começa vazio para forçar a seleção
  });

  useEffect(() => {
    if (usuario.id !== 0) {
      retornar();
    }
  }, [usuario]);

  function retornar() {
    navigate("/");
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
      setIsLoading(true);
      try {
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario);
        alert("Usuário cadastrado com sucesso!");
      } catch (error) {
        alert("Erro ao cadastrar o usuário! Verifique as informações fornecidas.");
      }
    } else {
      alert("As senhas não conferem ou são muito curtas.");
      setUsuario({ ...usuario, senha: "" });
      setConfirmarSenha("");
    }
    setIsLoading(false);
  }

  // Validação: Verifica se todos os campos obrigatórios estão preenchidos corretamente
  const isFormInvalid =
    !usuario.nome.trim() ||
    !usuario.email.trim() ||
    !usuario.tipo ||
    usuario.senha.length < 8 ||
    usuario.senha !== confirmarSenha;

  return (
    <>
      <div className="bg-[#012340] grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-sans overflow-hidden">
        <div className="relative lg:block hidden w-full h-full overflow-hidden">
          <div className="bg-[url('https://ik.imagekit.io/isa237/imgCadastroCRM?tr=f-png')] bg-no-repeat w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-105"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#012340]/80"></div>
        </div>

        <div className="flex justify-center items-center w-full p-4 animate-fade-in">
          <form
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 lg:p-12 rounded-[2rem] w-full max-w-md shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col gap-5 hover:border-[#45C4B0]/30 transition-all duration-500"
            onSubmit={cadastrarNovoUsuario}
          >
            <div className="text-center">
              <h2 className="text-[#45C4B0] text-5xl font-black tracking-tight mb-2 italic">CADASTRO</h2>
              <p className="text-[#9AEBA3] text-sm font-light tracking-widest uppercase">Crie sua conta</p>
            </div>

            <div className="space-y-4 mt-4">
              {/* Nome */}
              <div className="flex flex-col gap-1.5 group">
                <label htmlFor="nome" className="text-white/70 text-xs font-bold uppercase ml-1 group-focus-within:text-[#45C4B0] transition-colors">Nome</label>
                <input
                  type="text" id="nome" name="nome" placeholder="Seu nome"
                  className="bg-[#012340]/50 border border-white/10 rounded-xl p-3 text-white placeholder-white/20 focus:ring-2 focus:ring-[#45C4B0] focus:bg-[#012340] outline-none transition-all"
                  value={usuario.nome} onChange={atualizarEstado}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5 group">
                <label htmlFor="usuario" className="text-white/70 text-xs font-bold uppercase ml-1 group-focus-within:text-[#45C4B0] transition-colors">Email</label>
                <input
                  type="email" id="usuario" name="email" placeholder="exemplo@email.com"
                  className="bg-[#012340]/50 border border-white/10 rounded-xl p-3 text-white placeholder-white/20 focus:ring-2 focus:ring-[#45C4B0] focus:bg-[#012340] outline-none transition-all"
                  value={usuario.email} onChange={atualizarEstado}
                />
              </div>

              {/* Tipo de Usuário */}
              <div className="flex flex-col gap-1.5 group">
                <label htmlFor="tipo" className="text-white/70 text-xs font-bold uppercase ml-1 group-focus-within:text-[#45C4B0] transition-colors">Tipo de Usuário</label>
                <select
                  id="tipo" name="tipo"
                  className="bg-[#012340]/50 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-[#45C4B0] focus:bg-[#012340] outline-none transition-all"
                  value={usuario.tipo} onChange={atualizarEstado}
                >
                  <option value="" disabled>Selecione uma opção</option>
                  <option value="ADMIN" className="text-black">Administrador</option>
                  <option value="MEDICO" className="text-black">Médico</option>
                  <option value="ASSISTENTE" className="text-black">Assistente</option>
                </select>
              </div>

              {/* Senhas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 group">
                  <label htmlFor="senha" className="text-white/70 text-xs font-bold uppercase ml-1 group-focus-within:text-[#45C4B0] transition-colors">Senha</label>
                  <input
                    type="password" id="senha" name="senha" placeholder="********"
                    className="bg-[#012340]/50 border border-white/10 rounded-xl p-3 text-white placeholder-white/20 focus:ring-2 focus:ring-[#45C4B0] focus:bg-[#012340] outline-none transition-all"
                    value={usuario.senha} onChange={atualizarEstado}
                  />
                </div>
                <div className="flex flex-col gap-1.5 group">
                  <label htmlFor="confirmarSenha" className="text-white/70 text-xs font-bold uppercase ml-1 group-focus-within:text-[#45C4B0] transition-colors">Confirmar</label>
                  <input
                    type="password" id="confirmarSenha" name="confirmarSenha" placeholder="********"
                    className="bg-[#012340]/50 border border-white/10 rounded-xl p-3 text-white placeholder-white/20 focus:ring-2 focus:ring-[#45C4B0] focus:bg-[#012340] outline-none transition-all"
                    value={confirmarSenha} onChange={handleConfirmarSenha}
                  />
                </div>
              </div>
            </div>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row justify-around w-full gap-4 mt-6">
              <button
                type="button"
                className="flex-1 rounded-xl text-white border border-[#025959] hover:bg-red-500/10 hover:border-red-500 py-3 font-bold transition-all duration-300"
                onClick={retornar}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isFormInvalid || isLoading}
                className={`flex-1 rounded-xl text-[#012340] py-3 font-bold transition-all duration-300 flex justify-center items-center 
                ${isFormInvalid 
                  ? "bg-gray-500 cursor-not-allowed opacity-50" 
                  : "bg-[#45C4B0] hover:bg-[#9AEBA3] shadow-[0_0_15px_rgba(69,196,176,0.4)] hover:-translate-y-1"}`}
              >
                {isLoading ? <ClipLoader color="#012340" size={20} /> : <span>Cadastrar</span>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Cadastro;