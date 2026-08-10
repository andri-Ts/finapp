import type { IAccount } from '@/types/account.types';

export const mockAccounts: IAccount[] = [
  {
    id: 'cms7j6jxv0000o4u73fel9o1p',
    name: 'Compte courant',
    type: 'BANK',
    currency: 'EUR',
    currentBalance: 1850,
    icon: 'wallet',
    color: '#4f7cff',
  },

  {
    id: 'cmsnixy1u000034u74x6u2dg4',
    name: 'Épargne',
    type: 'SAVINGS',
    currency: 'EUR',
    currentBalance: 1500,
    icon: 'piggy-bank',
    color: '#4CAF50',
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
