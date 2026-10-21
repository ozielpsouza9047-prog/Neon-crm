import { Store, Client, Appointment, Sale, ServiceItem, Activity } from './types';

export const initialStores: Store[] = [
  {
    id: 'store_prime',
    name: 'Salão Beleza Prime',
    slug: 'beleza-prime',
    segment: 'Beleza & Estética',
    description: 'Especialistas em tratamentos capilares, coloração de luxo e estética facial avançada.',
    phone: '(11) 99999-9999',
    email: 'contato@belezaprime.com',
    address: 'Av. Paulista, 1000 - São Paulo, SP',
    rating: 4.9,
    reviewsCount: 142,
    logoUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1200&auto=format&fit=crop&q=80',
    isOpen: true,
    businessHours: 'Seg - Sáb: 09:00 às 20:00',
    plan: 'Premium'
  },
  {
    id: 'store_barber',
    name: 'Studio Barber Neon',
    slug: 'barber-neon',
    segment: 'Barbearia',
    description: 'Cortes masculinos modernos, barboterapia tradicional com toalha quente e cuidados masculinos.',
    phone: '(11) 98888-2222',
    email: 'contato@barberneon.com',
    address: 'Rua Augusta, 550 - São Paulo, SP',
    rating: 4.8,
    reviewsCount: 98,
    logoUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1200&auto=format&fit=crop&q=80',
    isOpen: true,
    businessHours: 'Ter - Sáb: 10:00 às 21:00',
    plan: 'Pro'
  },
  {
    id: 'store_spa',
    name: 'Glow Spa & Bem-Estar',
    slug: 'glow-spa',
    segment: 'Spa & Bem-Estar',
    description: 'Terapias relaxantes, massagens com pedras quentes, aromaterapia e bem-estar integral.',
    phone: '(11) 97777-3333',
    email: 'contato@glowspa.com',
    address: 'Alameda Santos, 1200 - São Paulo, SP',
    rating: 5.0,
    reviewsCount: 84,
    logoUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&auto=format&fit=crop&q=80',
    isOpen: true,
    businessHours: 'Seg - Sex: 08:00 às 19:00',
    plan: 'Premium'
  }
];

export const initialClients: Client[] = [
  // Clientes Salão Beleza Prime (store_prime) - Mantidos integralmente
  {
    id: '1',
    storeId: 'store_prime',
    name: 'Ana Beatriz Santos',
    phone: '(11) 98765-4321',
    email: 'ana.beatriz@email.com',
    address: 'Av. Paulista, 1000 - São Paulo, SP',
    gender: 'Feminino',
    status: 'Ativo',
    lastVisit: 'Hoje',
    createdAt: '2026-05-10',
    totalSpent: 1450.00,
    notes: 'Cliente VIP, prefere horários pela manhã.'
  },
  {
    id: '2',
    storeId: 'store_prime',
    name: 'Carlos Henrique',
    phone: '(21) 99876-5432',
    email: 'carlos.henrique@email.com',
    address: 'Rua Copacabana, 500 - Rio de Janeiro, RJ',
    gender: 'Masculino',
    status: 'Ativo',
    lastVisit: 'Ontem',
    createdAt: '2026-06-12',
    totalSpent: 920.00,
    notes: 'Faz barba e cabelo quinzenalmente.'
  },
  {
    id: '3',
    storeId: 'store_prime',
    name: 'Juliana Lima',
    phone: '(31) 97654-3210',
    email: 'juliana.lima@email.com',
    address: 'Savassi, Belo Horizonte, MG',
    gender: 'Feminino',
    status: 'Ativo',
    lastVisit: 'há 2 dias atrás',
    createdAt: '2026-07-01',
    totalSpent: 2100.00,
    notes: 'Especialista em mechas loiras.'
  },
  {
    id: '4',
    storeId: 'store_prime',
    name: 'Roberto Alves',
    phone: '(41) 96543-2109',
    email: 'roberto.alves@email.com',
    address: 'Batel, Curitiba, PR',
    gender: 'Masculino',
    status: 'Inativo',
    lastVisit: 'há 7 dias atrás',
    createdAt: '2026-04-15',
    totalSpent: 450.00,
    notes: 'Ausente nas últimas semanas.'
  },
  {
    id: '5',
    storeId: 'store_prime',
    name: 'Mariana Costa',
    phone: '(51) 95432-1098',
    email: 'mariana.costa@email.com',
    address: 'Moinhos de Vento, Porto Alegre, RS',
    gender: 'Feminino',
    status: 'Ativo',
    lastVisit: 'há 3 dias atrás',
    createdAt: '2026-08-20',
    totalSpent: 1340.00,
    notes: 'Gosta de produtos veganos.'
  },
  {
    id: '6',
    storeId: 'store_prime',
    name: 'Lucas Mendes',
    phone: '(11) 93214-5678',
    email: 'lucas.mendes@email.com',
    address: 'Pinheiros, São Paulo, SP',
    gender: 'Masculino',
    status: 'Ativo',
    lastVisit: 'há 4 dias atrás',
    createdAt: '2026-08-25',
    totalSpent: 680.00
  },
  {
    id: '7',
    storeId: 'store_prime',
    name: 'Fernanda Souza',
    phone: '(21) 98123-4567',
    email: 'fernanda.souza@email.com',
    address: 'Ipanema, Rio de Janeiro, RJ',
    gender: 'Feminino',
    status: 'Ativo',
    lastVisit: 'há 5 dias atrás',
    createdAt: '2026-03-10',
    totalSpent: 3450.00
  },

  // Clientes Studio Barber Neon (store_barber)
  {
    id: 'b_c1',
    storeId: 'store_barber',
    name: 'Thiago Oliveira',
    phone: '(11) 97111-2233',
    email: 'thiago.oliveira@email.com',
    address: 'Rua Bela Cintra, 200 - São Paulo, SP',
    gender: 'Masculino',
    status: 'Ativo',
    lastVisit: 'Hoje',
    createdAt: '2026-08-01',
    totalSpent: 850.00,
    notes: 'Degradê na navalha a cada 10 dias.'
  },
  {
    id: 'b_c2',
    storeId: 'store_barber',
    name: 'Gabriel Martins',
    phone: '(11) 96222-3344',
    email: 'gabriel.martins@email.com',
    address: 'Consolação, São Paulo, SP',
    gender: 'Masculino',
    status: 'Ativo',
    lastVisit: 'Ontem',
    createdAt: '2026-09-15',
    totalSpent: 420.00,
    notes: 'Gosta de acabamento com óleo de barba.'
  },

  // Clientes Glow Spa & Bem-Estar (store_spa)
  {
    id: 's_c1',
    storeId: 'store_spa',
    name: 'Beatriz Vasconcelos',
    phone: '(11) 95333-4455',
    email: 'beatriz.v@email.com',
    address: 'Jardins, São Paulo, SP',
    gender: 'Feminino',
    status: 'Ativo',
    lastVisit: 'Hoje',
    createdAt: '2026-07-20',
    totalSpent: 2890.00,
    notes: 'Sessão semanal de drenagem linfática.'
  }
];

export const initialAppointments: Appointment[] = [
  // Agendamentos Salão Beleza Prime (store_prime)
  {
    id: 'a1',
    storeId: 'store_prime',
    clientId: '1',
    clientName: 'Ana Beatriz Santos',
    service: 'Corte e Escova Modelada',
    date: '2026-10-19',
    time: '14:00',
    status: 'Confirmado',
    price: 180.00
  },
  {
    id: 'a2',
    storeId: 'store_prime',
    clientId: '3',
    clientName: 'Juliana Lima',
    service: 'Coloração Global',
    date: '2026-10-19',
    time: '16:30',
    status: 'Confirmado',
    price: 320.00
  },
  {
    id: 'a3',
    storeId: 'store_prime',
    clientId: '2',
    clientName: 'Carlos Henrique',
    service: 'Corte Executivo + Barba',
    date: '2026-10-20',
    time: '10:00',
    status: 'Pendente',
    price: 120.00
  },
  {
    id: 'a4',
    storeId: 'store_prime',
    clientId: '5',
    clientName: 'Mariana Costa',
    service: 'Hidratação Profunda',
    date: '2026-10-20',
    time: '15:00',
    status: 'Confirmado',
    price: 150.00
  },

  // Agendamentos Studio Barber Neon (store_barber)
  {
    id: 'b_a1',
    storeId: 'store_barber',
    clientId: 'b_c1',
    clientName: 'Thiago Oliveira',
    service: 'Fade Navalhado + Barboterapia',
    date: '2026-10-19',
    time: '17:00',
    status: 'Confirmado',
    price: 95.00
  },

  // Agendamentos Glow Spa (store_spa)
  {
    id: 's_a1',
    storeId: 'store_spa',
    clientId: 's_c1',
    clientName: 'Beatriz Vasconcelos',
    service: 'Massagem Relaxante com Pedras Quentes',
    date: '2026-10-19',
    time: '15:30',
    status: 'Confirmado',
    price: 240.00
  }
];

export const initialSales: Sale[] = [
  // Vendas Salão Beleza Prime (store_prime)
  {
    id: 's1',
    storeId: 'store_prime',
    clientId: '1',
    clientName: 'Ana Beatriz Santos',
    item: 'Corte de Cabelo',
    category: 'Serviço',
    amount: 320.00,
    date: '2026-10-19',
    paymentMethod: 'Cartão de Crédito'
  },
  {
    id: 's2',
    storeId: 'store_prime',
    clientId: '3',
    clientName: 'Juliana Lima',
    item: 'Kit Home Care Nutrição',
    category: 'Produto',
    amount: 180.00,
    date: '2026-10-19',
    paymentMethod: 'Pix'
  },
  {
    id: 's3',
    storeId: 'store_prime',
    clientId: '5',
    clientName: 'Mariana Costa',
    item: 'Coloração',
    category: 'Serviço',
    amount: 250.00,
    date: '2026-10-18',
    paymentMethod: 'Pix'
  },
  {
    id: 's4',
    storeId: 'store_prime',
    clientId: '6',
    clientName: 'Lucas Mendes',
    item: 'Corte Degradê',
    category: 'Serviço',
    amount: 90.00,
    date: '2026-10-18',
    paymentMethod: 'Dinheiro'
  },

  // Vendas Studio Barber Neon (store_barber)
  {
    id: 'b_s1',
    storeId: 'store_barber',
    clientId: 'b_c1',
    clientName: 'Thiago Oliveira',
    item: 'Corte + Pomada Matte',
    category: 'Serviço',
    amount: 125.00,
    date: '2026-10-19',
    paymentMethod: 'Pix'
  },

  // Vendas Glow Spa (store_spa)
  {
    id: 's_s1',
    storeId: 'store_spa',
    clientId: 's_c1',
    clientName: 'Beatriz Vasconcelos',
    item: 'Pacote Ritual Relaxante',
    category: 'Serviço',
    amount: 450.00,
    date: '2026-10-19',
    paymentMethod: 'Cartão de Crédito'
  }
];

export const initialServices: ServiceItem[] = [
  // Serviços Salão Beleza Prime (store_prime)
  {
    id: 'srv1',
    storeId: 'store_prime',
    name: 'Corte de Cabelo',
    category: 'Cabelo',
    price: 110.00,
    durationMinutes: 45,
    popularityCount: 68,
    percentage: 28
  },
  {
    id: 'srv2',
    storeId: 'store_prime',
    name: 'Escova',
    category: 'Cabelo',
    price: 85.00,
    durationMinutes: 40,
    popularityCount: 54,
    percentage: 22
  },
  {
    id: 'srv3',
    storeId: 'store_prime',
    name: 'Coloração',
    category: 'Cabelo',
    price: 220.00,
    durationMinutes: 120,
    popularityCount: 42,
    percentage: 17
  },
  {
    id: 'srv4',
    storeId: 'store_prime',
    name: 'Manicure',
    category: 'Unhas',
    price: 55.00,
    durationMinutes: 30,
    popularityCount: 38,
    percentage: 15
  },
  {
    id: 'srv5',
    storeId: 'store_prime',
    name: 'Hidratação',
    category: 'Spa',
    price: 140.00,
    durationMinutes: 50,
    popularityCount: 28,
    percentage: 11
  },

  // Serviços Studio Barber Neon (store_barber)
  {
    id: 'b_srv1',
    storeId: 'store_barber',
    name: 'Corte Degradê / Fade',
    category: 'Cabelo',
    price: 65.00,
    durationMinutes: 35,
    popularityCount: 82,
    percentage: 45
  },
  {
    id: 'b_srv2',
    storeId: 'store_barber',
    name: 'Barboterapia com Toalha Quente',
    category: 'Estética',
    price: 50.00,
    durationMinutes: 30,
    popularityCount: 58,
    percentage: 32
  },
  {
    id: 'b_srv3',
    storeId: 'store_barber',
    name: 'Combo Corte + Barba',
    category: 'Cabelo',
    price: 100.00,
    durationMinutes: 55,
    popularityCount: 42,
    percentage: 23
  },

  // Serviços Glow Spa (store_spa)
  {
    id: 's_srv1',
    storeId: 'store_spa',
    name: 'Massagem Relaxante com Aromaterapia',
    category: 'Spa',
    price: 190.00,
    durationMinutes: 60,
    popularityCount: 64,
    percentage: 40
  },
  {
    id: 's_srv2',
    storeId: 'store_spa',
    name: 'Limpeza de Pele Profunda com Ledterapia',
    category: 'Estética',
    price: 210.00,
    durationMinutes: 75,
    popularityCount: 52,
    percentage: 33
  },
  {
    id: 's_srv3',
    storeId: 'store_spa',
    name: 'Drenagem Linfática Facial e Corporal',
    category: 'Spa',
    price: 230.00,
    durationMinutes: 70,
    popularityCount: 44,
    percentage: 27
  }
];

export const initialActivities: Activity[] = [
  // Atividades Salão Beleza Prime (store_prime)
  {
    id: 'act1',
    storeId: 'store_prime',
    title: 'Novo cliente cadastrado',
    description: 'Ana Beatriz Santos',
    time: 'há 2 minutos',
    type: 'client'
  },
  {
    id: 'act2',
    storeId: 'store_prime',
    title: 'Venda registrada',
    description: 'Ana Beatriz Santos',
    time: 'há 15 minutos',
    type: 'sale',
    amount: 'R$ 320,00'
  },
  {
    id: 'act3',
    storeId: 'store_prime',
    title: 'Agendamento confirmado',
    description: 'Juliana Lima',
    time: 'há 32 minutos',
    type: 'appointment'
  },
  {
    id: 'act4',
    storeId: 'store_prime',
    title: 'Cliente inativo',
    description: 'Roberto Alves',
    time: 'há 1 hora',
    type: 'client'
  },
  {
    id: 'act5',
    storeId: 'store_prime',
    title: 'Venda registrada',
    description: 'Juliana Lima',
    time: 'há 2 horas',
    type: 'sale',
    amount: 'R$ 180,00'
  },

  // Atividades Studio Barber Neon (store_barber)
  {
    id: 'b_act1',
    storeId: 'store_barber',
    title: 'Agendamento confirmado',
    description: 'Thiago Oliveira',
    time: 'há 10 minutos',
    type: 'appointment'
  },

  // Atividades Glow Spa (store_spa)
  {
    id: 's_act1',
    storeId: 'store_spa',
    title: 'Novo agendamento',
    description: 'Beatriz Vasconcelos',
    time: 'há 25 minutos',
    type: 'appointment'
  }
];
