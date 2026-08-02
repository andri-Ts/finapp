import type { ICategory } from '@/types/category.types';
import styles from './categoryList.module.css';
import CategoryCard from '../categoryCard';

interface CategoryListProps {
  categories: ICategory[];
}

function CategoryList({ categories }: CategoryListProps) {
  return (
    <div className={styles.list}>
      {categories.map((category) => (
        <CategoryCard category={category} />
      ))}
    </div>
  );
}

export default CategoryList;
