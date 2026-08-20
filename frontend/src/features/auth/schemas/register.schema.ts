import z from 'zod';

export const registerSchema = z
  .object({
    pseudo: z.string().min(2, 'Le pseudo doit contenir au moins 2 caractères'),

    email: z.email('Email invalide'),

    password: z
      .string()
      .min(8, 'Le mot de passe doit contenir au moins 8 caractères'),

    confirmPassword: z.string().min(1, 'Veuillez confirmer votre mot de passe'),
  })
  // zod  fait une validation supplémentaire si les pwd sont les même
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne corrspondent pas',
    path: ['confirmPassword'],
  });

export type IRegisterFormData = z.infer<typeof registerSchema>;
