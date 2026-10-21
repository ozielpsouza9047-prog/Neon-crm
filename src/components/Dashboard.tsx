import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  ShoppingBag, 
  Star, 
  TrendingUp, 
  Calendar, 
  ArrowUpRight, 
  ChevronRight, 
  Sparkles,
  CheckCircle2,
  Clock,
  DollarSign
} from 'lucide-react';
import { Client, Appointment, Sale, ServiceItem, Activity } from '../types';

interface DashboardProps {
  clients: Client[];
  appointments: Appointment[];
  sales: Sale[];
  services: ServiceItem[];
  activities: Activity[];
  onOpenClientModal: () => void;
  onOpenSaleModal: () => void;
  onOpenAppointmentModal: () => void;
  onNavigateTab: (tab: string) => void;
  onOpenAiAssistant: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  clients,
  sales,
  services,
  activities,
  onOpenClientModal,
  onOpenSaleModal,
  onOpenAppointmentModal,
  onNavigateTab,
  onOpenAiAssistant
}) => {
  const [evolutionPeriod, setEvolutionPeriod] = useState('Últimos 7 dias');

  const totalClients = clients.length;
  const activeClients = clients.filter(c => c.status === 'Ativo').length;
  const newClientsCount = clients.filter(c => c.createdAt >= '2026-10-01').length;
  const totalSalesAmount = sales.reduce((acc, s) => acc + s.amount, 0);

  const femCount = clients.filter(c => c.gender === 'Feminino').length;
  const mascCount = clients.filter(c => c.gender === 'Masculino').length;
  const outrosCount = clients.filter(c => c.gender === 'Outros').length;
  const femPercent = totalClients > 0 ? Math.round((femCount / totalClients) * 100) : 0;
  const mascPercent = totalClients > 0 ? Math.round((mascCount / totalClients) * 100) : 0;
  const outrosPercent = totalClients > 0 ? Math.max(0, 100 - femPercent - mascPercent) : 0;

  return (
    <div className="space-y-6">
      {/* Top Banner & Greeting + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 columns: Greeting & KPI Cards */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-purple-950/40 via-[#130f24] to-[#120e26] p-6 rounded-3xl border border-purple-900/30 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
            <div>
              <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
                Olá, Oziel! 👋
              </h2>
              <p className="text-sm text-purple-300/80 mt-1">
                Aqui está o resumo da sua gestão de clientes.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-[#181230] border border-purple-900/50 px-4 py-2.5 rounded-2xl text-xs font-semibold text-purple-200">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span>Hoje: 19 de Outubro de 2026</span>
            </div>
          </div>

          {/* 4 KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Total de Clientes */}
            <div 
              onClick={() => onNavigateTab('clients')}
              className="bg-[#120e26] border border-purple-900/40 rounded-2xl p-5 relative overflow-hidden group hover:border-purple-500/50 transition-all shadow-lg cursor-pointer"
              title="Clique para abrir o Painel dos Clientes"
            >
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl group-hover:bg-purple-600/20 transition-all" />
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center text-purple-300 border border-purple-500/30 group-hover:scale-110 transition-transform">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <TrendingUp className="w-3 h-3" /> +12% este mês
                </span>
              </div>
              <p className="text-xs font-semibold text-purple-300/70 uppercase tracking-wider">Total de Clientes</p>
              <h3 className="text-3xl font-extrabold text-white mt-1">{totalClients}</h3>
            </div>

            {/* Novos Clientes */}
            <div className="bg-[#120e26] border border-purple-900/40 rounded-2xl p-5 relative overflow-hidden group hover:border-blue-500/50 transition-all shadow-lg">
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl group-hover:bg-blue-600/20 transition-all" />
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-300 border border-blue-500/30">
                  <UserPlus className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <TrendingUp className="w-3 h-3" /> +28% este mês
                </span>
              </div>
              <p className="text-xs font-semibold text-purple-300/70 uppercase tracking-wider">Novos Clientes</p>
              <h3 className="text-3xl font-extrabold text-white mt-1">{newClientsCount}</h3>
            </div>

            {/* Vendas Realizadas */}
            <div className="bg-[#120e26] border border-purple-900/40 rounded-2xl p-5 relative overflow-hidden group hover:border-emerald-500/50 transition-all shadow-lg">
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-emerald-600/10 rounded-full blur-2xl group-hover:bg-emerald-600/20 transition-all" />
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/20 flex items-center justify-center text-emerald-300 border border-emerald-500/30">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <TrendingUp className="w-3 h-3" /> +18% este mês
                </span>
              </div>
              <p className="text-xs font-semibold text-purple-300/70 uppercase tracking-wider">Vendas Realizadas</p>
              <h3 className="text-2xl font-extrabold text-white mt-1">
                R$ {totalSalesAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </h3>
            </div>

            {/* Clientes Ativos */}
            <div className="bg-[#120e26] border border-purple-900/40 rounded-2xl p-5 relative overflow-hidden group hover:border-purple-500/50 transition-all shadow-lg">
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-pink-600/10 rounded-full blur-2xl group-hover:bg-pink-600/20 transition-all" />
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-pink-600/20 flex items-center justify-center text-pink-300 border border-pink-500/30">
                  <Star className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <TrendingUp className="w-3 h-3" /> +15% este mês
                </span>
              </div>
              <p className="text-xs font-semibold text-purple-300/70 uppercase tracking-wider">Clientes Ativos</p>
              <h3 className="text-3xl font-extrabold text-white mt-1">{activeClients}</h3>
            </div>

          </div>
        </div>

        {/* Right column: Ações Rápidas & Atividade Recente */}
        <div className="space-y-6">
          
          {/* Ações Rápidas */}
          <div className="bg-[#120e26] border border-purple-900/40 rounded-3xl p-5 shadow-lg">
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Ações Rápidas</h3>
            <div className="space-y-3">
              <button
                onClick={onOpenClientModal}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs sm:text-sm shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:from-purple-500 hover:to-indigo-500 transition-all group"
              >
                <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <UserPlus className="w-4 h-4 text-white" />
                </div>
                <span>Cadastrar Cliente</span>
              </button>

              <button
                onClick={onOpenSaleModal}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#181230] border border-purple-900/60 text-purple-200 font-semibold text-xs sm:text-sm hover:text-white hover:bg-purple-950/40 hover:border-purple-500/40 transition-all group"
              >
                <div className="w-7 h-7 rounded-xl bg-emerald-600/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <span>Nova Venda</span>
              </button>

              <button
                onClick={onOpenAppointmentModal}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#181230] border border-purple-900/60 text-purple-200 font-semibold text-xs sm:text-sm hover:text-white hover:bg-purple-950/40 hover:border-purple-500/40 transition-all group"
              >
                <div className="w-7 h-7 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <Calendar className="w-4 h-4" />
                </div>
                <span>Agendar Atendimento</span>
              </button>

              <button
                onClick={() => onNavigateTab('reports')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#181230] border border-purple-900/60 text-purple-200 font-semibold text-xs sm:text-sm hover:text-white hover:bg-purple-950/40 hover:border-purple-500/40 transition-all group"
              >
                <div className="w-7 h-7 rounded-xl bg-pink-600/20 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <span>Ver Relatórios</span>
              </button>
            </div>
          </div>

          {/* Atividade Recente */}
          <div className="bg-[#120e26] border border-purple-900/40 rounded-3xl p-5 shadow-lg">
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Atividade Recente</h3>
            <div className="space-y-3.5">
              {activities.map((act) => {
                let iconBg = 'bg-purple-600/20 text-purple-300 border-purple-500/30';
                let IconComp = Users;
                if (act.type === 'sale') {
                  iconBg = 'bg-emerald-600/20 text-emerald-300 border-emerald-500/30';
                  IconComp = DollarSign;
                } else if (act.type === 'appointment') {
                  iconBg = 'bg-blue-600/20 text-blue-300 border-blue-500/30';
                  IconComp = Calendar;
                }

                return (
                  <div key={act.id} className="flex items-start gap-3 p-2.5 rounded-2xl bg-purple-950/30 border border-purple-900/20 hover:bg-purple-900/20 transition-colors">
                    <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 ${iconBg}`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-bold text-white truncate">{act.title}</h5>
                        <span className="text-[10px] text-purple-400">{act.time}</span>
                      </div>
                      <p className="text-[11px] text-purple-300/80 truncate mt-0.5">{act.description}</p>
                      {act.amount && (
                        <span className="text-[11px] font-bold text-emerald-400 mt-1 inline-block">{act.amount}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* Charts Section: Evolução de Clientes & Perfil dos Clientes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Evolução de Clientes (Left 2 cols) */}
        <div className="lg:col-span-2 bg-[#120e26] border border-purple-900/40 rounded-3xl p-6 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Evolução de Clientes</h3>
                <p className="text-xs text-purple-300/70">Crescimento da base ao longo do período</p>
              </div>
            </div>
            <select
              value={evolutionPeriod}
              onChange={(e) => setEvolutionPeriod(e.target.value)}
              className="bg-[#181230] border border-purple-900/50 rounded-xl px-3 py-1.5 text-xs text-purple-200 focus:outline-none focus:border-purple-500"
            >
              <option value="Últimos 7 dias">Últimos 7 dias</option>
              <option value="Últimos 30 dias">Últimos 30 dias</option>
              <option value="Último ano">Último ano</option>
            </select>
          </div>

          {/* Graphical representation matching the reference */}
          <div className="h-64 relative flex flex-col justify-end pt-4">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
              <div className="border-b border-purple-500 w-full text-[10px] text-right text-purple-300">250</div>
              <div className="border-b border-purple-500 w-full text-[10px] text-right text-purple-300">200</div>
              <div className="border-b border-purple-500 w-full text-[10px] text-right text-purple-300">150</div>
              <div className="border-b border-purple-500 w-full text-[10px] text-right text-purple-300">100</div>
              <div className="border-b border-purple-500 w-full text-[10px] text-right text-purple-300">50</div>
              <div className="border-b border-purple-500 w-full text-[10px] text-right text-purple-300">0</div>
            </div>

            {/* SVG Glowing Curve */}
            <div className="absolute inset-x-0 bottom-8 h-40">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 600 150" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0 130 Q 100 110, 200 95 T 400 60 T 600 20 L 600 150 L 0 150 Z"
                  fill="url(#purpleGradient)"
                />
                <path
                  d="M 0 130 Q 100 110, 200 95 T 400 60 T 600 20"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="3"
                  className="filter drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                />
                {/* Points */}
                <circle cx="0" cy="130" r="4" fill="#fff" stroke="#a855f7" strokeWidth="2" />
                <circle cx="100" cy="115" r="4" fill="#fff" stroke="#a855f7" strokeWidth="2" />
                <circle cx="200" cy="95" r="4" fill="#fff" stroke="#a855f7" strokeWidth="2" />
                <circle cx="300" cy="80" r="4" fill="#fff" stroke="#a855f7" strokeWidth="2" />
                <circle cx="400" cy="60" r="4" fill="#fff" stroke="#a855f7" strokeWidth="2" />
                <circle cx="500" cy="40" r="4" fill="#fff" stroke="#a855f7" strokeWidth="2" />
                <circle cx="600" cy="20" r="6" fill="#fff" stroke="#a855f7" strokeWidth="3" className="animate-pulse" />
              </svg>
            </div>

            {/* X Axis labels */}
            <div className="flex justify-between text-[11px] text-purple-400 font-medium pt-2 border-t border-purple-900/40 z-10">
              <span>13/10</span>
              <span>14/10</span>
              <span>15/10</span>
              <span>16/10</span>
              <span>17/10</span>
              <span>18/10</span>
              <span>19/10</span>
            </div>
          </div>
        </div>

        {/* Perfil dos Clientes (Donut chart card) */}
        <div className="bg-[#120e26] border border-purple-900/40 rounded-3xl p-6 shadow-lg flex flex-col justify-between">
          <h3 className="text-base font-bold text-white mb-2">Perfil dos Clientes</h3>
          
          <div className="flex flex-col items-center justify-center my-auto py-4 relative">
            {/* Donut ring simulation */}
            <div className="w-36 h-36 rounded-full border-8 border-purple-600/30 border-t-purple-500 border-r-blue-500 border-b-emerald-500 flex flex-col items-center justify-center shadow-[0_0_25px_rgba(168,85,247,0.2)]">
              <span className="text-2xl font-extrabold text-white">{totalClients}</span>
              <span className="text-[11px] text-purple-300 uppercase tracking-widest font-medium">Clientes</span>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-purple-900/40 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                <span className="text-purple-200">Feminino</span>
              </div>
              <span className="font-bold text-white">{femPercent}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                <span className="text-purple-200">Masculino</span>
              </div>
              <span className="font-bold text-white">{mascPercent}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <span className="text-purple-200">Outros</span>
              </div>
              <span className="font-bold text-white">{outrosPercent}%</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Lists Section: Últimos Clientes & Serviços Mais Procurados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Últimos Clientes */}
        <div className="bg-[#120e26] border border-purple-900/40 rounded-3xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-600/20 text-purple-300 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white">Últimos Clientes</h3>
            </div>
            <button
              onClick={() => onNavigateTab('clients')}
              className="px-3 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 hover:text-white border border-purple-500/40 text-xs font-bold transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(168,85,247,0.3)] group"
              title="Acessar Painel dos Clientes"
            >
              <span>Acessar Painel dos Clientes</span>
              <ChevronRight className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="space-y-3">
            {clients.slice(0, 5).map((client, idx) => {
              const avatars = [
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
              ];
              const avatar = avatars[idx % avatars.length];

              return (
                <div key={client.id} className="flex items-center justify-between p-3 rounded-2xl bg-purple-950/30 border border-purple-900/20 hover:bg-purple-900/20 transition-all">
                  <div className="flex items-center gap-3">
                    <img src={avatar} alt={client.name} className="w-10 h-10 rounded-xl object-cover ring-1 ring-purple-500/30" />
                    <div>
                      <h4 className="text-xs font-bold text-white">{client.name}</h4>
                      <p className="text-[11px] text-purple-400">{client.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      client.status === 'Ativo'
                        ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-950/60 text-rose-400 border border-rose-500/30'
                    }`}>
                      {client.status}
                    </span>
                    <span className="text-[11px] text-purple-300/70 hidden sm:inline">Última visita: {client.lastVisit}</span>
                    <ChevronRight className="w-4 h-4 text-purple-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Serviços Mais Procurados */}
        <div className="bg-[#120e26] border border-purple-900/40 rounded-3xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-600/20 text-indigo-300 flex items-center justify-center">
                <Star className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white">Serviços Mais Procurados</h3>
            </div>
            <button
              onClick={() => onNavigateTab('services')}
              className="text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
            >
              Catálogo <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {services.map((srv) => (
              <div key={srv.id} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white">{srv.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-300/80 font-semibold">{srv.popularityCount}</span>
                    <span className="text-purple-400 font-bold">{srv.percentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-[#181230] h-2 rounded-full overflow-hidden border border-purple-900/40">
                  <div 
                    className="bg-gradient-to-r from-purple-600 to-indigo-500 h-full rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                    style={{ width: `${srv.percentage * 3.2}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* AI Assistant Bottom Banner matching reference */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-[#1b1236] border border-purple-700/50 rounded-3xl p-6 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(168,85,247,0.25)]">
        <div className="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-purple-600/20 to-transparent pointer-events-none" />
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(168,85,247,0.8)] shrink-0">
            <Sparkles className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-white">Potencialize seu atendimento!</h3>
            <p className="text-xs sm:text-sm text-purple-200 mt-0.5">
              Use nosso assistente virtual para responder dúvidas, agendar serviços e muito mais.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenAiAssistant}
          className="px-6 py-3 rounded-2xl bg-white text-purple-950 font-extrabold text-sm shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:bg-purple-100 transition-all flex items-center gap-2 shrink-0 relative z-10 group"
        >
          <span>Ativar Assistente</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

    </div>
  );
};
