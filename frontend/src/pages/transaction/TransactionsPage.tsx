import PageHeader from '@/components/layout/pageHeader';
import styles from './transactionsPage.module.css';
import TransactionList from '@/features/transactions/components/transactionList';
import Button from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import type { ITransaction } from '@/types/transaction.types';
import { groupTransactionsForDisplay } from '@/utils/groupTransactionsForDisplay';
import { getAllTransactions } from '@/features/transactions/api/transactionApi';
import { useQuery } from '@tanstack/react-query';
import { useTransactionActions } from '@/features/transactions/hooks/useTransactionActions';

function TransactionsPage() {
  const navigate = useNavigate();
  const { handleEdit, handleDelete } = useTransactionActions();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['transactions'],
    queryFn: getAllTransactions,
  });

  // ON récupère le tableau depuis la réponse API
  const transactions: ITransaction[] = data?.transactions ?? [];
  // console.log('Transactions: ', transactions);

  // Données préparée UNIQUEMENT POUR L'AFFICHAGE (pour ne pas afficher 2 mêmes transaction pour un transafert)
  const displayedTransactions = groupTransactionsForDisplay(transactions);

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  // MODIFICATION : gestion de l'erreur de récupération
  if (isError) {
    return <p>Impossible de charger les transactions.</p>;
  }

  return (
    <section className={styles.page}>
      <PageHeader
        title="Transactions"
        action={
          <Button onClick={() => navigate('/transactions/new')}>
            + Ajouter
          </Button>
        }
      />

      {/* <p>Nombre de transactions : {transactions.length}</p> */}
      <TransactionList
        transactions={displayedTransactions}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </section>
  );
}

export default TransactionsPage;
