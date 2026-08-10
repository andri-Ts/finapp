// Type que l'API accepte

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

// Union des deux formes possibles de payload
export type ICreateTransactionPayload =
  | ICreateExpenseIncomePayload
  | ICreateTransferPayload;
