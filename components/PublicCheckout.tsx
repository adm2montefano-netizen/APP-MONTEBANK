
import React, { useState } from 'react';
import { Mountain, ShieldCheck, Zap, CreditCard, ArrowRight, CheckCircle2 } from 'lucide-react';

interface PublicCheckoutProps {
  onBack: () => void;
}

const PublicCheckout: React.FC<PublicCheckoutProps> = ({ onBack }) => {
  const [step, setStep] = useState<'pay' | 'processing' | 'success'>('pay');
  
  const handlePayment = () => {
    setStep('processing');
    setTimeout(() => setStep('success'), 2000);
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center animate-in zoom-in-95 duration-700">
        <div className="w-20 h-20 bg-green-500 text-white rounded-[2rem] flex items-center justify-center mb-6 shadow-2xl shadow-green-500/20">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-3xl font-black text-[#0a0f1d] tracking-tighter uppercase mb-2">Pagamento Confirmado</h2>
        <p className="text-slate-400 text-sm font-medium mb-10">O valor foi enviado com sucesso para Marcos Montgomery.</p>
        <button 
          onClick={onBack}
          className="bg-[#0a0f1d] text-white px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.3em]"
        >
          Voltar ao App
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-6 animate-in fade-in duration-500">
      <div className="w-full max-w-md space-y-6">
        <header className="flex flex-col items-center py-10 space-y-2">
          <div className="w-12 h-12 bg-[#0a0f1d] rounded-2xl flex items-center justify-center text-[#2979FF] shadow-xl">
            <Mountain size={24} />
          </div>
          <h1 className="text-sm font-black tracking-[0.3em] text-[#0a0f1d] uppercase">Montbank Checkout</h1>
        </header>

        <main className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
          <div className="p-10 bg-[#0a0f1d] text-white text-center space-y-2">
            <p className="text-[8px] font-black uppercase tracking-[0.5em] opacity-40">Você está pagando</p>
            <h2 className="text-4xl font-black tracking-tighter">R$ 150,00</h2>
            <p className="text-xs font-bold text-[#2979FF]">Consultoria Financeira</p>
          </div>

          <div className="p-8 space-y-8">
            <div className="space-y-4">
              <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest text-center">Escolha o Método</p>
              
              <button className="w-full p-6 bg-slate-50 rounded-3xl border-2 border-[#2979FF] flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#2979FF] shadow-sm">
                    <Zap size={20} fill="currentColor" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-black text-[#0a0f1d]">Pix Instantâneo</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Confirmação em segundos</p>
                  </div>
                </div>
                <div className="w-5 h-5 rounded-full border-4 border-[#2979FF]"></div>
              </button>

              <button className="w-full p-6 bg-white rounded-3xl border border-slate-100 flex items-center justify-between opacity-50 grayscale">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300">
                    <CreditCard size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-black text-slate-400">Cartão de Crédito</p>
                    <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">Indisponível no momento</p>
                  </div>
                </div>
              </button>
            </div>

            <div className="pt-4">
              <button 
                onClick={handlePayment}
                disabled={step === 'processing'}
                className="w-full bg-[#0a0f1d] text-white py-6 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.5em] shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all"
              >
                {step === 'processing' ? 'Processando...' : 'Pagar Agora'} <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </main>

        <footer className="flex flex-col items-center gap-4 py-8">
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldCheck size={14} />
            <span className="text-[8px] font-black uppercase tracking-widest">Pagamento Seguro via Montbank S.A.</span>
          </div>
          <button onClick={onBack} className="text-[8px] font-black text-slate-200 uppercase tracking-[0.3em] hover:text-[#0a0f1d]">Sair do Checkout</button>
        </footer>
      </div>
    </div>
  );
};

export default PublicCheckout;
