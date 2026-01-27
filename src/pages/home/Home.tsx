function Home() {
    return (
        <>
            <div className="bg-[#012340] bg-gradient-to-br from-[#012340] to-[#025959] flex justify-center min-h-[85vh] items-center overflow-hidden">
                <div className='container grid grid-cols-1 md:grid-cols-2 text-white p-8'>
                    
                    <div className="flex flex-col gap-6 items-start justify-center py-8 animate-[fadeIn_1s_ease-out]">
                        <span className="px-3 py-1 rounded bg-[#9AEBA3] text-[#012340] text-xs font-bold uppercase tracking-widest animate-pulse">
                            Software Médico
                        </span>
                        
                        <h2 className='text-5xl md:text-6xl font-black leading-tight'>
                            Eleve a gestão da sua clínica com a <span className="text-[#45C4B0] drop-shadow-[0_0_10px_rgba(69,196,176,0.3)]">Abgail</span>
                        </h2>
                        
                        <p className='text-xl text-gray-300 max-w-md'>
                            O CRM completo para médicos que buscam organizar o consultório e focar no que realmente importa: o paciente.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-2">
                            <button className='rounded-lg bg-[#45C4B0] text-[#012340] font-bold py-3 px-8 transition-all hover:scale-105 hover:bg-[#9AEBA3] active:scale-95 shadow-[0_0_20px_rgba(69,196,176,0.2)] hover:shadow-[0_0_25px_rgba(69,196,176,0.4)]'>
                                Solicite um orçamento
                            </button>
                            
                            <button className='rounded-lg border-2 border-white/30 text-white font-bold py-3 px-8 hover:bg-white/10 hover:border-white transition-all active:scale-95'>
                                Conheça os planos
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center items-center relative mt-12 md:mt-0">
                        <div className="absolute w-72 h-72 bg-[#45C4B0] rounded-full blur-[100px] opacity-20 animate-pulse"></div>
                        
                        <div className="relative animate-[float_4s_ease-in-out_infinite]">
                            <img
                                src="https://ik.imagekit.io/isa237/AbgailCRM?tr=f-png"
                                alt="Interface do Software Abgail"
                                className='w-full max-w-lg z-10 drop-shadow-[0_35px_35px_rgba(0,0,0,0.4)] transform md:rotate-2 hover:rotate-0 transition-all duration-700 rounded-xl'
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white py-12 border-b border-gray-100 flex justify-center">
                <div className="container grid grid-cols-2 md:grid-cols-4 gap-8 px-8">
                    {[
                        { text: "Suporte Humano", icon: "✔" },
                        { text: "100% na Nuvem", icon: "✔" },
                        { text: "Migração Grátis", icon: "✔" },
                        { text: "Segurança de Dados", icon: "✔" }
                    ].map((item, index) => (
                        <div key={index} className="flex items-center gap-2 text-[#012340] font-bold text-sm group cursor-default">
                            <span className="text-[#45C4B0] transition-transform group-hover:scale-150 duration-300 group-hover:rotate-[360deg]">
                                {item.icon}
                            </span> 
                            <span className="group-hover:text-[#45C4B0] transition-colors duration-300">
                                {item.text}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateX(-20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
            `}</style>
        </>
    )
}

export default Home;