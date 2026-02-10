
import React, { useState } from 'react';
import { MOCK_INVESTMENTS } from '../constants';
import { Investment } from '../types';
import { 
  Shield, 
  BarChart3, 
  ChevronRight, 
  X, 
  TrendingUp, 
  Download, 
  Mountain,
  Info,
  ArrowUpRight,
  PieChart,
  ShieldCheck,
  Zap
} from 'lucide-react';

const Investments: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);
  const [investAmount, setInvestAmount] = useState<string>('');

  const filtered = MOCK_INVESTMENTS.filter(inv => filterCategory === 'All' || inv.category === filterCategory);
  
  const totalInvested = MOCK_INVESTMENTS.reduce((acc, inv) => acc + (inv.userBalance || 0), 0);

  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-6 duration-700">
      {/* Portfolio Summary Header */}
      <section className="bg-gradient-to-br from-[#0a0f1d] to-[#1a237e] rounded-[3rem] p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#2979FF]/10 rounded-full -mr-32 -mt-32 blur-[100px]"></div>
        <div className="relative z-10 space-y-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Patrimônio Investido</p>
              <h2 className="text-4xl font-black tracking-tighter">
                R$ {totalInvested.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </h2>
            </div>
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10">
              <PieChart size={24} className="text-[#2979FF]" />
            </div>
          </div>
          <div className="flex gap-4">
             <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">+1.2% este mês</span>
             </div>
             <button className="bg-[#2979FF] text-white px-5 py-2 rounded-2xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-[#2979FF]/20 active:scale-95 transition-transform">
                Resgate <ArrowUpRight size={12} />
             </button>
          </div>
        </div>
      </section>

      <header className="space-y-6">
        <div className="flex justify-between items-end px-2">
           <div>
              <p className="text-[9px] font-black text-[#2979FF] uppercase tracking-[0.5em] mb-1">Portfólio</p>
              <h3 className="text-2xl font-black text-[#0a0f1d] tracking-tighter uppercase">Oportunidades</h3>
           </div>
           <button className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 border border-slate-100 active:bg-slate-100 transition-colors">
             <Download size={18} />
           </button>
        </div>
        
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-6 px-6 py-2">
           {['All', 'Renda Fixa', 'Tesouro', 'Fundos', 'Ações'].map(cat => (
             <button
               key={cat}
               onClick={() => setFilterCategory(cat)}
               className={`px-6 py-3 rounded-full text-[9px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${
                 filterCategory === cat ? 'bg-[#0a0f1d] text-white border-[#0a0f1d] shadow-xl shadow-slate-200' : 'bg-white text-slate-400 border-slate-50'
               }`}
             >
               {cat === 'All' ? 'Ver Todos' : cat}
             </button>
           ))}
        </div>
      </header>

      {/* Investment Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((inv) => (
          <div 
            key={inv.id} 
            onClick={() => setSelectedInvestment(inv)}
            className="group bg-white border border-slate-100 rounded-[2.5rem] p-6 transition-all hover:border-[#2979FF]/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] active:scale-[0.98] cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            {/* Background Mountain Motif */}
            <div className="absolute -right-4 -bottom-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
               <Mountain size={120} />
            </div>

            <div className="space-y-5">
              <div className="flex justify-between items-start">
                 <div className="w-14 h-14 bg-slate-50 rounded-[1.5rem] flex items-center justify-center text-[#0a0f1d] group-hover:bg-[#0a0f1d] group-hover:text-white transition-all duration-500">
                    {inv.category === 'Fundos' ? <BarChart3 size={24} /> : inv.category === 'Tesouro' ? <ShieldCheck size={24} /> : <Zap size={24} />}
                 </div>
                 <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                      inv.risk === 'Alto' ? 'bg-red-50 text-red-500' : 
                      inv.risk === 'Médio' ? 'bg-amber-50 text-amber-500' : 
                      'bg-green-50 text-green-500'
                    }`}>
                      Risco {inv.risk}
                    </span>
                    {inv.tags?.map(tag => (
                      <span key={tag} className="text-[7px] font-black text-[#2979FF] uppercase tracking-[0.2em] border border-[#2979FF]/20 px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                 </div>
              </div>

              <div className="space-y-1">
                 <h4 className="font-black text-[#0a0f1d] text-lg tracking-tight leading-tight">{inv.name}</h4>
                 <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{inv.category}</p>
              </div>

              <div className="flex items-center justify-between pt-2">
                 <div>
                    <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">Rentabilidade</p>
                    <p className="text-xl font-black text-[#0a0f1d] tracking-tighter">{inv.yield}</p>
                 </div>
                 <div className="text-right">
                    <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">Liquidez</p>
                    <p className="text-xs font-black text-slate-600">{inv.liquidity}</p>
                 </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
               <div className="flex items-center gap-1 text-[8px] font-black text-slate-400 uppercase tracking-widest">
                  <Info size={10} /> Mín. R$ {inv.minInvestment.toFixed(2)}
               </div>
               <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-[#2979FF] group-hover:translate-x-1 transition-transform">
                  <ChevronRight size={16} />
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal - High Fidelity */}
      {selectedInvestment && (
        <div className="fixed inset-0 z-[110] flex items-end justify-center">
          <div className="absolute inset-0 bg-[#0a0f1d]/60 backdrop-blur-xl animate-in fade-in duration-500" onClick={() => setSelectedInvestment(null)}></div>
          <div className="bg-white w-full rounded-t-[4rem] shadow-2xl z-10 animate-in slide-in-from-bottom-full duration-700 max-h-[96vh] overflow-y-auto no-scrollbar pb-12">
             <div className="w-14 h-1.5 bg-slate-100 rounded-full mx-auto mt-4 mb-4"></div>
             
             <div className="p-10 space-y-10">
                <header className="space-y-8">
                   <div className="flex justify-between items-start">
                      <div className="space-y-1">
                         <div className="flex items-center gap-2">
                            <Mountain size={16} className="text-[#2979FF]" />
                            <span className="text-[8px] font-black text-[#2979FF] uppercase tracking-[0.4em]">Exclusivo Montbank</span>
                         </div>
                         <h3 className="text-3xl font-black text-[#0a0f1d] leading-none tracking-tighter uppercase">{selectedInvestment.name}</h3>
                      </div>
                      <button 
                        onClick={() => setSelectedInvestment(null)}
                        className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-300"
                      >
                         <X size={20} />
                      </button>
                   </div>

                   <div className="grid grid-cols-3 gap-3">
                      <div className="bg-slate-50 p-4 rounded-3xl text-center border border-slate-100/50">
                         <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest mb-1">Retorno</p>
                         <p className="text-sm font-black text-[#0a0f1d]">{selectedInvestment.yield}</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-3xl text-center border border-slate-100/50">
                         <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest mb-1">Mínimo</p>
                         <p className="text-sm font-black text-[#0a0f1d]">R$ {selectedInvestment.minInvestment}</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-3xl text-center border border-slate-100/50">
                         <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest mb-1">Prazo</p>
                         <p className="text-sm font-black text-[#0a0f1d]">{selectedInvestment.liquidity}</p>
                      </div>
                   </div>
                </header>

                <section className="space-y-4">
                   <div className="flex items-center gap-2">
                      <TrendingUp size={14} className="text-green-500" />
                      <h5 className="text-[10px] font-black text-[#0a0f1d] uppercase tracking-[0.3em]">Descrição do Ativo</h5>
                   </div>
                   <p className="text-[13px] text-slate-500 font-medium leading-relaxed italic border-l-2 border-slate-100 pl-4">
                     {selectedInvestment.description || 'Este ativo foi selecionado criteriosamente pelo nosso comitê de investimentos para compor as carteiras mais sofisticadas do mercado elite.'}
                   </p>
                </section>

                <section className="space-y-6">
                   <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100/50 text-center shadow-inner">
                      <p className="text-[9px] font-black text-[#2979FF] uppercase tracking-[0.4em] mb-6">Investimento Inicial</p>
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-2xl font-black text-slate-300">R$</span>
                        <input 
                          type="number" 
                          value={investAmount}
                          onChange={(e) => setInvestAmount(e.target.value)}
                          placeholder="0,00"
                          className="bg-transparent text-6xl font-black text-[#0a0f1d] w-full focus:outline-none text-center placeholder:text-slate-100 tracking-tighter"
                          required
                        />
                      </div>
                   </div>

                   <button 
                     onClick={() => {alert('Ordem de investimento enviada para o Concierge Elite.'); setSelectedInvestment(null);}}
                     className="w-full bg-[#0a0f1d] text-white py-7 rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.5em] shadow-2xl shadow-[#0a0f1d]/20 active:scale-95 transition-transform flex items-center justify-center gap-3"
                   >
                     Solicitar Alocação <ArrowUpRight size={18} />
                   </button>
                </section>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Investments;
