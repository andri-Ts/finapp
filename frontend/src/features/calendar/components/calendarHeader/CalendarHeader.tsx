import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './calendarHeader.module.css';
import { iconSizes } from '@/constants/iconSizes';

interface CalendarHeaderProps {
  currentMonth: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

function CalendarHeader({
  currentMonth,
  onPreviousMonth,
  onNextMonth,
}: CalendarHeaderProps) {
  const monthName = currentMonth.toLocaleDateString('fr-FR', {
    month: 'long',
    year: 'numeric',
  }); // méthode JavaScript qui formate une date selon une langue spécifique ('long': nom complet du mois, 'numeric': année)

  return (
    <section className={styles.header}>
      <button onClick={onPreviousMonth}>
        <ChevronLeft size={iconSizes.lg} />
      </button>
      <h2>{monthName}</h2>
      <button onClick={onNextMonth}>
        <ChevronRight size={iconSizes.lg} />
      </button>
    </section>
  );
}

export default CalendarHeader;
