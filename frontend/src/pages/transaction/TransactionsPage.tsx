import PageHeader from '@/components/layout/pageHeader';
import styles from './transactionsPage.module.css';
import TransactionList from '@/features/transactions/components/transactionList';
import Button from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { ITransaction } from '@/types/transaction.types';
import {
  deleteTransaction,
  getAllTransactions,
} from '@/features/transactions/api/transactionApi';
import { toast } from 'sonner';

function TransactionsPage() {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadTransactions() {
      try {
        const data = await getAllTransactions();
        setTransactions(data.transactions);
      } catch (error) {
        console.error('Erreur lors du chargement des transactions: ', error);
      } finally {
        setLoading(false);
      }
    }

    loadTransactions();
  }, []);

  const handleDelete = async (id: string) => {
    // Demande confirmation avant de supprimer définitivement la transaction.
    const confirmed = window.confirm(
      'Êtes-vous sûr de vouloir supprimer cette transaction ?',
    );
    // Si l'utilisateur annule, on ne fait rien.
    if (!confirmed) {
      return;
    }

    try {
      await deleteTransaction(id);

      setTransactions((transactions) =>
        // On conserve toutes les transactions sauf celle qui vient d'être supprimée
        transactions.filter((transaction) => transaction.id !== id),
      );
      toast.success('Transaction supprimée');
    } catch (error) {
      console.error('Erreur lors de la suppression de la transaction :', error);

      toast.error('Impossible de supprimer la transaction');
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/transactions/${id}/edit`);
  };

  if (loading) {
    return <p>Chargement...</p>;
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
