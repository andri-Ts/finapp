import { CategoryType } from '../generated/prisma/enums.js';

export const defaultCategories = [
  {
    name: 'Logement',
    type: CategoryType.EXPENSE,
    icon: 'house-plug',
  },
  {
    name: 'Restauration',
    type: CategoryType.EXPENSE,
    icon: 'utensils',
  },
  {
    name: 'Transport',
    type: CategoryType.EXPENSE,
    icon: 'car',
  },
  {
    name: 'Loisirs',
    type: CategoryType.EXPENSE,
    icon: 'gamepad-2',
  },
  {
    name: 'Santé',
    type: CategoryType.EXPENSE,
    icon: 'heart-plus',
  },
  {
    name: 'Shopping',
    type: CategoryType.EXPENSE,
    icon: 'shopping',
  },
  {
    name: 'Autre dépense',
    type: CategoryType.EXPENSE,
    icon: 'banknote-arrow-down',
  },
  {
    name: 'Salaire',
    type: CategoryType.INCOME,
    icon: 'hand-coins',
  },
  {
    name: 'Cadeaux',
    type: CategoryType.INCOME,
    icon: 'gift',
  },
  {
    name: 'Autre revenus',
    type: CategoryType.INCOME,
    icon: 'wallet',
  },
];
