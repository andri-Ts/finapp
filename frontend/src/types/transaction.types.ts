export type TransactionType = 'income' | 'expense';

export interface ITransaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  date: string;
  categoryId: string;
  accountId: string;
  createdAt: string;
}
