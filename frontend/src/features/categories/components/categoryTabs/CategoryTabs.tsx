import type { CategoryType } from '@/types/category.types';
import styles from './categoryTabs.module.css';

interface CategoryTabsProps {
  selectedType: CategoryType;
  onChange: (type: CategoryType) => void;
}

function CategoryTabs({ selectedType, onChange }: CategoryTabsProps) {
  return (
    <div className={styles.tabs} role="tablist" aria-label="Type de catégorie">
      <button
        type="button"
        role="tab"
        aria-selected={selectedType === 'EXPENSE'}
        className={`${styles.tab} ${
          selectedType === 'EXPENSE' ? styles.active : ''
        }`}
        onClick={() => onChange('EXPENSE')}
      >
        Dépenses
      </button>

      <button
        type="button"
        role="tab"
        aria-selected={selectedType === 'INCOME'}
        className={`${styles.tab} ${
          selectedType === 'INCOME' ? styles.active : ''
        }`}
        onClick={() => onChange('INCOME')}
      >
        Revenus
      </button>
    </div>
  );
}

export default CategoryTabs;
