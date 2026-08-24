import type { ITransaction } from '@/types/transaction.types';
import styles from './transactionCard.module.css';
import Card from '@/components/ui/Card';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';
import { categoryIcons } from '@/constants/constIcons';
// import Button from '@/components/ui/Button';
// import { Trash } from 'lucide-react';

interface TransactionCardProps {
  transaction: ITransaction;
  onDelete?: (id: string) => void;
  onEdit: (id: string) => void;
}

function TransactionCard({
  transaction,
  // onDelete,
  onEdit,
}: TransactionCardProps) {
  const CategoryIcon = transaction.category?.icon
    ? categoryIcons[transaction.category.icon]
    : null;

  const isExpense = transaction.type === 'EXPENSE';

  return (
    <Card>
      <article className={styles.card}>
        <button
          type="button"
          className={styles.content}
          onClick={() => onEdit(transaction.id)}
        >
          <span
            className={styles.categoryIcon}
            style={
              transaction.category?.color
                ? {
                    color: transaction.category.color,
                    backgroundColor: `${transaction.category.color}18`,
                  }
                : undefined
            }
            aria-hidden="true"
          >
            {CategoryIcon ? (
              <CategoryIcon size={20} strokeWidth={2} />
            ) : (
              <span>•</span>
            )}
          </span>

          {/* Informations principales de la transaction */}
          <div className={styles.info}>
            <p className={styles.description}>
              {transaction.description || '(Sans descritption)'}
            </p>
            <span className={styles.category}>
              {transaction.category?.name ?? '(Sans catégorie)'}
            </span>
          </div>

          <div className={styles.meta}>
            <strong className={isExpense ? styles.expense : styles.income}>
              {isExpense ? '-' : '+'}
              {formatCurrency(transaction.amount)}
            </strong>
            <span className={styles.date}>
              {formatDate(transaction.transactionDate)}
            </span>
          </div>
        </button>
        {/* {onDelete && (
          <Button type="button" onClick={() => onDelete(transaction.id)}>
            <Trash />
          </Button>
        )} */}
      </article>
    </Card>
  );
}

export default TransactionCard;
