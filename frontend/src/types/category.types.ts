export interface ICategory {
  id: string;
  name: string;
  color: string;
  icon: string; // string et non lucid react car le backend ne renverra jamais un composant React. (correspondance  plutard)
}
