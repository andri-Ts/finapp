import type { CategoryType } from '@/types/category.types';
import styles from './categoryTabs.module.css';

interface CategoryTabsProps {
  activeType: CategoryType;
  onChange: (type: CategoryType) => void;
}

function CategoryTabs({ activeType, onChange }: CategoryTabsProps) {
  return (
    <div className={styles.tabs} role="tablist" aria-label="Type de catégorie">
      <button
        type="button"
        role="tab"
        aria-selected={activeType === 'EXPENSE'}
        className={`${styles.tab} ${
          activeType === 'EXPENSE' ? styles.active : ''
        }`}
        onClick={() => onChange('EXPENSE')}
      >
        Dépenses
      </button>

      <button
        type="button"
        role="tab"
        aria-selected={activeType === 'INCOME'}
        className={`${styles.tab} ${
          activeType === 'INCOME' ? styles.active : ''
        }`}
        onClick={() => onChange('INCOME')}
      >
        Revenus
      </button>
    </div>
  );
}

export default CategoryTabs;
