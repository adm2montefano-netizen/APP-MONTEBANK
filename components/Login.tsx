import React, { useState } from 'react';
import { Mountain, ArrowRight, Fingerprint, Zap, Copy, Check, Shield } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [cpf, setCpf] = useState('');
  const [copied, setCopied] = useState(false);

  const copyPublicLink = () => {
    const publicUrl = `${window.location.origin}${window.location.pathname}?view=public&checkout=true`;
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-screen-dynamic w-full flex flex-col bg-white overflow-hidden selection:bg-[#2979FF]/10">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-1/2 bg-gradient-to-b from-slate-50 to-transparent -z-10 opacity-50"></div>
      
      <main className="flex-1 flex flex-col items-center justify-between px-6 py-12 sm:py-20 max-w-lg mx-auto w-full">
        {/* Logo Section */}
        <div className="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="w-16 h-16 bg-[#0a0f1d] rounded-[2rem] flex items-center justify-center text-[#2979FF] shadow-2xl shadow-[#0a0f1d]/20 animate-float">
            <Mountain size={32} />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-black tracking-tighter text-[#0a0f1d]">MONTBANK</h1>
            <p className="text-[8px] text-slate-300 font-black uppercase tracking-[0.4em]">Elite Experience</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <div className="space-y-2 text-center">
            <h2 className="text-4xl sm:text-5xl font-black text-[#0a0f1d] leading-none tracking-tighter">
              A elite do <br /> <span className="text-[#2979FF]">banking.</span>
            </h2>
          </div>

          <div className="space-y-4">
            <div className="relative group">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-300 ml-6 mb-2 block transition-colors group-focus-within:text-[#2979FF]">
                Identificação CPF
              </label>
              <input 
                type="tel" 
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                placeholder="000.000.000-00"
                className="w-full bg-slate-50 border-2 border-transparent focus:border-[#2979FF]/10 rounded-[2.5rem] py-5 px-8 text-xl font-black text-[#0a0f1d] outline-none transition-all placeholder:text-slate-200 shadow-inner"
              />
            </div>

            <button 
              onClick={onLogin}
              className="w-full bg-[#0a0f1d] text-white py-6 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.5em] hover:bg-[#1a237e] transition-all shadow-2xl shadow-[#0a0f1d]/20 flex items-center justify-center gap-3 group active:scale-95"
            >
              Acessar Conta <ArrowRight className="group-hover:translate-x-2 transition-transform" size={18} />
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={onLogin}
                className="bg-white text-[#2979FF] py-5 rounded-3xl font-black text-[8px] uppercase tracking-[0.3em] border-2 border-[#2979FF]/10 flex items-center justify-center gap-2 hover:bg-[#2979FF]/5 transition-all active:scale-95"
              >
                <Zap size={14} fill="currentColor" /> Demo
              </button>
              <button 
                onClick={copyPublicLink}
                className={`py-5 rounded-3xl font-black text-[8px] uppercase tracking-[0.3em] flex items-center justify-center gap-2 transition-all active:scale-95 ${
                  copied ? 'bg-green-500 text-white' : 'bg-slate-50 text-slate-400 border border-slate-100'
                }`}
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? 'Copiado' : 'Link Direto'}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="w-full space-y-6">
          <button className="w-full bg-slate-50/80 backdrop-blur-sm text-slate-400 py-5 rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-slate-100 transition-all active:scale-95 border border-slate-100">
            <Fingerprint size={24} className="text-[#2979FF]" /> Biometria Elite
          </button>
          
          <div className="flex items-center justify-center gap-2 opacity-30">
            <Shield size={12} className="text-slate-400" />
            <span className="text-slate-400 text-[8px] font-black uppercase tracking-[0.5em]">Montbank Secure Encryption</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;