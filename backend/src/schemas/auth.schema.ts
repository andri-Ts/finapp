import z from 'zod';

export const loginSchema = z.object({
  email: z.email('Email invalid'),
  password: z.string().min(1, 'Le mot de passe est obligatoire'),
});

export type LoginInput = z.infer<typeof loginSchema>; // permet de créer un type avec zod
