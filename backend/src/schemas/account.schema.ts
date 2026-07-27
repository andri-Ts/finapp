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

  currency: z.string().default('EUR'),

  initialBalance: z
    .number()
    .min(0, 'Le solde initiale ne peut être négatif')
    .optional(),

  icon: z.string().optional(),

  color: z.string().optional(),
});

// Avec un PATCH et non PUT) , on ne veut pas tout envoyer.
// partial(): Zod transforme automatiquement, tous les champs deviennent optionnels.
export const updateAccountSchema = createAccountSchema.partial();
export type IUpdateAccountInput = z.infer<typeof updateAccountSchema>;
