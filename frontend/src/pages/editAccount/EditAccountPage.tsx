import PageHeader from '@/components/layout/pageHeader';
import styles from './editAccountPage.module.css';
import { useEffect, useState } from 'react';
import AccountForm from '@/features/accounts/components/accountForm';
import { useNavigate, useParams } from 'react-router-dom';
import type { IAccount } from '@/types/account.types';
import { getAccount } from '@/features/accounts/api/acccountApi';

function EditAccountPage() {
  const [account, setAccount] = useState<IAccount | null>(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadAccount() {
      if (!id) {
        navigate('/accounts');
        return;
      }

      try {
        const data = await getAccount(id);
        setAccount(data);
      } catch (error) {
        console.error('Erreur lors du chargement du compte: ', error);
      } finally {
        setLoading(false);
      }
    }

    loadAccount();
  }, [id, navigate]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (!account) {
    return <p>Compte introuvable.</p>;
  }

  return (
    <section className={styles.page}>
      <PageHeader title="Modifier le compte" />

      <AccountForm account={account} />
    </section>
  );
}

export default EditAccountPage;
