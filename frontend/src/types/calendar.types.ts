export interface ICalendarCell {
  day: number | null;
  currentMonth: boolean;
}

export interface ICalendarDaySummary {
  date: string;
  income: number;
  expense: number;
}
