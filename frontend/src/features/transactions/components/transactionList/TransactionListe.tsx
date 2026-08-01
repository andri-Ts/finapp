import type { ITransaction } from '@/types/transaction.types';
import styles from './transactionList.module.css';
import TransactionCard from '../transactionCard';

interface TransactionListeProps {
  transactions: ITransaction[];
}

function TransactionListe(props: TransactionListeProps) {
  return (
    <section className={styles.list}>
      {props.transactions.map((transaction) => (
        <TransactionCard key={transaction.id} transaction={transaction} />
      ))}
    </section>
  );
}

export default TransactionListe;
