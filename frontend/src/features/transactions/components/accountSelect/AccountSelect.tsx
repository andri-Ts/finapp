import DropdownSelect from '@/components/forms/dropdownSelect';
import { getAllAccount } from '@/features/accounts/api/acccountApi';
// import { mockAccounts } from '@/mocks/accounts.mock';
import type { IAccount } from '@/types/account.types';
import { formatCurrency } from '@/utils/formatCurrency';
import { useEffect, useState } from 'react';

interface AccountSelectProps {
  value: string;
  onChange: (id: string) => void;
}

function AccountSelect({ value, onChange }: AccountSelectProps) {
  const [accounts, setAccounts] = useState<IAccount[]>([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getAllAccount();
        setAccounts(data.accounts);
      } catch (error) {
        console.error('Erreur lors du chargement des catégories: ', error);
      }
    }

    loadCategories();
  }, []);

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
