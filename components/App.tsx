
import React, { useState } from 'react';
import MobileNav from './components/MobileNav';
import Dashboard from './components/Dashboard';
import Investments from './components/Investments';
import Cards from './components/Cards';
import Payments from './components/Payments';
import Login from './components/Login';
import { AppView } from './types';
import { User, Bell } from 'lucide-react';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  if (!isAuthenticated) return <Login onLogin={handleLogin} />;

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD: return <Dashboard />;
      case AppView.INVESTMENTS: return <Investments />;
      case AppView.CARDS: return <Cards />;
      case AppView.PAYMENTS: return <Payments />;
      case AppView.PIX: return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 px-6 text-center animate-in zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-[#0a0f1d] text-white rounded-[2rem] flex items-center justify-center text-3xl shadow-2xl">⚡</div>
          <div>
            <h2 className="text-2xl font-black text-[#0a0f1d] tracking-tight">Mundo Pix</h2>
            <p className="text-slate-400 text-sm mt-1 max-w-[200px] mx-auto">Transferências imediatas e seguras.</p>
          </div>
          <button className="bg-slate-50 text-[#0a0f1d] px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest border border-slate-100">Gerenciar Chaves</button>
        </div>
      );
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#0a0f1d] flex flex-col selection:bg-[#2979FF]/20">
      {/* Ultra-Slim Mobile Header */}
      <header className="px-6 py-6 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-[90]">
        <div className="flex items-center gap-3 group" onClick={handleLogout}>
          <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden transition-transform active:scale-90">
             <User size={18} className="text-[#0a0f1d]" />
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest leading-none">Conta Black</span>
            <span className="text-xs font-black text-[#0a0f1d]">Marcos M.</span>
          </div>
        </div>
        
        <button className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center relative transition-transform active:scale-90">
          <Bell size={18} className="text-slate-400" />
          <span className="absolute top-3 right-3 w-1.5 h-1.5 bg-[#2979FF] rounded-full border-2 border-white"></span>
        </button>
      </header>
      
      <main className="flex-1 px-6 pb-40">
        {renderView()}
      </main>
      
      <MobileNav currentView={currentView} setView={setCurrentView} />

      <footer className="px-6 py-10 text-center opacity-10">
        <p className="text-[6px] font-black uppercase tracking-[1em]">Montbank</p>
      </footer>
    </div>
  );
};

export default App;
