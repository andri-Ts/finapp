import styles from './transactionTypeToggle.module.css';
import type { TransactionType } from '@/types/transaction.types';

interface TransactionTypeToggleProps {
  value: TransactionType;
  onChange: (type: TransactionType) => void;
}

function TransactionTypeToggle({
  value,
  onChange,
}: TransactionTypeToggleProps) {
  return (
    <div className={styles.container}>
      <button
        type="button"
        className={`${styles.button} ${
          value === 'EXPENSE' ? styles.activeExpense : ''
        }`}
        onClick={() => onChange('EXPENSE')}
      >
        Dépense
      </button>

      <button
        type="button"
        className={`${styles.button} ${
          value === 'INCOME' ? styles.activeIncome : ''
        }`}
        onClick={() => onChange('INCOME')}
      >
        Revenu
      </button>
    </div>
  );
}

export default TransactionTypeToggle;
