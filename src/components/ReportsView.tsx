import React from 'react';
import { BarChart3, TrendingUp, Download, Award, Users, DollarSign } from 'lucide-react';
import { Client, Sale } from '../types';

interface ReportsViewProps {
  clients: Client[];
  sales: Sale[];
}

export const ReportsView: React.FC<ReportsViewProps> = ({ clients, sales }) => {
  const totalRevenue = sales.reduce((acc, s) => acc + s.amount, 0);
  const activeClients = clients.filter(c => c.status === 'Ativo').length;
  const retentionRate = clients.length > 0 ? ((activeClients / clients.length) * 100).toFixed(1) : '0.0';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#120e26] border border-purple-900/40 p-6 rounded-3xl shadow-lg">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-purple-400" /> Relatórios e Indicadores
          </h2>
          <p className="text-xs text-purple-300/70 mt-1">
            Análise completa de desempenho, faturamento e retenção de clientes.
          </p>
        </div>
        <button
          onClick={() => alert('Relatório exportado com sucesso!')}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-sm shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:from-purple-500 hover:to-indigo-500 transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Exportar Relatório PDF</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-[#120e26] border border-purple-900/40 rounded-3xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600/20 text-emerald-300 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-emerald-400">+18% vs mês anterior</span>
          </div>
          <p className="text-xs text-purple-400 uppercase font-semibold">Receita Acumulada</p>
          <h3 className="text-3xl font-extrabold text-white mt-1">
            R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </h3>
        </div>

        <div className="bg-[#120e26] border border-purple-900/40 rounded-3xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-2xl bg-purple-600/20 text-purple-300 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-emerald-400">+12% novos</span>
          </div>
          <p className="text-xs text-purple-400 uppercase font-semibold">Taxa de Retenção</p>
          <h3 className="text-3xl font-extrabold text-white mt-1">{retentionRate}%</h3>
        </div>

        <div className="bg-[#120e26] border border-purple-900/40 rounded-3xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/20 text-blue-300 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-emerald-400">Excelente</span>
          </div>
          <p className="text-xs text-purple-400 uppercase font-semibold">Satisfação Média</p>
          <h3 className="text-3xl font-extrabold text-white mt-1">4.9 / 5.0</h3>
        </div>
      </div>
    </div>
  );
};
