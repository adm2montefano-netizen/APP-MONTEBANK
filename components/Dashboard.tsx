
import React, { useState, useEffect } from 'react';
import { MOCK_TRANSACTIONS } from '../constants';
import { getFinancialInsights } from '../services/geminiService';
import { AppView } from '../types';
import { 
  ArrowUpRight, 
  Eye, 
  EyeOff, 
  Sparkles,
  ChevronRight,
  Plus,
  Zap,
  Smartphone,
  CreditCard as CardIcon,
  Search,
  Mountain,
  PiggyBank as PiggyIcon,
  ArrowDownLeft
} from 'lucide-react';

interface DashboardProps {
  onNavigate?: (view: AppView) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [showBalance, setShowBalance] = useState(true);
  const [insights, setInsights] = useState<string[]>([]);
  const [loadingInsights, setLoadingInsights] = useState(true);

  const balance = 125430.50;
  const accountInfo = { branch: '0001', number: '128845-7' };

  useEffect(() => {
    const fetchInsights = async () => {
      setLoadingInsights(true);
      const res = await getFinancialInsights(MOCK_TRANSACTIONS, balance);
      setInsights(res);
      setLoadingInsights(false);
    };
    fetchInsights();
  }, []);

  const handleActionClick = (label: string) => {
    if (!onNavigate) return;
    switch (label) {
      case 'Pagar Conta': onNavigate(AppView.BILL_PAYMENT); break;
      case 'Pix Instantâneo': onNavigate(AppView.PIX); break;
      case 'Cartões Black': onNavigate(AppView.CARDS); break;
      case 'Recarga': onNavigate(AppView.RECHARGE); break;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Search Bar Slim */}
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-slate-50 h-12 rounded-full flex items-center px-5 gap-3 text-slate-300 border border-slate-100/50">
          <Search size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">Procurar transação ou contato...</span>
        </div>
      </div>

      {/* Balance Hero Section */}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowBalance(!showBalance)}>
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Patrimônio Líquido</span>
              {showBalance ? <Eye size={12} className="text-slate-300" /> : <EyeOff size={12} className="text-slate-300" />}
            </div>
            <h3 className="text-4xl font-black tracking-tighter text-[#0a0f1d]">
              {showBalance ? `R$ ${balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '••••••••'}
            </h3>
          </div>
          <button className="w-12 h-12 bg-[#0a0f1d] text-white rounded-2xl flex items-center justify-center shadow-2xl active:scale-90 transition-transform">
            <Plus size={24} strokeWidth={3} />
          </button>
        </div>

        {/* Quick Actions Scroll */}
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar -mx-6 px-6">
           {[
             { label: 'Pix Instantâneo', icon: Zap, color: 'text-[#2979FF]' },
             { label: 'Pagar Conta', icon: ArrowUpRight, color: 'text-green-500' },
             { label: 'Recarga', icon: Smartphone, color: 'text-purple-500' },
             { label: 'Cartões Black', icon: CardIcon, color: 'text-amber-500' }
           ].map((action, i) => (
             <button 
               key={i} 
               onClick={() => handleActionClick(action.label)}
               className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white border border-slate-100/50 shadow-sm transition-all active:scale-95 hover:border-slate-200"
             >
               <action.icon size={14} className={action.color} />
               <span className="text-[9px] font-black uppercase tracking-widest whitespace-nowrap text-slate-500">{action.label}</span>
             </button>
           ))}
        </div>
      </section>

      {/* Meus Objetivos Summary Card */}
      <section 
        onClick={() => onNavigate && onNavigate(AppView.PIGGY_BANK)}
        className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-6 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all"
      >
         <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#2979FF] shadow-sm">
               <PiggyIcon size={20} />
            </div>
            <div>
               <h4 className="text-[10px] font-black text-[#0a0f1d] uppercase tracking-widest">Reserva de Valor</h4>
               <p className="text-[14px] font-black text-[#0a0f1d] tracking-tight">R$ 57.400,00 protegidos</p>
            </div>
         </div>
         <ChevronRight size={18} className="text-slate-300" />
      </section>

      {/* AI Insights Segment */}
      <section className="bg-slate-50/50 rounded-[2.5rem] p-6 border border-slate-100/30">
        <div className="flex items-center gap-3 mb-5 px-1">
           <div className="w-9 h-9 bg-[#2979FF] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#2979FF]/20">
             <Sparkles size={16} />
           </div>
           <div>
             <h4 className="text-[10px] font-black uppercase tracking-widest text-[#0a0f1d]">AI Concierge</h4>
             <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest">Insights exclusivos</p>
           </div>
        </div>
        <div className="space-y-3">
          {loadingInsights ? (
            <div className="h-16 bg-white rounded-3xl animate-pulse"></div>
          ) : (
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100/50 flex gap-4 items-center group transition-all hover:shadow-md">
               <p className="text-[12px] font-medium text-slate-600 leading-relaxed italic flex-1">"{insights[0]}"</p>
               <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#2979FF]/10 transition-colors">
                 <ChevronRight size={16} className="text-slate-300 group-hover:text-[#2979FF]" />
               </div>
            </div>
          )}
        </div>
      </section>

      {/* Recent Activity Section */}
      <section className="space-y-4 pb-4">
        <div className="flex justify-between items-center px-1">
          <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-300">Atividade Recente</h4>
          <button className="text-[9px] font-black text-[#2979FF] uppercase tracking-widest">Ver Extrato</button>
        </div>
        <div className="space-y-3">
          {MOCK_TRANSACTIONS.map((tx) => (
            <div key={tx.id} className="bg-white border border-slate-50 rounded-3xl p-5 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${tx.type === 'credit' ? 'bg-green-50 text-green-500' : 'bg-slate-50 text-[#0a0f1d]'}`}>
                  {tx.type === 'credit' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                </div>
                <div>
                  <p className="text-xs font-black text-[#0a0f1d]">{tx.description}</p>
                  <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">{tx.category} • {new Date(tx.date).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>
              <p className={`text-sm font-black ${tx.type === 'credit' ? 'text-green-500' : 'text-[#0a0f1d]'}`}>
                {tx.type === 'credit' ? '+' : '-'} R$ {tx.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
