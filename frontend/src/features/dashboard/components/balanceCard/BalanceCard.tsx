import styles from './balanceCard.module.css';
import Card from '@/components/ui/Card';
import { formatCurrency } from '@/utils/formatCurrency';

interface IBalanceProps {
  accountName: string;
  balance: number;
}

function BalanceCard({ accountName, balance }: IBalanceProps) {
  return (
    <Card className={styles.card}>
      <div className={styles.decorativeCircle} aria-hidden="true" />

      <div className={styles.content}>
        <p className={styles.accountName}>🏦 {accountName}</p>

        <p className={styles.balance}>{formatCurrency(balance)}</p>

        <div className={styles.cardFooter}>
          <p className={styles.defaultBadge}>★ Compte principal</p>
          <span className={styles.cardBrand} aria-hidden="true">
            FIN
          </span>
        </div>
      </div>
    </Card>
  );
}

export default BalanceCard;
