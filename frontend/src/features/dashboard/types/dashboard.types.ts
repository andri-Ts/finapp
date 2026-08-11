import type { IAccount } from '@/types/account.types';
import type { ITransaction } from '@/types/transaction.types';

export interface IDashboard {
  defaultAccount: IAccount | null;
  stats: {
    incomeOfMonth: number;
    expenseOfMonth: number;
  };
  transactionsOfMonth: ITransaction[];
}
