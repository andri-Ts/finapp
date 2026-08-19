import { formatDate } from '@/utils/formatDate';
import styles from './dayTransaction.module.css';
import { formatCurrency } from '@/utils/formatCurrency';
import type { ITransaction } from '@/types/transaction.types';

interface DayTransactionsProps {
  selectedDate: Date;
  transactions: ITransaction[];
}

function DayTransactions({ selectedDate, transactions }: DayTransactionsProps) {
  // retourne les transactions qui correspond à la date sélectionné
  const transactionsOfDay = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.transactionDate);

    return (
      transactionDate.getDate() === selectedDate.getDate() &&
      transactionDate.getMonth() === selectedDate.getMonth() &&
      transactionDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  return (
    <section className={styles.container}>
      <h3>{formatDate(selectedDate)}</h3>

      <div className={styles.list}>
        {transactionsOfDay.map((transaction) => (
          <article key={transaction.id} className={styles.transaction}>
            {/* <span>{transaction.category?.icon}</span> */}
            <span className={styles.description}>
              {transaction.description}
            </span>

            <strong
              className={
                transaction.type === 'EXPENSE' ? styles.expense : styles.income
              }
            >
              {transaction.type === 'EXPENSE' ? '-' : '+'}
              {formatCurrency(transaction.amount)}
            </strong>
          </article>
        ))}
      </div>
    </section>
  );
}

export default DayTransactions;
