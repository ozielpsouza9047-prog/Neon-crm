import React, { useState } from 'react';
import { 
  Store as StoreIcon, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Star, 
  Calendar, 
  Sparkles, 
  ArrowLeft, 
  ExternalLink, 
  Check, 
  X, 
  MessageCircle, 
  Tag, 
  Crown,
  Search,
  AlertCircle
} from 'lucide-react';
import { Store, ServiceItem, Appointment, Sale } from '../types';

interface PublicStorefrontProps {
  slug: string;
  stores: Store[];
  services: ServiceItem[];
  sales?: Sale[];
  onRequestAppointment?: (appointment: Omit<Appointment, 'id'>) => void;
  onNavigateBack: () => void;
  onSwitchStore?: (slug: string) => void;
}

export const PublicStorefront: React.FC<PublicStorefrontProps> = ({
  slug,
  stores,
  services,
  sales = [],
  onRequestAppointment,
  onNavigateBack,
  onSwitchStore
}) => {
  // Localiza a loja pelo slug ou id (garantindo correspondência estrita)
  const store = stores.find(
    s => s.slug.toLowerCase() === slug.toLowerCase() || s.id === slug
  );

  // Estados para filtro e agendamento
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<ServiceItem | null>(null);

  // Form de agendamento público
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [bookingDate, setBookingDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [bookingTime, setBookingTime] = useState('14:00');
  const [bookingNotes, setBookingNotes] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Se o slug não existir, exibe mensagem clara de página não encontrada (sem vazar dados de outra loja)
  if (!store) {
    return (
      <div className="min-h-screen bg-[#07050f] text-slate-100 flex flex-col justify-between font-sans selection:bg-purple-600 selection:text-white">
        <header className="px-6 py-4 border-b border-purple-900/30 bg-[#0d0918]/80 backdrop-blur-md flex items-center justify-between">
          <button
            onClick={onNavigateBack}
            className="flex items-center gap-2 text-xs font-semibold text-purple-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao NeonCRM</span>
          </button>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold text-white tracking-wider">NEONCRM • VITRINE PÚBLICA</span>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center space-y-6 bg-[#120e26] border border-purple-900/50 p-8 rounded-3xl shadow-[0_0_50px_rgba(168,85,247,0.15)]">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <AlertCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Erro 404</span>
              <h1 className="text-2xl font-bold text-white mt-1">Loja Não Encontrada</h1>
              <p className="text-xs text-purple-300/70 mt-2">
                Nenhum estabelecimento foi localizado com o identificador <code className="px-2 py-0.5 rounded bg-purple-950 text-purple-200 border border-purple-800/40 font-mono">/loja/{slug}</code>.
              </p>
            </div>

            <div className="pt-2 border-t border-purple-900/30 text-left space-y-2">
              <span className="text-[11px] font-semibold text-purple-400 uppercase tracking-wider block">
                Lojas Disponíveis no NeonCRM:
              </span>
              <div className="space-y-1.5">
                {stores.map(s => (
                  <button
                    key={s.id}
                    onClick={() => onSwitchStore ? onSwitchStore(s.slug) : undefined}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#181230] hover:bg-purple-900/30 border border-purple-900/40 text-xs text-white transition-all text-left"
                  >
                    <span className="font-semibold">{s.name}</span>
                    <span className="text-[10px] text-purple-400 font-mono">/loja/{s.slug}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={onNavigateBack}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:from-purple-500 hover:to-indigo-500 transition-all"
            >
              Voltar ao Painel Administrativo
            </button>
          </div>
        </main>

        <footer className="py-4 text-center text-[11px] text-purple-400/50 border-t border-purple-900/20">
          NeonCRM Plataforma Multiloja • Vitrine Pública
        </footer>
      </div>
    );
  }

  // Filtra serviços estritamente pela loja identificada
  const storeServices = services.filter(
    srv => (srv.storeId || 'store_prime') === store.id
  );

  // Categorias disponíveis para esta loja
  const categories = ['Todos', ...Array.from(new Set(storeServices.map(s => s.category)))];

  // Filtro de serviços por categoria e busca
  const filteredServices = storeServices.filter(srv => {
    const matchesCategory = selectedCategory === 'Todos' || srv.category === selectedCategory;
    const matchesSearch = srv.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Produtos comercializados por esta loja (a partir do histórico de vendas com categoria Produto)
  const storeProducts = sales
    .filter(s => (s.storeId || 'store_prime') === store.id && s.category === 'Produto')
    .reduce<{ item: string; amount: number }[]>((acc, curr) => {
      if (!acc.some(p => p.item === curr.item)) {
        acc.push({ item: curr.item, amount: curr.amount });
      }
      return acc;
    }, []);

  const handleOpenBooking = (srv?: ServiceItem) => {
    setSelectedServiceForBooking(srv || storeServices[0] || null);
    setIsBookingOpen(true);
    setBookingSuccess(false);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) return;

    if (onRequestAppointment) {
      onRequestAppointment({
        storeId: store.id,
        clientId: 'public_' + Date.now(),
        clientName: clientName.trim(),
        service: selectedServiceForBooking?.name || 'Atendimento Geral',
        date: bookingDate,
        time: bookingTime,
        status: 'Pendente',
        price: selectedServiceForBooking?.price || 0
      });
    }

    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setIsBookingOpen(false);
      setClientName('');
      setClientPhone('');
      setClientEmail('');
      setBookingNotes('');
    }, 2800);
  };

  // Limpa o número de telefone para link do WhatsApp
  const cleanPhone = store.phone ? store.phone.replace(/\D/g, '') : '';
  const whatsappUrl = cleanPhone 
    ? `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(`Olá! Gostaria de informações sobre os serviços do ${store.name}.`)}`
    : null;

  return (
    <div className="min-h-screen bg-[#07050f] text-slate-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      {/* Top Bar de Navegação Pública e Retorno ao CRM */}
      <header className="sticky top-0 z-40 bg-[#0d0918]/90 backdrop-blur-md border-b border-purple-900/30 px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateBack}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/70 border border-purple-800/40 text-purple-300 hover:text-white text-xs font-semibold transition-all group"
            title="Voltar ao Painel do Lojista"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Voltar ao CRM</span>
          </button>

          <div className="hidden md:flex items-center gap-2 pl-3 border-l border-purple-900/30">
            <span className="text-[11px] font-mono text-purple-400 bg-purple-950/80 px-2.5 py-1 rounded-lg border border-purple-800/40">
              neoncrm.app/loja/{store.slug}
            </span>
          </div>
        </div>

        {/* Alternador Rápido de Vitrine Pública (permite testar as 3 lojas diretamente) */}
        {onSwitchStore && stores.length > 1 && (
          <div className="flex items-center gap-1.5 bg-[#140e2b] p-1 rounded-xl border border-purple-800/40 text-xs">
            <span className="text-[10px] text-purple-400 px-2 font-semibold hidden sm:inline">Vitrines:</span>
            {stores.map(s => {
              const isActive = s.id === store.id;
              return (
                <button
                  key={s.id}
                  onClick={() => onSwitchStore(s.slug)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                    isActive 
                      ? 'bg-purple-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]'
                      : 'text-purple-300/70 hover:text-white hover:bg-purple-900/30'
                  }`}
                >
                  {s.segment === 'Barbearia' ? 'Barbearia' : s.segment === 'Spa & Bem-Estar' ? 'Spa' : 'Salão'}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Hero Section da Loja com Banner e Logotipo */}
      <section className="relative">
        <div className="h-64 sm:h-80 md:h-96 w-full relative overflow-hidden bg-slate-900">
          {store.bannerUrl ? (
            <img 
              src={store.bannerUrl} 
              alt={store.name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-purple-950 via-indigo-950 to-[#07050f]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07050f] via-[#07050f]/60 to-transparent" />

          {/* Badges superiores no banner */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-8 flex items-center gap-2.5">
            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border flex items-center gap-1.5 backdrop-blur-md ${
              store.isOpen 
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600/60 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                : 'bg-rose-950/80 text-rose-300 border-rose-600/60'
            }`}>
              <span className={`w-2 h-2 rounded-full ${store.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
              {store.isOpen ? 'Aberto Agora' : 'Fechado no Momento'}
            </span>

            {store.plan && (
              <span className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-950/80 border border-purple-600/60 text-purple-300 backdrop-blur-md">
                <Crown className="w-3.5 h-3.5 text-purple-400" />
                {store.plan}
              </span>
            )}
          </div>
        </div>

        {/* Informações Centrais da Loja */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 -mt-24 sm:-mt-28 relative z-20">
          <div className="bg-[#120e26]/95 border border-purple-900/50 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
            <div className="flex flex-col sm:flex-row sm:items-end gap-6 justify-between">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                {/* Logotipo */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#181230] border-2 border-purple-500/60 shadow-[0_0_25px_rgba(168,85,247,0.4)] overflow-hidden flex items-center justify-center flex-shrink-0">
                  {store.logoUrl ? (
                    <img src={store.logoUrl} alt={store.name} className="w-full h-full object-cover" />
                  ) : (
                    <StoreIcon className="w-10 h-10 text-purple-400" />
                  )}
                </div>

                {/* Títulos e Avaliação */}
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {store.name}
                    </h1>
                    <span className="px-2.5 py-0.5 rounded-lg bg-purple-900/60 border border-purple-700/50 text-xs font-semibold text-purple-300">
                      {store.segment}
                    </span>
                  </div>

                  {store.description && (
                    <p className="text-xs sm:text-sm text-purple-200/80 mt-1.5 max-w-2xl leading-relaxed">
                      {store.description}
                    </p>
                  )}

                  {store.rating > 0 && (
                    <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-amber-300">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span>{store.rating.toFixed(1)}</span>
                      <span className="text-purple-300/60">({store.reviewsCount} avaliações de clientes)</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Ação Primária de Agendamento */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-emerald-950/80 border border-emerald-600/50 text-emerald-300 hover:bg-emerald-600 hover:text-white font-semibold text-xs transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chamar no WhatsApp</span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => handleOpenBooking()}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:from-purple-500 hover:to-indigo-500 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Solicitar Agendamento</span>
                </button>
              </div>
            </div>

            {/* Metadados e Informações de Contato / Localização */}
            <div className="mt-6 pt-6 border-t border-purple-900/30 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="flex items-start gap-2.5 text-purple-300">
                <Clock className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-white block">Horário de Atendimento</span>
                  <span className="text-purple-300/80">{store.businessHours || 'Consulte os horários'}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-purple-300">
                <MapPin className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-white block">Localização</span>
                  <span className="text-purple-300/80">{store.address || 'Endereço não informado'}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-purple-300">
                <Phone className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-white block">Contato Direto</span>
                  <span className="text-purple-300/80">{store.phone} • {store.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grade de Serviços da Loja */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-10 flex-1 w-full space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Tag className="w-5 h-5 text-purple-400" /> Catálogo de Serviços
            </h2>
            <p className="text-xs text-purple-300/70 mt-1">
              Conheça os serviços prestados pela unidade {store.name} e agende seu horário online.
            </p>
          </div>

          {/* Busca de serviços */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400/60" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar serviço..."
              className="w-full bg-[#120e26] border border-purple-900/40 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-purple-400/40 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* Filtro de Categorias */}
        {categories.length > 2 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white border-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                    : 'bg-[#120e26] border-purple-900/40 text-purple-300/70 hover:text-white hover:border-purple-700/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Lista de Serviços */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredServices.map(srv => (
              <div
                key={srv.id}
                className="bg-[#120e26] border border-purple-900/40 rounded-2xl p-5 hover:border-purple-600/60 transition-all group flex flex-col justify-between shadow-lg relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-md bg-purple-950 text-purple-300 border border-purple-800/40 text-[10px] font-semibold">
                      {srv.category}
                    </span>
                    <span className="text-[11px] text-purple-400/70 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {srv.durationMinutes} min
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                    {srv.name}
                  </h3>
                </div>

                <div className="mt-5 pt-4 border-t border-purple-900/30 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-purple-400/60 block font-medium">Valor do serviço</span>
                    <span className="text-lg font-extrabold text-white">
                      R$ {srv.price.toFixed(2)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOpenBooking(srv)}
                    className="px-4 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600 border border-purple-500/40 text-purple-200 hover:text-white font-semibold text-xs transition-all shadow-[0_0_10px_rgba(168,85,247,0.2)]"
                  >
                    Agendar
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-[#120e26] border border-purple-900/30 rounded-2xl space-y-2">
            <StoreIcon className="w-8 h-8 text-purple-400/40 mx-auto" />
            <p className="text-sm font-semibold text-white">Nenhum serviço encontrado</p>
            <p className="text-xs text-purple-300/60">
              {searchTerm 
                ? 'Tente buscar com outro termo ou selecione outra categoria.' 
                : 'Esta unidade ainda não cadastrou serviços específicos em seu catálogo online.'}
            </p>
          </div>
        )}

        {/* Produtos Comercializados (se houver vendas registradas como Produto nesta loja) */}
        {storeProducts.length > 0 && (
          <div className="pt-8 border-t border-purple-900/30 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" /> Produtos Disponíveis no Balcão
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {storeProducts.map((prod, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#120e26] border border-purple-900/40 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-white block">{prod.item}</span>
                    <span className="text-[10px] text-purple-400/70">Disponível para retirada</span>
                  </div>
                  <span className="text-sm font-bold text-emerald-400">R$ {prod.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Modal de Solicitação de Agendamento Público */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#120e26] border border-purple-800/60 rounded-3xl w-full max-w-lg p-6 shadow-[0_0_50px_rgba(168,85,247,0.3)] animate-in fade-in zoom-in-95 relative">
            <button
              onClick={() => setIsBookingOpen(false)}
              className="absolute top-5 right-5 text-purple-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 pb-4 border-b border-purple-900/40 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Solicitar Agendamento</h3>
                <p className="text-xs text-purple-300/70">
                  {store.name} • Confirmação direta pela equipe
                </p>
              </div>
            </div>

            {bookingSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-300 animate-bounce">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-white">Solicitação Enviada!</h4>
                <p className="text-xs text-purple-200/80 max-w-xs mx-auto">
                  Recebemos seu pedido para o serviço <strong className="text-white">{selectedServiceForBooking?.name}</strong>. Nossa equipe entrará em contato via WhatsApp para confirmar o horário.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="space-y-4">
                {/* Seleção de Serviço */}
                <div>
                  <label className="block text-xs font-semibold text-purple-300 mb-1">Serviço Desejado</label>
                  <select
                    value={selectedServiceForBooking?.id || ''}
                    onChange={(e) => {
                      const found = storeServices.find(s => s.id === e.target.value);
                      setSelectedServiceForBooking(found || null);
                    }}
                    className="w-full bg-[#181230] border border-purple-900/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    {storeServices.map(srv => (
                      <option key={srv.id} value={srv.id}>
                        {srv.name} — R$ {srv.price.toFixed(2)} ({srv.durationMinutes} min)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-purple-300 mb-1">Seu Nome Completo *</label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Ex: Beatriz Lima"
                      className="w-full bg-[#181230] border border-purple-900/50 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-purple-300 mb-1">WhatsApp / Telefone *</label>
                    <input
                      type="text"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="(11) 98888-7777"
                      className="w-full bg-[#181230] border border-purple-900/50 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-purple-300 mb-1">Seu E-mail (opcional)</label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="seuemail@exemplo.com"
                    className="w-full bg-[#181230] border border-purple-900/50 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-purple-300 mb-1">Data de Preferência</label>
                    <input
                      type="date"
                      required
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full bg-[#181230] border border-purple-900/50 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-purple-300 mb-1">Horário de Preferência</label>
                    <input
                      type="time"
                      required
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full bg-[#181230] border border-purple-900/50 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-purple-300 mb-1">Observações / Profissional Preferido</label>
                  <textarea
                    rows={2}
                    value={bookingNotes}
                    onChange={(e) => setBookingNotes(e.target.value)}
                    placeholder="Alguma restrição ou preferência específica?"
                    className="w-full bg-[#181230] border border-purple-900/50 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500 resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-purple-900/30">
                  <button
                    type="button"
                    onClick={() => setIsBookingOpen(false)}
                    className="px-4 py-2 rounded-xl bg-purple-950/40 text-purple-300 hover:text-white border border-purple-900/40 text-xs font-semibold"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:from-purple-500 hover:to-indigo-500 transition-all"
                  >
                    Confirmar Solicitação
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer Público da Vitrine */}
      <footer className="bg-[#0b0816] border-t border-purple-900/30 px-6 py-6 text-center text-xs text-purple-300/60 space-y-2">
        <p>
          <strong className="text-white">{store.name}</strong> • {store.segment} • {store.address || 'Brasil'}
        </p>
        <p className="text-[11px] text-purple-400/40">
          Powered by NeonCRM Plataforma Multiloja
        </p>
      </footer>
    </div>
  );
};
