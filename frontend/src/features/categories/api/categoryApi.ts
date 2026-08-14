import api from '@/lib/api';
import type { CategoryType, ICategory } from '@/types/category.types';

interface ICategoryResponse {
  categories: ICategory[];
}

interface IUpdateCategoryPayload {
  name: string;
  type: CategoryType;
  icon?: string;
  color?: string;
}

export async function getAllCategory(): Promise<ICategoryResponse> {
  const response = await api.get('/categories');

  return response.data;
}

export async function getCategory(id: string): Promise<ICategory> {
  const response = await api.get(`/categories/${id}`);

  return response.data.category;
}

export async function updateCategory(
  id: string,
  payload: IUpdateCategoryPayload,
): Promise<ICategory> {
  const response = await api.patch(`/categories/${id}`, payload);

  return response.data;
}

export async function archiveCategory(id: string) {
  const response = await api.patch(`/categories/${id}/archive`);

  return response.data.message;
}
