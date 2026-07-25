import prisma from '../lib/prisma';
import bcrypt from 'bcrypt';

interface CreateUserInput {
  pseudo: string;
  email: string;
  password: string;
}

export async function createUserService(data: CreateUserInput) {
  // Vérifier l'existence de mail: la contrainte SQL protège la base. Mais la vérification donne une meilleure expérience utilisateur.
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existingUser) throw new Error('EMAIL_ALREADY_EXIST');

  // Hasher le mdp (si l'user n'existe pas encore)
  const passwordHash = await bcrypt.hash(data.password, 10);

  // Création Prisma
  const newUser = await prisma.user.create({
    data: {
      pseudo: data.pseudo,
      email: data.email,
      passwordHash,
    },
  });

  return newUser; // !!! NE PAS RETOURNER AU FRONT LE PSWD HASHH, à corriger plutard
}

export async function getUserById(userId: string) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}
