// import type { IUpdateAccountPayload } from '@/features/accounts/api/acccountApi';
import api from '@/lib/api';
import type { ITransaction } from '@/types/transaction.types';
import type { ICreateTransactionPayload } from '@/types/transactionPayload.types';

interface ITransactionResponse {
  transactions: ITransaction[];
}

export async function createTransaction(payload: ICreateTransactionPayload) {
  // le JWT n'est pasajouté manuellement, axios interceptor() le fait
  const response = await api.post('/transactions', payload);

  return response.data;
}

export async function getAllTransactions(): Promise<ITransactionResponse> {
  const response = await api.get('/transactions');

  return response.data;
}

export async function getTransaction(id: string): Promise<ITransaction> {
  const response = await api.get(`/transactions/${id}`);

  return response.data;
}

export async function updateTransaction(
  id: string,
  payload: ICreateTransactionPayload,
) {
  const response = await api.patch(`/transactions/${id}`, payload);

  return response.data;
}

export async function deleteTransaction(id: string) {
  const response = await api.delete(`/transactions/${id}`);

  return response.data;
}
