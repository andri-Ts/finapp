import type { AccountIconName } from '@/constants/constIcons';
import type { IDropdownItem } from './dropdown.types';

export interface IAccount extends IDropdownItem {
  type: string;
  currency: string;
  currentBalance: number;
  icon: AccountIconName | null;
  color: string | null;
}
