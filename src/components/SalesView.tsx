import React from 'react';
import { ShoppingBag, Plus, DollarSign, Calendar, CreditCard } from 'lucide-react';
import { Sale } from '../types';

interface SalesViewProps {
  sales: Sale[];
  onOpenAddModal: () => void;
}

export const SalesView: React.FC<SalesViewProps> = ({ sales, onOpenAddModal }) => {
  const totalRevenue = sales.reduce((acc, s) => acc + s.amount, 0);
  const averageTicket = sales.length > 0 ? totalRevenue / sales.length : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#120e26] border border-purple-900/40 p-6 rounded-3xl shadow-lg">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-emerald-400" /> Vendas e Transações
          </h2>
          <p className="text-xs text-purple-300/70 mt-1">
            Consulte o faturamento, histórico de pagamentos e registre novas vendas.
          </p>
        </div>
        <button
          onClick={onOpenAddModal}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-sm shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:from-emerald-500 hover:to-teal-500 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Registrar Venda</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#120e26] border border-purple-900/40 rounded-2xl p-5 shadow-lg">
          <p className="text-xs text-purple-400 uppercase font-semibold">Faturamento Total</p>
          <h3 className="text-2xl font-extrabold text-emerald-400 mt-1">
            R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </h3>
        </div>
        <div className="bg-[#120e26] border border-purple-900/40 rounded-2xl p-5 shadow-lg">
          <p className="text-xs text-purple-400 uppercase font-semibold">Transações Realizadas</p>
          <h3 className="text-2xl font-extrabold text-white mt-1">{sales.length}</h3>
        </div>
        <div className="bg-[#120e26] border border-purple-900/40 rounded-2xl p-5 shadow-lg">
          <p className="text-xs text-purple-400 uppercase font-semibold">Ticket Médio</p>
          <h3 className="text-2xl font-extrabold text-purple-300 mt-1">
            R$ {averageTicket.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h3>
        </div>
      </div>

      <div className="bg-[#120e26] border border-purple-900/40 rounded-3xl overflow-hidden shadow-lg">
        <div className="p-5 border-b border-purple-900/40">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Histórico de Vendas</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-purple-900/40 bg-purple-950/30 text-purple-300 text-xs font-semibold uppercase tracking-wider">
                <th className="p-4">Cliente</th>
                <th className="p-4">Item / Serviço</th>
                <th className="p-4">Categoria</th>
                <th className="p-4">Forma de Pagamento</th>
                <th className="p-4">Data</th>
                <th className="p-4 text-right">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-900/20 text-xs text-purple-200">
              {sales.map((sale) => (
                <tr key={sale.id} className="hover:bg-purple-900/15 transition-colors">
                  <td className="p-4 font-bold text-white">{sale.clientName}</td>
                  <td className="p-4 text-purple-200">{sale.item}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-950 text-purple-300 border border-purple-800/40">
                      {sale.category}
                    </span>
                  </td>
                  <td className="p-4 flex items-center gap-1.5 text-purple-300">
                    <CreditCard className="w-3.5 h-3.5 text-purple-400" />
                    <span>{sale.paymentMethod}</span>
                  </td>
                  <td className="p-4 text-purple-300/80">{sale.date}</td>
                  <td className="p-4 text-right font-bold text-emerald-400 text-sm">
                    R$ {sale.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
