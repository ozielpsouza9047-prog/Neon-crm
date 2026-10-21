import React, { useState } from 'react';
import { Search, Bell, MessageSquare, ChevronDown, Menu, ExternalLink } from 'lucide-react';
import { Store } from '../types';
import { StoreSelector } from './StoreSelector';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onOpenMobileMenu: () => void;
  stores?: Store[];
  currentStoreId?: string;
  onSelectStore?: (storeId: string) => void;
  onOpenPublicStorefront?: (slug: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchTerm,
  setSearchTerm,
  onOpenMobileMenu,
  stores,
  currentStoreId,
  onSelectStore,
  onOpenPublicStorefront
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notificationsList = [
    { id: 1, title: 'Novo agendamento', desc: 'Ana Beatriz confirmou horário para amanhã', time: 'há 10 min' },
    { id: 2, title: 'Meta de vendas atingida', desc: 'Parabéns! Vendas ultrapassaram R$ 12.000', time: 'há 1 hora' },
    { id: 3, title: 'Retorno de cliente', desc: 'Roberto Alves não visita há 7 dias', time: 'há 3 horas' },
  ];

  return (
    <header className="h-20 bg-[#0d0918]/80 backdrop-blur-md border-b border-purple-900/30 px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Mobile Menu Button */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 rounded-xl bg-purple-950/60 text-purple-300 hover:text-white border border-purple-900/40"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Bar */}
        <div className="relative w-64 sm:w-80 md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400/60" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar cliente por nome, telefone ou CPF..."
            className="w-full bg-[#130f24] border border-purple-900/40 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-purple-400/40 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Right Actions & User Profile */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* Store Selector */}
        {stores && currentStoreId && onSelectStore && (
          <StoreSelector
            stores={stores}
            currentStoreId={currentStoreId}
            onSelectStore={onSelectStore}
            variant="header"
          />
        )}

        {/* Ver Vitrine Pública */}
        {stores && currentStoreId && onOpenPublicStorefront && (() => {
          const activeStore = stores.find(s => s.id === currentStoreId);
          if (!activeStore) return null;
          return (
            <button
              type="button"
              onClick={() => onOpenPublicStorefront(activeStore.slug)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-800/40 text-purple-300 hover:text-white text-xs font-semibold transition-all group shadow-sm"
              title={`Visualizar vitrine pública de ${activeStore.name}`}
            >
              <ExternalLink className="w-3.5 h-3.5 text-purple-400 group-hover:scale-110 transition-transform" />
              <span>Ver Vitrine</span>
            </button>
          );
        })()}

        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-10 h-10 rounded-xl bg-[#130f24] border border-purple-900/40 flex items-center justify-center text-purple-300 hover:text-white hover:border-purple-500/50 transition-all relative group"
          >
            <Bell className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.8)]">
              3
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-[#120e26] border border-purple-800/40 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] p-4 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-3 border-b border-purple-900/40 mb-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Notificações</h4>
                <span className="text-[10px] bg-purple-900/60 text-purple-300 px-2 py-0.5 rounded-full">3 novas</span>
              </div>
              <div className="space-y-2.5">
                {notificationsList.map((n) => (
                  <div key={n.id} className="p-2.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/30 transition-colors border border-purple-900/20 cursor-pointer">
                    <div className="flex justify-between items-start">
                      <h5 className="text-xs font-semibold text-white">{n.title}</h5>
                      <span className="text-[10px] text-purple-400">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-purple-300/80 mt-1">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Message / Chat button */}
        <button className="w-10 h-10 rounded-xl bg-[#130f24] border border-purple-900/40 flex items-center justify-center text-purple-300 hover:text-white hover:border-purple-500/50 transition-all hidden sm:flex group">
          <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-2 border-l border-purple-900/30">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
              alt="Oziel Pereira"
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-[#0d0918]" />
          </div>
          <div className="hidden lg:block text-left">
            <h4 className="text-sm font-bold text-white leading-tight">Oziel Pereira</h4>
            <p className="text-xs text-purple-400 font-medium">Lojista</p>
          </div>
          <ChevronDown className="w-4 h-4 text-purple-400 hidden lg:block" />
        </div>
      </div>
    </header>
  );
};
