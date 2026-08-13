import type { IAccount } from '@/types/account.types';
import styles from './accountCard.module.css';
import Card from '@/components/ui/Card';
import { accountIcons } from '@/constants/constIcons';
import { formatCurrency } from '@/utils/formatCurrency';
import Button from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

interface AccountCardProps {
  account: IAccount;
  onArchive: (id: string) => void;
}

function AccountCard({ account, onArchive }: AccountCardProps) {
  const AccountIcon = account.icon ? accountIcons[account.icon] : null;
  const navigate = useNavigate();

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

        <Button onClick={() => navigate(`/accounts/${account.id}/edit`)}>
          Modifier
        </Button>
        <Button onClick={() => onArchive(account.id)}>Archiver</Button>
      </article>
    </Card>
  );
}

export default AccountCard;
