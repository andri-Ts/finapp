import type { ICategory } from '@/types/category.types';

export const mockCategories: ICategory[] = [
  {
    id: 'cat1',
    name: 'Restaurant',
    type: 'EXPENSE',
    icon: 'utensils',
    color: '#ef4444',
    monthlyAmount: 248,
  },

  {
    id: 'cat2',
    name: 'Transport',
    type: 'EXPENSE',
    icon: 'car',
    color: '#3b82f6',
    monthlyAmount: 112,
  },

  {
    id: 'cat3',
    name: 'Courses',
    type: 'EXPENSE',
    icon: 'shopping',
    color: '#22c55e',
    monthlyAmount: 384,
  },

  {
    id: 'cat4',
    name: 'Salaire',
    type: 'INCOME',
    icon: 'briefcase',
    color: '#22c55e',
    monthlyAmount: 2000,
  },
];
