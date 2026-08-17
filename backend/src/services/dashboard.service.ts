import prisma from '../lib/prisma.js';

export async function getDashboardService(userId: string) {
  // =========================
  // 1. Période du mois actuel
  // =========================
  const now = new Date();

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  // =========================
  // 2. Récup compte par défaut
  // =========================
  const defaultAccount = await prisma.account.findFirst({
    where: {
      userId,
      isDefault: true,
      archived: false,
    },
    select: {
      id: true,
      name: true,
      currentBalance: true,
      icon: true,
      color: true,
    },
  });

  // =========================
  // 2. Transactions du mois
  // =========================
  const transactionsOfMonth = await prisma.transaction.findMany({
    where: {
      account: {
        //  tous les transactions de tous les comptes
        userId,
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

  // =========================
  // 3. Revenus / depenses du mois
  // =========================
  // aggreaget(): utilisé pour faire des calules sur plusiseur lignes de bases de données
  const incomeOfMonth = await prisma.transaction.aggregate({
    where: {
      account: {
        userId,
      },
      type: 'INCOME',
      transactionDate: {
        gte: startOfMonth, // 'greater than or equal'
        lt: startOfNextMonth, // 'less than' ->  transaction < 1er jour next month
      },
    },
    // Additionne tous les valeurs de amount
    _sum: {
      amount: true,
    },
  });

  const expenseOfMonth = await prisma.transaction.aggregate({
    where: {
      accountId: defaultAccount?.id,
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

  // =========================
  // 4. Reponse du dashboard (+ CONVERSION EN NUMBER DES VALEURS DECIMALS De PRISMA)
  // =========================
  return {
    defaultAccount: defaultAccount
      ? {
          ...defaultAccount,
          currentBalance: Number(defaultAccount.currentBalance),
        }
      : null,
    stats: {
      incomeOfMonth: Number(incomeOfMonth._sum.amount ?? 0), // si la valeur est null ou undefined, utilise 0
      expenseOfMonth: Number(expenseOfMonth._sum.amount ?? 0), // si la valeur est null ou undefined, utilise 0
    },
    transactionsOfMonth: transactionsOfMonth.map((trans) => ({
      ...trans,
      amount: Number(trans.amount),
    })),
  };
}
