
import React, { useState } from 'react';
import { MOCK_GOALS } from '../constants';
import { 
  PiggyBank as PiggyIcon, 
  Plus, 
  TrendingUp, 
  ChevronRight, 
  Target, 
  Calendar,
  Mountain,
  ArrowRight,
  ArrowUpRight,
  X,
  ShieldCheck
} from 'lucide-react';

const PiggyBank: React.FC = () => {
  const [goals, setGoals] = useState(MOCK_GOALS);
  const [isManaging, setIsManaging] = useState<'save' | 'withdraw' | null>(null);
  const [manageAmount, setManageAmount] = useState('');

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const totalSaved = goals.reduce((acc, goal) => acc + goal.current, 0);

  const handleAction = () => {
    if (!manageAmount) return;
    const amount = parseFloat(manageAmount);
    
    // Simular atualização no primeiro objetivo
    const updatedGoals = [...goals];
    if (isManaging === 'save') {
      updatedGoals[0].current += amount;
    } else {
      updatedGoals[0].current = Math.max(0, updatedGoals[0].current - amount);
    }
    
    setGoals(updatedGoals);
    setIsManaging(null);
    setManageAmount('');
    alert(isManaging === 'save' ? 'Valor guardado com sucesso!' : 'Resgate concluído.');
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <header className="flex justify-between items-end px-1">
        <div>
          <p className="text-[9px] font-black text-[#2979FF] uppercase tracking-[0.5em] mb-1">Reserva de Valor</p>
          <h2 className="text-3xl font-black text-[#0a0f1d] tracking-tighter uppercase">Porquinho</h2>
        </div>
        <div className="w-12 h-12 bg-[#0a0f1d] text-white rounded-2xl flex items-center justify-center shadow-lg">
           <PiggyIcon size={24} />
        </div>
      </header>

      <section className="bg-gradient-to-br from-[#0a0f1d] to-[#1a237e] rounded-[3rem] p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#2979FF]/20 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        <div className="relative z-10 space-y-6">
          <div className="space-y-1">
             <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.4em]">Total Acumulado</p>
             <h3 className="text-4xl font-black tracking-tighter">
               R$ {totalSaved.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
             </h3>
          </div>
          <div className="flex gap-3">
             <button 
               onClick={() => setIsManaging('save')}
               className="flex-1 bg-white text-[#0a0f1d] py-4 rounded-2xl font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-transform"
             >
                <Plus size={14} strokeWidth={3} /> Guardar
             </button>
             <button 
               onClick={() => setIsManaging('withdraw')}
               className="flex-1 bg-white/10 backdrop-blur-md border border-white/10 text-white py-4 rounded-2xl font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-transform"
             >
                Resgatar
             </button>
          </div>
        </div>
      </section>

      {/* Goals List */}
      <section className="space-y-4">
        <div className="flex justify-between items-center px-1">
           <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-300">Objetivos Ativos</h4>
           <button className="text-[9px] font-black uppercase tracking-widest text-[#2979FF]">Novo Alvo</button>
        </div>

        <div className="space-y-4">
           {goals.map((goal) => {
             const progress = calculateProgress(goal.current, goal.target);
             return (
               <div key={goal.id} className="bg-white border border-slate-50 rounded-[2.5rem] p-6 shadow-sm group hover:shadow-md transition-all active:scale-[0.98] cursor-pointer">
                  <div className="flex justify-between items-start mb-6">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-[#2979FF]">
                           <Target size={20} />
                        </div>
                        <div>
                           <h5 className="text-sm font-black text-[#0a0f1d]">{goal.title}</h5>
                           <div className="flex items-center gap-2">
                              <Calendar size={10} className="text-slate-300" />
                              <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Limite {new Date(goal.deadline).toLocaleDateString('pt-BR')}</span>
                           </div>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-xs font-black text-[#0a0f1d]">{progress.toFixed(0)}%</p>
                     </div>
                  </div>

                  <div className="space-y-3">
                     <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#2979FF] transition-all duration-700 ease-out rounded-full"
                          style={{ width: `${progress}%` }}
                        ></div>
                     </div>
                     <div className="flex justify-between items-end">
                        <div className="space-y-0.5">
                           <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest">Saldo Atual</p>
                           <p className="text-xs font-black text-[#0a0f1d]">R$ {goal.current.toLocaleString('pt-BR')}</p>
                        </div>
                        <div className="text-right space-y-0.5">
                           <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest">Objetivo Final</p>
                           <p className="text-xs font-black text-slate-400">R$ {goal.target.toLocaleString('pt-BR')}</p>
                        </div>
                     </div>
                  </div>
               </div>
             );
           })}
        </div>
      </section>

      {/* Action Drawer */}
      {isManaging && (
        <div className="fixed inset-0 z-[140] flex items-end justify-center">
          <div className="absolute inset-0 bg-[#0a0f1d]/60 backdrop-blur-sm animate-in fade-in" onClick={() => setIsManaging(null)}></div>
          <div className="bg-white w-full rounded-t-[3.5rem] shadow-2xl z-10 animate-in slide-in-from-bottom-full p-8 pb-12 space-y-8">
             <div className="w-12 h-1 bg-slate-100 rounded-full mx-auto -mt-2 mb-4"></div>
             
             <div className="text-center space-y-1">
                <p className="text-[7px] font-black text-[#2979FF] uppercase tracking-[0.5em]">{isManaging === 'save' ? 'Movimentar para Reserva' : 'Resgatar para Conta'}</p>
                <h3 className="text-xl font-black text-[#0a0f1d] tracking-tighter uppercase">{isManaging === 'save' ? 'Guardar Dinheiro' : 'Resgate Emergencial'}</h3>
             </div>

             <div className="space-y-2">
                <label className="text-[8px] font-black text-slate-300 uppercase tracking-widest ml-4">Valor da Operação</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-slate-300 text-xl">R$</span>
                  <input 
                    type="number" 
                    placeholder="0,00"
                    value={manageAmount}
                    onChange={(e) => setManageAmount(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-[2rem] p-8 pl-16 text-4xl font-black text-[#0a0f1d] outline-none"
                    autoFocus
                  />
                </div>
             </div>

             <button 
               onClick={handleAction}
               className="w-full bg-[#0a0f1d] text-white py-6 rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.4em] shadow-2xl flex items-center justify-center gap-3 active:scale-95 transition-transform"
             >
               {isManaging === 'save' ? 'Confirmar Depósito' : 'Confirmar Resgate'} <ShieldCheck size={18} />
             </button>
             
             <button onClick={() => setIsManaging(null)} className="w-full text-[9px] font-black text-slate-300 uppercase tracking-widest text-center">Cancelar Operação</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PiggyBank;
