import PageHeader from '@/components/layout/pageHeader';
import styles from './accountDetailPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAccount } from '@/features/accounts/api/acccountApi';
import BalanceCard from '@/features/dashboard/components/balanceCard';
import StatCard from '@/features/dashboard/components/StatCard';
import PageSection from '@/components/layout/pageSection';
import TransactionList from '@/features/transactions/components/transactionList';

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

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  if (isError || !data) {
    return <p>Impossible de charger le compte.</p>;
  }

  const { account, stats, transactions } = data;
  console.log('ACCOUNT DETAIL DATA:', data);

  // Modifier une transaction
  const handleEdit = (transactionId: string) => {
    navigate(`/transactions/${transactionId}/edit`);
  };

  return (
    <section>
      <PageHeader title={account.name} subtitle="Détails du compte" />

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
        <TransactionList transactions={transactions} onEdit={handleEdit} />
      </PageSection>
    </section>
  );
}

export default AccountDetailPage;
