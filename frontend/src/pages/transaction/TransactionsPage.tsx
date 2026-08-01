import PageHeader from '@/components/layout/pageHeader';
import styles from './transactionsPage.module.css';
import TransactionListe from '@/features/transactions/components/transactionList';
import { transactions } from '@/mocks/transactions.mock';
import Button from '@/components/ui/Button';

function TransactionsPage() {
  return (
    <section className={styles.page}>
      <PageHeader title="Transactions" action={<Button>Ajouter</Button>} />

      <TransactionListe transactions={transactions} />
    </section>
  );
}

export default TransactionsPage;
