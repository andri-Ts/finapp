import {
  Utensils,
  Wallet,
  Briefcase,
  Car,
  ShoppingCart,
  Coffee,
  PiggyBank,
  CreditCard,
  Banknote,
} from 'lucide-react';

// Record<string, LucideIcon>:  Un objet dont les clés sont des chaînes et les valeurs sont des composants Lucide.
export const categoryIcons = {
  utensils: Utensils,
  wallet: Wallet,
  briefcase: Briefcase,
  car: Car,
  shopping: ShoppingCart,
  coffee: Coffee,
};

export const accountIcons = {
  wallet: Wallet,
  'piggy-bank': PiggyBank,
  'credit-card': CreditCard,
  cash: Banknote,
};

export type CategoryIconName = keyof typeof categoryIcons;
export type AccountIconName = keyof typeof accountIcons;
