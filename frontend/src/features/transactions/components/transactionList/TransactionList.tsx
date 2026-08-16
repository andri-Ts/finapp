import type { ITransaction } from '@/types/transaction.types';
import styles from './transactionList.module.css';
import TransactionCard from '../transactionCard';

interface TransactionListProps {
  transactions: ITransaction[];
  onDelete?: (id: string) => void;
}

function TransactionList({ transactions, onDelete }: TransactionListProps) {
  return (
    <div className={styles.list}>
      {transactions.map((transaction) => (
        <TransactionCard
          key={transaction.id}
          transaction={transaction}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TransactionList;
