import PageHeader from '@/components/layout/pageHeader';
import styles from './accountDetailPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  archiveAccount,
  getAccount,
} from '@/features/accounts/api/acccountApi';
import BalanceCard from '@/features/dashboard/components/balanceCard';
import StatCard from '@/features/dashboard/components/StatCard';
import PageSection from '@/components/layout/pageSection';
import TransactionList from '@/features/transactions/components/transactionList';
import type { ITransaction } from '@/types/transaction.types';
import { Archive, Pencil } from 'lucide-react';
import { queryClient } from '@/lib/queryClient';
import { toast } from 'sonner';

function AccountDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // récupérer l'id cu compte via url

  // Récup les données du compte
  const { data, isLoading, isError } = useQuery({
    queryKey: ['account', id],
    // on ne lance pas la requête si l'id n'existe pas
    queryFn: () => getAccount(id!),
    enabled: !!id,
  });

  // mutation pour archiver un compte
  const archiveMutation = useMutation({
    mutationFn: archiveAccount,

    onSuccess: (message) => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] }); // une fois archiver, on invalide la liste des comptes (du cache)
      toast.success(message);
      navigate('/accounts');
    },

    onError: (error) => {
      console.error("Erreur lors de l'archivage :", error);
      toast.error("Impossible d'archiver le compte");
    },
  });

  // Modifier une transaction
  const handleEditTransaction = (transactionId: string) => {
    navigate(`/transactions/${transactionId}/edit`);
  };

  const handleEditAccount = () => {
    if (!id) return;
    navigate(`/accounts/${id}/edit`);
  };

  const handleArchiveAccount = async () => {
    // On ne modifie plus directement le tableau accounts. On demande à la mutation d'appeler l'API.
    if (!id) return;

    const confirmed = window.confirm(
      `Etes-vous sûr de vouloir archiver le compte "${account.name}" ?`,
    );
    if (!confirmed) return;

    archiveMutation.mutate(id);
  };

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  if (isError || !data) {
    return <p>Impossible de charger le compte.</p>;
  }

  const { account, stats, transactions } = data;
  // console.log('ACCOUNT DETAIL DATA:', data);
  const displayTransaction: ITransaction[] = transactions.map((transaction) => {
    if (transaction.type !== 'TRANSFER') return transaction;

    return {
      ...transaction,
      displaySign:
        transaction.transferRole === 'SOURCE'
          ? '-'
          : transaction.transferRole === 'DESTINATION'
            ? '+'
            : undefined,
    };
  });

  return (
    <section>
      <PageHeader
        title={account.name}
        subtitle="Détails du compte"
        action={
          <div className={styles.actions}>
            <button
              className={styles.actionButton}
              type="button"
              aria-label="Modifier le compte"
              onClick={handleEditAccount}
            >
              <Pencil size={20} />
            </button>
            <button
              className={`${styles.actionButton} ${styles.archiveButton}`}
              type="button"
              aria-label="Archiver le compte"
              onClick={handleArchiveAccount}
            >
              <Archive size={20} />
            </button>
          </div>
        }
      />

      <BalanceCard
        accountName={account.name}
        balance={account.currentBalance}
      />

      <div className={styles.statsGrid}>
        <StatCard
          title="Revenus du mois"
          value={stats.incomeOfMonth}
          variant="success"
        />
        <StatCard
          title="Dépenses du moi"
          value={stats.expenseOfMonth}
          variant="danger"
        />
      </div>

      <PageSection title="Transactions du mois">
        <TransactionList
          transactions={displayTransaction}
          onEdit={handleEditTransaction}
        />
      </PageSection>
    </section>
  );
}

export default AccountDetailPage;
