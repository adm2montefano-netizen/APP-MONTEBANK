
import React from 'react';
import { AppView } from '../types';
import { 
  LayoutDashboard, 
  TrendingUp, 
  CreditCard, 
  Zap, 
  PiggyBank, 
  LogOut,
  Mountain,
  Link as LinkIcon
} from 'lucide-react';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, onLogout }) => {
  const menuItems = [
    { id: AppView.DASHBOARD, label: 'Resumo', icon: LayoutDashboard },
    { id: AppView.INVESTMENTS, label: 'Investimentos', icon: TrendingUp },
    { id: AppView.CARDS, label: 'Cartões', icon: CreditCard },
    { id: AppView.PAYMENTS, label: 'Links de Pagamento', icon: LinkIcon },
    { id: AppView.PIX, label: 'Pix & Transferir', icon: Zap },
    { id: AppView.PIGGY_BANK, label: 'Porquinho', icon: PiggyBank },
  ];

  return (
    <aside className="w-80 bg-white border-r border-slate-100 flex flex-col h-screen fixed left-0 top-0 z-50">
      <div className="p-10 mb-8">
        <h1 className="text-2xl font-black tracking-tighter text-[#0a0f1d] flex items-center gap-2">
          <Mountain className="text-[#2979FF]" size={28} />
          MONTBANK
        </h1>
        <p className="text-[10px] text-slate-300 mt-1 font-bold tracking-[0.2em] uppercase">Elite Banking Experience</p>
      </div>

      <nav className="flex-1 px-8 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-[1.8rem] transition-all duration-300 group ${
              currentView === item.id 
                ? 'bg-[#0a0f1d] text-white shadow-xl shadow-slate-200' 
                : 'text-slate-400 hover:text-[#0a0f1d] hover:bg-slate-50'
            }`}
          >
            <item.icon size={20} className={`${currentView === item.id ? 'text-white' : 'group-hover:scale-110 transition-transform text-slate-400'}`} />
            <span className="font-semibold text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-8 border-t border-slate-50">
        <div className="flex items-center gap-4 mb-6 px-2 bg-slate-50 p-4 rounded-3xl">
          <div className="w-10 h-10 rounded-full bg-[#0a0f1d] text-white flex items-center justify-center font-bold text-xs">
            MM
          </div>
          <div>
            <p className="text-sm font-bold text-[#0a0f1d]">Marcos M.</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Conta Black</p>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2 text-slate-300 hover:text-red-500 transition-colors text-xs font-bold uppercase tracking-widest"
        >
          <LogOut size={16} />
          Encerrar Sessão
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
