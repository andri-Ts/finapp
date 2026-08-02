import type { CategoryIconName } from '@/constants/categoryIcons';

export type TransactionType = 'EXPENSE' | 'INCOME' | 'TRANSFERT';

export interface TransactionCategory {
  id: string;
  name: string;
  icon: CategoryIconName | null;
  color: string | null;
}

export interface TransactionAccount {
  id: string;
  name: string;
  icon: string | null;
  color: string | null;
}

export interface ITransaction {
  id: string;
  amount: number;
  type: TransactionType;
  description: string;
  note: string | null;
  transactionDate: string;
  account: TransactionAccount;
  category: TransactionCategory | null;
}
