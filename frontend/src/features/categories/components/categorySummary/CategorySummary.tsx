import styles from './categorySummary.module.css';
import { formatCurrency } from '@/utils/formatCurrency';

interface CategorySummaryProps {
  amount: number;
  type: 'EXPENSE' | 'INCOME';
}

function CategorySummary({ amount, type }: CategorySummaryProps) {
  const label = type === 'EXPENSE' ? 'Dépenses' : 'Revenus';

  return (
    <div className={styles.summary}>
      <span className={styles.context}>Ce mois-ci</span>

      <div className={styles.content}>
        <span className={styles.label}>{label}</span>

        <strong className={type === 'EXPENSE' ? styles.expense : styles.income}>
          {formatCurrency(amount)}
        </strong>
      </div>
    </div>
  );
}

export default CategorySummary;
