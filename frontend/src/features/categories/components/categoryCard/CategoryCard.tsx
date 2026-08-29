import Card from '@/components/ui/Card';
import styles from './categoryCard.module.css';
import type { ICategory } from '@/types/category.types';
import { categoryIcons } from '@/constants/constIcons';
import { formatCurrency } from '@/utils/formatCurrency';
// import DropdownMenu from '@/components/ui/dropdownMenu/DropdownMenu';

interface CategoryCardProps {
  category: ICategory;
  onEdit: (id: string) => void;
  onClick: (id: string) => void;
  // onArchive: (id: string) => void;
}

function CategoryCard({
  category,
  /*onEdit,*/
  onClick /*onArchive*/,
}: CategoryCardProps) {
  const CategoryIcon = category?.icon ? categoryIcons[category.icon] : null;

  // const isExpense = category.type === 'EXPENSE';

  return (
    <Card className={styles.wrapper} interactive>
      <article className={styles.card}>
        <button
          type="button"
          className={styles.button}
          onClick={() => onClick(category.id)}
        >
          <div
            className={styles.icon}
            style={{
              // MODIFICATION : couleur propre à la catégorie
              backgroundColor: category.color ?? 'var(--color-primary)',
            }}
          >
            {CategoryIcon && <CategoryIcon size={24} />}
          </div>

          <h3 className={styles.name}>{category.name}</h3>

          <strong
            className={
              category.type === 'EXPENSE' ? styles.expense : styles.income
            }
          >
            {/* {category.type === 'EXPENSE' ? '-' : '+'} */}
            {formatCurrency(category.monthlyAmount)}
          </strong>
        </button>
      </article>
    </Card>
  );
}

export default CategoryCard;
