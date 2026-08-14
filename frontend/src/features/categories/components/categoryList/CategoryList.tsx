import type { ICategory } from '@/types/category.types';
import styles from './categoryList.module.css';
import CategoryCard from '../categoryCard';

interface CategoryListProps {
  categories: ICategory[];
  onEdit: (category: ICategory) => void;
  onArchive: (id: string) => void;
}

function CategoryList({ categories, onEdit, onArchive }: CategoryListProps) {
  return (
    <div className={styles.list}>
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onEdit={onEdit}
          onArchive={onArchive}
        />
      ))}
    </div>
  );
}

export default CategoryList;
