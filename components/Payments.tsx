
import React, { useState } from 'react';
import { PaymentLink } from '../types';
import { 
  Plus, 
  Check, 
  Trash2, 
  Calendar,
  Clock,
  X,
  QrCode,
  Copy,
  Download,
  Zap,
  ArrowUpRight,
  Mountain,
  Share2,
  ExternalLink,
  MessageCircle,
  Mail,
  Share,
  ChevronRight,
  Eye
} from 'lucide-react';

interface PaymentsProps {
  onPreviewPublic?: () => void;
}

const Payments: React.FC<PaymentsProps> = ({ onPreviewPublic }) => {
  // Base URL for public checkout
  const getPublicUrl = (id: string) => {
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}?view=public&checkout=true&id=${id}`;
  };

  const [links, setLinks] = useState<PaymentLink[]>([
    { id: 'L492K', amount: 150.00, description: 'Consultoria Financeira', status: 'active', createdAt: '2023-11-01', url: getPublicUrl('L492K'), dueDate: '2023-12-01', dueTime: '18:00' },
    { id: 'X291M', amount: 3200.00, description: 'Venda Macbook Air', status: 'paid', createdAt: '2023-10-25', url: getPublicUrl('X291M') },
    { id: 'P110S', amount: 850.00, description: 'Design de Interface', status: 'active', createdAt: '2023-11-05', url: getPublicUrl('P110S') },
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [sharingLink, setSharingLink] = useState<PaymentLink | null>(null);
  const [newAmount, setNewAmount] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newDueTime, setNewDueTime] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAmount || !newDesc) return;

    const id = Math.random().toString(36).substr(2, 5).toUpperCase();
    const newLink: PaymentLink = {
      id,
      amount: parseFloat(newAmount),
      description: newDesc,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      url: getPublicUrl(id),
      dueDate: newDueDate || undefined,
      dueTime: newDueTime || undefined
    };

    setLinks([newLink, ...links]);
    setNewAmount('');
    setNewDesc('');
    setNewDueDate('');
    setNewDueTime('');
    setIsCreating(false);
  };

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShare = async (link: PaymentLink) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Pagamento Montbank: ${link.description}`,
          text: `Olá, aqui está o link para o pagamento de R$ ${link.amount.toLocaleString('pt-BR')}:`,
          url: link.url,
        });
      } catch (err) {
        setSharingLink(link);
      }
    } else {
      setSharingLink(link);
    }
  };

  const shareViaWhatsApp = (link: PaymentLink) => {
    const text = encodeURIComponent(`Olá, aqui está o link para o pagamento de R$ ${link.amount.toLocaleString('pt-BR')} via Montbank:\n${link.url}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex justify-between items-center px-1">
        <div className="space-y-0.5">
          <p className="text-[7px] font-black text-slate-300 uppercase tracking-[0.5em]">Serviços de Checkout</p>
          <h2 className="text-2xl font-black text-[#0a0f1d] tracking-tighter">Cobradores</h2>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="w-12 h-12 bg-[#0a0f1d] text-white rounded-2xl flex items-center justify-center active:scale-95 transition-all shadow-xl shadow-[#0a0f1d]/20"
        >
           <Plus size={20} strokeWidth={3} />
        </button>
      </header>

      <div className="flex gap-2 py-1">
         <div className="flex-1 bg-slate-50/50 rounded-2xl p-4 border border-slate-100/30 flex justify-between items-center">
            <div>
               <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest mb-0.5">Ativos</p>
               <p className="text-sm font-black text-[#0a0f1d]">{links.filter(l => l.status === 'active').length}</p>
            </div>
            <Zap size={14} className="text-[#2979FF]" />
         </div>
         <div className="flex-1 bg-slate-50/50 rounded-2xl p-4 border border-slate-100/30 flex justify-between items-center">
            <div>
               <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest mb-0.5">Pagos</p>
               <p className="text-sm font-black text-[#0a0f1d]">R$ {links.filter(l => l.status === 'paid').reduce((a, b) => a + b.amount, 0).toLocaleString('pt-BR')}</p>
            </div>
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
         </div>
      </div>

      <div className="space-y-3">
        {links.map((link) => (
          <div key={link.id} className="group bg-white border border-slate-50 rounded-[2rem] p-5 shadow-sm transition-all hover:shadow-md">
             <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                   <h4 className="font-black text-[#0a0f1d] text-sm tracking-tight truncate max-w-[160px]">{link.description}</h4>
                   <div className="flex items-center gap-2">
                      <span className={`text-[7px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${link.status === 'paid' ? 'bg-green-50 text-green-500' : 'bg-slate-50 text-slate-400'}`}>
                        {link.status === 'paid' ? 'Recebido' : 'Aguardando'}
                      </span>
                      <span className="text-[7px] font-bold text-slate-300 uppercase tracking-widest">{link.id}</span>
                   </div>
                </div>
                <div className="text-right">
                   <p className="text-lg font-black text-[#0a0f1d]">R$ {link.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
             </div>
             
             <div className="grid grid-cols-4 gap-2">
                <button 
                  onClick={() => handleShare(link)}
                  className="col-span-2 py-3 bg-[#0a0f1d] text-white rounded-xl text-[8px] font-black uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Share2 size={12} /> Compartilhar
                </button>
                <button 
                  onClick={() => copyToClipboard(link.url, link.id)}
                  className={`aspect-square rounded-xl flex items-center justify-center border transition-all ${copiedId === link.id ? 'bg-green-500 border-green-500 text-white' : 'bg-slate-50 text-[#0a0f1d] border-slate-100 active:scale-95'}`}
                  title="Copiar Link Público"
                >
                   {copiedId === link.id ? <Check size={16} /> : <Copy size={16} />}
                </button>
                <button 
                  onClick={() => onPreviewPublic && onPreviewPublic()}
                  className="aspect-square bg-white text-slate-300 rounded-xl flex items-center justify-center border border-slate-50 active:text-[#2979FF] transition-all"
                >
                   <Eye size={16} />
                </button>
             </div>
          </div>
        ))}
      </div>

      {sharingLink && (
        <div className="fixed inset-0 z-[140] flex items-end justify-center">
          <div className="absolute inset-0 bg-[#0a0f1d]/40 backdrop-blur-sm animate-in fade-in" onClick={() => setSharingLink(null)}></div>
          <div className="bg-white w-full rounded-t-[3rem] shadow-2xl z-10 animate-in slide-in-from-bottom-full p-8 pb-12 space-y-6">
            <div className="w-12 h-1 bg-slate-100 rounded-full mx-auto -mt-2 mb-6"></div>
            <div className="text-center space-y-1">
              <p className="text-[7px] font-black text-slate-300 uppercase tracking-[0.5em]">Enviar Cobrança</p>
              <h3 className="text-lg font-black text-[#0a0f1d] tracking-tighter uppercase">Escolher Canal</h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <button 
                onClick={() => shareViaWhatsApp(sharingLink)}
                className="w-full bg-[#25D366]/5 text-[#25D366] border border-[#25D366]/10 py-5 rounded-2xl flex items-center justify-between px-6 active:scale-[0.98] transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#25D366] text-white rounded-xl flex items-center justify-center">
                    <MessageCircle size={20} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">WhatsApp</span>
                </div>
                <ChevronRight size={14} className="opacity-40" />
              </button>
              <button 
                onClick={() => copyToClipboard(sharingLink.url, sharingLink.id)}
                className="w-full bg-[#2979FF]/5 text-[#2979FF] border border-[#2979FF]/10 py-5 rounded-2xl flex items-center justify-between px-6 active:scale-[0.98] transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#2979FF] text-white rounded-xl flex items-center justify-center">
                    <Copy size={20} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">Copiar Link Público</span>
                </div>
                <ChevronRight size={14} className="opacity-40" />
              </button>
            </div>
          </div>
        </div>
      )}

      {isCreating && (
        <div className="fixed inset-0 z-[120] flex items-end justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in" onClick={() => setIsCreating(false)}></div>
          <div className="bg-white w-full rounded-t-[3.5rem] shadow-2xl z-10 animate-in slide-in-from-bottom-full p-8 space-y-8">
             <div className="w-12 h-1 bg-slate-100 rounded-full mx-auto -mt-2"></div>
             <div className="space-y-1">
                <h3 className="text-xl font-black text-[#0a0f1d] tracking-tighter uppercase">Criar Link Público</h3>
                <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest">Qualquer pessoa com o link poderá pagar</p>
             </div>
             <form onSubmit={handleCreate} className="space-y-6">
                <div className="space-y-2">
                   <label className="text-[8px] font-black text-slate-300 uppercase tracking-widest ml-4">Descrição</label>
                   <input 
                     type="text" 
                     placeholder="Ex: Consultoria Premium" 
                     value={newDesc} 
                     onChange={e => setNewDesc(e.target.value)}
                     className="w-full bg-slate-50 border border-slate-50 focus:border-[#2979FF]/20 rounded-2xl p-5 text-sm font-bold outline-none"
                     required
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[8px] font-black text-[#2979FF] uppercase tracking-widest ml-4">Valor R$</label>
                   <input 
                     type="number" 
                     placeholder="0,00" 
                     value={newAmount} 
                     onChange={e => setNewAmount(e.target.value)}
                     className="w-full bg-slate-50/50 border-2 border-transparent focus:border-[#2979FF]/10 rounded-[2.5rem] p-8 text-4xl font-black text-[#0a0f1d] outline-none"
                     required
                   />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-[#0a0f1d] text-white py-6 rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.4em] shadow-2xl flex items-center justify-center gap-3"
                >
                  Gerar Link de Checkout <ArrowUpRight size={18} />
                </button>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
