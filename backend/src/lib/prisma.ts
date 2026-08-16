// Singleton pour ne pas appeler PrismaClient partout : Une seule instance partagée dans toute l'application.

// Singleton : une seule instance Prisma partagée dans toute l'application
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL as string,
});

const prisma = new PrismaClient({ adapter });

console.log(process.env.DATABASE_URL);

export default prisma;

// process.env.DATABASE_URL est typé par TypeScript comme :
// string | undefined
//
// En effet, une variable d'environnement peut ne pas exister.
// Mais PrismaPg attend obligatoirement une chaîne de caractères.
//
// On indique donc à TypeScript que dans notre application,
// DATABASE_URL existe bien (elle est définie dans le fichier .env).
