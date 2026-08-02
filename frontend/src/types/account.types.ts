import type { AccountIconName } from '@/constants/constIcons';

export interface IAccount {
  id: string;
  name: string;
  type: string;
  currency: string;
  currentBalance: number;
  icon: AccountIconName | null;
  color: string | null;
}
