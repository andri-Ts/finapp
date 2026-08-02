import Card from '@/components/ui/Card';
import styles from './statCard.module.css';
import { formatCurrency } from '@/utils/formatCurrency';

interface IStatCardProps {
  title: string;
  value: number;
  variant: 'success' | 'danger';
}

function StatCard(props: IStatCardProps) {
  const sign = props.variant === 'success' ? '+' : '-';

  return (
    <Card className={styles.card}>
      <p className={styles.title}>{props.title}</p>

      <p className={`${styles.value} ${styles[props.variant]}`}>
        {sign}
        {formatCurrency(props.value)}
      </p>
    </Card>
  );
}

export default StatCard;
