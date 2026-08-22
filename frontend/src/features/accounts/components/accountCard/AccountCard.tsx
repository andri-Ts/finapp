import type { IAccount } from '@/types/account.types';
import styles from './accountCard.module.css';
import Card from '@/components/ui/Card';
import { accountIcons } from '@/constants/constIcons';
import { formatCurrency } from '@/utils/formatCurrency';
// import Button from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

interface AccountCardProps {
  account: IAccount;
  onArchive: (id: string) => void;
  onSetDefault: (id: string) => void;
}

function AccountCard({ account, onArchive, onSetDefault }: AccountCardProps) {
  const AccountIcon = account.icon ? accountIcons[account.icon] : null;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/accounts/${account.id}`);
  };

  return (
    <Card className={styles.wrapper}>
      <button type="button" className={styles.card} onClick={handleClick}>
        <div
          className={styles.icon}
          style={{
            color: account.color ?? 'var(--color-primary)',
          }}
        >
          {AccountIcon && <AccountIcon size={28} />}
        </div>

        <h3 className={styles.name}>{account.name}</h3>

        <strong className={styles.balance}>
          {formatCurrency(account.currentBalance)}
        </strong>

        <span className={styles.currency}>{account.currency}</span>

        {account.isDefault && (
          <span className={styles.default}>Compte par défaut</span>
        )}
      </button>
    </Card>
  );
}

export default AccountCard;
