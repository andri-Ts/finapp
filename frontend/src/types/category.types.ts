import type { CategoryIconName } from '@/constants/constIcons';

export interface ICategory {
  id: string;
  name: string;
  color: string | null;
  icon: CategoryIconName | null; // string et non lucid react car le backend ne renverra jamais un composant React. (correspondance  plutard)
}
