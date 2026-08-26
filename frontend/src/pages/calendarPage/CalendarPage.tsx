import PageHeader from '@/components/layout/pageHeader';
import CalendarHeader from '@/features/calendar/components/calendarHeader';
import styles from './calendarPage.module.css';
import CalendarGrid from '@/features/calendar/components/calendarGrid';
import DayTransactions from '@/features/calendar/components/dayTransactions';
import { useState } from 'react';
// import { mockTransactions } from '@/mocks/transactions.mock';
import type { ITransaction } from '@/types/transaction.types';
import { getAllTransactions } from '@/features/transactions/api/transactionApi';
import { useQuery } from '@tanstack/react-query';
import { groupTransactionsForDisplay } from '@/utils/groupTransactionsForDisplay';

function CalendarPage() {
  // dates
  const initialDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState(initialDate);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['transactions'], // identifiant des transatcions  dans le cache, -> plus besoin de recharger les données si on change de page et qu'on revient
    queryFn: getAllTransactions, // fonciton (au'on a fait) qui appelle l'api
  });

  const transactions: ITransaction[] = data?.transactions ?? []; // data = { transacitons: [...]}, si data existe, envoie transactions, sinon tab vide
  const displayedTransactions = groupTransactionsForDisplay(transactions); // Données préparée UNIQUEMENT POUR L'AFFICHAGE

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

  if (isError) {
    return <p>Impossible de charger les transactions.</p>;
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
        transactions={displayedTransactions}
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <DayTransactions
        selectedDate={selectedDate}
        transactions={displayedTransactions}
      />
    </section>
  );
}

export default CalendarPage;
