import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Save, 
  Store as StoreIcon, 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  Image as ImageIcon, 
  RotateCcw, 
  Globe, 
  Crown, 
  Tag, 
  Check,
  ExternalLink
} from 'lucide-react';
import { Store } from '../types';

interface SettingsViewProps {
  currentStore?: Store;
  onUpdateStore?: (store: Store) => void;
  onOpenPublicStore?: (slug: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ currentStore, onUpdateStore, onOpenPublicStore }) => {
  // Estado local para os campos da loja ativa
  const [name, setName] = useState(currentStore?.name || '');
  const [slug, setSlug] = useState(currentStore?.slug || '');
  const [segment, setSegment] = useState<Store['segment']>(currentStore?.segment || 'Beleza & Estética');
  const [description, setDescription] = useState(currentStore?.description || '');
  const [phone, setPhone] = useState(currentStore?.phone || '');
  const [email, setEmail] = useState(currentStore?.email || '');
  const [address, setAddress] = useState(currentStore?.address || '');
  const [businessHours, setBusinessHours] = useState(currentStore?.businessHours || '');
  const [isOpen, setIsOpen] = useState(currentStore?.isOpen ?? true);
  const [plan, setPlan] = useState<'Basic' | 'Pro' | 'Premium'>(currentStore?.plan || 'Pro');
  const [logoUrl, setLogoUrl] = useState(currentStore?.logoUrl || '');
  const [bannerUrl, setBannerUrl] = useState(currentStore?.bannerUrl || '');

  const [saved, setSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sincroniza formulário quando a loja selecionada é alterada
  useEffect(() => {
    if (currentStore) {
      setName(currentStore.name);
      setSlug(currentStore.slug);
      setSegment(currentStore.segment);
      setDescription(currentStore.description);
      setPhone(currentStore.phone);
      setEmail(currentStore.email);
      setAddress(currentStore.address);
      setBusinessHours(currentStore.businessHours);
      setIsOpen(currentStore.isOpen);
      setPlan(currentStore.plan || 'Pro');
      setLogoUrl(currentStore.logoUrl || '');
      setBannerUrl(currentStore.bannerUrl || '');
      setSaved(false);
    }
  }, [currentStore?.id]);

  const handleReset = () => {
    if (currentStore) {
      setName(currentStore.name);
      setSlug(currentStore.slug);
      setSegment(currentStore.segment);
      setDescription(currentStore.description);
      setPhone(currentStore.phone);
      setEmail(currentStore.email);
      setAddress(currentStore.address);
      setBusinessHours(currentStore.businessHours);
      setIsOpen(currentStore.isOpen);
      setPlan(currentStore.plan || 'Pro');
      setLogoUrl(currentStore.logoUrl || '');
      setBannerUrl(currentStore.bannerUrl || '');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentStore) return;

    setIsSubmitting(true);

    const updatedStore: Store = {
      ...currentStore,
      name: name.trim() || currentStore.name,
      slug: slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-') || currentStore.slug,
      segment,
      description: description.trim(),
      phone: phone.trim(),
      email: email.trim(),
      address: address.trim(),
      businessHours: businessHours.trim(),
      isOpen,
      plan,
      logoUrl: logoUrl.trim() || undefined,
      bannerUrl: bannerUrl.trim() || undefined
    };

    if (onUpdateStore) {
      onUpdateStore(updatedStore);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 4000);
    }, 250);
  };

  const planColors = {
    Basic: {
      badge: 'bg-slate-800 text-slate-300 border-slate-700',
      active: 'border-slate-500 bg-slate-800/80 text-white'
    },
    Pro: {
      badge: 'bg-indigo-950/80 text-indigo-300 border-indigo-700/60 shadow-[0_0_12px_rgba(99,102,241,0.2)]',
      active: 'border-indigo-500 bg-indigo-950/80 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]'
    },
    Premium: {
      badge: 'bg-purple-950/90 text-purple-300 border-purple-600/70 shadow-[0_0_15px_rgba(168,85,247,0.3)]',
      active: 'border-purple-500 bg-purple-950/90 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header com identificação da loja ativa */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#120e26] border border-purple-900/40 p-6 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Configurações da Loja
              </h2>
              <p className="text-xs text-purple-300/70 mt-0.5">
                Gerencie os dados comerciais, identidade visual e operação da unidade ativa.
              </p>
            </div>
          </div>
        </div>

        {/* Indicador da Loja Ativa */}
        <div className="relative z-10 flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#181230] border border-purple-800/40 text-xs">
          <StoreIcon className="w-4 h-4 text-purple-400" />
          <div>
            <span className="text-[10px] text-purple-400 uppercase tracking-wider block font-semibold">Loja em Edição</span>
            <span className="text-white font-medium">{currentStore?.name || 'Loja Selecionada'}</span>
          </div>
        </div>

        {/* Background glow decorativo */}
        <div className="absolute right-0 top-0 w-72 h-full bg-gradient-to-l from-purple-600/10 to-transparent pointer-events-none" />
      </div>

      {/* Pré-visualização da Loja em Tempo Real */}
      <div className="bg-[#120e26] border border-purple-900/40 rounded-3xl overflow-hidden shadow-xl">
        <div className="px-6 py-3 border-b border-purple-900/30 flex items-center justify-between bg-purple-950/20">
          <span className="text-xs font-semibold text-purple-300 flex items-center gap-1.5 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Pré-visualização em Tempo Real da Unidade
          </span>
          {onOpenPublicStore && currentStore ? (
            <button
              type="button"
              onClick={() => onOpenPublicStore(currentStore.slug)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-600/30 hover:bg-purple-600 border border-purple-500/40 text-purple-200 hover:text-white text-[11px] font-semibold transition-all shadow-sm"
              title={`Acessar vitrine pública da loja ${currentStore.name}`}
            >
              <ExternalLink className="w-3 h-3" />
              <span>Abrir Vitrine Pública (/loja/{currentStore.slug})</span>
            </button>
          ) : (
            <span className="text-[11px] text-purple-400/80">Refletido na vitrine e cabeçalhos</span>
          )}
        </div>

        {/* Banner com Overlay */}
        <div className="relative h-44 sm:h-52 bg-slate-900 overflow-hidden">
          {bannerUrl ? (
            <img 
              src={bannerUrl} 
              alt={name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback para gradiente se imagem quebrar
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 flex items-center justify-center">
              <span className="text-purple-400/40 text-sm">Banner não configurado</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#120e26] via-[#120e26]/60 to-transparent" />

          {/* Badges superiores no Banner */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border flex items-center gap-1 ${
              isOpen 
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600/60 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                : 'bg-rose-950/80 text-rose-300 border-rose-600/60'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
              {isOpen ? 'Aberto Agora' : 'Fechado'}
            </span>

            <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border flex items-center gap-1 ${planColors[plan]?.badge}`}>
              <Crown className="w-3 h-3" />
              Plano {plan}
            </span>
          </div>

          {/* Informações sobrepostas na base do banner */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end gap-4">
            {/* Logotipo */}
            <div className="relative -mb-1 flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-purple-500/60 bg-[#181230] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.6)] flex items-center justify-center">
                {logoUrl ? (
                  <img src={logoUrl} alt={name} className="w-full h-full object-cover" />
                ) : (
                  <StoreIcon className="w-8 h-8 text-purple-400" />
                )}
              </div>
            </div>

            {/* Nome e segment */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg sm:text-2xl font-bold text-white truncate drop-shadow-md">
                  {name || 'Nome do Estabelecimento'}
                </h3>
                <span className="px-2 py-0.5 rounded-md bg-purple-900/60 border border-purple-700/50 text-[11px] font-medium text-purple-300">
                  {segment}
                </span>
              </div>
              <p className="text-xs text-purple-200/80 line-clamp-1 mt-0.5 max-w-xl">
                {description || 'Sem descrição configurada.'}
              </p>
            </div>
          </div>
        </div>

        {/* Rodapé do Preview com Dados Rápidos */}
        <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs border-t border-purple-900/30 bg-[#16112e]/50">
          <div className="flex items-center gap-2 text-purple-300">
            <Phone className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
            <span className="truncate">{phone || 'Telefone não informado'}</span>
          </div>
          <div className="flex items-center gap-2 text-purple-300">
            <Clock className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
            <span className="truncate">{businessHours || 'Horário não configurado'}</span>
          </div>
          <div className="flex items-center gap-2 text-purple-300">
            <MapPin className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
            <span className="truncate">{address || 'Endereço não informado'}</span>
          </div>
        </div>
      </div>

      {/* Formulário de Configurações */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Seção 1: Dados Comerciais Principais */}
        <div className="bg-[#120e26] border border-purple-900/40 rounded-3xl p-6 shadow-lg space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-purple-900/30 pb-3">
            <Tag className="w-4 h-4 text-purple-400" />
            Informações Comerciais
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-purple-300 mb-1.5">
                Nome Comercial da Loja <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Salão Beleza Prime"
                required
                className="w-full bg-[#181230] border border-purple-900/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-purple-400/40 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-purple-300 mb-1.5">
                Identificador / Slug da Vitrine
              </label>
              <div className="flex items-center rounded-xl bg-[#181230] border border-purple-900/50 overflow-hidden focus-within:border-purple-500">
                <span className="px-3 py-2.5 text-xs text-purple-400/60 bg-[#15102a] border-r border-purple-900/40 select-none flex items-center gap-1">
                  <Globe className="w-3 h-3" /> /
                </span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                  placeholder="minha-loja"
                  className="w-full bg-transparent px-3 py-2.5 text-sm text-white focus:outline-none placeholder-purple-400/40"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-purple-300 mb-1.5">
                Segmento de Atuação <span className="text-rose-400">*</span>
              </label>
              <select
                value={segment}
                onChange={(e) => setSegment(e.target.value as Store['segment'])}
                className="w-full bg-[#181230] border border-purple-900/50 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
              >
                <option value="Beleza & Estética">Beleza & Estética</option>
                <option value="Barbearia">Barbearia</option>
                <option value="Spa & Bem-Estar">Spa & Bem-Estar</option>
                <option value="Outros">Outros</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-purple-300 mb-1.5">
                Plano de Assinatura da Loja
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Basic', 'Pro', 'Premium'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPlan(p)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 ${
                      plan === p
                        ? planColors[p].active
                        : 'border-purple-900/40 bg-[#181230] text-purple-300/70 hover:border-purple-700/60'
                    }`}
                  >
                    {plan === p && <Check className="w-3 h-3" />}
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-purple-300 mb-1.5">
              Descrição Comercial / Apresentação
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva os diferenciais, serviços principais e experiência da sua unidade..."
              className="w-full bg-[#181230] border border-purple-900/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-purple-400/40 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
            />
          </div>
        </div>

        {/* Seção 2: Contato e Localização */}
        <div className="bg-[#120e26] border border-purple-900/40 rounded-3xl p-6 shadow-lg space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-purple-900/30 pb-3">
            <MapPin className="w-4 h-4 text-purple-400" />
            Contato & Endereço
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-purple-300 mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-purple-400" /> Telefone / WhatsApp Comercial
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(11) 99999-9999"
                className="w-full bg-[#181230] border border-purple-900/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-purple-400/40 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-purple-300 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-purple-400" /> E-mail de Atendimento
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contato@minhaloja.com"
                className="w-full bg-[#181230] border border-purple-900/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-purple-400/40 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-purple-300 mb-1.5">
              Endereço Físico Completo
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Av. Paulista, 1000 - São Paulo, SP"
              className="w-full bg-[#181230] border border-purple-900/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-purple-400/40 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* Seção 3: Operação e Horários */}
        <div className="bg-[#120e26] border border-purple-900/40 rounded-3xl p-6 shadow-lg space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-purple-900/30 pb-3">
            <Clock className="w-4 h-4 text-purple-400" />
            Horário e Status de Atendimento
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-xs font-semibold text-purple-300 mb-1.5">
                Horário de Funcionamento Exibido
              </label>
              <input
                type="text"
                value={businessHours}
                onChange={(e) => setBusinessHours(e.target.value)}
                placeholder="Ex: Seg - Sáb: 09:00 às 20:00"
                className="w-full bg-[#181230] border border-purple-900/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-purple-400/40 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-purple-300 mb-1.5">
                Status Atual do Estabelecimento
              </label>
              <div className="flex items-center gap-3 bg-[#181230] border border-purple-900/50 p-2.5 rounded-xl">
                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                    isOpen 
                      ? 'bg-emerald-600 text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]'
                      : 'text-purple-300/60 hover:text-white'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-300" />
                  Aberto
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                    !isOpen 
                      ? 'bg-rose-600 text-white shadow-[0_0_10px_rgba(244,63,94,0.4)]'
                      : 'text-purple-300/60 hover:text-white'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-rose-300" />
                  Fechado
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Seção 4: Identidade Visual (Logotipo e Banner) */}
        <div className="bg-[#120e26] border border-purple-900/40 rounded-3xl p-6 shadow-lg space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-purple-900/30 pb-3">
            <ImageIcon className="w-4 h-4 text-purple-400" />
            Identidade Visual (Logotipo e Banner)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-purple-300 mb-1.5">
                URL da Imagem do Logotipo
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="https://exemplo.com/logo.jpg"
                  className="flex-1 bg-[#181230] border border-purple-900/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-purple-400/40 focus:outline-none focus:border-purple-500"
                />
                {logoUrl && (
                  <div className="w-10 h-10 rounded-xl bg-purple-900/30 border border-purple-700/50 overflow-hidden flex-shrink-0">
                    <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-purple-300 mb-1.5">
                URL da Imagem de Capa (Banner)
              </label>
              <input
                type="url"
                value={bannerUrl}
                onChange={(e) => setBannerUrl(e.target.value)}
                placeholder="https://exemplo.com/banner.jpg"
                className="w-full bg-[#181230] border border-purple-900/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-purple-400/40 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Barra de Ações e Feedback */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div>
            {saved && (
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-950/80 border border-emerald-600/50 text-emerald-300 text-xs font-semibold animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Configurações da loja salvas com sucesso! Atualizado no sistema.</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-purple-900/50 bg-[#181230] text-purple-300 hover:text-white hover:border-purple-700 text-xs font-medium transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Descartar</span>
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:from-purple-500 hover:to-indigo-500 transition-all disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSubmitting ? 'Salvando...' : 'Salvar Alterações'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
