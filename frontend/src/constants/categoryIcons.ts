import {
  Utensils,
  Wallet,
  Briefcase,
  Car,
  ShoppingCart,
  Coffee,
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

export type CategoryIconName = keyof typeof categoryIcons;
