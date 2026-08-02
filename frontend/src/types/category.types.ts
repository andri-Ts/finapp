import type { CategoryIconName } from '@/constants/constIcons';

export type CatgoryType = 'EXPENSE' | 'INCOME';

export interface ICategory {
  id: string;
  name: string;
  type: CatgoryType;
  color: string | null;
  icon: CategoryIconName | null; // string et non lucid react car le backend ne renverra jamais un composant React. (correspondance  plutard)
  monthlyAmount: number;
}
