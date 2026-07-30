import { Request } from 'express';

export function getAuthentificatedUser(req: Request): string {
  const userId = req.user?.userId; // récupere l'user qui va créer un comptes

  // Sécurité (normalement impossible si middlaware est bien placé)
  if (!userId) {
    throw new Error('UNAUTHENTICATED');
  }

  return userId;
}
