import PageHeader from '@/components/layout/pageHeader';
import styles from './transactionsPage.module.css';
import TransactionListe from '@/features/transactions/components/transactionList';
import { mockTransactions } from '@/mocks/transactions.mock';
import Button from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

function TransactionsPage() {
  const navigate = useNavigate();

  return (
    <section className={styles.page}>
      <PageHeader
        title="Transactions"
        action={
          <Button onClick={() => navigate('/transactions/new')}>Ajouter</Button>
        }
      />

      <TransactionListe transactions={mockTransactions} />
    </section>
  );
}

export default TransactionsPage;
