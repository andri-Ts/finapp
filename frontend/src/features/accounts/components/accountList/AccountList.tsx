import type { IAccount } from '@/types/account.types';
import styles from './accountList.module.css';
import AccountCard from '../accountCard';

interface AccountListProps {
  accounts: IAccount[];
  onSetDefault: (id: string) => void;
  onClick: (id: string) => void;
}

function AccountList({ accounts, onSetDefault, onClick }: AccountListProps) {
  return (
    <div className={styles.list}>
      {accounts.map((account) => (
        <AccountCard
          key={account.id}
          account={account}
          onSetDefault={onSetDefault}
          onClick={onClick}
        />
      ))}
    </div>
  );
}

export default AccountList;
