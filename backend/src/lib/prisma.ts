// Singleton pour ne pas appeler PrismaClient partout : Une seule instance partagée dans toute l'application.

// Singleton : une seule instance Prisma partagée dans toute l'application
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

export default prisma;
