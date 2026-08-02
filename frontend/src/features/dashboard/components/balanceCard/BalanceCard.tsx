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
      <p className={styles.accountName}>{accountName}</p>
      <p className={styles.balance}>{formatCurrency(balance)}</p>
    </Card>
  );
}

export default BalanceCard;
