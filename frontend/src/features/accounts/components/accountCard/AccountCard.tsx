import type { IAccount } from '@/types/account.types';
import styles from './accountCard.module.css';
import Card from '@/components/ui/Card';
import { accountIcons } from '@/constants/constIcons';
import { formatCurrency } from '@/utils/formatCurrency';

interface AccountCardProps {
  account: IAccount;
}

function AccountCard({ account }: AccountCardProps) {
  const AccountIcon = account.icon ? accountIcons[account.icon] : null;

  return (
    <Card>
      <article className={styles.card}>
        <div className={styles.header}>
          {AccountIcon && <AccountIcon size={22} />}
          <h3>{account.name}</h3>
        </div>

        <strong className={styles.balance}>
          {formatCurrency(account.currentBalance)}
        </strong>

        <span className={styles.currency}>{account.currency}</span>
      </article>
    </Card>
  );
}

export default AccountCard;
