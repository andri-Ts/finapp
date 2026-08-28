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

function AccountCard({
  account /*onArchive, onSetDefault*/,
}: AccountCardProps) {
  const AccountIcon = account.icon ? accountIcons[account.icon] : null;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/accounts/${account.id}`);
  };

  return (
    <Card className={styles.wrapper} interactive>
      <button type="button" className={styles.card} onClick={handleClick}>
        <div className={styles.top}>
          <div
            className={styles.icon}
            style={{
              color: account.color ?? 'var(--forest-500)',
              backgroundColor: account.color
                ? `${account.color}18`
                : 'var(--forest-50)',
            }}
          >
            {AccountIcon && <AccountIcon size={24} />}
          </div>

          {account.isDefault && (
            <span className={styles.default}>Compte par défaut</span>
          )}
        </div>

        <div className={styles.info}>
          <h3 className={styles.name}>{account.name}</h3>
          <strong className={styles.balance}>
            {formatCurrency(account.currentBalance)}
          </strong>
          <span className={styles.currency}>{account.currency}</span>
        </div>
      </button>
    </Card>
  );
}

export default AccountCard;
