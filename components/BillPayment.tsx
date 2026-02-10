
import React, { useState } from 'react';
import { 
  Barcode, 
  Camera, 
  Keyboard, 
  ChevronRight, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Calendar,
  ShieldCheck,
  Mountain
} from 'lucide-react';

const BillPayment: React.FC = () => {
  const [step, setStep] = useState<'selection' | 'scanner' | 'manual' | 'review' | 'success'>('selection');
  const [barcode, setBarcode] = useState('');
  const [billData] = useState({
    company: 'Eletrobras Distribuição',
    value: 245.90,
    dueDate: '20/11/2023',
    description: 'Conta de Energia - Outubro'
  });

  const handleNext = () => {
    if (step === 'scanner' || step === 'manual') setStep('review');
    else if (step === 'review') setStep('success');
  };

  const renderScanner = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="relative w-full aspect-[3/4] bg-[#0a0f1d] rounded-[3rem] overflow-hidden flex flex-col items-center justify-center border-4 border-slate-50 shadow-2xl">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#2979FF] animate-scan"></div>
        </div>
        <div className="w-64 h-32 border-2 border-white/20 rounded-2xl relative flex items-center justify-center">
          <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-[#2979FF] -mt-1 -ml-1"></div>
          <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-[#2979FF] -mt-1 -mr-1"></div>
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-[#2979FF] -mb-1 -ml-1"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-[#2979FF] -mb-1 -mr-1"></div>
          <Barcode size={48} className="text-white opacity-40" />
        </div>
        <p className="mt-8 text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Posicione o código de barras</p>
      </div>
      <button 
        onClick={() => setStep('manual')}
        className="w-full py-5 rounded-3xl bg-slate-50 text-[#0a0f1d] font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-3 border border-slate-100"
      >
        <Keyboard size={14} /> Digitar Código Manualmente
      </button>
    </div>
  );

  const renderManual = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-2">
        <label className="text-[8px] font-black text-slate-300 uppercase tracking-widest ml-4">Linha Digitável</label>
        <textarea 
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          placeholder="00000.00000 00000.000000 00000.000000 0 00000000000000"
          className="w-full bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 text-sm font-bold h-40 outline-none focus:ring-4 focus:ring-[#2979FF]/5 transition-all text-[#0a0f1d]"
        />
      </div>
      <button 
        disabled={barcode.length < 10}
        onClick={handleNext}
        className="w-full bg-[#0a0f1d] text-white py-6 rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.4em] shadow-2xl disabled:opacity-20 flex items-center justify-center gap-3"
      >
        Continuar <ChevronRight size={16} />
      </button>
    </div>
  );

  const renderReview = () => (
    <div className="space-y-8 animate-in slide-in-from-bottom-6 duration-700">
      <div className="bg-slate-50/50 border border-slate-100/50 rounded-[3rem] p-8 space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#2979FF] shadow-sm">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Empresa Emissora</p>
            <h4 className="text-lg font-black text-[#0a0f1d]">{billData.company}</h4>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-4 border-b border-slate-100">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Vencimento</span>
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-[#0a0f1d]" />
              <span className="text-xs font-black text-[#0a0f1d]">{billData.dueDate}</span>
            </div>
          </div>
          <div className="flex justify-between items-center py-4 border-b border-slate-100">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Valor</span>
            <span className="text-xl font-black text-[#0a0f1d]">R$ {billData.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-start gap-3">
          <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
          <p className="text-[9px] font-medium text-slate-500 leading-relaxed italic">O pagamento será debitado da sua conta Black instantaneamente após a confirmação.</p>
        </div>
      </div>

      <button 
        onClick={handleNext}
        className="w-full bg-[#0a0f1d] text-white py-7 rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.5em] shadow-2xl shadow-[#0a0f1d]/20 active:scale-95 transition-transform flex items-center justify-center gap-3"
      >
        Confirmar Pagamento <ShieldCheck size={18} />
      </button>
    </div>
  );

  const renderSuccess = () => (
    <div className="space-y-10 py-10 text-center animate-in zoom-in-95 duration-700">
      <div className="w-24 h-24 bg-green-500 text-white rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-green-500/20">
        <CheckCircle2 size={48} strokeWidth={3} />
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-black text-[#0a0f1d] tracking-tighter uppercase">Pago com Sucesso</h2>
        <p className="text-[10px] text-slate-300 font-black uppercase tracking-widest">Protocolo: 829.492.110-X</p>
      </div>
      <div className="bg-slate-50 border border-slate-100/50 rounded-[3rem] p-10 space-y-4">
        <div className="flex justify-between text-left">
          <span className="text-[8px] font-black text-slate-300 uppercase">Destino</span>
          <span className="text-[10px] font-black text-[#0a0f1d]">{billData.company}</span>
        </div>
        <div className="flex justify-between text-left">
          <span className="text-[8px] font-black text-slate-300 uppercase">Valor Total</span>
          <span className="text-lg font-black text-[#0a0f1d]">R$ {billData.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
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
            {step !== 'selection' && (
              <button onClick={() => setStep('selection')} className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center">
                <ArrowLeft size={18} />
              </button>
            )}
            <div>
              <p className="text-[9px] font-black text-[#2979FF] uppercase tracking-[0.5em] mb-1">Pagamentos</p>
              <h2 className="text-2xl font-black text-[#0a0f1d] tracking-tighter uppercase">Pagar Conta</h2>
            </div>
          </div>
          <div className="w-10 h-10 bg-[#0a0f1d] text-white rounded-2xl flex items-center justify-center shadow-lg">
            <Mountain size={18} />
          </div>
        </header>
      )}

      {step === 'selection' && (
        <div className="grid grid-cols-1 gap-4">
          <button 
            onClick={() => setStep('scanner')}
            className="group bg-white border border-slate-100 p-8 rounded-[3rem] flex items-center justify-between hover:border-[#2979FF]/20 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#0a0f1d] group-hover:bg-[#0a0f1d] group-hover:text-white transition-all">
                <Camera size={24} />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-black text-[#0a0f1d] uppercase tracking-tight">Leitor de código</h4>
                <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">Usar a câmera do celular</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-slate-200" />
          </button>

          <button 
            onClick={() => setStep('manual')}
            className="group bg-white border border-slate-100 p-8 rounded-[3rem] flex items-center justify-between hover:border-[#2979FF]/20 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#0a0f1d] group-hover:bg-[#0a0f1d] group-hover:text-white transition-all">
                <Keyboard size={24} />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-black text-[#0a0f1d] uppercase tracking-tight">Digitar Código</h4>
                <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">Inserir números manualmente</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-slate-200" />
          </button>
        </div>
      )}

      {step === 'scanner' && renderScanner()}
      {step === 'manual' && renderManual()}
      {step === 'review' && renderReview()}
      {step === 'success' && renderSuccess()}

      <style>{`
        @keyframes scan {
          from { top: 0; }
          to { top: 100%; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default BillPayment;
