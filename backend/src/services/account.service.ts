import prisma from '../lib/prisma';

interface ICreateAccountData {
  name: string;
  type: string;
  initialBalance?: number;
  icon?: string;
  color?: string;
}

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
