import api from '@/lib/api';
import type { ICreateTransactionPayload } from '@/types/transactionPayload.types';

export async function createTransaction(payload: ICreateTransactionPayload) {
  // le JWT n'est pasajouté manuellement, axios interceptor() le fait
  const response = await api.post('/transactions', payload);

  return response.data;
}
