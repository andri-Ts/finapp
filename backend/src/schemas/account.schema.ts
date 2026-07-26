import z from 'zod';

export const createAccountSchema = z.object({
  name: z
    .string()
    .min(1, 'Le nom est obligatoire')
    .max(30, 'Le nom ne peut dépasser 30 caractères'),

  type: z
    .string()
    .min(1, 'Le type de compte es obligatoire')
    .max(15, 'Le nom ne peut dépasser 15 caractères'),

  initialBalance: z
    .number()
    .min(0, 'Le solde initiale ne peut être négatif')
    .optional(),
});
