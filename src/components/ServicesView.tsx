import React from 'react';
import { Box, Plus, Clock, Tag } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesViewProps {
  services: ServiceItem[];
}

export const ServicesView: React.FC<ServicesViewProps> = ({ services }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#120e26] border border-purple-900/40 p-6 rounded-3xl shadow-lg">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Box className="w-6 h-6 text-purple-400" /> Produtos e Serviços
          </h2>
          <p className="text-xs text-purple-300/70 mt-1">
            Catálogo de serviços oferecidos, preços, duração e taxa de popularidade.
          </p>
        </div>
        <button
          onClick={() => alert('Funcionalidade de cadastrar serviço/produto.')}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-sm shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:from-purple-500 hover:to-indigo-500 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Serviço</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((srv) => (
          <div key={srv.id} className="bg-[#120e26] border border-purple-900/40 rounded-3xl p-6 shadow-lg flex flex-col justify-between group hover:border-purple-500/50 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-950 text-purple-300 border border-purple-800/40">
                  {srv.category}
                </span>
                <span className="text-base font-extrabold text-emerald-400">
                  R$ {srv.price.toFixed(2)}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">{srv.name}</h3>
              <div className="flex items-center gap-3 text-xs text-purple-300/70 mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  <span>{srv.durationMinutes} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-purple-400" />
                  <span>{srv.popularityCount} agendamentos</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 pt-4 border-t border-purple-900/30">
              <div className="flex justify-between text-xs">
                <span className="text-purple-300">Participação</span>
                <span className="font-bold text-purple-200">{srv.percentage}%</span>
              </div>
              <div className="w-full bg-[#181230] h-2 rounded-full overflow-hidden border border-purple-900/40">
                <div 
                  className="bg-gradient-to-r from-purple-600 to-indigo-500 h-full rounded-full"
                  style={{ width: `${srv.percentage * 3.2}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
