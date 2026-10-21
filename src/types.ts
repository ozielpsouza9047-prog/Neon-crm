export interface Store {
  id: string;
  name: string;
  slug: string;
  segment: 'Beleza & Estética' | 'Barbearia' | 'Spa & Bem-Estar' | 'Outros';
  description: string;
  phone: string;
  email: string;
  address: string;
  rating: number;
  reviewsCount: number;
  logoUrl?: string;
  bannerUrl?: string;
  isOpen: boolean;
  businessHours: string;
  plan?: 'Basic' | 'Pro' | 'Premium';
}

export interface Client {
  id: string;
  storeId?: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  gender: 'Feminino' | 'Masculino' | 'Outros';
  status: 'Ativo' | 'Inativo';
  lastVisit: string;
  createdAt: string;
  totalSpent: number;
  notes?: string;
}

export interface Appointment {
  id: string;
  storeId?: string;
  clientId: string;
  clientName: string;
  service: string;
  date: string;
  time: string;
  status: 'Confirmado' | 'Concluído' | 'Cancelado' | 'Pendente';
  price: number;
}

export interface Sale {
  id: string;
  storeId?: string;
  clientId: string;
  clientName: string;
  item: string;
  category: 'Serviço' | 'Produto';
  amount: number;
  date: string;
  paymentMethod: 'Pix' | 'Cartão de Crédito' | 'Dinheiro' | 'Cartão de Débito';
}

export interface ServiceItem {
  id: string;
  storeId?: string;
  name: string;
  category: 'Cabelo' | 'Estética' | 'Unhas' | 'Spa' | 'Outros';
  price: number;
  durationMinutes: number;
  popularityCount: number;
  percentage: number;
}

export interface Activity {
  id: string;
  storeId?: string;
  title: string;
  description: string;
  time: string;
  type: 'client' | 'sale' | 'appointment';
  amount?: string;
}
