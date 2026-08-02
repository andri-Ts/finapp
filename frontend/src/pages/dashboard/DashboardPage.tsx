import PageHeader from '@/components/layout/pageHeader';
import styles from './dashboard.module.css';
import StatCard from '@/features/dashboard/components/StatCard';
import BalanceCard from '@/features/dashboard/components/balanceCard';

function DashboardPage() {
  return (
    <section className={styles.page}>
      <PageHeader title="Bonjour Zahard 👋" />

      <BalanceCard accountName="Compte courant" balance={2150} />

      <div className={styles.statsGrid}>
        <StatCard title="Revenus du mois" value={3000} variant="success" />

        <StatCard title="Dépenses du mois" value={850} variant="danger" />
      </div>
    </section>
  );
}

export default DashboardPage;
