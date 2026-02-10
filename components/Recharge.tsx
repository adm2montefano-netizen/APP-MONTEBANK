
import React, { useState } from 'react';
import { 
  Smartphone, 
  ChevronRight, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  Zap,
  Mountain,
  Wifi,
  History
} from 'lucide-react';

const OPERATORS = [
  { id: 'vivo', name: 'Vivo', color: 'bg-purple-600' },
  { id: 'tim', name: 'Tim', color: 'bg-blue-700' },
  { id: 'claro', name: 'Claro', color: 'bg-red-600' },
  { id: 'oi', name: 'Oi', color: 'bg-amber-500' },
];

const VALUES = [20, 30, 50, 100, 150];

const Recharge: React.FC = () => {
  const [step, setStep] = useState<'info' | 'value' | 'review' | 'success'>('info');
  const [phone, setPhone] = useState('');
  const [operator, setOperator] = useState('');
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  const formatPhone = (val: string) => {
    const numbers = val.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers
        .replace(/^(\d{2})(\d)/g, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
    }
    return val;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

  const handleNext = () => {
    if (step === 'info' && phone.length >= 14 && operator) setStep('value');
    else if (step === 'value' && selectedValue) setStep('review');
    else if (step === 'review') setStep('success');
  };

  const renderInfo = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[8px] font-black text-slate-300 uppercase tracking-widest ml-4">Número do Celular</label>
          <input 
            type="text" 
            placeholder="(00) 00000-0000"
            value={phone}
            onChange={handlePhoneChange}
            className="w-full bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 text-2xl font-black text-[#0a0f1d] outline-none focus:ring-4 focus:ring-[#2979FF]/5 transition-all placeholder:text-slate-100"
          />
        </div>

        <div className="space-y-3">
          <label className="text-[8px] font-black text-slate-300 uppercase tracking-widest ml-4">Operadora</label>
          <div className="grid grid-cols-2 gap-3">
            {OPERATORS.map((op) => (
              <button
                key={op.id}
                onClick={() => setOperator(op.id)}
                className={`p-6 rounded-[2rem] border transition-all flex flex-col items-center gap-2 ${
                  operator === op.id 
                    ? 'border-[#2979FF] bg-[#2979FF]/5 shadow-lg shadow-[#2979FF]/5' 
                    : 'border-slate-50 bg-white'
                }`}
              >
                <div className={`w-8 h-8 rounded-full ${op.color} shadow-lg shadow-black/10`}></div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${operator === op.id ? 'text-[#2979FF]' : 'text-slate-400'}`}>
                  {op.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <button 
        disabled={phone.length < 14 || !operator}
        onClick={handleNext}
        className="w-full bg-[#0a0f1d] text-white py-6 rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.4em] shadow-2xl disabled:opacity-20 flex items-center justify-center gap-3 transition-all"
      >
        Escolher Valor <ChevronRight size={16} />
      </button>

      <div className="flex items-center gap-4 bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100/30">
        <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-[#2979FF] shadow-sm">
           <History size={18} />
        </div>
        <div>
           <p className="text-[10px] font-black text-[#0a0f1d] uppercase tracking-widest">Últimas Recargas</p>
           <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">Você ainda não possui histórico.</p>
        </div>
      </div>
    </div>
  );

  const renderValue = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center py-4">
        <p className="text-[8px] font-black text-[#2979FF] uppercase tracking-[0.4em] mb-2">{operator.toUpperCase()} • {phone}</p>
        <h3 className="text-xl font-black text-[#0a0f1d] tracking-tighter uppercase">Quanto deseja recarregar?</h3>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {VALUES.map((val) => (
          <button
            key={val}
            onClick={() => setSelectedValue(val)}
            className={`p-6 rounded-[2.5rem] border transition-all flex items-center justify-between px-8 ${
              selectedValue === val 
                ? 'border-[#0a0f1d] bg-[#0a0f1d] text-white shadow-2xl' 
                : 'border-slate-50 bg-white text-[#0a0f1d]'
            }`}
          >
            <span className="text-xl font-black">R$ {val.toFixed(2)}</span>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedValue === val ? 'bg-white/20' : 'bg-slate-50'}`}>
               <Zap size={14} className={selectedValue === val ? 'text-white' : 'text-[#2979FF]'} />
            </div>
          </button>
        ))}
      </div>

      <button 
        disabled={!selectedValue}
        onClick={handleNext}
        className="w-full bg-[#0a0f1d] text-white py-7 rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.5em] shadow-2xl shadow-[#0a0f1d]/20 disabled:opacity-20 active:scale-95 transition-transform flex items-center justify-center gap-3"
      >
        Revisar Pedido <ChevronRight size={18} />
      </button>
    </div>
  );

  const renderReview = () => (
    <div className="space-y-8 animate-in slide-in-from-bottom-6 duration-700">
      <div className="bg-slate-50/50 border border-slate-100/50 rounded-[3rem] p-8 space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#2979FF] shadow-sm">
            <Smartphone size={24} />
          </div>
          <div>
            <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Recarga de Celular</p>
            <h4 className="text-lg font-black text-[#0a0f1d]">{operator.toUpperCase()}</h4>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-4 border-b border-slate-100">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Número</span>
            <span className="text-xs font-black text-[#0a0f1d]">{phone}</span>
          </div>
          <div className="flex justify-between items-center py-4 border-b border-slate-100">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Valor</span>
            <span className="text-xl font-black text-[#0a0f1d]">R$ {selectedValue?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center py-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Método</span>
            <span className="text-[10px] font-black text-[#0a0f1d] uppercase tracking-widest">Saldo Conta Black</span>
          </div>
        </div>
      </div>

      <button 
        onClick={handleNext}
        className="w-full bg-[#0a0f1d] text-white py-7 rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.5em] shadow-2xl shadow-[#0a0f1d]/20 active:scale-95 transition-transform flex items-center justify-center gap-3"
      >
        Confirmar e Recarregar <ShieldCheck size={18} />
      </button>
    </div>
  );

  const renderSuccess = () => (
    <div className="space-y-10 py-10 text-center animate-in zoom-in-95 duration-700">
      <div className="w-24 h-24 bg-green-500 text-white rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-green-500/20">
        <CheckCircle2 size={48} strokeWidth={3} />
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-black text-[#0a0f1d] tracking-tighter uppercase">Recarga Efetuada</h2>
        <p className="text-[10px] text-slate-300 font-black uppercase tracking-widest">Créditos enviados para {phone}</p>
      </div>
      <div className="bg-[#0a0f1d] rounded-[3rem] p-10 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="relative z-10 flex flex-col items-center gap-2">
           <p className="text-[8px] font-black uppercase tracking-[0.5em] opacity-40">Valor Creditado</p>
           <p className="text-4xl font-black tracking-tighter">R$ {selectedValue?.toFixed(2)}</p>
           <div className="mt-4 bg-white/10 px-4 py-1.5 rounded-full flex items-center gap-2">
              <Wifi size={10} className="text-[#2979FF]" />
              <span className="text-[7px] font-black uppercase tracking-widest">Válido por 30 dias</span>
           </div>
        </div>
      </div>
      <button 
        onClick={() => window.location.reload()}
        className="text-[9px] font-black text-[#2979FF] uppercase tracking-[0.4em]"
      >
        Voltar para o Início
      </button>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {step !== 'success' && (
        <header className="flex justify-between items-center px-1">
          <div className="flex items-center gap-4">
            {step !== 'info' && (
              <button onClick={() => setStep(step === 'value' ? 'info' : step === 'review' ? 'value' : 'info')} className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center">
                <ArrowLeft size={18} />
              </button>
            )}
            <div>
              <p className="text-[9px] font-black text-[#2979FF] uppercase tracking-[0.5em] mb-1">Celular</p>
              <h2 className="text-2xl font-black text-[#0a0f1d] tracking-tighter uppercase">Recarga</h2>
            </div>
          </div>
          <div className="w-10 h-10 bg-[#0a0f1d] text-white rounded-2xl flex items-center justify-center shadow-lg">
            <Mountain size={18} />
          </div>
        </header>
      )}

      {step === 'info' && renderInfo()}
      {step === 'value' && renderValue()}
      {step === 'review' && renderReview()}
      {step === 'success' && renderSuccess()}
    </div>
  );
};

export default Recharge;
