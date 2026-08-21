import PageHeader from '@/components/layout/pageHeader';
import styles from './dashboard.module.css';
import StatCard from '@/features/dashboard/components/StatCard';
import BalanceCard from '@/features/dashboard/components/balanceCard';
import PageSection from '@/components/layout/pageSection';
import { Link, useNavigate } from 'react-router-dom';
import TransactionList from '@/features/transactions/components/transactionList';
// import { mockTransactions } from '@/mocks/transactions.mock';
// import Button from '@/components/ui/Button';
// import { useEffect, useState } from 'react';
// import type { IDashboard } from '@/features/dashboard/types/dashboard.types';
import { getDashboard } from '@/features/dashboard/api/dashboardApi';
import { useQuery } from '@tanstack/react-query';

function DashboardPage() {
  const navigate = useNavigate();

  const {
    data: dashboard,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboard,
  });

  // useEffect(() => {
  //   async function loadDashboard() {
  //     try {
  //       const data = await getDashboard();
  //       console.log('data dash: ', data);
  //       setDashboard(data);
  //     } catch (error) {
  //       console.error('Erreur lors du chargement du dashboard: ', error);
  //     }
  //   }

  //   loadDashboard();
  // }, []);

  const handleEdit = (id: string) => {
    navigate(`/transactions/${id}/edit`);
  };

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  if (isError || !dashboard) {
    return <p>Impossible de charger le dashboard.</p>;
  }

  return (
    <section className={styles.page}>
      <PageHeader title="Bonjour Zahard 👋" />

      <BalanceCard
        accountName={
          dashboard.defaultAccount?.name ?? 'Aucun compte par défaut'
        }
        balance={dashboard.defaultAccount?.currentBalance ?? 0}
      />

      <div className={styles.statsGrid}>
        <StatCard
          title="Revenus du mois"
          value={dashboard.stats.incomeOfMonth}
          variant="success"
        />

        <StatCard
          title="Dépenses du mois"
          value={dashboard.stats.expenseOfMonth}
          variant="danger"
        />
      </div>

      <PageSection
        title="Transactions du mois"
        action={
          <Link to={'/transactions'} className={styles.viewAllLink}>
            Voir toutes →
          </Link>
        }
      >
        {/* mockTransactions doit être remplacer par les données du mois en cours envoer par l'api */}
        <TransactionList
          transactions={dashboard.transactionsOfMonth}
          onEdit={handleEdit}
        />
      </PageSection>
    </section>
  );
}

export default DashboardPage;
