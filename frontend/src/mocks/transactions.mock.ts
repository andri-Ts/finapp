import type { ITransaction } from '@/types/transaction.types';

export const mockTransactions: ITransaction[] = [
  {
    id: '1',
    amount: 25,
    type: 'EXPENSE',
    description: 'Restaurant',
    note: null,
    transactionDate: '2026-08-01T12:30:00.000Z',

    account: {
      id: 'acc1',
      name: 'Compte courant',
      icon: 'wallet',
      color: '#4f7cff',
    },

    category: {
      id: 'cat1',
      name: 'Restaurant',
      icon: 'utensils',
      color: '#ef4444',
    },
  },

  {
    id: '2',
    amount: 2000,
    type: 'INCOME',
    description: 'Salaire',
    note: null,
    transactionDate: '2026-08-01T08:00:00.000Z',

    account: {
      id: 'acc1',
      name: 'Compte courant',
      icon: 'wallet',
      color: '#4f7cff',
    },

    category: {
      id: 'cat2',
      name: 'Salaire',
      icon: 'briefcase',
      color: '#22c55e',
    },
  },

  {
    id: '3',
    amount: 4000,
    type: 'INCOME',
    description: 'Salaire2',
    note: null,
    transactionDate: '2026-08-01T08:00:00.000Z',

    account: {
      id: 'acc1',
      name: 'Compte courant',
      icon: 'wallet',
      color: '#4f7cff',
    },

    category: {
      id: 'cat2',
      name: 'Salaire',
      icon: 'briefcase',
      color: '#22c55e',
    },
  },
  {
    id: '4',
    amount: 25,
    type: 'EXPENSE',
    description: 'Restaurant',
    note: null,
    transactionDate: '2026-08-10T12:30:00.000Z',

    account: {
      id: 'acc1',
      name: 'Compte courant',
      icon: 'wallet',
      color: '#4f7cff',
    },

    category: {
      id: 'cat1',
      name: 'Restaurant',
      icon: 'utensils',
      color: '#ef4444',
    },
  },
  {
    id: '5',
    amount: 2000,
    type: 'INCOME',
    description: 'Salaire',
    note: null,
    transactionDate: '2026-08-10T08:00:00.000Z',

    account: {
      id: 'acc1',
      name: 'Compte courant',
      icon: 'wallet',
      color: '#4f7cff',
    },

    category: {
      id: 'cat2',
      name: 'Salaire',
      icon: 'briefcase',
      color: '#22c55e',
    },
  },
  {
    id: '6',
    amount: 4000,
    type: 'INCOME',
    description: 'Salaire2',
    note: null,
    transactionDate: '2026-07-21T08:00:00.000Z',

    account: {
      id: 'acc1',
      name: 'Compte courant',
      icon: 'wallet',
      color: '#4f7cff',
    },

    category: {
      id: 'cat2',
      name: 'Salaire',
      icon: 'briefcase',
      color: '#22c55e',
    },
  },
  {
    id: '7',
    amount: 25,
    type: 'EXPENSE',
    description: 'Restaurant',
    note: null,
    transactionDate: '2026-07-21T12:30:00.000Z',

    account: {
      id: 'acc1',
      name: 'Compte courant',
      icon: 'wallet',
      color: '#4f7cff',
    },

    category: {
      id: 'cat1',
      name: 'Restaurant',
      icon: 'utensils',
      color: '#ef4444',
    },
  },
];
