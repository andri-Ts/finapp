import PageHeader from '@/components/layout/pageHeader';
// import styles from './editTransactionPage.module.css';
import { useEffect, useState } from 'react';
import TransactionForm from '@/features/transactions/components/transactionForm';
import type { ITransaction } from '@/types/transaction.types';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { getTransaction } from '@/features/transactions/api/transactionApi';

function EditTransactionPage() {
  const [transaction, setTransaction] = useState<ITransaction | null>(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadTransaction() {
      if (!id) {
        toast.error('Transaciton introuvable');
        navigate('/transactions');
        return;
      }
      try {
        const data = await getTransaction(id);
        setTransaction(data);
      } catch (error) {
        console.error('Erreur lors du chargement de la transaction: ', error);
        toast.error('Impossible de charger la transaction');
        navigate('/transactions');
      } finally {
        setLoading(false);
      }
    }

    loadTransaction();
  }, [id, navigate]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (!transaction) {
    return null;
  }

  return (
    <section>
      <PageHeader title="Modifier la transaction" />

      <TransactionForm transaction={transaction} />
    </section>
  );
}

export default EditTransactionPage;
