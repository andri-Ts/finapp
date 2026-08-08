import type { CategoryIconName } from '@/constants/constIcons';
import type { IDropdownItem } from './dropdown.types';

export type CatgoryType = 'EXPENSE' | 'INCOME';

export interface ICategory extends IDropdownItem {
  type: CatgoryType;
  color: string | null;
  icon: CategoryIconName | null; // string et non lucid react car le backend ne renverra jamais un composant React. (correspondance  plutard)
  monthlyAmount: number;
}
