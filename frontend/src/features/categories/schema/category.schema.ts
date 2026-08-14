import z from 'zod';

export const categorySchema = z.object({
  name: z.string().min(1, 'Le nom de la catégorie est obligatoire'),
  type: z.enum(['EXPENSE', 'INCOME']),
  icon: z.string().nullable(),
  color: z.string().nullable(),
});

export type ICategoryFormData = z.infer<typeof categorySchema>;
