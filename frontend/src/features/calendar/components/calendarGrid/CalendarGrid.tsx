import { WEEK_DAYS } from '@/features/calendar/constants/calendar';
import CalendarDay from '../calendarDay';
import styles from './calendarGrid.module.css';
import { generateCalendar } from '@/features/calendar/utils/generateCalendar';
import type { ITransaction } from '@/types/transaction.types';

//  méthode crée un tableau vide avec 31 cases
// prend deux paramètres pour chaque case : la valeur actuelle et son index (sa position).
// _ (le tiret bas) signifie que l'on ignore la valeur actuelle (qui est undefined).index commence toujours à 0 en programmation (donc de 0 à 30)
// .index + 1 transforme les positions (0, 1, 2... 30) en jours réels (1, 2, 3... 31).
// const days = Array.from({ length: 31 }, (_, index) => index + 1);

export interface CalendarGirdProps {
  transactions: ITransaction[];

  currentMonth: Date;
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

function CalendarGrid({
  transactions,
  currentMonth,
  selectedDate,
  setSelectedDate,
}: CalendarGirdProps) {
  const month = currentMonth.getMonth(); // Aout (0 = janvier)
  const year = currentMonth.getFullYear();
  // console.log(new Date(year, month, 1));

  // Génération des cases du calendrier selon le mois
  const cells = generateCalendar(month, year);
  // console.log('cell 5: ', cells[5]);

  return (
    <section className={styles.grid}>
      {WEEK_DAYS.map((weekDay) => (
        <div key={weekDay} className={styles.weekDay}>
          {weekDay}
        </div>
      ))}

      {cells.map((cell, index) => {
        // Transforme et stocke la date d'aujourd'hui(si la case n'est pas null) en un date js: (ex: 4 => 2026-08-04)
        // const dateKey =
        //   cell.day === null
        //     ? ''
        //     : `${year}-${String(month + 1).padStart(2, '0')}-${String(cell.day).padStart(2, '0')}`;

        // Chercher les transactions correspodants à cette date
        const transactionsOfDay =
          cell.day === null
            ? []
            : transactions.filter((transaction) => {
                const date = new Date(transaction.transactionDate);

                return (
                  date.getDate() === cell.day &&
                  date.getMonth() === currentMonth.getMonth() &&
                  date.getFullYear() === currentMonth.getFullYear()
                );
              });

        return (
          <CalendarDay
            key={index}
            calendarCell={cell} // pour la date
            transactions={transactionsOfDay} // pour les transacitions dans une case de jour
            // pour la liste des transactions à une date données
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        );
      })}
    </section>
  );
}

export default CalendarGrid;
