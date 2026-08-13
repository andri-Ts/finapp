import type { IAccount } from '@/types/account.types';
import styles from './accountList.module.css';
import AccountCard from '../accountCard';

interface AccountListProps {
  accounts: IAccount[];
  onArchive: (id: string) => void;
}

function AccountList({ accounts, onArchive }: AccountListProps) {
  return (
    <div className={styles.list}>
      {accounts.map((account) => (
        <AccountCard key={account.id} account={account} onArchive={onArchive} />
      ))}
    </div>
  );
}

export default AccountList;
