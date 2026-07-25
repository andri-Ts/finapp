import { Request, Response } from 'express';
import prisma from '../lib/prisma';

// async: Pendant qu'il cherche les utilisateurs, Node.js continue de gérer d'autres requêtes.
export async function getUsers(req: Request, res: Response) {
  try {
    const users = await prisma.user.findMany(); // Cherche tous les utilisateurs (SELECT * FROM "User";)

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: 'Erreur serveur' });
  }
}
