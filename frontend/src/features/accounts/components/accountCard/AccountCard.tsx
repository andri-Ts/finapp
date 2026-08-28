import type { IAccount } from '@/types/account.types';
import styles from './accountCard.module.css';
import Card from '@/components/ui/Card';
import { accountIcons } from '@/constants/constIcons';
import { formatCurrency } from '@/utils/formatCurrency';
// import Button from '@/components/ui/Button';

interface AccountCardProps {
  account: IAccount;
  onArchive: (id: string) => void;
  onSetDefault: (id: string) => void;
  onClick: (id: string) => void;
}

function AccountCard({
  account,
  onClick /*onArchive, onSetDefault*/,
}: AccountCardProps) {
  const AccountIcon = account.icon ? accountIcons[account.icon] : null;

  return (
    <Card className={styles.wrapper} interactive>
      <button
        type="button"
        className={styles.card}
        onClick={() => onClick(account.id)}
        style={
          {
            '--account-color': account.color ?? 'var(--forest-500)',
          } as React.CSSProperties
        }
      >
        <div className={styles.identity}>
          <div className={styles.icon}>
            {AccountIcon && <AccountIcon size={24} />}
          </div>
          <div className={styles.information}>
            <h3 className={styles.name}>{account.name}</h3>
            <div className={styles.meta}>
              <span className={styles.currency}>{account.currency}</span>
              {account.isDefault && (
                <span className={styles.default}>Compte par défaut</span>
              )}
            </div>
          </div>
        </div>

        <strong className={styles.balance}>
          {formatCurrency(account.currentBalance)}
        </strong>
      </button>
    </Card>
  );
}

export default AccountCard;
