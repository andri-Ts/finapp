import { z } from 'zod';

export const transactionSchema = z
  .object({
    amount: z.number().positive('Le montant doit être supérieur à 0'),
    type: z.enum(['EXPENSE', 'INCOME', 'TRANSFER']), // Utilisé pour EXPENSE / INCOME
    categoryId: z.string(), // Utilisé pour EXPENSE / INCOME
    accountId: z.string(), // Utilisés uniquement pour TRANSFER
    sourceAccountId: z.string().optional(),
    destinationAccountId: z.string().optional(),
    transactionDate: z.string().min(1, 'Veuillez sélectionner une date'),
    description: z
      .string()
      .min(1, 'La description est obligatoire')
      .max(255, 'La description est trop longue'),
    note: z.string().max(1000, 'La note est trop longue').optional(),
  })
  .superRefine((data, context) => {
    /*
     * Ici, on vérifie les règles qui dépendent du type.
     *
     * EXPENSE / INCOME :
     * → catégorie obligatoire
     * → compte obligatoire
     *
     * TRANSFER :
     * → compte source obligatoire
     * → compte destination obligatoire
     */

    if (data.type === 'EXPENSE' || data.type === 'INCOME') {
      if (!data.categoryId) {
        context.addIssue({
          code: 'custom',
          path: ['categoryId'],
          message: 'Veuillez sélectionner une catégorie',
        });
      }

      if (!data.accountId) {
        context.addIssue({
          code: 'custom',
          path: ['accountId'],
          message: 'Veuillez sélectionner un compte',
        });
      }
    }

    if (data.type === 'TRANSFER') {
      if (!data.sourceAccountId) {
        context.addIssue({
          code: 'custom',
          path: ['sourceAccountId'],
          message: 'Veuillez sélectionner le compte source',
        });
      }

      if (!data.destinationAccountId) {
        context.addIssue({
          code: 'custom',
          path: ['destinationAccountId'],
          message: 'Veuillez sélectionner le compte destination',
        });
      }

      // Un compte ne peut pas être transféré vers lui-même.
      if (
        data.sourceAccountId &&
        data.sourceAccountId === data.destinationAccountId
      ) {
        context.addIssue({
          code: 'custom',
          path: ['destinationAccountId'],
          message: 'Le compte destination doit être différent du compte source',
        });
      }
    }
  });

// Zod puet créer automatiquement un type TypeScript qui correspondant à Schema
export type ITransactionFormData = z.infer<typeof transactionSchema>;
