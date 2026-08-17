import prisma from '../lib/prisma.js';
import { LoginInput } from '../schemas/auth.schema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function login(data: LoginInput) {
  // Recherche l'utilisateur de l'email (et aussi récupérer le pswdhash)
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (!user) throw new Error('INVALID_CREDENTIAL');

  // Comparer le mdp
  const passwordMatch = await bcrypt.compare(data.password, user.passwordHash);
  if (!passwordMatch) throw new Error('INVALID_CREDENTIALS'); // En renvoyant toujours : Identifiants invalides on ne révèle aucune information.

  // Génere un JWT valable 1 jour
  const token = jwt.sign(
    // payload: données qu'on veut retrouver au décodage du token
    // LE TOKEN EST DECODER à partir de la signature dans authenticate()
    {
      userId: user.id,
      email: user.email,
    },
    // Clé secret pour qu'on ne puisse pas recréer le token
    process.env.JWT_SECRET as string,
    {
      // Plus tard, on la récupérera depuis un fichier de configuration
      // validé avec Zod pour conserver un typage sûr.
      //   expiresIn: process.env.JWT_SECRET_IN,
      expiresIn: '3d',
    },
  );

  return { user, token };
}
