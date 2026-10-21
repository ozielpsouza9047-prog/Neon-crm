import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  ShoppingBag, 
  Box, 
  BarChart3, 
  Settings, 
  Crown,
  Sparkles,
  ExternalLink
} from 'lucide-react';

import { Store } from '../types';
import { StoreSelector } from './StoreSelector';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAiAssistant: () => void;
  currentStore?: Store;
  stores?: Store[];
  currentStoreId?: string;
  onSelectStore?: (storeId: string) => void;
  onOpenPublicStorefront?: (slug: string) => void;
  unreadCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  onOpenAiAssistant,
  currentStore,
  stores,
  currentStoreId,
  onSelectStore,
  onOpenPublicStorefront
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Painel Principal', icon: LayoutDashboard },
    { id: 'clients', label: 'Painel dos Clientes', icon: Users },
    { id: 'agenda', label: 'Agenda', icon: Calendar },
    { id: 'sales', label: 'Vendas', icon: ShoppingBag },
    { id: 'services', label: 'Produtos/Serviços', icon: Box },
    { id: 'reports', label: 'Relatórios', icon: BarChart3 },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0d0918]/95 border-r border-purple-900/30 flex flex-col justify-between select-none relative overflow-hidden shrink-0 hidden md:flex">
      {/* Background glow effects */}
      <div className="absolute -top-20 -left-20 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div>
        {/* Logo / Header */}
        <div className="p-6 flex items-center gap-3 border-b border-purple-900/20">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-white tracking-wide">Nexus CRM</h1>
            <p className="text-xs text-purple-400 font-medium">Gestão de Clientes</p>
          </div>
        </div>

        {/* Store Selector */}
        {stores && currentStoreId && onSelectStore && (
          <div className="p-3 border-b border-purple-900/20 bg-purple-950/20">
            <div className="text-[10px] uppercase font-bold tracking-wider text-purple-400/80 mb-1.5 px-1">
              Loja Ativa
            </div>
            <StoreSelector
              stores={stores}
              currentStoreId={currentStoreId}
              onSelectStore={onSelectStore}
              variant="sidebar"
              direction="down"
            />
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600/30 to-indigo-600/10 text-white border-l-4 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.15)]'
                    : 'text-purple-300/70 hover:text-white hover:bg-purple-950/40'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-purple-400' : 'text-purple-400/60'}`} />
                <span>{item.label}</span>
                {isActive && (
                  <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,1)]" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 space-y-4">
        {/* Quote banner or graphic */}
        <div className="px-4 py-3 rounded-2xl bg-gradient-to-br from-purple-950/40 to-[#120e26] border border-purple-800/30 text-xs text-purple-200/85 relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-purple-500/10 rounded-full blur-xl pointer-events-none" />
          <p className="italic font-light leading-relaxed">
            &ldquo;Clientes satisfeitos são o maior patrimônio do seu negócio!&rdquo;
          </p>
        </div>

        {/* User / Store Info Card */}
        <div className="p-3 rounded-2xl bg-purple-950/30 border border-purple-900/30 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white shadow-md">
            <Crown className="w-5 h-5 text-amber-200" />
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-white truncate">{currentStore?.name || 'Salão Beleza Prime'}</h4>
            <p className="text-[11px] text-purple-400 font-medium">Plano: <span className="text-purple-300">{currentStore?.plan || 'Premium'}</span></p>
          </div>
        </div>

        {/* Botão de Vitrine Pública */}
        {currentStore && onOpenPublicStorefront && (
          <button
            type="button"
            onClick={() => onOpenPublicStorefront(currentStore.slug)}
            className="w-full py-2.5 px-3 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 border border-purple-800/50 text-purple-200 hover:text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 group shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5 text-purple-400 group-hover:scale-110 transition-transform" />
            <span>Ver Vitrine Pública</span>
          </button>
        )}
      </div>
    </aside>
  );
};
