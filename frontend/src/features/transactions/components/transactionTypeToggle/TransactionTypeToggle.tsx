import styles from './transactionTypeToggle.module.css';
import type { TransactionType } from '@/types/transaction.types';

// Le toggle permet actuellement de choisir uniquement entre dépense et revenu. // TRANSFER sera géré séparément lorsque nous construirons // la fonctionnalité de transfert.
// type TransactionTypeToggleValue = Extract<
//   TransactionType,
//   'EXPENSE' | 'INCOME'
// >;

interface TransactionTypeToggleProps {
  value: TransactionType;
  onChange: (type: TransactionType) => void;
}

function TransactionTypeToggle({
  value,
  onChange,
}: TransactionTypeToggleProps) {
  return (
    <div className={styles.buttonGroup}>
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

      <button
        type="button"
        className={`${styles.button} ${value === 'TRANSFER' ? styles.activeTransfer : ''}`}
        onClick={() => onChange('TRANSFER')}
      >
        {' '}
        Transfert{' '}
      </button>
    </div>
  );
}

export default TransactionTypeToggle;
