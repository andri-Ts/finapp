import type { CategoryIconName } from '@/constants/constIcons';

export type TransactionType = 'EXPENSE' | 'INCOME' | 'TRANSFER';

export type TransferRole = 'SOURCE' | 'DESTINATION';

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
  transferGroupId: string | null;
  transferRole: TransferRole | null;
  description: string;
  note: string | null;
  transactionDate: string;
  account: TransactionAccount;
  category: TransactionCategory | null;
  transferDestinationAccount?: TransactionAccount; // propriété nécéssaire uniquement à l'affichage
  displaySign?: '+' | '-'; // pour les signes pour transfert ou expense ou income
}
