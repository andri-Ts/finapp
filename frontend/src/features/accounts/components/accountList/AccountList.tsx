import type { IAccount } from '@/types/account.types';
import styles from './accountList.module.css';
import AccountCard from '../accountCard';

interface AccountListProps {
  accounts: IAccount[];
  onArchive: (id: string) => void;
  onSetDefault: (id: string) => void;
}

function AccountList({ accounts, onArchive, onSetDefault }: AccountListProps) {
  return (
    <div className={styles.list}>
      {accounts.map((account) => (
        <AccountCard
          key={account.id}
          account={account}
          onArchive={onArchive}
          onSetDefault={onSetDefault}
        />
      ))}
    </div>
  );
}

export default AccountList;
