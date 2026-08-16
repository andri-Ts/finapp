import PageHeader from '@/components/layout/pageHeader';
import styles from './accountsPage.module.css';
import AccountList from '@/features/accounts/components/accountList';
import { useEffect, useState } from 'react';
import type { IAccount } from '@/types/account.types';
import {
  archiveAccount,
  getAllAccount,
  setDefaultAccount,
} from '@/features/accounts/api/acccountApi';
import Button from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function AccountsPage() {
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadAccount() {
      try {
        const data = await getAllAccount();
        setAccounts(data.accounts);
      } catch (error) {
        console.error('Erreur lors du chargement des comptes: ', error);
      } finally {
        setLoading(false);
      }
    }

    loadAccount();
  }, []);

  const handleArchiveAccount = async (id: string) => {
    try {
      const message = await archiveAccount(id);

      setAccounts((currentAccounts) =>
        currentAccounts.filter((account) => account.id !== id),
      );

      toast.success(message);
    } catch (error) {
      console.error("Erreur lors de l'archivage :", error);
      toast.error("Impossible d'archiver le compte");
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      await setDefaultAccount(id);

      setAccounts((currentAccounts) =>
        currentAccounts.map((account) => ({
          ...account,
          isDefault: account.id === id,
        })),
      );

      toast.success('Compte par défaut modifié');
    } catch (error) {
      console.error(
        'Erreur lors de la modification du compte par défaut : ',
        error,
      );
      toast.error('Impossible de modifier le compte par défaut');
    }
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <section className={styles.page}>
      <PageHeader
        title="Comptes"
        action={
          <Button onClick={() => navigate('/accounts/new')}>+ Ajouter</Button>
        }
      />

      <AccountList
        accounts={accounts}
        onArchive={handleArchiveAccount}
        onSetDefault={handleSetDefault}
      />
    </section>
  );
}

export default AccountsPage;
