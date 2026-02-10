
import React, { useState, useEffect, useMemo } from 'react';
import MobileNav from './components/MobileNav';
import Dashboard from './components/Dashboard';
import Investments from './components/Investments';
import Cards from './components/Cards';
import Payments from './components/Payments';
import Profile from './components/Profile';
import Pix from './components/Pix';
import BillPayment from './components/BillPayment';
import Recharge from './components/Recharge';
import PiggyBank from './components/PiggyBank';
import Login from './components/Login';
import PublicCheckout from './components/PublicCheckout';
import { AppView } from './types';
import { User, Bell, ChevronLeft, Mountain } from 'lucide-react';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  
  // Memoized detection of public mode to prevent re-renders and hangs
  const isPublicMode = useMemo(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('view') === 'public' || params.get('checkout') === 'true';
    } catch (e) {
      return false;
    }
  }, []);

  useEffect(() => {
    if (isPublicMode) {
      setCurrentView(AppView.PUBLIC_CHECKOUT);
    }
  }, [isPublicMode]);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView(AppView.DASHBOARD);
  };

  // Render Logic for Public Mode (Bypasses everything)
  if (isPublicMode && currentView === AppView.PUBLIC_CHECKOUT) {
    return (
      <PublicCheckout 
        onBack={() => {
          window.location.href = window.location.pathname; // Hard reset for stability
        }} 
      />
    );
  }

  if (!isAuthenticated) return <Login onLogin={handleLogin} />;
  
  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD: return <Dashboard onNavigate={setCurrentView} />;
      case AppView.INVESTMENTS: return <Investments />;
      case AppView.CARDS: return <Cards />;
      case AppView.PAYMENTS: return <Payments onPreviewPublic={() => setCurrentView(AppView.PUBLIC_CHECKOUT)} />;
      case AppView.PROFILE: return <Profile onLogout={handleLogout} />;
      case AppView.PIX: return <Pix />;
      case AppView.BILL_PAYMENT: return <BillPayment />;
      case AppView.RECHARGE: return <Recharge />;
      case AppView.PIGGY_BANK: return <PiggyBank />;
      default: return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  const isSubView = [
    AppView.PROFILE, 
    AppView.BILL_PAYMENT, 
    AppView.RECHARGE, 
    AppView.PIGGY_BANK,
    AppView.PIX
  ].includes(currentView);

  return (
    <div className="min-h-screen bg-white text-[#0a0f1d] flex flex-col selection:bg-[#2979FF]/20 overflow-x-hidden">
      <header className="px-6 py-6 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-[90]">
        {isSubView ? (
          <button 
            onClick={() => setCurrentView(AppView.DASHBOARD)}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center transition-transform active:scale-90">
               <ChevronLeft size={18} className="text-[#0a0f1d]" />
            </div>
            <span className="text-xs font-black text-[#0a0f1d] uppercase tracking-widest">Voltar</span>
          </button>
        ) : (
          <div className="flex items-center gap-3 group" onClick={() => setCurrentView(AppView.PROFILE)}>
            <div className="w-10 h-10 rounded-full bg-[#0a0f1d] border border-slate-100 flex items-center justify-center overflow-hidden transition-transform active:scale-90 cursor-pointer shadow-lg shadow-[#0a0f1d]/10">
               <User size={18} className="text-white" />
            </div>
            <div className="flex flex-col cursor-pointer">
              <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest leading-none">Conta Black</span>
              <span className="text-xs font-black text-[#0a0f1d]">Marcos M.</span>
            </div>
          </div>
        )}
        
        <div className="flex items-center gap-2">
          {!isSubView && (
            <button className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center relative transition-transform active:scale-90">
              <Bell size={18} className="text-slate-400" />
              <span className="absolute top-3 right-3 w-1.5 h-1.5 bg-[#2979FF] rounded-full border-2 border-white"></span>
            </button>
          )}
          <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-[#2979FF]">
            <Mountain size={18} />
          </div>
        </div>
      </header>
      
      <main className="flex-1 px-6 pb-40">
        {renderView()}
      </main>
      
      {!isSubView && <MobileNav currentView={currentView} setView={setCurrentView} />}

      <footer className="px-6 py-10 text-center opacity-10">
        <p className="text-[6px] font-black uppercase tracking-[1em]">Montbank Elite Banking</p>
      </footer>
    </div>
  );
};

export default App;
