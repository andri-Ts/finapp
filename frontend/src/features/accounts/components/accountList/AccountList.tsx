import type { IAccount } from '@/types/account.types';
import styles from './accountList.module.css';
import AccountCard from '../accountCard';

interface AccountListProps {
  accounts: IAccount[];
}

function AccountList({ accounts }: AccountListProps) {
  return (
    <div className={styles.list}>
      {accounts.map((account) => (
        <AccountCard key={account.id} account={account} />
      ))}
    </div>
  );
}

export default AccountList;
