import type { ITransaction } from '@/types/transaction.types';
import styles from './transactionCard.module.css';
import Card from '@/components/ui/Card';

interface TransactionCardProps {
  transaction: ITransaction;
}

function TransactionCard({ transaction }: TransactionCardProps) {
  return (
    <Card>
      <article className={styles.card}>
        <div>
          <h3>{transaction.title}</h3>
          <p>{transaction.date}</p>
        </div>
        <strong>
          {transaction.type === 'expense' ? '-' : '+'}
          {transaction.amount} €
        </strong>
      </article>
    </Card>
  );
}

export default TransactionCard;
