import PageHeader from '@/components/layout/pageHeader';
import CalendarHeader from '@/features/calendar/components/calendarHeader';
import styles from './calendarPage.module.css';
import CalendarGrid from '@/features/calendar/components/calendarGrid';
import DayTransactions from '@/features/calendar/components/dayTransactions';
import { useState } from 'react';
import { mockTransactions } from '@/mocks/transactions.mock';

function CalendarPage() {
  // dates
  const initialDate = new Date(2026, 7, 1);
  const [currentMonth, setCurrentMonth] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState(initialDate);

  // Data: Source de vérité (mock aujourd'hui, API demain)
  const transactions = mockTransactions;

  // Next month
  const nextMonth = () => {
    setCurrentMonth((prevDate) => {
      return new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1);
    });
  };

  // Previous month
  const previousMounth = () => {
    setCurrentMonth((prevDate) => {
      return new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1);
    });
  };

  return (
    <section className={styles.page}>
      <PageHeader title="Calendrier" />

      <CalendarHeader
        currentMonth={currentMonth}
        onPreviousMonth={previousMounth}
        onNextMonth={nextMonth}
      />

      <CalendarGrid
        transactions={transactions}
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <DayTransactions
        selectedDate={selectedDate}
        transactions={transactions}
      />
    </section>
  );
}

export default CalendarPage;
