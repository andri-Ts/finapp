import type { ITransaction } from '@/types/transaction.types';
import styles from './transactionCard.module.css';
import Card from '@/components/ui/Card';
import { formatCurrency } from '@/utils/formatCurrency';
import type { ICategory } from '@/types/category.types';
import { formatDate } from '@/utils/formatDate';
import { categoryIcons } from '@/constants/categoryIcons';

interface TransactionCardProps {
  transaction: ITransaction;
  category: ICategory;
}

function TransactionCard({ transaction, category }: TransactionCardProps) {
  const CategoryIcon = categoryIcons[category.icon];

  return (
    <Card>
      <article className={styles.card}>
        <div className={styles.info}>
          <h3>{transaction.title}</h3>
          <div className={styles.category}>
            {CategoryIcon && <CategoryIcon size={15} />}
            <span>{category.name}</span>
          </div>
          <p>{formatDate(transaction.date)}</p>
        </div>

        <strong
          className={
            transaction.type === 'expense' ? styles.expense : styles.income
          }
        >
          {transaction.type === 'expense' ? '-' : '+'}
          {formatCurrency(transaction.amount)}
        </strong>
      </article>
    </Card>
  );
}

export default TransactionCard;
