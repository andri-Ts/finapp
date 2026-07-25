import { z } from 'zod';

export const createUserSchema = z.object({
  pseudo: z
    .string()
    .min(3, 'Le pseudo doit contenir au moin 3 caractères')
    .max(30, 'Le pseudo ne peut dépasser 30 caractères'),

  email: z.email('Adresse email invalide').toLowerCase(),

  password: z
    .string()
    .min(8, 'Le mot de passe doit contenir au moin 8 caracteres'),
});
