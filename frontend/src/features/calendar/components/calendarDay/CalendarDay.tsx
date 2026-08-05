import type { ICalendarCell } from '@/types/calendar.types';
import styles from './calendarDay.module.css';
import type { ITransaction } from '@/types/transaction.types';

interface CalendarDayProps {
  calendarCell: ICalendarCell;
  transactions: ITransaction[];
  currentMonth: Date;
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

function CalendarDay({
  calendarCell,
  transactions,
  currentMonth,
  selectedDate,
  setSelectedDate,
}: CalendarDayProps) {
  // DAte selectionnée (boolean, pour la classeName)
  const isSelected =
    calendarCell.day !== null &&
    selectedDate.getDate() === calendarCell.day &&
    selectedDate.getMonth() === currentMonth.getMonth() &&
    selectedDate.getFullYear() === currentMonth.getFullYear();

  // Clique sur une date pour voir les transactions
  const handleClick = () => {
    if (calendarCell.day === null) {
      return;
    }

    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      calendarCell.day, // le jour selectionner, ca correspond aux cases
    );

    setSelectedDate(newDate);
  };

  // liste des transacitons
  const income = transactions
    .filter((transaction) => transaction.type === 'INCOME')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const expense = transactions
    .filter((transaction) => transaction.type === 'EXPENSE')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <button
      className={`${styles.day} ${isSelected ? styles.selected : ''}`}
      disabled={calendarCell.day === null}
      onClick={handleClick}
    >
      <span className={styles.number}>{calendarCell.day}</span>

      <div className={styles.summary}>
        {income > 0 && <span className={styles.income}>+{income}</span>}

        {expense > 0 && <span className={styles.expense}>-{expense}</span>}
      </div>
    </button>
  );
}

export default CalendarDay;
