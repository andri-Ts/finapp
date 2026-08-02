import type { ITransaction } from '@/types/transaction.types';
import styles from './transactionList.module.css';
import TransactionCard from '../transactionCard';
import { categories } from '@/mocks/categories.mock';

interface TransactionListProps {
  transactions: ITransaction[];
}

function TransactionList(props: TransactionListProps) {
  return (
    <div className={styles.list}>
      {props.transactions.map((transaction) => {
        const category = categories.find(
          (category) => category.id === transaction.categoryId,
        ); // connaitre le catégorie de la transaction

        // find(...) renvoie: Category | undefined, TypeScript nous oblige à gérer le cas où la catégorie n'existe pas.
        if (!category) {
          return null;
        }

        return (
          <TransactionCard
            key={transaction.id}
            transaction={transaction}
            category={category}
          />
        );
      })}
    </div>
  );
}

export default TransactionList;
