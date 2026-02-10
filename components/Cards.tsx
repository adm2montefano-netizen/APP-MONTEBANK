
import React, { useState } from 'react';
import { MOCK_CARDS } from '../constants';
import { Mountain, Eye, RefreshCw, Plus } from 'lucide-react';

const Cards: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [limit, setLimit] = useState(MOCK_CARDS[0].limit);

  const toggleFlip = (id: string) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header className="flex justify-between items-end">
        <div>
          <p className="text-[9px] font-black text-[#2979FF] uppercase tracking-[0.4em] mb-1">Gestão Elite</p>
          <h2 className="text-3xl font-black text-[#0a0f1d] tracking-tighter">Cartões</h2>
        </div>
        <button className="w-12 h-12 bg-[#0a0f1d] text-white rounded-2xl flex items-center justify-center shadow-lg active:scale-90 transition-transform">
           <Plus size={24} strokeWidth={3} />
        </button>
      </header>

      <div className="space-y-12">
        {/* Card Stack */}
        {MOCK_CARDS.map((card, idx) => (
          <div key={idx} className="space-y-5">
            <div 
              className="relative w-full h-56 perspective-1000 cursor-pointer"
              onClick={() => toggleFlip(idx.toString())}
            >
              <div className={`relative w-full h-full transition-all duration-700 preserve-3d ${flippedCards[idx.toString()] ? 'rotate-y-180' : ''}`}>
                {/* Front - Fundo Degradê e Bordas Slim */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1d] to-[#1a237e] rounded-2xl p-8 backface-hidden shadow-2xl flex flex-col justify-between text-white overflow-hidden border border-white/5">
                   <div className="flex justify-between items-center relative z-10">
                      <div className="flex items-center gap-2">
                         <Mountain className="text-[#2979FF]" size={28} />
                         <span className="text-[10px] font-black tracking-widest uppercase">Montbank</span>
                      </div>
                      <span className="text-[8px] font-black uppercase tracking-[0.3em] opacity-50">{card.isVirtual ? 'Virtual' : 'Black Elite'}</span>
                   </div>
                   <div className="relative z-10">
                      <p className="text-2xl font-mono tracking-[0.2em] mb-4">{card.number}</p>
                      <div className="flex justify-between">
                         <div className="space-y-0.5">
                            <p className="text-[7px] font-black text-slate-500 uppercase">Titular</p>
                            <span className="text-[10px] font-black uppercase tracking-widest">{card.holder}</span>
                         </div>
                         <div className="text-right space-y-0.5">
                            <p className="text-[7px] font-black text-slate-500 uppercase">Expira em</p>
                            <span className="text-[10px] font-black tracking-widest">{card.expiry}</span>
                         </div>
                      </div>
                   </div>
                   <div className="absolute top-0 right-0 w-48 h-48 bg-[#2979FF]/10 rounded-full -mr-24 -mt-24 blur-[60px]"></div>
                </div>
                {/* Back */}
                <div className="absolute inset-0 bg-slate-50 rounded-2xl p-8 backface-hidden rotate-y-180 flex flex-col justify-center items-center shadow-xl border border-slate-100">
                   <div className="w-full h-10 bg-slate-900/5 rounded-lg mb-8"></div>
                   <div className="bg-white px-8 py-4 rounded-2xl border border-slate-200 shadow-sm">
                      <span className="font-mono text-xl font-black tracking-[0.3em] text-[#0a0f1d]">{card.cvv}</span>
                   </div>
                   <p className="mt-4 text-[8px] font-black uppercase text-slate-300 tracking-[0.5em]">Cód. Segurança</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-6">
               <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-[#0a0f1d] transition-colors"><RefreshCw size={12}/> Detalhes</button>
               <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-[#0a0f1d] transition-colors"><Eye size={12}/> Bloqueio</button>
            </div>
          </div>
        ))}

        {/* Limit Slider Elite */}
        <div className="bg-slate-50/50 rounded-[2.5rem] p-8 border border-slate-100/30 space-y-8 shadow-sm">
           <div className="flex justify-between items-end">
              <div>
                 <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.4em] mb-1">Ajuste de Limite</p>
                 <h4 className="text-sm font-black text-[#0a0f1d]">Limite Disponível</h4>
              </div>
              <span className="text-lg font-black text-[#2979FF]">R$ {limit.toLocaleString('pt-BR')}</span>
           </div>
           
           <div className="relative pt-2">
             <input 
                type="range" 
                min="0" max="50000" step="500" value={limit}
                onChange={(e) => setLimit(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#0a0f1d]"
             />
           </div>

           <div className="flex justify-between items-center bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
              <div className="flex flex-col gap-1">
                 <span className="text-[7px] font-black text-slate-300 uppercase tracking-widest">Utilizado</span>
                 <span className="text-xs font-black text-[#0a0f1d]">R$ 4.200,00</span>
              </div>
              <div className="w-px h-8 bg-slate-100"></div>
              <div className="flex flex-col text-right gap-1">
                 <span className="text-[7px] font-black text-slate-300 uppercase tracking-widest">Livre</span>
                 <span className="text-xs font-black text-green-500">R$ {(limit - 4200).toLocaleString('pt-BR')}</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
