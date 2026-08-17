import type { ITransaction } from '@/types/transaction.types';
import styles from './transactionCard.module.css';
import Card from '@/components/ui/Card';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';
import { categoryIcons } from '@/constants/constIcons';
import Button from '@/components/ui/Button';
import { Trash } from 'lucide-react';

interface TransactionCardProps {
  transaction: ITransaction;
  onDelete?: (id: string) => void;
  onEdit: (id: string) => void;
}

function TransactionCard({
  transaction,
  onDelete,
  onEdit,
}: TransactionCardProps) {
  const CategoryIcon = transaction.category?.icon
    ? categoryIcons[transaction.category.icon]
    : null;

  return (
    <Card>
      <article className={styles.card}>
        <button
          type="button"
          className={styles.content}
          onClick={() => onEdit(transaction.id)}
        >
          <div className={styles.info}>
            <h3>{transaction.description}</h3>
            <div className={styles.category}>
              {CategoryIcon && <CategoryIcon size={15} />}
              <span>{transaction.category?.name ?? 'Sans catégorie'}</span>
            </div>
          </div>

          <div>
            <strong
              className={
                transaction.type === 'EXPENSE' ? styles.expense : styles.income
              }
            >
              {transaction.type === 'EXPENSE' ? '-' : '+'}
              {formatCurrency(transaction.amount)}
            </strong>
            <p>{formatDate(transaction.transactionDate)}</p>
          </div>
        </button>
        {onDelete && (
          <Button type="button" onClick={() => onDelete(transaction.id)}>
            <Trash />
          </Button>
        )}
      </article>
    </Card>
  );
}

export default TransactionCard;
