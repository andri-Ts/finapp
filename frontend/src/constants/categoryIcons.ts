import { ShoppingCart, Tv, Wallet, type LucideIcon } from 'lucide-react';

// Record<string, LucideIcon>:  Un objet dont les clés sont des chaînes et les valeurs sont des composants Lucide.
export const categoryIcons: Record<string, LucideIcon> = {
  'shopping-cart': ShoppingCart,
  wallet: Wallet,
  tv: Tv,
};
