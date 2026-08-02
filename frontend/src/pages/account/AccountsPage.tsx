import PageHeader from '@/components/layout/pageHeader';
import styles from './accountsPage.module.css';
import AccountList from '@/features/accounts/components/accountList';
import { mockAccounts } from '@/mocks/accounts.mock';

function AccountsPage() {
  return (
    <section className={styles.page}>
      <PageHeader title="Comptes" />

      <AccountList accounts={mockAccounts} />
    </section>
  );
}

export default AccountsPage;
