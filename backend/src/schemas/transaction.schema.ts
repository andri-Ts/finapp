import z, { optional } from 'zod';
import { TransactionType } from '../generated/prisma/enums';

export const createTransactionSchema = z.object({
  accountId: z.cuid(),

  categoryId: z.cuid().optional(),

  amount: z.coerce.number().positive('Le montant doit être supérieur à 0'), // coerce :Zod convertit automatiquement en number

  type: z.nativeEnum(TransactionType),

  description: z
    .string()
    .trim()
    .min(1, 'La description est obligatoire')
    .max(100),

  note: z.string().trim().max(500).optional(),

  transactionDate: z.coerce.date(), // coerce: on obtiens directement un objet Date(pas un string/json).
});

export type ICreateTransactionInput = z.infer<typeof createTransactionSchema>;
