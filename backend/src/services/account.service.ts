import { ERRORS } from '../constants/errors.js';
import prisma from '../lib/prisma.js';
import { IUpdateAccountInput } from '../schemas/account.schema.js';

interface ICreateAccountData {
  name: string;
  type: string;
  initialBalance?: number;
  icon?: string;
  color?: string;
}

// findUnique() : Quand tu as une valeur unique
// findFirst() : Quand on combines plusieurs conditions

export async function createAccountService(
  userId: string,
  accountData: ICreateAccountData,
) {
  const newAccount = await prisma.account.create({
    data: {
      name: accountData.name,
      type: accountData.type,
      initialBalance: accountData.initialBalance ?? 0,
      currentBalance: accountData.initialBalance ?? 0,
      icon: accountData.icon,
      color: accountData.color,
      userId,
    },
  });

  return newAccount;
}

export async function getAllAccountService(userId: string) {
  const accounts = await prisma.account.findMany({
    where: {
      userId, // vient de token
      archived: false,
    },
    orderBy: {
      displayOrder: 'asc',
    },
  });

  // On convertit les Decimal de prisma en number(pour le front)
  return accounts.map((account) => ({
    ...account,
    initialBalance: Number(account.initialBalance),
    currentBalance: Number(account.currentBalance),
  }));
}

export async function getAccountService(accountId: string, userId: string) {
  // =====================================================
  // A. RÉCUPÉRER LE COMPTE
  // =====================================================
  const account = await prisma.account.findFirst({
    where: {
      id: accountId,
      userId, // un user peut avoir plusieur account
      archived: false,
    },
  });

  if (!account) {
    return null;
  }

  // =====================================================
  // B. PÉRIODE DU MOIS ACTUEL
  // =====================================================
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  // =====================================================
  // C. RÉCUPÉRER LES TRANSACTIONS DU COMPTE
  // =====================================================
  const transactions = await prisma.transaction.findMany({
    where: {
      account: {
        id: account.id,
      },
      transactionDate: {
        gte: startOfMonth,
        lt: startOfNextMonth,
      },
    },
    include: {
      account: {
        select: {
          id: true,
          name: true,
          color: true,
          icon: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
          color: true,
          icon: true,
        },
      },
    },
    orderBy: {
      transactionDate: 'desc',
    },
  });

  // =====================================================
  // D. REVENUS / DEPENSES DU MOIS
  // =====================================================
  const incomeOfMonth = await prisma.transaction.aggregate({
    where: {
      accountId,
      type: 'INCOME',
      transactionDate: {
        gte: startOfMonth,
        lt: startOfNextMonth,
      },
    },
    _sum: {
      amount: true,
    },
  });

  const expenseOfMonth = await prisma.transaction.aggregate({
    where: {
      accountId,
      type: 'EXPENSE',
      transactionDate: {
        gte: startOfMonth,
        lt: startOfNextMonth,
      },
    },
    _sum: {
      amount: true,
    },
  });

  // =====================================================
  // F. RÉPONSE
  // =====================================================
  return {
    account: {
      ...account,
      initialBalance: Number(account.initialBalance),
      currentBalance: Number(account.currentBalance),
    },
    stats: {
      incomeOfMonth: Number(incomeOfMonth._sum.amount ?? 0),
      expenseOfMonth: Number(expenseOfMonth._sum.amount ?? 0),
    },
    transactions: transactions.map((transaction) => ({
      ...transaction,
      amount: Number(transaction.amount),
    })),
  };
}

export async function updateAccountService(
  accountId: string,
  userId: string,
  newData: IUpdateAccountInput,
) {
  // Vérifier le compte d'abord
  const account = await prisma.account.findFirst({
    where: {
      id: accountId,
      userId,
      archived: false,
    },
  });
  if (!account) throw new Error(ERRORS.ACCOUNT_NOT_FOUND);

  // Mettre à jour le compte
  const accountUpdated = await prisma.account.update({
    where: {
      id: account.id,
    },
    data: newData,
  });

  return accountUpdated;
}

export async function archiveAccountService(accountId: string, userId: string) {
  const account = await prisma.account.findFirst({
    where: {
      id: accountId,
      userId,
      archived: false,
    },
  });
  if (!account) throw new Error(ERRORS.ACCOUNT_NOT_FOUND);

  // Mettre archive à true
  const accountArchived = await prisma.account.update({
    where: {
      id: accountId,
    },
    data: {
      archived: true,
    },
  });

  return accountArchived;
}

export async function setDefaultAccountService(
  accountId: string,
  userId: string,
) {
  // Vérifier que le compte existe et appartient à l'utilisateur
  const account = await prisma.account.findFirst({
    where: {
      id: accountId,
      userId,
      archived: false,
    },
  });

  if (!account) {
    throw new Error(ERRORS.ACCOUNT_NOT_FOUND);
  }

  // Les deux opérations doivent réussir ensemble :
  // 1. retirer le statut par défaut aux autres comptes
  // 2. définir le compte sélectionné comme compte par défaut
  const accountUpdated = await prisma.$transaction(async (tx) => {
    await tx.account.updateMany({
      where: {
        userId,
        isDefault: true,
      },
      data: {
        isDefault: false,
      },
    });

    return await tx.account.update({
      where: {
        id: accountId,
      },
      data: {
        isDefault: true,
      },
    });
  });

  return accountUpdated;
}
