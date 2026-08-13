import z from 'zod';

export const accountSchema = z.object({
  name: z.string().min(1, 'Le nom du compte est obligatoire'),
  type: z.string().min(1, 'Le type du compte est obligatoire'),
  initialBalance: z
    .number()
    .min(0, 'Le solde initial ne peut pas être négatif')
    .optional(),
  icon: z.string().nullable(),
  color: z.string().nullable(),
});

export type IAccountFormData = z.infer<typeof accountSchema>;
