
import React, { useState } from 'react';
import { Mountain, ArrowRight, Fingerprint, Zap, Copy, Check } from 'lucide-react';

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
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white p-6 selection:bg-[#2979FF]/10">
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="flex items-center justify-center gap-3 mb-20">
          <div className="w-14 h-14 bg-[#0a0f1d] rounded-2xl flex items-center justify-center text-[#2979FF] shadow-2xl">
            <Mountain size={32} />
          </div>
          <h1 className="text-3xl font-black tracking-tighter text-[#0a0f1d]">MONTBANK</h1>
        </div>

        <div className="space-y-10">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-5xl font-black text-[#0a0f1d] leading-none tracking-tighter">
              A elite do <br /> <span className="text-[#2979FF]">banking.</span>
            </h2>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] ml-1">Exclusividade em cada detalhe</p>
          </div>

          <div className="space-y-5">
            <div className="relative group">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-300 ml-6 mb-2 block transition-colors group-focus-within:text-[#2979FF]">
                Identificação CPF
              </label>
              <input 
                type="text" 
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                placeholder="000.000.000-00"
                className="w-full bg-slate-50 border-2 border-transparent focus:border-[#2979FF]/10 rounded-[2.5rem] py-6 px-10 text-xl font-black text-[#0a0f1d] outline-none transition-all placeholder:text-slate-200 shadow-inner"
              />
            </div>

            <button 
              onClick={onLogin}
              className="w-full bg-[#0a0f1d] text-white py-7 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.5em] hover:bg-[#1a237e] transition-all shadow-2xl shadow-[#0a0f1d]/20 flex items-center justify-center gap-3 group active:scale-95"
            >
              Acessar Conta <ArrowRight className="group-hover:translate-x-2 transition-transform" size={18} />
            </button>

            <div className="grid grid-cols-1 gap-3">
              <button 
                onClick={onLogin}
                className="w-full bg-white text-[#2979FF] py-6 rounded-[2.5rem] font-black text-[9px] uppercase tracking-[0.4em] border-2 border-[#2979FF]/10 flex items-center justify-center gap-2 hover:bg-[#2979FF]/5 transition-all"
              >
                <Zap size={14} fill="currentColor" /> Acesso Demonstrativo
              </button>
              
              <button 
                onClick={copyPublicLink}
                className={`w-full py-4 rounded-[2rem] font-black text-[8px] uppercase tracking-[0.4em] flex items-center justify-center gap-2 transition-all ${
                  copied ? 'bg-green-500 text-white border-green-500' : 'bg-slate-50 text-slate-400 border border-slate-100 hover:bg-slate-100'
                }`}
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? 'Link Copiado!' : 'Copiar Link Público Direto'}
              </button>
            </div>

            <div className="flex items-center justify-center gap-6 py-6 opacity-30">
              <div className="h-px flex-1 bg-slate-400"></div>
              <span className="text-slate-400 text-[8px] font-black uppercase tracking-[0.5em]">Montbank Secure</span>
              <div className="h-px flex-1 bg-slate-400"></div>
            </div>

            <button className="w-full bg-slate-50 text-slate-400 py-6 rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-slate-100 transition-all active:scale-95 border border-slate-100">
              <Fingerprint size={24} className="text-[#2979FF]" /> Biometria Elite
            </button>
          </div>
        </div>

        <p className="text-center mt-20 text-slate-300 text-[10px] font-black uppercase tracking-[0.2em]">
          Problemas com o AI Studio? <span className="text-[#2979FF] cursor-pointer hover:underline" onClick={copyPublicLink}>Use o link direto</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
