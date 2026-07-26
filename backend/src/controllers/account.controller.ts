import { Request, Response } from 'express';
import { createAccountService } from '../services/account.service';
import { createAccountSchema } from '../schemas/account.schema';

export async function createAccount(req: Request, res: Response) {
  const validation = createAccountSchema.safeParse(req.body);
  console.log('Validation account: ', validation);
  if (!validation.success)
    return res
      .status(400)
      .json({ message: 'Données invalides', errors: validation.error.issues });

  try {
    const userId = req.user?.userId; // récupere l'user qui va créer un coptes
    // Sécurité (normalement impossible si middlaware est bien placé)
    if (!userId) {
      return res.status(401).json({ message: 'Utilisateur non authentifier' });
    }

    const newAccount = await createAccountService(userId, validation.data);

    return res.status(200).json({ newAccount });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: 'Erreur serveur' });
  }
}
