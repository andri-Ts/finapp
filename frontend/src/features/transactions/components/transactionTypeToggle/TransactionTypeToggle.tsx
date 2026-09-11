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
  allowedTypes?: TransactionType[];
}

function TransactionTypeToggle({
  value,
  onChange,
  allowedTypes = ['EXPENSE', 'INCOME', 'TRANSFER'],
}: TransactionTypeToggleProps) {
  const groupClassName =
    allowedTypes.length === 2
      ? `${styles.buttonGroup} ${styles.twoButtons}`
      : styles.buttonGroup;

  return (
    <div className={groupClassName}>
      {allowedTypes.includes('EXPENSE') && (
        <button
          type="button"
          className={`${styles.button} ${
            value === 'EXPENSE' ? styles.activeExpense : ''
          }`}
          onClick={() => onChange('EXPENSE')}
        >
          Dépense
        </button>
      )}

      {allowedTypes.includes('INCOME') && (
        <button
          type="button"
          className={`${styles.button} ${
            value === 'INCOME' ? styles.activeIncome : ''
          }`}
          onClick={() => onChange('INCOME')}
        >
          Revenu
        </button>
      )}

      {allowedTypes.includes('TRANSFER') && (
        <button
          type="button"
          className={`${styles.button} ${value === 'TRANSFER' ? styles.activeTransfer : ''}`}
          onClick={() => onChange('TRANSFER')}
        >
          {' '}
          Transfert{' '}
        </button>
      )}
    </div>
  );
}

export default TransactionTypeToggle;
