import { Request, Response } from 'express';
import {
  archiveAccountService,
  createAccountService,
  getAllAccountervice,
  getAllAccountService,
  updateAccountService,
} from '../services/account.service';
import {
  createAccountSchema,
  updateAccountSchema,
} from '../schemas/account.schema';
import { getAuthentificatedUser } from '../utils/auth';
import { ERRORS } from '../constants/errors';

export async function createAccount(req: Request, res: Response) {
  const validation = createAccountSchema.safeParse(req.body);
  // console.log('Validation account: ', validation);
  if (!validation.success)
    return res
      .status(400)
      .json({ message: 'Données invalides', errors: validation.error.issues });

  try {
    const userId = getAuthentificatedUser(req);

    const newAccount = await createAccountService(userId, validation.data);

    return res.status(200).json({ newAccount });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

export async function getAllAccount(req: Request, res: Response) {
  try {
    const userId = getAuthentificatedUser(req);

    const accounts = await getAllAccountService(userId);
    // console.log('ACCOUNTS:', accounts);

    return res.status(200).json({ accounts });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

export async function getAccount(req: Request, res: Response) {
  try {
    const userId = req.user?.userId;
    const accountId = req.params.id;

    // Vérifie aussi que accounId est une string
    if (!userId || !accountId || Array.isArray(accountId)) {
      return res.status(401).json({
        message: 'Utilisateur non authentifié',
      });
    }

    const account = await getAllAccountervice(accountId, userId);
    if (!account)
      return res.status(404).json({ message: 'Compte introuvable' });

    return res.status(200).json(account);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

export async function updateAccount(req: Request, res: Response) {
  const validation = updateAccountSchema.safeParse(req.body);
  if (!validation.success)
    return res
      .status(400)
      .json({ message: 'Données invalides', errors: validation.error.issues });

  try {
    const userId = req.user?.userId;
    const accountId = req.params.id;

    // Vérifie aussi que accounId est une string
    if (!userId || !accountId || Array.isArray(accountId)) {
      return res.status(401).json({
        message: 'Utilisateur non authentifié',
      });
    }

    const accountUpdated = await updateAccountService(
      accountId,
      userId,
      validation.data,
    );

    return res.status(200).json({ account: accountUpdated });
  } catch (error) {
    if (error instanceof Error && error.message === ERRORS.ACCOUNT_NOT_FOUND) {
      return res.status(404).json({
        message: 'Compte introuvable',
      });
    }

    console.error(error);

    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

export async function archiveAccount(req: Request, res: Response) {
  try {
    const userId = req.user?.userId;
    const accountId = req.params.id;

    // Vérifie aussi que accounId est une string
    if (!userId || !accountId || Array.isArray(accountId)) {
      return res.status(401).json({
        message: 'Utilisateur non authentifié',
      });
    }

    await archiveAccountService(accountId, userId);

    return res.status(200).json({ message: 'Compte archivé' });
  } catch (error) {
    if (error instanceof Error && error.message === ERRORS.ACCOUNT_NOT_FOUND) {
      return res.status(404).json({
        message: 'Compte introuvable',
      });
    }

    console.error(error);

    return res.status(500).json({ message: 'Erreur serveur' });
  }
}
