import type { CategoryIconName } from '@/constants/constIcons';
import type { IDropdownItem } from './dropdown.types';
import type { ITransaction } from './transaction.types';

export type CategoryType = 'EXPENSE' | 'INCOME';

export interface ICategory extends IDropdownItem {
  type: CategoryType;
  color: string | null;
  icon: CategoryIconName | null; // string et non lucid react car le backend ne renverra jamais un composant React. (correspondance  plutard)
  monthlyAmount: number;
}

export interface ICategoryDetail extends Omit<ICategory, 'monthlyAmount'> {} // prend l'interface ICategory sans 'monthlyAmount"

export interface ICategoryDetailResponse {
  category: ICategoryDetail;
  transactions: ITransaction[];
}
