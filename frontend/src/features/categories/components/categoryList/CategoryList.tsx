import type { ICategory } from '@/types/category.types';
import styles from './categoryList.module.css';
import CategoryCard from '../categoryCard';

interface CategoryListProps {
  categories: ICategory[];
  onEdit: (id: string) => void;
  onClick: (id: string) => void;
  // onArchive: (id: string) => void;
}

function CategoryList({
  categories,
  onEdit,
  onClick /*onArchive*/,
}: CategoryListProps) {
  return (
    <div className={styles.list}>
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onEdit={onEdit}
          onClick={onClick}
          // onArchive={onArchive}
        />
      ))}
    </div>
  );
}

export default CategoryList;
