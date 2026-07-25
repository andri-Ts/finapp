import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { createUserSchema } from '../schemas/user.schema';
import { createUserService } from '../services/user.service';

// async: Pendant qu'il cherche les utilisateurs, Node.js continue de gérer d'autres requêtes.

export async function getUsers(req: Request, res: Response) {
  try {
    // Vérifie si l'email n'existe pas déjà
    const users = await prisma.user.findMany();

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

export async function createUsers(req: Request, res: Response) {
  // Validation par Zod de la contenue de la reques
  const validation = createUserSchema.safeParse(req.body);
  if (!validation.success) {
    return res
      .status(400)
      .json({ message: 'Données invalides', errors: validation.error.issues });
  }

  try {
    // Appel du service: Le controller dit simplement :"Le formulaire est valide, maintenant crée l'utilisateur.";
    const users = await createUserService(validation.data);

    return res.status(201).json(users);
  } catch (error) {
    // Ici on transforme conflit email dans le service en réponse HTTP propre :
    if (error instanceof Error && error.message === 'EMAIL_ALREADY_EXISTS') {
      return res.status(409).json({ message: 'Cet email est déjà utilisé' });
    }

    console.error(error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}
