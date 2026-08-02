import type { ITransaction } from '@/types/transaction.types';
import styles from './transactionCard.module.css';
import Card from '@/components/ui/Card';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';
import { categoryIcons } from '@/constants/constIcons';

interface TransactionCardProps {
  transaction: ITransaction;
}

function TransactionCard({ transaction }: TransactionCardProps) {
  const CategoryIcon = transaction.category?.icon
    ? categoryIcons[transaction.category.icon]
    : null;

  return (
    <Card>
      <article className={styles.card}>
        <div className={styles.info}>
          <h3>{transaction.description}</h3>
          <div className={styles.category}>
            {CategoryIcon && <CategoryIcon size={15} />}
            <span>{transaction.category?.name ?? 'Sans catégorie'}</span>
          </div>
          <p>{formatDate(transaction.transactionDate)}</p>
        </div>

        <strong
          className={
            transaction.type === 'EXPENSE' ? styles.expense : styles.income
          }
        >
          {transaction.type === 'EXPENSE' ? '-' : '+'}
          {formatCurrency(transaction.amount)}
        </strong>
      </article>
    </Card>
  );
}

export default TransactionCard;
