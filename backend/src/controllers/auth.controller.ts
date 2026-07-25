import { Request, Response } from 'express';
import { loginSchema } from '../schemas/auth.schema';
import { login } from '../services/auth.service';
import { sanitizeUser } from '../utils/user.utils';

export async function loginUser(req: Request, res: Response) {
  const validation = loginSchema.safeParse(req.body);
  if (!validation.success) {
    return res
      .status(400)
      .json({ message: 'Données invalides', errors: validation.error.issues });
  }

  try {
    const result = await login(validation.data);

    return res
      .status(200)
      .json({ user: sanitizeUser(result.user), token: result.token });
  } catch (error) {
    if (error instanceof Error && error.message === 'INVALID_CREDENTIALS') {
      return res
        .status(401) // erreur qui signifie ''Mauvais identifiants'
        .json({ message: 'Email ou mot de passe incorrect' });
    }

    console.error(error);

    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

export async function getMe(req: Request, res: Response) {
  return res.status(200).json({
    user: req.user,
  });
}
