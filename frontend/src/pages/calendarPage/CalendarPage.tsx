import PageHeader from '@/components/layout/pageHeader';
import CalendarHeader from '@/features/calendar/components/calendarHeader';
import styles from './calendarPage.module.css';
import CalendarGrid from '@/features/calendar/components/calendarGrid';
import DayTransactions from '@/features/calendar/components/dayTransactions';
import { useEffect, useState } from 'react';
// import { mockTransactions } from '@/mocks/transactions.mock';
import type { ITransaction } from '@/types/transaction.types';
import { getAllTransactions } from '@/features/transactions/api/transactionApi';

function CalendarPage() {
  // dates
  const initialDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Data: Source de vérité
  useEffect(() => {
    async function loadTransaction() {
      try {
        const data = await getAllTransactions();
        setTransactions(data.transactions);
      } catch (error) {
        console.error('Erreur lors du chargement des transactions :', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadTransaction();
  }, []);

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

  if (isLoading) {
    return <p>Chargement...</p>;
  }

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
