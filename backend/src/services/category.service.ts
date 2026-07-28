import { CategoryType } from '../generated/prisma/enums';
import prisma from '../lib/prisma';
import {
  ICreateCategoryInput,
  IUpdateCategoryInput,
} from '../schemas/category.schema';

const defaultCategories = [
  {
    name: 'Logement',
    type: CategoryType.EXPENSE,
  },
  {
    name: 'Restauration',
    type: CategoryType.EXPENSE,
  },
  {
    name: 'Transport',
    type: CategoryType.EXPENSE,
  },
  {
    name: 'Loisirs',
    type: CategoryType.EXPENSE,
  },
  {
    name: 'Santé',
    type: CategoryType.EXPENSE,
  },
  {
    name: 'Shopping',
    type: CategoryType.EXPENSE,
  },
  {
    name: 'Salaire',
    type: CategoryType.INCOME,
  },
  {
    name: 'Cadeaux',
    type: CategoryType.INCOME,
  },
  {
    name: 'Autre revenus',
    type: CategoryType.INCOME,
  },
];

export async function createDefaultCategories(userId: string) {
  const categories = defaultCategories.map((category) => ({
    ...category, // "Copie toutes les propriétés de category."
    userId, // Prisma exige aussi userId Sinon il ne sait pas à quel utilisateur appartient les catégories.
  }));

  // Insère toutes les catégories en une seule requête SQL -=> création des catégories par défaut pour un user
  await prisma.category.createMany({
    data: categories,
  });
}

export async function createCategoryService(
  userId: string,
  categoryData: ICreateCategoryInput,
) {
  return await prisma.category.create({
    data: {
      ...categoryData,
      userId,
    },
  });
}

export async function getCategoriesService(userId: string) {
  return await prisma.category.findMany({
    where: {
      userId,
      archived: false,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export async function getCategoryService(userId: string, categoryId: string) {
  return await prisma.category.findFirst({
    where: {
      userId,
      id: categoryId,
      archived: false,
    },
  });
}

export async function updateCategoryService(
  userId: string,
  categoryId: string,
  newData: IUpdateCategoryInput,
) {
  // vérifier l'existense de la catégorie
  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
      userId,
      archived: false,
    },
  });
  if (!category) throw new Error('CATEGORY_NOT_FOUND');

  // Mettre à jour le categorie
  const categoryUpdated = await prisma.category.update({
    where: { id: category.id },
    data: newData,
  });

  return categoryUpdated;
}

export async function archiveCategoryService(
  userId: string,
  categoryId: string,
) {
  // vérifier l'existense de la catégorie
  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
      userId,
      archived: false,
    },
  });
  if (!category) throw new Error('CATEGORY_NOT_FOUND');

  // Mettre à jour le categorie
  const categoryArchived = await prisma.category.update({
    where: { id: category.id },
    data: { archived: true },
  });

  return categoryArchived;
}
