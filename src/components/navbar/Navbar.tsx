import React from 'react';

function Navbar() {
    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto flex justify-between items-center py-4 px-8">
                
                {/* LOGO */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#012340] rounded flex items-center justify-center">
                        <span className="text-white font-bold text-lg italic">A</span>
                    </div>
                    <span className="text-2xl font-black text-[#012340] tracking-tighter">
                        Abgail
                    </span>
                </div>

                {/* LINKS CENTRAIS */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="#" className="text-sm font-bold text-[#012340] hover:text-[#45C4B0] transition-colors">
                        HOME
                    </a>
                    <a href="#" className="text-sm font-bold text-[#012340] hover:text-[#45C4B0] transition-colors">
                        SOBRE NÓS
                    </a>
                    <a href="#" className="text-sm font-bold text-[#012340] hover:text-[#45C4B0] transition-colors">
                        FUNCIONALIDADES
                    </a>
                </div>

                {/* BOTÕES DE ACÇÃO */}
                <div className="flex items-center gap-4">
                    <a href="#" className="text-sm font-bold text-[#012340] hover:text-[#45C4B0] transition-colors px-4 py-2">
                        LOGIN
                    </a>
                    <a href="#" className="bg-[#45C4B0] text-[#012340] text-sm font-bold px-6 py-2 rounded-full hover:bg-[#9AEBA3] transition-all shadow-md active:scale-95">
                        CADASTRO
                    </a>
                </div>

                {/* MENU MOBILE (Ícone opcional para telemóveis) */}
                <div className="md:hidden text-[#012340]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;