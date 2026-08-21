import Card from '@/components/ui/Card';
import styles from './categoryCard.module.css';
import type { ICategory } from '@/types/category.types';
import { categoryIcons } from '@/constants/constIcons';
import { formatCurrency } from '@/utils/formatCurrency';
// import DropdownMenu from '@/components/ui/dropdownMenu/DropdownMenu';

interface CategoryCardProps {
  category: ICategory;
  // onEdit: (category: ICategory) => void;
  // onArchive: (id: string) => void;
}

function CategoryCard({ category /* onEdit, onArchive*/ }: CategoryCardProps) {
  const CategoryIcon = category?.icon ? categoryIcons[category.icon] : null;

  // const isExpense = category.type === 'EXPENSE';

  return (
    <Card>
      <article
        className={styles.card}
        style={
          {
            '--category-color': category.color ?? 'var(--color-primary)',
          } as React.CSSProperties
        }
      >
        <div className={styles.icon}>
          {CategoryIcon && <CategoryIcon size={24} />}
        </div>

        <h3 className={styles.name}>{category.name}</h3>

        <strong
          className={
            category.type === 'EXPENSE' ? styles.expense : styles.income
          }
        >
          {category.type === 'EXPENSE' ? '-' : '+'}
          {formatCurrency(category.monthlyAmount)}
        </strong>
      </article>
    </Card>
  );
}

export default CategoryCard;
