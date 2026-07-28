import z from 'zod';

export const createCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Le nom est obligatoire')
    .max(30, 'Le nom ne peut dépasser 30 caractères'),

  type: z.enum(['EXPENSE', 'INCOME']),

  icon: z.string().optional(),

  color: z.string().optional(),
});

export const updateCategorySchema = createCategorySchema.partial();

export type ICreateCategoryInput = z.infer<typeof createCategorySchema>;
export type IUpdateCategoryInput = z.infer<typeof updateCategorySchema>;
