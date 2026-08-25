import {
  Utensils,
  Wallet,
  Briefcase,
  Car,
  ShoppingCart,
  // Coffee,
  PiggyBank,
  CreditCard,
  Banknote,
  HousePlug,
  Gift,
  HandCoins,
  Gamepad2,
  HeartPlus,
  BanknoteArrowDown,
} from 'lucide-react';

// Record<string, LucideIcon>:  Un objet dont les clés sont des chaînes et les valeurs sont des composants Lucide.
export const categoryIcons = {
  utensils: Utensils,
  wallet: Wallet,
  briefcase: Briefcase,
  car: Car,
  shopping: ShoppingCart,
  'house-plug': HousePlug,
  gift: Gift,
  'hand-coins': HandCoins,
  'gamepad-2': Gamepad2,
  'heart-plus': HeartPlus,
  'banknote-arrow-down': BanknoteArrowDown,
};

export const accountIcons = {
  wallet: Wallet,
  'piggy-bank': PiggyBank,
  'credit-card': CreditCard,
  cash: Banknote,
};

export type CategoryIconName = keyof typeof categoryIcons;
export type AccountIconName = keyof typeof accountIcons;

export const iconSizes = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
} as const;
