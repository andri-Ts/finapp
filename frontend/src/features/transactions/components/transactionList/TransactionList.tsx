import type { ITransaction } from '@/types/transaction.types';
import styles from './transactionList.module.css';
import TransactionCard from '../transactionCard';

interface TransactionListProps {
  transactions: ITransaction[];
}

function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className={styles.list}>
      {transactions.map((transaction) => (
        <TransactionCard key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
}

export default TransactionList;
