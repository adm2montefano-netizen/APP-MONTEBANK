
import React, { useState } from 'react';
import { 
  Zap, 
  QrCode, 
  Key, 
  History, 
  ArrowRight, 
  Copy, 
  Plus, 
  Mountain,
  CheckCircle2,
  ChevronRight,
  Smartphone,
  ShieldCheck,
  X,
  ArrowLeft
} from 'lucide-react';

const Pix: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'send' | 'receive' | 'keys'>('send');
  const [step, setStep] = useState<'input' | 'review' | 'success'>('input');
  const [amount, setAmount] = useState('');
  const [key, setKey] = useState('');

  const recentContacts = [
    { name: 'Alice W.', initial: 'AW', bank: 'Nubank' },
    { name: 'Bruno C.', initial: 'BC', bank: 'Inter' },
    { name: 'Carla F.', initial: 'CF', bank: 'Itaú' },
    { name: 'Daniel R.', initial: 'DR', bank: 'Bradesco' },
  ];

  const handleSend = () => {
    if (step === 'input') setStep('review');
    else if (step === 'review') setStep('success');
  };

  const renderInput = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-[#0a0f1d] text-white p-6 rounded-[2.5rem] flex flex-col items-center gap-3 active:scale-95 transition-transform shadow-xl shadow-[#0a0f1d]/10">
           <QrCode size={24} />
           <span className="text-[10px] font-black uppercase tracking-widest">Ler QR Code</span>
        </button>
        <button className="bg-white border border-slate-100 p-6 rounded-[2.5rem] flex flex-col items-center gap-3 active:scale-95 transition-transform">
           <Copy size={24} className="text-[#2979FF]" />
           <span className="text-[10px] font-black uppercase tracking-widest text-[#0a0f1d]">Pix Copia e Cola</span>
        </button>
      </div>

      {/* Transfer Input */}
      <div className="bg-slate-50/50 border border-slate-100/30 rounded-[3rem] p-8 space-y-6">
        <div className="space-y-2">
          <label className="text-[8px] font-black text-slate-300 uppercase tracking-widest ml-4">Quanto deseja enviar?</label>
          <div className="relative">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-slate-300 text-xl">R$</span>
            <input 
              type="number" 
              placeholder="0,00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-white border border-slate-100 rounded-[2rem] p-8 pl-16 text-4xl font-black text-[#0a0f1d] outline-none transition-all placeholder:text-slate-100"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[8px] font-black text-slate-300 uppercase tracking-widest ml-4">Para quem (Chave Pix)</label>
          <div className="relative">
            <input 
              type="text" 
              placeholder="CPF, E-mail ou Telefone"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="w-full bg-white border border-slate-100 rounded-[2rem] p-5 text-sm font-bold outline-none"
            />
            <button 
              onClick={handleSend}
              disabled={!amount || !key}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#2979FF] text-white rounded-full flex items-center justify-center disabled:opacity-20 transition-all"
            >
               <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Recent Contacts */}
      <section className="space-y-4">
         <div className="flex justify-between items-center px-1">
            <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-300">Contatos Frequentes</h4>
            <button className="text-[9px] font-black uppercase tracking-widest text-[#2979FF]">Lista completa</button>
         </div>
         <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-6 px-6">
            <button className="flex flex-col items-center gap-2 shrink-0 group">
               <div className="w-14 h-14 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 group-active:scale-90 transition-transform">
                  <Plus size={24} />
               </div>
               <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Novo</span>
            </button>
            {recentContacts.map((contact, i) => (
               <button key={i} className="flex flex-col items-center gap-2 shrink-0 group">
                  <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center text-[#0a0f1d] font-black text-xs border border-slate-100 group-active:scale-90 transition-transform">
                     {contact.initial}
                  </div>
                  <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">{contact.name}</span>
               </button>
            ))}
         </div>
      </section>
    </div>
  );

  const renderReview = () => (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="bg-slate-50/50 border border-slate-100/30 rounded-[3rem] p-8 space-y-8">
        <div className="text-center space-y-1">
          <p className="text-[8px] font-black text-[#2979FF] uppercase tracking-[0.4em]">Confirme os Dados</p>
          <h3 className="text-4xl font-black text-[#0a0f1d]">R$ {parseFloat(amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
        </div>

        <div className="space-y-4 pt-4">
           <div className="flex justify-between items-center py-4 border-b border-slate-100">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Destinatário</span>
              <span className="text-sm font-black text-[#0a0f1d]">Alice W. Montgomery</span>
           </div>
           <div className="flex justify-between items-center py-4 border-b border-slate-100">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Instituição</span>
              <span className="text-sm font-black text-[#0a0f1d]">Nubank</span>
           </div>
           <div className="flex justify-between items-center py-4">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Chave Pix</span>
              <span className="text-sm font-black text-[#0a0f1d]">{key}</span>
           </div>
        </div>
      </div>

      <button 
        onClick={handleSend}
        className="w-full bg-[#0a0f1d] text-white py-7 rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.5em] shadow-2xl flex items-center justify-center gap-3 active:scale-95 transition-transform"
      >
        Confirmar Envio <ShieldCheck size={20} />
      </button>

      <button onClick={() => setStep('input')} className="w-full text-[9px] font-black text-slate-300 uppercase tracking-widest text-center">Corrigir Dados</button>
    </div>
  );

  const renderSuccess = () => (
    <div className="space-y-10 py-10 text-center animate-in zoom-in-95 duration-700">
      <div className="w-24 h-24 bg-green-500 text-white rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-green-500/20">
        <CheckCircle2 size={48} strokeWidth={3} />
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-black text-[#0a0f1d] tracking-tighter uppercase">Pix Realizado</h2>
        <p className="text-[10px] text-slate-300 font-black uppercase tracking-widest">Enviado para Alice W.</p>
      </div>
      <div className="bg-[#0a0f1d] rounded-[3rem] p-10 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="relative z-10 flex flex-col items-center gap-2">
           <p className="text-[8px] font-black uppercase tracking-[0.5em] opacity-40">Comprovante</p>
           <p className="text-4xl font-black tracking-tighter">R$ {parseFloat(amount).toFixed(2)}</p>
           <div className="mt-4 bg-white/10 px-4 py-1.5 rounded-full flex items-center gap-2">
              <CheckCircle2 size={10} className="text-green-500" />
              <span className="text-[7px] font-black uppercase tracking-widest">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
           </div>
        </div>
      </div>
      <button 
        onClick={() => window.location.reload()}
        className="text-[9px] font-black text-[#2979FF] uppercase tracking-[0.4em]"
      >
        Novo Pix ou Voltar
      </button>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {step === 'input' && (
        <>
          <header className="flex justify-between items-end px-1">
            <div>
              <p className="text-[9px] font-black text-[#2979FF] uppercase tracking-[0.5em] mb-1">Transferências</p>
              <h2 className="text-3xl font-black text-[#0a0f1d] tracking-tighter uppercase">Mundo Pix</h2>
            </div>
            <div className="w-10 h-10 bg-[#0a0f1d] text-white rounded-2xl flex items-center justify-center shadow-lg">
               <Zap size={18} fill="currentColor" />
            </div>
          </header>

          <div className="flex bg-slate-50 p-1.5 rounded-[2rem] border border-slate-100/50">
            {['send', 'receive', 'keys'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 py-3.5 rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === tab ? 'bg-white text-[#0a0f1d] shadow-sm' : 'text-slate-300'
                }`}
              >
                {tab === 'send' ? 'Enviar' : tab === 'receive' ? 'Receber' : 'Chaves'}
              </button>
            ))}
          </div>
        </>
      )}

      {activeTab === 'send' && step === 'input' && renderInput()}
      {activeTab === 'send' && step === 'review' && renderReview()}
      {activeTab === 'send' && step === 'success' && renderSuccess()}
    </div>
  );
};

export default Pix;
