import React, { useState } from 'react';
import { X, UserPlus, ShoppingBag, Calendar, Sparkles, Send, Bot, User } from 'lucide-react';
import { Client, Sale, Appointment, ServiceItem } from '../types';

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (client: Omit<Client, 'id' | 'createdAt' | 'lastVisit' | 'totalSpent'>) => void;
}

export const ClientModal: React.FC<ClientModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState<'Feminino' | 'Masculino' | 'Outros'>('Feminino');
  const [status, setStatus] = useState<'Ativo' | 'Inativo'>('Ativo');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({ name, phone, email, address, gender, status, notes });
    setName(''); setPhone(''); setEmail(''); setAddress(''); setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#120e26] border border-purple-800/50 rounded-2xl w-full max-w-md p-6 shadow-[0_0_40px_rgba(168,85,247,0.2)] animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-4 border-b border-purple-900/40 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-600/30 flex items-center justify-center text-purple-300">
              <UserPlus className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">Cadastrar Novo Cliente</h3>
          </div>
          <button onClick={onClose} className="text-purple-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-purple-300 mb-1">Nome Completo *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Camila Rodrigues"
              className="w-full bg-[#181230] border border-purple-900/50 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-purple-300 mb-1">Telefone / WhatsApp</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(11) 98888-7777"
                className="w-full bg-[#181230] border border-purple-900/50 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-purple-300 mb-1">Gênero</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full bg-[#181230] border border-purple-900/50 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
              >
                <option value="Feminino">Feminino</option>
                <option value="Masculino">Masculino</option>
                <option value="Outros">Outros</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-purple-300 mb-1">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="camila@email.com"
              className="w-full bg-[#181230] border border-purple-900/50 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-purple-300 mb-1">Endereço</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Rua das Flores, 123 - São Paulo, SP"
              className="w-full bg-[#181230] border border-purple-900/50 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-purple-300 mb-1">Observações</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Preferências, alergias ou anotações..."
              className="w-full bg-[#181230] border border-purple-900/50 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500 resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-purple-950/40 text-purple-300 hover:text-white border border-purple-900/40 text-sm font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:from-purple-500 hover:to-indigo-500 transition-all"
            >
              Salvar Cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface SaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  clients: Client[];
  services: ServiceItem[];
  onSave: (sale: Omit<Sale, 'id'>) => void;
}

export const SaleModal: React.FC<SaleModalProps> = ({ isOpen, onClose, clients, services, onSave }) => {
  const [clientId, setClientId] = useState(clients[0]?.id || '');
  const [item, setItem] = useState(services[0]?.name || '');
  const [category, setCategory] = useState<'Serviço' | 'Produto'>('Serviço');
  const [amount, setAmount] = useState(services[0]?.price?.toString() || '100');
  const [paymentMethod, setPaymentMethod] = useState<'Pix' | 'Cartão de Crédito' | 'Dinheiro' | 'Cartão de Débito'>('Pix');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const client = clients.find(c => c.id === clientId);
    onSave({
      clientId,
      clientName: client?.name || 'Cliente Geral',
      item,
      category,
      amount: parseFloat(amount) || 0,
      date: new Date().toISOString().split('T')[0],
      paymentMethod
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#120e26] border border-purple-800/50 rounded-2xl w-full max-w-md p-6 shadow-[0_0_40px_rgba(168,85,247,0.2)]">
        <div className="flex items-center justify-between pb-4 border-b border-purple-900/40 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600/30 flex items-center justify-center text-emerald-300">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">Registrar Nova Venda</h3>
          </div>
          <button onClick={onClose} className="text-purple-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-purple-300 mb-1">Cliente</label>
            <select
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="w-full bg-[#181230] border border-purple-900/50 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
            >
              {clients.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-purple-300 mb-1">Categoria</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-[#181230] border border-purple-900/50 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
              >
                <option value="Serviço">Serviço</option>
                <option value="Produto">Produto</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-purple-300 mb-1">Item / Serviço</label>
              <input
                type="text"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                placeholder="Ex: Corte + Escova"
                className="w-full bg-[#181230] border border-purple-900/50 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-purple-300 mb-1">Valor (R$)</label>
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-[#181230] border border-purple-900/50 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-purple-300 mb-1">Forma de Pagamento</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="w-full bg-[#181230] border border-purple-900/50 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
              >
                <option value="Pix">Pix</option>
                <option value="Cartão de Crédito">Cartão de Crédito</option>
                <option value="Cartão de Débito">Cartão de Débito</option>
                <option value="Dinheiro">Dinheiro</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-purple-950/40 text-purple-300 hover:text-white border border-purple-900/40 text-sm font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-semibold shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:from-emerald-500 hover:to-teal-500 transition-all"
            >
              Registrar Venda
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  clients: Client[];
  services: ServiceItem[];
  onSave: (appt: Omit<Appointment, 'id'>) => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose, clients, services, onSave }) => {
  const [clientId, setClientId] = useState(clients[0]?.id || '');
  const [service, setService] = useState(services[0]?.name || '');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('14:00');
  const [price, setPrice] = useState(services[0]?.price?.toString() || '100');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const client = clients.find(c => c.id === clientId);
    onSave({
      clientId,
      clientName: client?.name || 'Cliente',
      service,
      date,
      time,
      status: 'Confirmado',
      price: parseFloat(price) || 0
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#120e26] border border-purple-800/50 rounded-2xl w-full max-w-md p-6 shadow-[0_0_40px_rgba(168,85,247,0.2)]">
        <div className="flex items-center justify-between pb-4 border-b border-purple-900/40 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/30 flex items-center justify-center text-blue-300">
              <Calendar className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">Agendar Atendimento</h3>
          </div>
          <button onClick={onClose} className="text-purple-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-purple-300 mb-1">Cliente</label>
            <select
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="w-full bg-[#181230] border border-purple-900/50 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
            >
              {clients.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-purple-300 mb-1">Serviço</label>
            <input
              type="text"
              value={service}
              onChange={(e) => setService(e.target.value)}
              placeholder="Ex: Corte de Cabelo"
              className="w-full bg-[#181230] border border-purple-900/50 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-purple-300 mb-1">Data</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#181230] border border-purple-900/50 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-purple-300 mb-1">Horário</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-[#181230] border border-purple-900/50 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-purple-300 mb-1">Valor Estimado (R$)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-[#181230] border border-purple-900/50 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-purple-950/40 text-purple-300 hover:text-white border border-purple-900/40 text-sm font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:from-blue-500 hover:to-indigo-500 transition-all"
            >
              Confirmar Agendamento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientsCount: number;
  totalSales: number;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  clientsCount,
  totalSales
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    { sender: 'ai', text: `Olá Oziel! Sou seu assistente virtual do Nexus CRM. Temos ${clientsCount} clientes cadastrados e R$ ${totalSales.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} em vendas este mês. Como posso te ajudar hoje com estratégias de atendimento, campanhas ou agendamentos?` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    // Simulate smart AI response based on CRM data
    setTimeout(() => {
      let aiReply = "Ótima pergunta! Analisando os dados da sua base de clientes, recomendo enviar mensagens personalizadas via WhatsApp para os clientes inativos oferecendo 15% de desconto no próximo corte.";
      
      const lower = userMsg.toLowerCase();
      if (lower.includes('venda') || lower.includes('faturamento')) {
        aiReply = `Seu faturamento atual está em R$ ${totalSales.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}, com um crescimento expressivo de 18% em relação ao mês anterior. O serviço mais procurado é Corte de Cabelo (28%).`;
      } else if (lower.includes('cliente') || lower.includes('fidelizar')) {
        aiReply = `Você possui ${clientsCount} clientes cadastrados, sendo 219 ativos. Sugiro criar um programa de fidelidade para os 10 clientes que mais gastaram nos últimos 30 dias.`;
      } else if (lower.includes('agenda') || lower.includes('horario')) {
        aiReply = `Para otimizar sua agenda, verifique os horários de pico entre 14h e 18h. Considere abrir encaixes nas terças-feiras de manhã.`;
      }

      setMessages(prev => [...prev, { sender: 'ai', text: aiReply }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#120e26] border border-purple-800/60 rounded-3xl w-full max-w-lg h-[600px] flex flex-col shadow-[0_0_50px_rgba(168,85,247,0.3)] animate-in fade-in zoom-in-95 overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-purple-900/50 to-[#181230] border-b border-purple-900/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-[0_0_15px_rgba(168,85,247,0.6)]">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                Assistente Virtual Nexus <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              </h3>
              <p className="text-[11px] text-purple-300">Inteligência Artificial para Gestão</p>
            </div>
          </div>
          <button onClick={onClose} className="text-purple-400 hover:text-white p-2">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-none'
                    : 'bg-[#181230] border border-purple-900/50 text-purple-100 rounded-tl-none shadow-md'
                }`}
              >
                {m.text}
              </div>
              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex gap-3 items-center text-purple-400 text-xs italic">
              <div className="w-6 h-6 rounded-full bg-purple-600/30 animate-pulse flex items-center justify-center">
                <Bot className="w-3 h-3" />
              </div>
              <span>Assistente pensando e analisando dados...</span>
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-4 bg-[#0d0918] border-t border-purple-900/40 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua dúvida ou pedido ao assistente..."
            className="flex-1 bg-[#181230] border border-purple-900/50 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-11 h-11 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
