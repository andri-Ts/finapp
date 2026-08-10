import type {
  ICreateExpenseIncomePayload,
  ICreateTransactionPayload,
  ICreateTransferPayload,
} from '@/types/transactionPayload.types';
import type { ITransactionFormData } from '../schemas/transaction.schema';

export function buildTransactionPayload(
  data: ITransactionFormData,
): ICreateTransactionPayload {
  // Si le type est TRANSFERT
  if (data.type === 'TRANSFER') {
    const payload: ICreateTransferPayload = {
      amount: data.amount,
      type: 'TRANSFER',
      sourceAccountId: data.sourceAccountId!, // '!' dit à typeScirpt que cette valeur existe (car petu être null)
      destinationAccountId: data.destinationAccountId!,
      transactionDate: data.transactionDate,
      description: data.description,
      note: data.note || null,
    };

    return payload;
  }

  // Sinon
  const payload: ICreateExpenseIncomePayload = {
    amount: data.amount,
    type: data.type,
    accountId: data.accountId,
    categoryId: data.categoryId,
    transactionDate: data.transactionDate,
    description: data.description,
    note: data.note || null,
  };

  return payload;
}
