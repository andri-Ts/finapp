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

// {
//         "id": "cmsm8fbd1000068u7k8l5wdif",
//         "amount": "25",
//         "type": "EXPENSE",
//         "description": "course auchan",
//         "note": null,
//         "transactionDate": "2026-08-09T00:00:00.000Z",
//         "transferGroupId": null,
//         "createdAt": "2026-08-09T20:05:22.886Z",
//         "updatedAt": "2026-08-09T20:05:22.886Z",
//         "accountId": "cms7j6jxv0000o4u73fel9o1p",
//         "categoryId": "cms4x4op5000410u7ksnxgwa1",
//         "account": {
//             "id": "cms7j6jxv0000o4u73fel9o1p",
//             "name": "Compte courant",
//             "color": null,
//             "icon": null
//         },
//         "category": {
//             "id": "cms4x4op5000410u7ksnxgwa1",
//             "name": "Restauration",
//             "color": null,
//             "icon": null
//         }
//     },
//     {
//         "id": "cmsm8q5ib000168u7qe59gfkd",
//         "amount": "25",
//         "type": "INCOME",
//         "description": "test_01_transaction_income",
//         "note": null,
//         "transactionDate": "2026-08-09T00:00:00.000Z",
//         "transferGroupId": null,
//         "createdAt": "2026-08-09T20:13:48.515Z",
//         "updatedAt": "2026-08-09T20:13:48.515Z",
//         "accountId": "cms7j6jxv0000o4u73fel9o1p",
//         "categoryId": "cms4x4op5000910u79zm38avi",
//         "account": {
//             "id": "cms7j6jxv0000o4u73fel9o1p",
//             "name": "Compte courant",
//             "color": null,
//             "icon": null
//         },
//         "category": {
//             "id": "cms4x4op5000910u79zm38avi",
//             "name": "Salaire",
//             "color": null,
//             "icon": null
//         }
//     },
//     {
//         "id": "cms7j9uys0001o4u7622koz1k",
//         "amount": "25",
//         "type": "EXPENSE",
//         "description": "Loyer",
//         "note": null,
//         "transactionDate": "2026-07-30T12:00:00.000Z",
//         "transferGroupId": null,
//         "createdAt": "2026-07-30T13:12:31.493Z",
//         "updatedAt": "2026-07-30T13:12:31.493Z",
//         "accountId": "cms7j6jxv0000o4u73fel9o1p",
//         "categoryId": "cms4x4op4000310u7ojn18c6f",
//         "account": {
//             "id": "cms7j6jxv0000o4u73fel9o1p",
//             "name": "Compte courant",
//             "color": null,
//             "icon": null
//         },
//         "category": {
//             "id": "cms4x4op4000310u7ojn18c6f",
//             "name": "Logement",
//             "color": null,
//             "icon": null
//         }
//     }
