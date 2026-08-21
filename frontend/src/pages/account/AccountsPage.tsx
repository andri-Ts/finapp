import PageHeader from '@/components/layout/pageHeader';
import styles from './accountsPage.module.css';
import AccountList from '@/features/accounts/components/accountList';
// import { useEffect, useState } from 'react';
import type { IAccount } from '@/types/account.types';
import {
  archiveAccount,
  getAllAccount,
  setDefaultAccount,
} from '@/features/accounts/api/acccountApi';
import Button from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';

function AccountsPage() {
  const navigate = useNavigate();

  // =========================================================
  // Utiliasation de useQuery
  // =========================================================
  const { data, isLoading, isError } = useQuery({
    queryKey: ['accounts'], // clé qui idientifi la cache contenant la liste des compte
    queryFn: getAllAccount,
  });

  const accounts: IAccount[] = data?.accounts ?? []; // si data n'est pas dispon, on revoie tab vide

  // mutation pour archiver un compte
  const archiveMutation = useMutation({
    mutationFn: archiveAccount,

    onSuccess: (message) => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] }); // une fois archiver, on invalide la liste des comptes (du cache)
      toast.success(message);
    },

    onError: (error) => {
      console.error("Erreur lors de l'archivage :", error);
      toast.error("Impossible d'archiver le compte");
    },
  });

  // mutation pour définir compte par défaut
  const defaultMutation = useMutation({
    mutationFn: setDefaultAccount,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['accounts'],
      });
      toast.success('Compte par défaut moidifié');
    },

    onError: (error) => {
      console.error(
        'Erreur lors de la modification du compte par défaut : ',
        error,
      );

      toast.error('Impossible de modifier le compte par défaut');
    },
  });

  // useEffect(() => {
  //   async function loadAccount() {
  //     try {
  //       const data = await getAllAccount();
  //       setAccounts(data.accounts);
  //     } catch (error) {
  //       console.error('Erreur lors du chargement des comptes: ', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   loadAccount();
  // }, []);

  // =========================================================
  // Handlers
  // =========================================================

  const handleArchiveAccount = async (id: string) => {
    // On ne modifie plus directement le tableau accounts.
    // On demande à la mutation d'appeler l'API.
    archiveMutation.mutate(id);
  };

  const handleSetDefault = async (id: string) => {
    defaultMutation.mutate(id);
  };

  // =========================================================
  // Gestion du chargement, erreur
  // =========================================================

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  if (isError) {
    return <p>Impossible de charger les comptes.</p>;
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
