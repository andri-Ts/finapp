import api from '@/lib/api';
import type { IAccount } from '@/types/account.types';
import type { ITransaction } from '@/types/transaction.types';

// On ne fait donc pas : Promise<IAccount[]> car backend ne renvoie pas directement le tableau.
// Il renvoie :{ accounts: [...] }
interface IAccountResponse {
  accounts: IAccount[];
}

interface IAccountDetailResponse {
  account: IAccount;
  stats: {
    incomeOfMonth: number;
    expenseOfMonth: number;
  };
  transactions: ITransaction[];
}

export interface IUpdateAccountPayload {
  name: string;
  type: string;
  // currency: string | null;
  // initialBalance?: number;
  icon?: string;
  color?: string;
}

export interface ICreateAccountPayload {
  name: string;
  type: string;
  initialBalance: number;
  icon: string | null;
  color: string | null;
}

export async function getAllAccount(): Promise<IAccountResponse> {
  const response = await api.get('/accounts');

  return response.data;
}

export async function getAccount(id: string): Promise<IAccountDetailResponse> {
  const response = await api.get(`/accounts/${id}`);

  return response.data;
}

export async function createAccount(
  payload: ICreateAccountPayload,
): Promise<IAccount> {
  const response = await api.post('/accounts', payload);

  return response.data.account;
}

export async function updateAccount(
  id: string,
  payload: IUpdateAccountPayload,
): Promise<IAccount> {
  const response = await api.patch(`/accounts/${id}`, payload);

  return response.data.account;
}

export async function archiveAccount(id: string): Promise<string> {
  const response = await api.patch(`/accounts/${id}/archive`);

  return response.data.message;
}

export async function setDefaultAccount(id: string): Promise<IAccount> {
  const response = await api.patch(`/accounts/${id}/default`);

  return response.data.account;
}
