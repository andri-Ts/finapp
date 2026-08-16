// Type que l'API accepte

import type { TransactionType } from './transaction.types';

export interface ICreateExpenseIncomePayload {
  amount: number;
  type: 'EXPENSE' | 'INCOME';
  accountId: string;
  categoryId: string;
  transactionDate: string;
  description: string;
  note: string | null;
}

// Données nécessaire pour créer un transafert
export interface ICreateTransferPayload {
  amount: number;
  type: 'TRANSFER';
  sourceAccountId: string;
  destinationAccountId: string;
  transactionDate: string;
  description: string;
  note: string | null;
}

// Données que l'API accepte pour modifier une transaction
export interface IUpdateTransactionPayload {
  amount?: number;
  type?: TransactionType;
  accountId?: string;
  categoryId?: string;
  sourceAccountId?: string;
  destinationAccountId?: string;
  transactionDate?: string;
  description?: string;
  note?: string | null;
}

// Union des deux formes possibles de payload
export type ICreateTransactionPayload =
  | ICreateExpenseIncomePayload
  | ICreateTransferPayload;
