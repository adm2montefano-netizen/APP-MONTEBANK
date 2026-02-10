
import { Transaction, Investment, CardData, PiggyGoal } from './types';

export const COLORS = {
  deepPetroleum: '#0a0f1d',
  montbankBlue: '#1A237E',
  electricBlue: '#2979FF',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  darkGray: '#424242'
};

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', description: 'Netflix Subscription', amount: 55.90, category: 'Lazer', date: '2023-10-25', type: 'debit' },
  { id: '2', description: 'Restaurante Fogo de Chão', amount: 320.00, category: 'Alimentação', date: '2023-10-24', type: 'debit' },
  { id: '3', description: 'Salary Deposit', amount: 12500.00, category: 'Renda', date: '2023-10-01', type: 'credit' },
  { id: '4', description: 'Apple Store Purchase', amount: 1500.00, category: 'Tecnologia', date: '2023-10-22', type: 'debit' },
  { id: '5', description: 'Uber Trip', amount: 45.30, category: 'Transporte', date: '2023-10-21', type: 'debit' },
];

export const MOCK_INVESTMENTS: Investment[] = [
  { 
    id: '1', 
    name: 'CDB Montbank 110%', 
    category: 'Renda Fixa', 
    yield: '110% do CDI', 
    liquidity: 'Diária', 
    minInvestment: 1.00, 
    risk: 'Baixo', 
    tags: ['Mais Popular'],
    description: 'Rentabilidade superior ao CDI com a segurança de um banco sólido e liquidez imediata para seus projetos.',
    userBalance: 50000
  },
  { 
    id: '2', 
    name: 'Tesouro Selic 2029', 
    category: 'Tesouro', 
    yield: 'SELIC + 0.10%', 
    liquidity: 'D+1', 
    minInvestment: 145.50, 
    risk: 'Muito Baixo',
    userBalance: 25000
  },
  { 
    id: '3', 
    name: 'LCI Imobiliário', 
    category: 'Renda Fixa', 
    yield: '98% do CDI', 
    liquidity: '90 dias', 
    minInvestment: 1000.00, 
    risk: 'Baixo', 
    tags: ['Isento de IR'] 
  },
  { 
    id: '4', 
    name: 'Montbank Tech Global', 
    category: 'Fundos', 
    yield: '14.5% a.a. (est.)', 
    liquidity: 'D+5', 
    minInvestment: 100.00, 
    risk: 'Médio', 
    tags: ['Exclusivo'],
    description: 'Acesso às maiores empresas de tecnologia do mundo gerido por especialistas do Montbank.'
  },
  { 
    id: '5', 
    name: 'Tesouro IPCA+ 2045', 
    category: 'Tesouro', 
    yield: 'IPCA + 5.80%', 
    liquidity: 'D+1', 
    minInvestment: 35.70, 
    risk: 'Muito Baixo' 
  },
  { 
    id: '6', 
    name: 'Fundo Multimercado Alpha', 
    category: 'Fundos', 
    yield: 'CDI + 2.50%', 
    liquidity: 'D+10', 
    minInvestment: 500.00, 
    risk: 'Médio' 
  }
];

export const MOCK_CARDS: CardData[] = [
  {
    number: '**** **** **** 8829',
    holder: 'MARCOS MONTGOMERY',
    expiry: '09/28',
    cvv: '123',
    limit: 25000,
    used: 4200,
    isVirtual: false,
    isBlocked: false
  },
  {
    number: '**** **** **** 1104',
    holder: 'MARCOS MONTGOMERY',
    expiry: '12/26',
    cvv: '998',
    limit: 5000,
    used: 120,
    isVirtual: true,
    isBlocked: false
  }
];

export const MOCK_GOALS: PiggyGoal[] = [
  { id: '1', title: 'Viagem Japão', target: 25000, current: 12400, deadline: '2024-12-01' },
  { id: '2', title: 'Reserva Emergência', target: 60000, current: 45000, deadline: '2024-06-01' },
];
