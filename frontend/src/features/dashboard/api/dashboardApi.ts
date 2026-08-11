import api from '@/lib/api';
import type { IDashboard } from '../types/dashboard.types';

export async function getDashboard(): Promise<IDashboard> {
  const response = await api.get('/dashboard');
  console.log('res api: ', response.data);

  return response.data;
}
