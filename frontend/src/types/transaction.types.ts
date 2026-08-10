import type { CategoryIconName } from '@/constants/constIcons';

export type TransactionType = 'EXPENSE' | 'INCOME' | 'TRANSFER';

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

// type que le formulaire manipule
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
