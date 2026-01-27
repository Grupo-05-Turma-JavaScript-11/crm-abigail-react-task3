function Home() {
    return (
        <>
            {/* Background principal*/}
            <div className="bg-[#012340] flex justify-center min-h-[80vh] items-center">
                <div className='container grid grid-cols-1 md:grid-cols-2 text-white p-8'>
                    
                    {/* Lado Esquerdo: Textos e CTA */}
                    <div className="flex flex-col gap-6 items-start justify-center py-8">
                        <span className="px-3 py-1 rounded bg-[#9AEBA3] text-[#012340] text-xs font-bold uppercase tracking-widest">
                            Software Médico
                        </span>
                        
                        <h2 className='text-5xl md:text-6xl font-black leading-tight'>
                            Eleve a gestão da sua clínica com a <span className="text-[#45C4B0]">Abgail</span>
                        </h2>
                        
                        <p className='text-xl text-gray-300 max-w-md'>
                            O CRM completo para médicos que buscam organizar o consultório e focar no que realmente importa: o paciente.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            {/* Botão Principal com Turquesa */}
                            <button className='rounded-lg bg-[#45C4B0] text-[#012340] font-bold py-3 px-8 hover:bg-[#9AEBA3] transition-all shadow-lg'>
                                Solicite um orçamento
                            </button>
                            
                            {/* Botão Secundário Vazado */}
                            <button className='rounded-lg border-2 border-white/30 text-white font-bold py-3 px-8 hover:bg-white hover:text-[#012340] transition-all'>
                                Conheça os planos
                            </button>
                        </div>
                    </div>

                    {/* Lado Direito: Imagem com efeito de profundidade */}
                    <div className="flex justify-center items-center relative">
                        {/* Círculo decorativo de fundo*/}
                        <div className="absolute w-72 h-72 bg-[#025959] rounded-full blur-[100px] opacity-50"></div>
                        
                        <img
                            src="https://ik.imagekit.io/isa237/AbgailCRM?tr=f-png"
                            alt="Interface do Software Abgail"
                            className='w-full max-w-lg z-10 drop-shadow-2xl transform md:rotate-2 hover:rotate-0 transition-transform duration-500'
                        />
                    </div>
                </div>
            </div>

            {/* BARRA DE BENEFÍCIOS*/}
            <div className="bg-white py-10 border-b border-gray-100 flex justify-center">
                <div className="container grid grid-cols-2 md:grid-cols-4 gap-4 px-8">
                    <div className="flex items-center gap-2 text-[#012340] font-bold text-sm">
                        <span className="text-[#45C4B0]">✔</span> Suporte Humano
                    </div>
                    <div className="flex items-center gap-2 text-[#012340] font-bold text-sm">
                        <span className="text-[#45C4B0]">✔</span> 100% na Nuvem
                    </div>
                    <div className="flex items-center gap-2 text-[#012340] font-bold text-sm">
                        <span className="text-[#45C4B0]">✔</span> Migração Grátis
                    </div>
                    <div className="flex items-center gap-2 text-[#012340] font-bold text-sm">
                        <span className="text-[#45C4B0]">✔</span> Segurança de Dados
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;