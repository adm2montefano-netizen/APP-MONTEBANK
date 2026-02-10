
import React from 'react';
import { 
  User, 
  Shield, 
  Settings, 
  Bell, 
  LogOut, 
  ChevronRight, 
  Fingerprint, 
  Smartphone,
  Copy,
  CreditCard
} from 'lucide-react';

interface ProfileProps {
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onLogout }) => {
  const accountInfo = {
    branch: '0001',
    account: '128845-7',
    bank: '402 - Montbank S.A.'
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copiado para a área de transferência');
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="text-center pt-4">
        <div className="w-24 h-24 rounded-full bg-slate-50 border-4 border-slate-50 mx-auto overflow-hidden relative group">
           <div className="w-full h-full bg-[#0a0f1d] flex items-center justify-center text-white">
              <User size={40} />
           </div>
           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
              <span className="text-[8px] text-white font-black uppercase tracking-widest">Editar</span>
           </div>
        </div>
        <h2 className="text-2xl font-black text-[#0a0f1d] mt-4 tracking-tight">Marcos Montgomery</h2>
        <p className="text-[10px] font-black text-[#2979FF] uppercase tracking-[0.4em]">Membro Black • Desde 2021</p>
      </header>

      {/* Account Info Card */}
      <section className="bg-[#0a0f1d] text-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#2979FF]/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="relative z-10 flex justify-between items-start mb-8">
           <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Dados da Conta</p>
           <Shield size={16} className="text-[#2979FF]" />
        </div>
        <div className="grid grid-cols-2 gap-8 relative z-10">
           <div onClick={() => copyToClipboard(accountInfo.branch)} className="cursor-pointer active:opacity-50 transition-opacity">
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Agência</p>
              <p className="text-lg font-black font-mono">{accountInfo.branch}</p>
           </div>
           <div onClick={() => copyToClipboard(accountInfo.account)} className="cursor-pointer active:opacity-50 transition-opacity">
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Conta Corrente</p>
              <p className="text-lg font-black font-mono">{accountInfo.account}</p>
           </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center relative z-10">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{accountInfo.bank}</p>
           <button onClick={() => copyToClipboard(`${accountInfo.branch} ${accountInfo.account}`)} className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-[#2979FF]">
              <Copy size={12} /> Copiar Tudo
           </button>
        </div>
      </section>

      {/* Menu Options */}
      <section className="space-y-3">
         {[
           { icon: Fingerprint, label: 'Segurança & Biometria', detail: 'Ativado' },
           { icon: Bell, label: 'Notificações', detail: 'Personalizado' },
           { icon: Smartphone, label: 'Dispositivos Autorizados', detail: '1 Ativo' },
           { icon: CreditCard, label: 'Configurações do Cartão', detail: 'Limite & Prazos' },
           { icon: Settings, label: 'Preferências do App', detail: 'Dark Mode Off' }
         ].map((item, i) => (
           <button key={i} className="w-full bg-slate-50 border border-slate-100/50 rounded-3xl p-5 flex items-center justify-between group active:scale-[0.98] transition-all">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-[#0a0f1d] shadow-sm group-hover:text-[#2979FF] transition-colors">
                    <item.icon size={18} />
                 </div>
                 <div className="text-left">
                    <p className="text-xs font-black text-[#0a0f1d]">{item.label}</p>
                    <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{item.detail}</p>
                 </div>
              </div>
              <ChevronRight size={14} className="text-slate-200" />
           </button>
         ))}
      </section>

      <button 
        onClick={onLogout}
        className="w-full py-6 flex items-center justify-center gap-3 text-red-500 font-black text-[10px] uppercase tracking-[0.4em] hover:bg-red-50 rounded-full transition-colors"
      >
        <LogOut size={16} />
        Encerrar Sessão com Segurança
      </button>

      <div className="text-center pb-8">
         <p className="text-[8px] font-black text-slate-200 uppercase tracking-[1em]">Versão 4.8.2 Elite</p>
      </div>
    </div>
  );
};

export default Profile;
