import styles from './transactionTypeToggle.module.css';
import type { TransactionType } from '@/types/transaction.types';

// Le toggle permet actuellement de choisir uniquement entre dépense et revenu. // TRANSFER sera géré séparément lorsque nous construirons // la fonctionnalité de transfert.
type TransactionTypeToggleValue = Extract<
  TransactionType,
  'EXPENSE' | 'INCOME'
>;

interface TransactionTypeToggleProps {
  value: TransactionTypeToggleValue;
  onChange: (type: TransactionTypeToggleValue) => void;
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
