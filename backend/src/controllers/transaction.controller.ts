import { Request, Response } from 'express';
import { createTransactionSchema } from '../schemas/transaction.schema';
import {
  createTransactionService,
  getTransactionService,
  getAllTransactionService,
} from '../services/transaction.service';

export async function createTransaction(req: Request, res: Response) {
  // VAlidation Zod
  const validation = createTransactionSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({
      message: 'Données invalides',
      errors: validation.error.issues,
    });
  }

  try {
    // vérification de l'userId donnée par le token
    const userId = req.user?.userId;
    // Sécurité (normalement impossible si middlaware est bien placé)
    if (!userId) {
      return res.status(401).json({ message: 'Utilisateur non authentifier' });
    }

    // Creation d'une transaction
    const newTransaction = await createTransactionService(
      userId,
      validation.data,
    );

    // retour response
    return res.status(201).json(newTransaction);
  } catch (error) {
    if (error instanceof Error && error.message === 'ACCOUNT_NOT_FOUND') {
      return res.status(404).json({
        message: 'Compte introuvable',
      });
    }
    if (error instanceof Error && error.message === 'CATEGORY_REQUIRED') {
      return res.status(400).json({
        message: 'Catégorei requis',
      });
    }
    if (error instanceof Error && error.message === 'CATEGORY_TYPE_MISMATCH') {
      return res.status(404).json({
        message: 'Catégorie incorrecte',
      });
    }
    if (error instanceof Error && error.message === 'CATEGORY_NOT_FOUND') {
      return res.status(404).json({
        message: 'Catégorie introuvable',
      });
    }

    console.error(error);

    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

export async function getAllTransaction(req: Request, res: Response) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Utilisateur non authentifié' });
    }

    const transactions = await getAllTransactionService(userId);

    return res.status(200).json(transactions);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

export async function getTransaction(req: Request, res: Response) {
  try {
    const userId = req.user?.userId;
    const transactionId = req.params.id;

    if (!userId || !transactionId || Array.isArray(transactionId)) {
      return res.status(401).json({ message: 'Utilisateur non authentifié' });
    }

    const transaction = await getTransactionService(userId, transactionId);
    // si l'ID n'existe pas ou si la transaction appartient à un autre utilisateur.
    if (!transaction) {
      return res.status(404).json({
        message: 'Transaction introuvable',
      });
    }

    return res.status(200).json(transaction);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: 'Erreur serveur' });
  }
}
