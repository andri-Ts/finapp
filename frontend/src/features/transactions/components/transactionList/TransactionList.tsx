import type { ITransaction } from '@/types/transaction.types';
import styles from './transactionList.module.css';
import TransactionCard from '../transactionCard';

interface TransactionListProps {
  transactions: ITransaction[];
  onDelete?: (id: string) => void;
  onEdit: (id: string) => void;
}

function TransactionList({
  transactions,
  onDelete,
  onEdit,
}: TransactionListProps) {
  return (
    <div className={styles.list}>
      {transactions.map((transaction) => (
        <TransactionCard
          key={transaction.id}
          transaction={transaction}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default TransactionList;
