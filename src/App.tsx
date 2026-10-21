import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ClientsView } from './components/ClientsView';
import { AgendaView } from './components/AgendaView';
import { SalesView } from './components/SalesView';
import { ServicesView } from './components/ServicesView';
import { ReportsView } from './components/ReportsView';
import { SettingsView } from './components/SettingsView';
import { PublicStorefront } from './components/PublicStorefront';
import { ClientModal, SaleModal, AppointmentModal, AiAssistantModal } from './components/Modals';
import { LandingAuthScreen } from './components/LandingAuthScreen';
import { StoreSelector } from './components/StoreSelector';
import { auth } from './lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

import { 
  initialStores,
  initialClients, 
  initialAppointments, 
  initialSales, 
  initialServices, 
  initialActivities 
} from './mockData';
import { Store, Client, Appointment, Sale, Activity } from './types';
import { X, Sparkles, LayoutDashboard, Users, Calendar, ShoppingBag, Box, BarChart3, Settings, LogOut, Loader2 } from 'lucide-react';

export default function App() {
  const [isDemoMode, setIsDemoMode] = useState<boolean>(() => {
    return sessionStorage.getItem('nexus_demo_session') === 'active';
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authInitializing, setAuthInitializing] = useState<boolean>(true);

  // Monitor Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setAuthInitializing(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Logout error:', err);
    }
    handleExitDemoMode();
  };

  // Multi-loja model: lista de lojas e loja ativa
  const [stores, setStores] = useState<Store[]>(() => {
    const saved = sessionStorage.getItem('nexus_demo_stores');
    return saved ? JSON.parse(saved) : initialStores;
  });
  const [currentStoreId, setCurrentStoreId] = useState<string>(() => {
    const saved = sessionStorage.getItem('nexus_demo_current_store');
    return saved || 'store_prime';
  });
  const currentStore = stores.find(s => s.id === currentStoreId) || stores[0];

  // Public storefront URL routing state (detects #/loja/SLUG or #loja=SLUG)
  const [publicStoreSlug, setPublicStoreSlug] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    const hash = window.location.hash;
    // Format 1: #/loja/slug
    if (hash.startsWith('#/loja/')) {
      return hash.replace('#/loja/', '').split('?')[0];
    }
    // Format 2: #loja=slug
    if (hash.includes('loja=')) {
      const match = hash.match(/loja=([^&]+)/);
      return match ? match[1] : null;
    }
    return null;
  });

  // Listen to hash changes for direct URL sharing and browser back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/loja/')) {
        const slug = hash.replace('#/loja/', '').split('?')[0];
        setPublicStoreSlug(slug);
      } else if (hash.includes('loja=')) {
        const match = hash.match(/loja=([^&]+)/);
        setPublicStoreSlug(match ? match[1] : null);
      } else {
        setPublicStoreSlug(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenPublicStore = (slug: string) => {
    window.location.hash = `#/loja/${slug}`;
    setPublicStoreSlug(slug);
  };

  const handleClosePublicStore = () => {
    history.pushState('', document.title, window.location.pathname + window.location.search);
    setPublicStoreSlug(null);
  };

  const [activeTab, setActiveTab] = useState('clients');
  const [searchTerm, setSearchTerm] = useState('');

  // Demo session isolated data (persists only in sessionStorage during test session)
  const [clients, setClients] = useState<Client[]>(() => {
    const saved = sessionStorage.getItem('nexus_demo_clients');
    return saved ? JSON.parse(saved) : initialClients;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = sessionStorage.getItem('nexus_demo_appointments');
    return saved ? JSON.parse(saved) : initialAppointments;
  });

  const [sales, setSales] = useState<Sale[]>(() => {
    const saved = sessionStorage.getItem('nexus_demo_sales');
    return saved ? JSON.parse(saved) : initialSales;
  });

  const [services] = useState(initialServices);

  const [activities, setActivities] = useState<Activity[]>(() => {
    const saved = sessionStorage.getItem('nexus_demo_activities');
    return saved ? JSON.parse(saved) : initialActivities;
  });

  // Modal states
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isSaleModalOpen, setIsSaleModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sincroniza dados no sessionStorage (isolamento de teste)
  useEffect(() => {
    if (isDemoMode) {
      sessionStorage.setItem('nexus_demo_stores', JSON.stringify(stores));
    }
  }, [stores, isDemoMode]);

  useEffect(() => {
    if (isDemoMode) {
      sessionStorage.setItem('nexus_demo_clients', JSON.stringify(clients));
    }
  }, [clients, isDemoMode]);

  useEffect(() => {
    if (isDemoMode) {
      sessionStorage.setItem('nexus_demo_appointments', JSON.stringify(appointments));
    }
  }, [appointments, isDemoMode]);

  useEffect(() => {
    if (isDemoMode) {
      sessionStorage.setItem('nexus_demo_sales', JSON.stringify(sales));
    }
  }, [sales, isDemoMode]);

  useEffect(() => {
    if (isDemoMode) {
      sessionStorage.setItem('nexus_demo_activities', JSON.stringify(activities));
    }
  }, [activities, isDemoMode]);

  useEffect(() => {
    if (isDemoMode) {
      sessionStorage.setItem('nexus_demo_current_store', currentStoreId);
    }
  }, [currentStoreId, isDemoMode]);

  // Estratégia de compatibilidade: qualquer registro sem storeId mapeia para a loja padrão 'store_prime'
  const currentClients = clients.filter(c => (c.storeId || 'store_prime') === currentStoreId);
  const currentAppointments = appointments.filter(a => (a.storeId || 'store_prime') === currentStoreId);
  const currentSales = sales.filter(s => (s.storeId || 'store_prime') === currentStoreId);
  const currentServices = services.filter(srv => (srv.storeId || 'store_prime') === currentStoreId);
  const currentActivities = activities.filter(act => (act.storeId || 'store_prime') === currentStoreId);

  // Handlers
  const handleAddClient = (newClientData: Omit<Client, 'id' | 'createdAt' | 'lastVisit' | 'totalSpent'>) => {
    const newClient: Client = {
      ...newClientData,
      storeId: currentStoreId,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      lastVisit: 'Hoje',
      totalSpent: 0
    };
    setClients(prev => [newClient, ...prev]);

    const newAct: Activity = {
      id: Date.now().toString(),
      storeId: currentStoreId,
      title: 'Novo cliente cadastrado',
      description: newClient.name,
      time: 'Agora',
      type: 'client'
    };
    setActivities(prev => [newAct, ...prev]);
  };

  const handleDeleteClient = (id: string) => {
    setClients(prev => prev.filter(c => c.id !== id));
  };

  const handleAddSale = (newSaleData: Omit<Sale, 'id'>) => {
    const newSale: Sale = {
      ...newSaleData,
      storeId: currentStoreId,
      id: Date.now().toString()
    };
    setSales(prev => [newSale, ...prev]);

    const newAct: Activity = {
      id: Date.now().toString(),
      storeId: currentStoreId,
      title: 'Venda registrada',
      description: newSale.clientName,
      time: 'Agora',
      type: 'sale',
      amount: `R$ ${newSale.amount.toFixed(2)}`
    };
    setActivities(prev => [newAct, ...prev]);
  };

  const handleAddAppointment = (newApptData: Omit<Appointment, 'id'>) => {
    const newAppt: Appointment = {
      ...newApptData,
      storeId: currentStoreId,
      id: Date.now().toString()
    };
    setAppointments(prev => [newAppt, ...prev]);

    const newAct: Activity = {
      id: Date.now().toString(),
      storeId: currentStoreId,
      title: 'Agendamento confirmado',
      description: newAppt.clientName,
      time: 'Agora',
      type: 'appointment'
    };
    setActivities(prev => [newAct, ...prev]);
  };

  const handleDeleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
  };

  const handleEnterDemoMode = () => {
    sessionStorage.setItem('nexus_demo_session', 'active');
    setIsDemoMode(true);
  };

  const handleExitDemoMode = () => {
    sessionStorage.removeItem('nexus_demo_session');
    setIsDemoMode(false);
    setIsAuthenticated(false);
  };

  const handleUpdateStore = (updatedStore: Store) => {
    setStores(prev => prev.map(s => (s.id === updatedStore.id ? updatedStore : s)));
  };

  // If a public store slug is present in URL (#/loja/SLUG), render PublicStorefront directly
  if (publicStoreSlug) {
    return (
      <PublicStorefront
        slug={publicStoreSlug}
        stores={stores}
        services={services}
        sales={sales}
        onRequestAppointment={handleAddAppointment}
        onNavigateBack={handleClosePublicStore}
        onSwitchStore={handleOpenPublicStore}
      />
    );
  }

  // If not in demo mode and not authenticated, show the Landing / Auth Screen
  if (!isAuthenticated && !isDemoMode) {
    return (
      <LandingAuthScreen
        onLoginSuccess={() => setIsAuthenticated(true)}
        onEnterDemoMode={handleEnterDemoMode}
        onOpenPublicStore={handleOpenPublicStore}
        stores={stores}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#07050f] text-slate-100 flex flex-col font-sans overflow-x-hidden relative selection:bg-purple-600 selection:text-white">
      {/* Top Banner for Provisional Test / Demo Mode */}
      {isDemoMode && (
        <div className="bg-gradient-to-r from-amber-950 via-purple-950 to-amber-950 border-b border-amber-500/40 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3 text-amber-200 z-50 sticky top-0 shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/50 text-[10px] font-extrabold uppercase tracking-wider text-amber-300">
              Modo de Demonstração Provisório
            </span>
            <span className="font-medium text-amber-100/90 text-[11px] sm:text-xs">
              Ambiente de teste para avaliação dos módulos e do painel. Dados isolados em sessão temporária.
            </span>
          </div>
          <button
            onClick={handleExitDemoMode}
            className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 hover:text-white font-bold text-xs border border-amber-400/50 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <LogOut className="w-3.5 h-3.5 text-amber-400" />
            <span>Sair do modo de demonstração</span>
          </button>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden relative">
        {/* Background ambient lighting */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Sidebar (Desktop) */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
          currentStore={currentStore}
          stores={stores}
          currentStoreId={currentStoreId}
          onSelectStore={setCurrentStoreId}
          onOpenPublicStorefront={handleOpenPublicStore}
        />

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex md:hidden">
          <div className="w-72 bg-[#0d0918] border-r border-purple-900/40 p-6 flex flex-col justify-between h-full relative">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-purple-900/30 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h1 className="font-bold text-lg text-white">Nexus CRM</h1>
                    <p className="text-xs text-purple-400">Gestão de Clientes</p>
                  </div>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-purple-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Seletor de Loja no Mobile Drawer */}
              <div className="pb-4 mb-4 border-b border-purple-900/30">
                <div className="text-[10px] uppercase font-bold tracking-wider text-purple-400/80 mb-1.5 px-1">
                  Loja Ativa
                </div>
                <StoreSelector
                  stores={stores}
                  currentStoreId={currentStoreId}
                  onSelectStore={(id) => {
                    setCurrentStoreId(id);
                    setIsMobileMenuOpen(false);
                  }}
                  variant="sidebar"
                  direction="down"
                />
              </div>

              <nav className="space-y-2">
                {[
                  { id: 'dashboard', label: 'Painel Principal', icon: LayoutDashboard },
                  { id: 'clients', label: 'Painel dos Clientes', icon: Users },
                  { id: 'agenda', label: 'Agenda', icon: Calendar },
                  { id: 'sales', label: 'Vendas', icon: ShoppingBag },
                  { id: 'services', label: 'Produtos/Serviços', icon: Box },
                  { id: 'reports', label: 'Relatórios', icon: BarChart3 },
                  { id: 'settings', label: 'Configurações', icon: Settings },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm ${
                        isActive
                          ? 'bg-purple-600/30 text-white border-l-4 border-purple-500'
                          : 'text-purple-300/70 hover:text-white hover:bg-purple-950/40'
                      }`}
                    >
                      <Icon className="w-5 h-5 text-purple-400" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-purple-900/30">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm text-rose-400 hover:bg-rose-950/40 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>{isDemoMode ? 'Sair do modo de demonstração' : 'Sair da Conta'}</span>
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)} />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 z-10">
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          stores={stores}
          currentStoreId={currentStoreId}
          onSelectStore={setCurrentStoreId}
          onOpenPublicStorefront={handleOpenPublicStore}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <Dashboard
              clients={currentClients}
              appointments={currentAppointments}
              sales={currentSales}
              services={currentServices}
              activities={currentActivities}
              onOpenClientModal={() => setIsClientModalOpen(true)}
              onOpenSaleModal={() => setIsSaleModalOpen(true)}
              onOpenAppointmentModal={() => setIsAppointmentModalOpen(true)}
              onNavigateTab={setActiveTab}
              onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
            />
          )}

          {activeTab === 'clients' && (
            <ClientsView
              clients={currentClients}
              onAddClient={handleAddClient}
              onDeleteClient={handleDeleteClient}
              onOpenAddModal={() => setIsClientModalOpen(true)}
            />
          )}

          {activeTab === 'agenda' && (
            <AgendaView
              appointments={currentAppointments}
              onOpenAddModal={() => setIsAppointmentModalOpen(true)}
              onDeleteAppointment={handleDeleteAppointment}
            />
          )}

          {activeTab === 'sales' && (
            <SalesView
              sales={currentSales}
              onOpenAddModal={() => setIsSaleModalOpen(true)}
            />
          )}

          {activeTab === 'services' && (
            <ServicesView services={currentServices} />
          )}

          {activeTab === 'reports' && (
            <ReportsView clients={currentClients} sales={currentSales} />
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <SettingsView currentStore={currentStore} onUpdateStore={handleUpdateStore} />
              <div className="bg-[#120e26] border border-purple-900/40 rounded-3xl p-6 shadow-lg max-w-2xl">
                <h3 className="text-base font-bold text-white mb-2">Sessão</h3>
                <p className="text-xs text-purple-300/70 mb-4">Encerrar sessão atual no Nexus CRM.</p>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-950/60 text-rose-300 border border-rose-900/50 hover:bg-rose-600 hover:text-white font-semibold text-xs transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{isDemoMode ? 'Sair do modo de demonstração' : 'Sair da Conta'}</span>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
      </div>

      {/* Modals */}
      <ClientModal
        isOpen={isClientModalOpen}
        onClose={() => setIsClientModalOpen(false)}
        onSave={handleAddClient}
      />

      <SaleModal
        isOpen={isSaleModalOpen}
        onClose={() => setIsSaleModalOpen(false)}
        clients={currentClients}
        services={currentServices}
        onSave={handleAddSale}
      />

      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        clients={currentClients}
        services={currentServices}
        onSave={handleAddAppointment}
      />

      <AiAssistantModal
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        clientsCount={currentClients.length}
        totalSales={currentSales.reduce((acc, s) => acc + s.amount, 0)}
      />
    </div>
  );
}
