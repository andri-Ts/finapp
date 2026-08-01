import styles from './transactions.module.css';
import TransactionListe from '@/features/transactions/components/transactionList';
import { transactions } from '@/mocks/transactions.mock';

function TransactionsPage() {
  return (
    <section>
      <h1>Transactions</h1>

      <TransactionListe transactions={transactions} />
    </section>
  );
}

export default TransactionsPage;
