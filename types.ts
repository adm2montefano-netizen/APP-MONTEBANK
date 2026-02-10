
export enum AppView {
  DASHBOARD = 'dashboard',
  INVESTMENTS = 'investments',
  CARDS = 'cards',
  PIX = 'pix',
  PIGGY_BANK = 'piggy_bank',
  PAYMENTS = 'payments',
  PROFILE = 'profile',
  BILL_PAYMENT = 'bill_payment',
  RECHARGE = 'recharge',
  PUBLIC_CHECKOUT = 'public_checkout'
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: 'credit' | 'debit';
}

export interface Investment {
  id: string;
  name: string;
  category: 'Renda Fixa' | 'Tesouro' | 'Fundos' | 'Ações' | 'FII';
  yield: string;
  liquidity: string;
  minInvestment: number;
  risk: 'Muito Baixo' | 'Baixo' | 'Médio' | 'Alto';
  tags?: string[];
  description?: string;
  userBalance?: number;
}

export interface CardData {
  number: string;
  holder: string;
  expiry: string;
  cvv: string;
  limit: number;
  used: number;
  isVirtual: boolean;
  isBlocked: boolean;
}

export interface PiggyGoal {
  id: string;
  title: string;
  target: number;
  current: number;
  deadline: string;
}

export interface PaymentLink {
  id: string;
  amount: number;
  description: string;
  status: 'active' | 'paid' | 'expired';
  createdAt: string;
  url: string;
  dueDate?: string;
  dueTime?: string;
}
