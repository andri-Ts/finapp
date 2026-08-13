import PageHeader from '@/components/layout/pageHeader';
import styles from './addAccountPage.module.css';
import AccountForm from '@/features/accounts/components/accountForm';

function AddAccountPage() {
  return (
    <section className={styles.page}>
      <PageHeader title="Nouveau compte" />

      <AccountForm />
    </section>
  );
}

export default AddAccountPage;
