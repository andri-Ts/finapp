import PageHeader from '@/components/layout/pageHeader';
// import styles from './editTransactionPage.module.css';
import { useEffect } from 'react';
import TransactionForm from '@/features/transactions/components/transactionForm';
// import type { ITransaction } from '@/types/transaction.types';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { getTransaction } from '@/features/transactions/api/transactionApi';
import { useQuery } from '@tanstack/react-query';

function EditTransactionPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: transaction,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['transaction', id],
    queryFn: () => getTransaction(id!), // fonc appelle API, on sait que id existe grace enabled ci dessous
    enabled: !!id, // requête à executer que si id existe
  }); //  Cette clé identifie précisément la transaction que nous voulons récupérer.

  // console.log('Transaction récupérée :', transaction);

  useEffect(() => {
    if (!id) {
      toast.error('Transaction introuvable');
      navigate('/');
    }
  }, [id, navigate]);

  // MODIFICATION : gérer l'erreur API en dehors du render
  useEffect(() => {
    if (isError) {
      toast.error('Impossible de charger la transaction');
      navigate('/');
    }
  }, [isError, navigate]);

  // useEffect(() => {
  //   async function loadTransaction() {
  //     if (!id) {
  //       toast.error('Transaciton introuvable');
  //       navigate('/transactions');
  //       return;
  //     }
  //     try {
  //       const data = await getTransaction(id);
  //       setTransaction(data);
  //     } catch (error) {
  //       console.error('Erreur lors du chargement de la transaction: ', error);
  //       toast.error('Impossible de charger la transaction');
  //       navigate('/transactions');
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   loadTransaction();
  // }, [id, navigate]);

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  // TanStack Query gère également l'état d'erreur.
  if (isError || !transaction) {
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
