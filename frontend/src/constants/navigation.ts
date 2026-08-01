import {
  Calendar,
  Home,
  Tags,
  WalletCards,
  type LucideIcon,
} from 'lucide-react';

interface INavigation {
  label: string;
  path: string;
  icon: LucideIcon;
  showOnDesktop: boolean;
  showOnMobile: boolean;
}

export const navigation: INavigation[] = [
  {
    label: 'Dashboard',
    path: '/',
    icon: Home,
    showOnDesktop: true,
    showOnMobile: true,
  },
  {
    label: 'Calendrier',
    path: '/calendar',
    icon: Calendar,
    showOnDesktop: true,
    showOnMobile: true,
  },
  {
    label: 'Catégories',
    path: '/categories',
    icon: Tags,
    showOnDesktop: true,
    showOnMobile: true,
  },
  {
    label: 'Comptes',
    path: '/accounts',
    icon: WalletCards,
    showOnDesktop: true,
    showOnMobile: true,
  },
];
