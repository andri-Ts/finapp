import styles from './accountSelect.module.css';
import { getAllAccount } from '@/features/accounts/api/acccountApi';
// import { mockAccounts } from '@/mocks/accounts.mock';
import type { IAccount } from '@/types/account.types';
import { formatCurrency } from '@/utils/formatCurrency';
import { useQuery } from '@tanstack/react-query';
import Select from '@/components/ui/select';
// import { useEffect, useState } from 'react';

interface AccountSelectProps {
  value: string;
  onChange: (id: string) => void;
  error?: string;
}

function AccountSelect({ value, onChange, error }: AccountSelectProps) {
  // récupéraiton des comptes avec Tansatack query
  const { data, isLoading, isError } = useQuery({
    queryKey: ['accounts'],
    queryFn: getAllAccount,
  });

  const accounts: IAccount[] = data?.accounts ?? [];

  if (isLoading) {
    return (
      <div className={styles.container}>
        <span className={styles.label}>Compte</span>
        <div className={styles.select}>Chargement des comptes...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.container}>
        <span className={styles.label}>Compte</span>
        <span className={styles.error}>Impossible de charger les comptes.</span>
      </div>
    );
  }

  //const selectedAccount = accounts.find((account) => account.id === value);

  return (
    <Select
      label="Compte"
      id="transation-account"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      error={error}
    >
      <option value="" disabled>
        Selectionner une compte
      </option>
      {accounts.map((account) => (
        <option key={account.id} value={account.id}>
          {account.name} - {formatCurrency(account.currentBalance)}
        </option>
      ))}
    </Select>
  );
}

export default AccountSelect;
