import Card from '@/components/ui/Card';
import styles from './categoryCard.module.css';
import type { ICategory } from '@/types/category.types';
import { categoryIcons } from '@/constants/constIcons';
import { formatCurrency } from '@/utils/formatCurrency';

interface CategoryCardProps {
  category: ICategory;
}

function CategoryCard({ category }: CategoryCardProps) {
  const CategoryIcon = category?.icon ? categoryIcons[category.icon] : null;

  return (
    <Card>
      <article className={styles.card}>
        <div className={styles.left}>
          <div
            className={styles.icon}
            style={{
              backgroundColor: category.color ?? 'var(--color-primary)',
            }}
          >
            {CategoryIcon && <CategoryIcon size={20} />}
          </div>

          <div className={styles.info}>
            <h3 className={styles.name}>{category.name}</h3>

            <span className={styles.type}>
              {category.type === 'EXPENSE' ? 'Dépense' : 'Revenu'}
            </span>
          </div>
        </div>

        <div className={styles.right}>
          <strong
            className={
              category.type === 'EXPENSE' ? styles.expense : styles.income
            }
          >
            {category.type === 'EXPENSE' ? '-' : '+'}

            {formatCurrency(category.monthlyAmount)}
          </strong>

          <span className={styles.period}>Ce mois</span>
        </div>
      </article>
    </Card>
  );
}

export default CategoryCard;
