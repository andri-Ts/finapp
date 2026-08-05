import type { ICalendarCell } from '@/types/calendar.types';

export function generateCalendar(month: number, year: number): ICalendarCell[] {
  const firstDay = new Date(year, month, 1); // renvoye la date (ex: 1 juillet 2026)
  const firstWeekDay = firstDay.getDay(); // // 0 = dimanche, 1 = lundi, ..., 6 = samedi

  const startDay = firstWeekDay === 0 ? 6 : firstWeekDay - 1; // pour que que 1: lundi, 2: mardi ...

  const daysInMonth = new Date(year, month + 1, 0).getDate(); // jour = 0 -> jour d'avant

  // console.log('firstday string:', firstDay.toDateString());
  // console.log('firstday:', firstDay.getDay());

  const cells: ICalendarCell[] = [];

  // 1ere partie du calendrier sera vide jusqu'au jour commencement du mois
  for (let i = 0; i < startDay; i++) {
    cells.push({ day: null, currentMonth: false });
  }

  // apres on met les restes du jour
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({
      day,
      currentMonth: true,
    });
  }

  return cells;
}
