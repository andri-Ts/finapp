import PageHeader from '@/components/layout/pageHeader';
import styles from './dashboard.module.css';
import StatCard from '@/features/dashboard/components/StatCard';
import BalanceCard from '@/features/dashboard/components/balanceCard';
import PageSection from '@/components/layout/pageSection';
import { Link } from 'react-router-dom';
import TransactionList from '@/features/transactions/components/transactionList';
// import { mockTransactions } from '@/mocks/transactions.mock';
import Button from '@/components/ui/Button';
import { useEffect, useState } from 'react';
import type { IDashboard } from '@/features/dashboard/types/dashboard.types';
import { getDashboard } from '@/features/dashboard/api/dashboardApi';

function DashboardPage() {
  const [dashboard, setDashboard] = useState<IDashboard | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboard();
        console.log('data dash: ', data);
        setDashboard(data);
      } catch (error) {
        console.error('Erreur lors du chargement du dashboard: ', error);
      }
    }

    loadDashboard();
  }, []);

  if (!dashboard) {
    return <p>Chargement...</p>;
  }

  return (
    <section className={styles.page}>
      <PageHeader
        title="Bonjour Zahard 👋"
        action={
          <Link to={'/transactions/new'}>
            <Button>Nouvelle transaction</Button>
          </Link>
        }
      />

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
        title="Transaction du mois"
        action={
          <Link to={'/transactions'} className={styles.viewAllLink}>
            Voir toutes →
          </Link>
        }
      >
        {/* mockTransactions doit être remplacer par les données du mois en cours envoer par l'api */}
        <TransactionList transactions={dashboard.transactionsOfMonth} />
      </PageSection>
    </section>
  );
}

export default DashboardPage;
