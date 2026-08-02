import type { IAccount } from '@/types/account.types';

export const mockAccounts: IAccount[] = [
  {
    id: 'acc1',
    name: 'Compte courant',
    type: 'BANK',
    currency: 'EUR',
    currentBalance: 1850,
    icon: 'wallet',
    color: '#4f7cff',
  },

  {
    id: 'acc2',
    name: 'Épargne',
    type: 'SAVINGS',
    currency: 'EUR',
    currentBalance: 5200,
    icon: 'piggy-bank',
    color: '#22c55e',
  },

  {
    id: 'acc3',
    name: 'Espèces',
    type: 'CASH',
    currency: 'EUR',
    currentBalance: 95,
    icon: 'cash',
    color: '#f59e0b',
  },
];
