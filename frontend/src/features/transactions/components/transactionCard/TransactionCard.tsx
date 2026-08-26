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
  // Transfert ni dépense ni revenue
  const isExpense = transaction.type === 'EXPENSE';
  const isIncome = transaction.type === 'INCOME';
  const isTransfer = transaction.type === 'TRANSFER';

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
          {/* =================================================
              ICÔNE
          ================================================= */}
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
              <span>{isTransfer ? '↔' : '•'}</span>
            )}
          </span>

          {/* =================================================
              INFORMATIONS PRINCIPALES
              ================================================= */}
          <div className={styles.info}>
            <p className={styles.description}>
              {transaction.description || '(Sans descritption)'}
            </p>
            {isTransfer ? (
              <span className={styles.category}>
                {transaction.account.name}
                {transaction.transferDestinationAccount && (
                  <>
                    {' → '}
                    {transaction.transferDestinationAccount.name}
                  </>
                )}
              </span>
            ) : (
              <span className={styles.category}>
                {transaction.category?.name ?? '(Sans catégorie)'}
              </span>
            )}
          </div>

          {/* =================================================
              MONTANT + DATE
              ================================================= */}
          <div className={styles.meta}>
            <strong
              className={
                isExpense
                  ? styles.expense
                  : isIncome
                    ? styles.income
                    : styles.transfer
              }
            >
              {isExpense && '-'}
              {isIncome && '+'}
              {/* Un transfert n'a pas de signe */}
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
