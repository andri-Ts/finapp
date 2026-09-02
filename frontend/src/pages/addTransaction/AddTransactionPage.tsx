import PageHeader from '@/components/layout/pageHeader';
import styles from './addTransactionPage.module.css';
import TransactionForm from '@/features/transactions/components/transactionForm';

function AddTransactionPage() {
  return (
    <section className={`${styles.page} ${styles.fullscreen}`}>
      <PageHeader title="Nouvelle transaction" />

      <TransactionForm />
    </section>
  );
}

export default AddTransactionPage;
