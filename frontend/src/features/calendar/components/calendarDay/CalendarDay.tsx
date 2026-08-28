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

  // détection du jour actuel
  const today = new Date();

  const isToday =
    calendarCell.day !== null &&
    today.getDate() === calendarCell.day &&
    today.getMonth() === currentMonth.getMonth() &&
    today.getFullYear() === currentMonth.getFullYear();

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
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

  const expense = transactions
    .filter((transaction) => transaction.type === 'EXPENSE')
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

  // indique si le jour contient des transactions
  const hasIncome = income > 0;
  const hasExpense = expense > 0;

  return (
    <button
      type="button"
      className={`${styles.day} ${isSelected ? styles.selected : ''} ${isToday ? styles.today : ''}`}
      disabled={calendarCell.day === null}
      onClick={handleClick}
      aria-label={
        calendarCell.day !== null
          ? `Jour ${calendarCell.day}${
              hasIncome || hasExpense
                ? `, ${transactions.length} transaction${
                    transactions.length > 1 ? 's' : ''
                  }`
                : ''
            }`
          : undefined
      }
    >
      <span className={styles.number}>{calendarCell.day}</span>

      {(hasIncome || hasExpense) && (
        <div className={styles.summary}>
          {hasIncome && (
            <span className={styles.income}>+{income.toFixed(0)} €</span>
          )}

          {hasExpense && (
            <span className={styles.expense}>-{expense.toFixed(0)} €</span>
          )}
        </div>
      )}
      {/* <div className={styles.summary}>
        {income > 0 && <span className={styles.income}>+{income}</span>}

        {expense > 0 && <span className={styles.expense}>-{expense}</span>}
      </div> */}
    </button>
  );
}

export default CalendarDay;
