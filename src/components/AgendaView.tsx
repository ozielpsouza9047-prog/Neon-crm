import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Plus, CheckCircle2, XCircle, Trash2 } from 'lucide-react';
import { Appointment } from '../types';

interface AgendaViewProps {
  appointments: Appointment[];
  onOpenAddModal: () => void;
  onDeleteAppointment: (id: string) => void;
}

export const AgendaView: React.FC<AgendaViewProps> = ({
  appointments,
  onOpenAddModal,
  onDeleteAppointment
}) => {
  const [filterDate, setFilterDate] = useState('2026-10-19');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#120e26] border border-purple-900/40 p-6 rounded-3xl shadow-lg">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-purple-400" /> Agenda de Atendimentos
          </h2>
          <p className="text-xs text-purple-300/70 mt-1">
            Organize os horários, serviços agendados e status dos clientes.
          </p>
        </div>
        <button
          onClick={onOpenAddModal}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:from-blue-500 hover:to-indigo-500 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Agendar Atendimento</span>
        </button>
      </div>

      <div className="bg-[#120e26] border border-purple-900/40 rounded-3xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Compromissos Agendados</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-purple-300">Filtrar por data:</span>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="bg-[#181230] border border-purple-900/50 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <div className="space-y-3">
          {appointments.map((appt) => (
            <div key={appt.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-purple-950/30 border border-purple-900/30 hover:bg-purple-900/20 transition-all gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex flex-col items-center justify-center text-blue-300 shrink-0">
                  <Clock className="w-4 h-4 mb-0.5" />
                  <span className="text-[10px] font-bold">{appt.time}</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{appt.clientName}</h4>
                  <p className="text-xs text-purple-300 mt-0.5">{appt.service}</p>
                  <p className="text-[11px] text-purple-400 mt-1">Data: {appt.date}</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4">
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-400 block">R$ {appt.price.toFixed(2)}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-1 ${
                    appt.status === 'Confirmado' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-amber-950 text-amber-400 border border-amber-500/30'
                  }`}>
                    {appt.status}
                  </span>
                </div>
                <button
                  onClick={() => onDeleteAppointment(appt.id)}
                  className="p-2 rounded-xl bg-rose-950/40 text-rose-400 hover:text-white border border-rose-900/40 hover:bg-rose-600 transition-all"
                  title="Cancelar/Excluir"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {appointments.length === 0 && (
            <div className="text-center py-8 text-purple-400 text-xs">
              Nenhum agendamento para esta data.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
