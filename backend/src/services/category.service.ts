import { defaultCategories } from '../constants/defaultCategories.js';
import { ERRORS } from '../constants/errors.js';
// import { CategoryType } from '../generated/prisma/enums.js';
import prisma from '../lib/prisma.js';
import {
  ICreateCategoryInput,
  IUpdateCategoryInput,
} from '../schemas/category.schema.js';

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

export async function getAllCategorieService(userId: string) {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const categories = await prisma.category.findMany({
    where: {
      userId,
      archived: false,
    },
    orderBy: {
      name: 'asc',
    },
  });

  // groupeBy() sert à séparer les données en plusieurs lots selon une colonne
  const monthlyTotals = await prisma.transaction.groupBy({
    by: ['categoryId'],
    where: {
      categoryId: {
        not: null, // Ignore les transactions sans catégorie (ex: transferts)
      },
      transactionDate: {
        gte: startOfMonth,
        lt: endOfMonth,
      },
      account: {
        userId,
        archived: false,
      },
    },
    _sum: {
      amount: true, // Additionne les montants de chaque catégorie
    },
  });

  const categoriesWithTotal = categories.map((category) => {
    // Chercher le total du la catégorie
    const total = monthlyTotals.find(
      (itemTotal) => itemTotal.categoryId === category.id,
    );

    //Récup le montant ou 0 s'il n'y a pas de transaction
    const monthlyAmount = total?._sum.amount ? Number(total._sum.amount) : 0;

    return {
      ...category,
      monthlyAmount,
    };
  });
  // console.log('Category total: ', categoriesWithTotal);

  return categoriesWithTotal;
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
  if (!category) throw new Error(ERRORS.CATEGORY_NOT_FOUND);

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
  if (!category) throw new Error(ERRORS.CATEGORY_NOT_FOUND);

  // Mettre à jour le categorie
  const categoryArchived = await prisma.category.update({
    where: { id: category.id },
    data: { archived: true },
  });

  return categoryArchived;
}
