import React, { useState } from 'react';
import { Users, UserPlus, Search, Phone, Mail, MapPin, Trash2, Edit3, Eye, CheckCircle2, X } from 'lucide-react';
import { Client } from '../types';

interface ClientsViewProps {
  clients: Client[];
  onAddClient: (client: Omit<Client, 'id' | 'createdAt' | 'lastVisit' | 'totalSpent'>) => void;
  onDeleteClient: (id: string) => void;
  onOpenAddModal: () => void;
}

export const ClientsView: React.FC<ClientsViewProps> = ({
  clients,
  onDeleteClient,
  onOpenAddModal
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const filteredClients = clients.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.phone.includes(searchTerm) || 
                          c.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'Todos' || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#120e26] border border-purple-900/40 p-6 rounded-3xl shadow-lg">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-purple-400" /> Painel dos Clientes
          </h2>
          <p className="text-xs text-purple-300/70 mt-1">
            Gestão completa de cadastros, histórico de atendimentos e informações de contato.
          </p>
        </div>
        <button
          onClick={onOpenAddModal}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-sm shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:from-purple-500 hover:to-indigo-500 transition-all"
        >
          <UserPlus className="w-4 h-4" />
          <span>Cadastrar Cliente</span>
        </button>
      </div>

      {/* Filters & Search bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#120e26] border border-purple-900/40 p-4 rounded-2xl">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {['Todos', 'Ativo', 'Inativo'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filterStatus === status
                  ? 'bg-purple-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.6)]'
                  : 'bg-purple-950/40 text-purple-300 hover:text-white border border-purple-900/40'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400/60" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar cliente..."
            className="w-full bg-[#181230] border border-purple-900/50 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-purple-400/40 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Clients Table / Grid */}
      <div className="bg-[#120e26] border border-purple-900/40 rounded-3xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-purple-900/40 bg-purple-950/30 text-purple-300 text-xs font-semibold uppercase tracking-wider">
                <th className="p-4">Cliente</th>
                <th className="p-4">Contato</th>
                <th className="p-4">Gênero</th>
                <th className="p-4">Status</th>
                <th className="p-4">Total Gasto</th>
                <th className="p-4">Última Visita</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-900/20 text-xs text-purple-200">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-purple-900/15 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center font-bold text-white">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-white">{client.name}</div>
                        <div className="text-[11px] text-purple-400">{client.email || 'Sem e-mail'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 text-purple-300">
                      <Phone className="w-3.5 h-3.5 text-purple-400" />
                      <span>{client.phone}</span>
                    </div>
                  </td>
                  <td className="p-4">{client.gender}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      client.status === 'Ativo'
                        ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-950/60 text-rose-400 border border-rose-500/30'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-emerald-400">
                    R$ {client.totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="p-4 text-purple-300/80">{client.lastVisit}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedClient(client)}
                        className="p-2 rounded-xl bg-purple-950/60 text-purple-300 hover:text-white border border-purple-900/40 hover:border-purple-500 transition-all"
                        title="Ver Detalhes"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteClient(client.id)}
                        className="p-2 rounded-xl bg-rose-950/40 text-rose-400 hover:text-white border border-rose-900/40 hover:bg-rose-600 transition-all"
                        title="Excluir"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredClients.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-purple-400">
                    Nenhum cliente encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Client Detail Modal */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#120e26] border border-purple-800/60 rounded-3xl w-full max-w-lg p-6 shadow-[0_0_50px_rgba(168,85,247,0.3)] animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-purple-900/40 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {selectedClient.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{selectedClient.name}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    selectedClient.status === 'Ativo' ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'
                  }`}>
                    {selectedClient.status}
                  </span>
                </div>
              </div>
              <button onClick={() => setSelectedClient(null)} className="text-purple-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-purple-950/30 border border-purple-900/30">
                <div>
                  <span className="text-purple-400 block font-semibold mb-0.5">Telefone</span>
                  <span className="text-white font-medium">{selectedClient.phone}</span>
                </div>
                <div>
                  <span className="text-purple-400 block font-semibold mb-0.5">E-mail</span>
                  <span className="text-white font-medium">{selectedClient.email || 'Não informado'}</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-purple-950/30 border border-purple-900/30">
                <span className="text-purple-400 block font-semibold mb-0.5">Endereço</span>
                <span className="text-white font-medium">{selectedClient.address || 'Não informado'}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-purple-950/30 border border-purple-900/30">
                <div>
                  <span className="text-purple-400 block font-semibold mb-0.5">Total Gasto</span>
                  <span className="text-emerald-400 font-bold text-sm">R$ {selectedClient.totalSpent.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-purple-400 block font-semibold mb-0.5">Cadastrado em</span>
                  <span className="text-white font-medium">{selectedClient.createdAt}</span>
                </div>
              </div>

              {selectedClient.notes && (
                <div className="p-3 rounded-2xl bg-purple-950/30 border border-purple-900/30">
                  <span className="text-purple-400 block font-semibold mb-0.5">Observações</span>
                  <p className="text-purple-200">{selectedClient.notes}</p>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4 border-t border-purple-900/40 mt-4">
              <button
                onClick={() => setSelectedClient(null)}
                className="px-5 py-2 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-500 transition-all"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
