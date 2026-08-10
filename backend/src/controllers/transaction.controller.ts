import { Request, Response } from 'express';
import {
  createTransactionSchema,
  updateTransactionSchema,
} from '../schemas/transaction.schema';
import {
  createTransactionService,
  getTransactionService,
  getAllTransactionService,
  updateTransactionService,
  deleteTransactionService,
} from '../services/transaction.service';
import { ERRORS } from '../constants/errors';

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
    if (error instanceof Error && error.message === ERRORS.ACCOUNT_NOT_FOUND) {
      return res.status(404).json({
        message: 'Compte introuvable',
      });
    }
    if (error instanceof Error && error.message === ERRORS.CATEGORY_REQUIRED) {
      return res.status(400).json({
        message: 'Catégorei requis',
      });
    }
    if (
      error instanceof Error &&
      error.message === ERRORS.CATEGORY_TYPE_MISMATCH
    ) {
      return res.status(404).json({
        message: 'Catégorie incorrecte',
      });
    }
    if (error instanceof Error && error.message === ERRORS.CATEGORY_NOT_FOUND) {
      return res.status(404).json({
        message: 'Catégorie introuvable',
      });
    }

    if (
      error instanceof Error &&
      error.message === ERRORS.TRANSFER_SAME_ACCOUNT
    ) {
      return res.status(400).json({
        message:
          'Le compte source et le compte destination doivent être différents',
      });
    }

    if (
      error instanceof Error &&
      error.message === ERRORS.INSUFFICIENT_BALANCE
    ) {
      return res.status(400).json({
        message: 'Le solde du compte source est insuffisant',
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

export async function updateTransaction(req: Request, res: Response) {
  const validation = updateTransactionSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({
      message: 'Données invalides',
      errors: validation.error.issues,
    });
  }

  try {
    const userId = req.user?.userId;
    const transactionId = req.params.id;

    if (!userId || !transactionId || Array.isArray(transactionId)) {
      return res.status(401).json({ message: 'Utilisateur non authentifié' });
    }

    const transactionUpdated = await updateTransactionService(
      userId,
      transactionId,
      validation.data,
    );

    return res.status(200).json(transactionUpdated);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === ERRORS.TRANSACTION_NOT_FOUND
    ) {
      return res.status(404).json({
        message: 'Transaction introuvable',
      });
    }

    if (error instanceof Error && error.message === ERRORS.ACCOUNT_NOT_FOUND) {
      return res.status(404).json({
        message: 'Compte introuvable',
      });
    }

    if (error instanceof Error && error.message === ERRORS.CATEGORY_REQUIRED) {
      return res.status(400).json({
        message: 'Une catégorie est requise pour cette transaction',
      });
    }

    if (error instanceof Error && error.message === ERRORS.CATEGORY_NOT_FOUND) {
      return res.status(404).json({
        message: 'Catégorie introuvable',
      });
    }

    if (
      error instanceof Error &&
      error.message === ERRORS.CATEGORY_TYPE_MISMATCH
    ) {
      return res.status(400).json({
        message:
          'Le type de la catégorie ne correspond pas au type de la transaction',
      });
    }

    if (error instanceof Error && error.message === ERRORS.TRANSFER_INVALID) {
      return res.status(400).json({
        message: 'Transfert invalide',
      });
    }

    if (
      error instanceof Error &&
      error.message === ERRORS.TRANSFER_SAME_ACCOUNT
    ) {
      return res.status(400).json({
        message:
          'Le compte source et le compte destination doivent être différents',
      });
    }

    if (
      error instanceof Error &&
      error.message === ERRORS.INSUFFICIENT_BALANCE
    ) {
      return res.status(400).json({
        message: 'Le solde du compte source est insuffisant',
      });
    }

    console.error(error);

    return res.status(500).json({
      message: 'Erreur serveur',
    });
  }
}

export async function deleteTransaction(req: Request, res: Response) {
  try {
    const userId = req.user?.userId;
    const transactionId = req.params.id;

    if (!userId || !transactionId || Array.isArray(transactionId)) {
      return res.status(401).json({ message: 'Utilisateur non authentifié' });
    }

    const transactionDeleted = await deleteTransactionService(
      userId,
      transactionId,
    );

    return res.status(200).json({
      message: 'Transaction supprimée',
      transaction: transactionDeleted,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === ERRORS.TRANSACTION_NOT_FOUND
    ) {
      return res.status(404).json({
        message: 'Transaction introuvable',
      });
    }

    if (error instanceof Error && error.message === ERRORS.ACCOUNT_NOT_FOUND) {
      return res.status(404).json({
        message: 'Compte introuvable',
      });
    }

    if (error instanceof Error && error.message === ERRORS.TRANSFER_INVALID) {
      return res.status(400).json({
        message: 'Transfert invalide',
      });
    }

    console.error(error);

    return res.status(500).json({
      message: 'Erreur serveur',
    });
  }
}
