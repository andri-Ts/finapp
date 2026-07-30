import { ERRORS } from '../constants/errors';
import { TransactionType } from '../generated/prisma/enums';
import prisma from '../lib/prisma';
import {
  ICreateTransactionInput,
  IUpdateTransactionInput,
} from '../schemas/transaction.schema';

export async function createTransactionService(
  userId: string,
  transactionData: ICreateTransactionInput,
) {
  // Ouvre une transaction SQL : toutes les opérations réussissent ensemble ou sont annulées.
  return prisma.$transaction(async (tx) => {
    // Vérifie que le compte existe et appartient à l'utilisateur connecté.
    const account = await tx.account.findFirst({
      where: {
        id: transactionData.accountId,
        userId,
        archived: false,
      },
    });
    if (!account) throw new Error(ERRORS.ACCOUNT_NOT_FOUND);

    // Une catégorie est obligatoire sauf pour les transferts.
    if (
      transactionData.type !== TransactionType.TRANSFER &&
      !transactionData.categoryId
    ) {
      throw new Error(ERRORS.CATEGORY_REQUIRED);
    }

    // Récupère la catégorie si un categoryId a été fourni.
    let category = null;

    if (transactionData.categoryId) {
      // Utilise tx (et non prisma) pour que cette requête fasse partie de la transaction SQL.
      category = await tx.category.findFirst({
        where: {
          id: transactionData.categoryId,
          userId,
          archived: false,
        },
      });

      if (!category) {
        throw new Error(ERRORS.CATEGORY_NOT_FOUND);
      }
    }

    // Vérifie que la catégorie correspond au type de transaction.
    if (category && category.type !== transactionData.type)
      throw new Error(ERRORS.CATEGORY_TYPE_MISMATCH);

    // Calculer le nouveau solde du compte
    let newBalance = account.currentBalance; // par defaut on met la solde actuel comme nouvelle solde

    if (transactionData.type === TransactionType.EXPENSE) {
      newBalance = account.currentBalance.minus(transactionData.amount); // Les Decimal Prisma utilisent les méthodes plus() et minus() au lieu des opérateurs + et -.
    } else if (transactionData.type === TransactionType.INCOME) {
      newBalance = account.currentBalance.plus(transactionData.amount);
    }

    // Créer la transaction
    const newTransaction = await tx.transaction.create({
      data: {
        ...transactionData,
      },
    });

    // MAJ la solde actuelle du compte
    await tx.account.update({
      where: {
        id: account.id, // utiliser les données déjà validées par la base (au lieu de transactionData.accountId qui vient du front)
      },
      data: {
        currentBalance: newBalance,
      },
    });

    return newTransaction;
  });
}

export async function getAllTransactionService(userId: string) {
  // await est inutile si on retourne directement une Promise (async func)
  // On l'utilise seulement si on doit manipuler le résultat ou gérer les erreurs ici.(ex: const res = await ...; res.toLowerCase();)
  return prisma.transaction.findMany({
    where: {
      // On filtre sur une relation, transaciton n'a pas de userId, mais est toujours lié à un compte (accountId)
      account: {
        userId,
        archived: false,
      },
    },
    orderBy: {
      transactionDate: 'desc', // pour avoir du plus récent au plus ancien
    },
    // include pour inclure les données utiles le frontend en a besoin (ex: le front connait immédiatement que c'est Compte Courant (pas juste id de compte))
    include: {
      // On utilise ensuite select pour ne récupérer que les champs utiles au frontend.
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
  });
}

export async function getTransactionService(
  userId: string,
  transactionId: string,
) {
  // findFirst() pour des recherches avec plusieurs filtres
  return prisma.transaction.findFirst({
    where: {
      id: transactionId,
      account: {
        userId,
        archived: false,
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
  });
}

export async function updateTransactionService(
  userId: string,
  transactionId: string,
  newData: IUpdateTransactionInput,
) {
  return prisma.$transaction(async (tx) => {
    // Vérifier que la transaction existe
    const transaction = await tx.transaction.findFirst({
      where: {
        id: transactionId,
        account: {
          userId, // pour être sûr que c'est la transaction du bon user
          archived: false,
        },
      },
    });
    if (!transaction) {
      throw new Error(ERRORS.TRANSACTION_NOT_FOUND);
    }

    // Vérifier le compte
    const account = await tx.account.findFirst({
      where: {
        id: transaction.accountId,
        userId,
        archived: false,
      },
    });
    if (!account) {
      throw new Error(ERRORS.ACCOUNT_NOT_FOUND);
    }

    // Calculer le nouveau solde du compte
    let newBalance = account.currentBalance; //

    // Si le amount ou le type a été modifié (pas juste le nom ou le catégorie par ex)
    if (newData.amount !== undefined || newData.type !== undefined) {
      // 1- Annuler l'ancien impact (ancine montant)
      if (transaction.type === 'EXPENSE') {
        newBalance = account.currentBalance.plus(transaction.amount);
      } else if (transaction.type === 'INCOME') {
        newBalance = account.currentBalance.minus(transaction.amount);
      }

      // 2- Appliquer le nouveau montant
      // Utilisé les anciens données s'ils ne font pas partie de la modification
      const finalType = newData.type ?? transaction.type; // Si type.amount existe, utilise-le. Sinon garde l'ancien montant.
      const finalAmount = newData.amount ?? transaction.amount;
      const finalCategoryId = newData.categoryId ?? transaction.categoryId;

      // Vérifier la catégorie : parce que l'user peut ne pas modif la categori
      if (finalType !== TransactionType.TRANSFER) {
        if (!finalCategoryId) throw new Error(ERRORS.CATEGORY_REQUIRED);

        const category = await tx.category.findFirst({
          where: {
            id: finalCategoryId,
            userId,
            archived: false,
          },
        });

        if (!category) {
          throw new Error(ERRORS.CATEGORY_NOT_FOUND);
        }

        if (category.type !== finalType) {
          throw new Error(ERRORS.CATEGORY_TYPE_MISMATCH);
        }
      }

      if (finalType === 'EXPENSE') {
        newBalance = newBalance.minus(finalAmount);
      } else if (finalType === 'INCOME') {
        newBalance = newBalance.plus(finalAmount);
      }
    }

    // Mettre à jour la transaction
    const transactionUpdated = await tx.transaction.update({
      where: {
        id: transaction.id,
      },
      data: {
        ...newData,
      },
    });

    // Mettre à jour le compte
    await tx.account.update({
      where: {
        id: account.id,
      },
      data: {
        currentBalance: newBalance,
      },
    });

    return transactionUpdated;
  });
}

export async function deleteTransactionService(
  userId: string,
  transactionId: string,
) {
  return prisma.$transaction(async (tx) => {
    const transaction = await tx.transaction.findFirst({
      where: {
        id: transactionId,
        account: {
          userId, // pour être sûr que c'est la transaction du bon user
          archived: false,
        },
      },
    });
    if (!transaction) {
      throw new Error(ERRORS.TRANSACTION_NOT_FOUND);
    }

    // Vérifier le compte
    const account = await tx.account.findFirst({
      where: {
        id: transaction.accountId,
        userId,
        archived: false,
      },
    });
    if (!account) {
      throw new Error(ERRORS.ACCOUNT_NOT_FOUND);
    }

    // Calcul du nouveau solde
    let newBalance = account.currentBalance;

    if (transaction.type === 'EXPENSE') {
      newBalance = newBalance.plus(transaction.amount);
    } else if (transaction.type === 'INCOME') {
      newBalance = newBalance.minus(transaction.amount);
    }

    await tx.account.update({
      where: { id: transaction.accountId },
      data: { currentBalance: newBalance },
    });

    //Supprimer la transaction
    const accountDelete = await tx.transaction.delete({
      where: { id: transaction.id },
    });

    return accountDelete;
  });
}
