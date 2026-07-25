// Transforme un utilisateur Prisma en utilisateur public.
// On retire les données sensibles avant de les envoyer au frontend.

export function sanitizeUser(user: any) {
  return {
    id: user.id,
    pseudo: user.pseudo,
    email: user.email,
    currency: user.currency,
    createdAt: user.createdAt,
    updateAt: user.updateAt,
  };
}
