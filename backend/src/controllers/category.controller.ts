import { Request, Response } from 'express';
import {
  createCategorySchema,
  updateCategorySchema,
} from '../schemas/category.schema.js';
import {
  createCategoryService,
  getAllCategorieService,
  getCategoryService,
  updateCategoryService,
  archiveCategoryService,
} from '../services/category.service.js';
import { ERRORS } from '../constants/errors.js';
import { getAuthentificatedUser } from '../utils/auth.js';

export async function createCategory(req: Request, res: Response) {
  const validation = createCategorySchema.safeParse(req.body);
  if (!validation.success)
    return res.status(400).json({
      message: 'Données invalides',
      errors: validation.error.issues,
    });

  try {
    const userId = getAuthentificatedUser(req);

    const newCategory = await createCategoryService(userId, validation.data);

    return res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

export async function getAllCategory(req: Request, res: Response) {
  try {
    const userId = getAuthentificatedUser(req);

    const categories = await getAllCategorieService(userId);

    return res.status(200).json({ categories });
  } catch (error) {
    console.error(error);

    return res.status(500).json('Erreur serveur');
  }
}

export async function getCategory(req: Request, res: Response) {
  try {
    const userId = req.user?.userId;
    const categoryId = req.params.id;

    if (!userId || !categoryId || Array.isArray(categoryId)) {
      return res.status(401).json({ message: 'Utilisateur non authentifié' });
    }

    const data = await getCategoryService(userId, categoryId);

    return res.status(200).json(data); // Contient {categorie, transactions}
  } catch (error) {
    if (error instanceof Error && error.message === ERRORS.CATEGORY_NOT_FOUND) {
      return res.status(404).json({
        message: 'Catégorie introuvable',
      });
    }

    console.error(error);

    return res.status(500).json('Erreur serveur');
  }
}

export async function updateCategory(req: Request, res: Response) {
  const validation = updateCategorySchema.safeParse(req.body);
  if (!validation.success)
    return res.status(400).json({
      message: 'Données invalides',
      errors: validation.error.issues,
    });

  try {
    const userId = req.user?.userId;
    const categoryId = req.params.id;

    if (!userId || !categoryId || Array.isArray(categoryId)) {
      return res.status(401).json({ message: 'Utilisateur non authentifié' });
    }

    const categoryUpdated = await updateCategoryService(
      userId,
      categoryId,
      validation.data,
    );

    return res.status(200).json({
      category: categoryUpdated,
    });
  } catch (error) {
    if (error instanceof Error && error.message === ERRORS.CATEGORY_NOT_FOUND) {
      return res.status(404).json({
        message: 'Catégorie introuvable',
      });
    }

    console.error(error);

    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

export async function archiveCategory(req: Request, res: Response) {
  try {
    const userId = req.user?.userId;
    const categoryId = req.params.id;

    // Vérifie aussi que accounId est une string
    if (!userId || !categoryId || Array.isArray(categoryId)) {
      return res.status(401).json({
        message: 'Utilisateur non authentifié',
      });
    }

    await archiveCategoryService(userId, categoryId);

    return res.status(200).json({ message: 'Catégorie archivé' });
  } catch (error) {
    if (error instanceof Error && error.message === ERRORS.CATEGORY_NOT_FOUND) {
      return res.status(404).json({
        message: 'Compte introuvable',
      });
    }

    console.error(error);

    return res.status(500).json({ message: 'Erreur serveur' });
  }
}
