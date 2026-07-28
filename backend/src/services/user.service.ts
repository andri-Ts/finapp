import prisma from '../lib/prisma';
import bcrypt from 'bcrypt';
import { createDefaultCategories } from './category.service';

interface ICreateUserInput {
  pseudo: string;
  email: string;
  password: string;
}

export async function createUserService(userData: ICreateUserInput) {
  // Vérifier l'existence de mail: la contrainte SQL protège la base. Mais la vérification donne une meilleure expérience utilisateur.
  const existingUser = await prisma.user.findUnique({
    where: { email: userData.email },
  });
  if (existingUser) throw new Error('EMAIL_ALREADY_EXIST');

  // Hasher le mdp (si l'user n'existe pas encore)
  const passwordHash = await bcrypt.hash(userData.password, 10);

  // Création Prisma
  const newUser = await prisma.user.create({
    data: {
      pseudo: userData.pseudo,
      email: userData.email,
      passwordHash,
    },
  });

  await createDefaultCategories(newUser.id); // ajout des catégories par défaut au nouvel utilisateur

  return newUser; // !!! NE PAS RETOURNER AU FRONT LE PSWD HASHH, à corriger plutard
}

export async function getUserById(userId: string) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}
