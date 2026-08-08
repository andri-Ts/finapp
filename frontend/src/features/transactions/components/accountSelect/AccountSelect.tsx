import DropdownSelect from '@/components/forms/dropdownSelect';
import { mockAccounts } from '@/mocks/accounts.mock';
import { formatCurrency } from '@/utils/formatCurrency';

interface AccountSelectProps {
  value: string;
  onChange: (id: string) => void;
}

function AccountSelect({ value, onChange }: AccountSelectProps) {
  return (
    <DropdownSelect
      label="Compte"
      items={mockAccounts} /* liste des comptes de l'user */
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
