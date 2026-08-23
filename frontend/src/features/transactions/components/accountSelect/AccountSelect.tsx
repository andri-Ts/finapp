import DropdownSelect from '@/components/forms/dropdownSelect';
import { getAllAccount } from '@/features/accounts/api/acccountApi';
// import { mockAccounts } from '@/mocks/accounts.mock';
import type { IAccount } from '@/types/account.types';
import { formatCurrency } from '@/utils/formatCurrency';
import { useQuery } from '@tanstack/react-query';
// import { useEffect, useState } from 'react';

interface AccountSelectProps {
  value: string;
  onChange: (id: string) => void;
}

function AccountSelect({ value, onChange }: AccountSelectProps) {
  // récupéraiton des comptes avec Tansatack query
  const { data, isLoading, isError } = useQuery({
    queryKey: ['accounts'],
    queryFn: getAllAccount,
  });

  const accounts: IAccount[] = data?.accounts ?? [];

  if (isLoading) {
    return <p>Chargement des comptes...</p>;
  }

  if (isError) {
    return <p>Impossible de charger les comptes.</p>;
  }

  return (
    <DropdownSelect
      label="Compte"
      items={accounts} /* liste des comptes de l'user */
      value={value}
      onChange={onChange}
      renderItem={(account) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <span>{account.name}</span>
          <small>{formatCurrency(account.currentBalance)}</small>
        </div>
      )}
    />
  );
}

export default AccountSelect;
