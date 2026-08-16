import { z } from 'zod';
import { TransactionType } from '../generated/prisma/enums.js';

const baseTransactionSchema = {
  amount: z.coerce.number().positive('Le montant doit être supérieur à 0'),

  description: z
    .string()
    .trim()
    .min(1, 'La description est obligatoire')
    .max(100),

  note: z.string().trim().max(500).nullable().optional(),

  transactionDate: z.coerce.date(),
};

const expenseIncomeSchema = z.object({
  ...baseTransactionSchema,
  type: z.enum(['EXPENSE', 'INCOME']),
  accountId: z.cuid(),
  categoryId: z.cuid(),
});

const transferSchema = z.object({
  ...baseTransactionSchema,
  type: z.literal('TRANSFER'),
  sourceAccountId: z.cuid(),
  destinationAccountId: z.cuid(),
});

// SCHEMA GENERALE D'UN TRANSAFERT OU TRANSACTION
export const createTransactionSchema = z.discriminatedUnion('type', [
  expenseIncomeSchema,
  transferSchema,
]);

// export const updateTransactionSchema = createTransactionSchema.partial();
export const updateTransactionSchema = z.object({
  amount: z.coerce
    .number()
    .positive('Le montant doit être supérieur à 0')
    .optional(),

  type: z.nativeEnum(TransactionType).optional(),

  accountId: z.cuid().optional(),

  categoryId: z.cuid().optional(),

  sourceAccountId: z.cuid().optional(),

  destinationAccountId: z.cuid().optional(),

  description: z
    .string()
    .trim()
    .min(1, 'La description est obligatoire')
    .max(100)
    .optional(),

  note: z.string().trim().max(500).nullable().optional(),

  transactionDate: z.coerce.date().optional(),
});

export type ICreateTransactionInput = z.infer<typeof createTransactionSchema>;
export type IUpdateTransactionInput = z.infer<typeof updateTransactionSchema>;
