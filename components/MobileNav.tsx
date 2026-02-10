
import React from 'react';
import { AppView } from '../types';
import { Home, TrendingUp, CreditCard, Zap, LayoutGrid } from 'lucide-react';

interface MobileNavProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ currentView, setView }) => {
  const tabs = [
    { id: AppView.DASHBOARD, icon: Home, label: 'Início' },
    { id: AppView.INVESTMENTS, icon: TrendingUp, label: 'Investir' },
    { id: AppView.PIX, icon: Zap, isSpecial: true },
    { id: AppView.CARDS, icon: CreditCard, label: 'Cartões' },
    { id: AppView.PAYMENTS, icon: LayoutGrid, label: 'Cobradores' },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] z-[100]">
      <nav className="bottom-nav-blur border border-slate-100/50 rounded-[2.5rem] px-4 py-3 flex justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setView(tab.id)}
            className={`relative flex flex-col items-center justify-center p-3 transition-all duration-500 rounded-full ${
              tab.isSpecial 
                ? 'bg-[#0a0f1d] text-white scale-110 shadow-lg shadow-[#0a0f1d]/20 -translate-y-2' 
                : currentView === tab.id ? 'text-[#0a0f1d]' : 'text-slate-300'
            }`}
          >
            <tab.icon size={tab.isSpecial ? 22 : 20} strokeWidth={2.5} />
            {currentView === tab.id && !tab.isSpecial && (
              <span className="absolute -bottom-1 w-1 h-1 bg-[#0a0f1d] rounded-full"></span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default MobileNav;
