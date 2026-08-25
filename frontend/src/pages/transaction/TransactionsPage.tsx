import PageHeader from '@/components/layout/pageHeader';
import styles from './transactionsPage.module.css';
import TransactionList from '@/features/transactions/components/transactionList';
import Button from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import type { ITransaction } from '@/types/transaction.types';
import {
  deleteTransaction,
  getAllTransactions,
} from '@/features/transactions/api/transactionApi';
import { toast } from 'sonner';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';

function TransactionsPage() {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['transactions'],
    queryFn: getAllTransactions,
  });

  // ON récupère le tableau depuis la réponse API
  const transactions: ITransaction[] = data?.transactions ?? [];
  console.log('Transactions: ', transactions);

  // Mutation pour surrpiremer une transaciton
  const deleteMutation = useMutation({
    mutationFn: deleteTransaction, // fonc API appelée pour sup transacion

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] }); // indique à tansstack query que les trans ne sont plus à jour
      queryClient.invalidateQueries({
        queryKey: ['dashboard'], // dashboard dépent égalememnt des transactions
      });

      toast.success('Transaction supprimée');
    },

    onError: (error) => {
      // MODIFICATION : gestion de l'erreur de récupération
      if (error) {
        return <p>Impossible de charger les transactions.</p>;
      }
    },
  });

  const handleDelete = async (id: string) => {
    // Demande confirmation avant de supprimer définitivement la transaction.
    const confirmed = window.confirm(
      'Êtes-vous sûr de vouloir supprimer cette transaction ?',
    );
    // Si l'utilisateur annule, on ne fait rien.
    if (!confirmed) {
      return;
    }

    deleteMutation.mutate(id);
  };

  const handleEdit = (id: string) => {
    navigate(`/transactions/${id}/edit`);
  };

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
        transactions={transactions}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </section>
  );
}

export default TransactionsPage;
