import type { ITransaction } from '@/types/transaction.types';

export const mockTransactions: ITransaction[] = [
  {
    id: '1',

    title: 'Courses Carrefour',

    amount: 45.9,

    type: 'expense',

    date: '2026-08-01',

    categoryId: '1111',

    accountId: 'bank',

    createdAt: '2026-08-01',
  },

  {
    id: '2',

    title: 'Salaire',

    amount: 2500,

    type: 'income',

    date: '2026-08-02',

    categoryId: '2222',

    accountId: 'bank',

    createdAt: '2026-08-02',
  },

  {
    id: '3',

    title: 'Netflix',

    amount: 13.99,

    type: 'expense',

    date: '2026-08-03',

    categoryId: '3333',

    accountId: 'bank',

    createdAt: '2026-08-03',
  },
];
