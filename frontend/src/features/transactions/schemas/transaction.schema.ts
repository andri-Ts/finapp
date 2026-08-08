import { z } from 'zod';

export const transactionSchema = z.object({
  amount: z.number().positive('Le montant doit être supérieur à 0'),
  type: z.enum(['EXPENSE', 'INCOME']),
  categoryId: z.string().min(1, 'Veuillez sélectionner une catégorie'),
  accountId: z.string().min(1, 'Veuillez sélectionner un compte'),
  transactionDate: z.string().min(1, 'Veuillez sélectionner une date'),
  description: z
    .string()
    .min(1, 'La description est obligatoire')
    .max(255, 'La description est trop longue'),
  note: z.string().max(1000, 'La note est trop longue').optional(),
});

// Zod puet créer automatiquement un type TypeScript qui correspondant à Schema
export type ITransactionFormData = z.infer<typeof transactionSchema>;
