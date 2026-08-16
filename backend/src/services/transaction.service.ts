import { randomUUID } from 'node:crypto';
import { ERRORS } from '../constants/errors.js';
import { TransactionType } from '../generated/prisma/enums.js';
import prisma from '../lib/prisma.js';
import {
  ICreateTransactionInput,
  IUpdateTransactionInput,
} from '../schemas/transaction.schema.js';

export async function createTransactionService(
  userId: string,
  transactionData: ICreateTransactionInput,
) {
  // Ouvre une transaction SQL : toutes les opérations réussissent ensemble ou sont annulées.
  return prisma.$transaction(async (tx) => {
    // =====================================================
    // TRANSFER
    // =====================================================
    if (transactionData.type === 'TRANSFER') {
      // Récup le compte source
      const sourceAccount = await tx.account.findFirst({
        where: {
          id: transactionData.sourceAccountId,
          userId,
          archived: false,
        },
      });

      if (!sourceAccount) {
        throw new Error(ERRORS.ACCOUNT_NOT_FOUND);
      }

      // Récup le compte source
      const destinationAccount = await tx.account.findFirst({
        where: {
          id: transactionData.destinationAccountId,
          userId,
          archived: false,
        },
      });

      if (!destinationAccount) {
        throw new Error(ERRORS.ACCOUNT_NOT_FOUND);
      }

      // Vérifier que les 2 comptes sont différentes
      if (sourceAccount.id === destinationAccount.id) {
        throw new Error(ERRORS.ACCOUNT_NOT_FOUND);
      }

      // Vérifier que le compte source possède suffisamment d'argent
      if (sourceAccount.currentBalance.lessThan(transactionData.amount)) {
        throw new Error(ERRORS.INSUFFICIENT_BALANCE);
      }

      // Générer un id commun pour les 2 transactions
      const transferGroupId = randomUUID();

      // Créer la transaction source
      const sourceTransaction = await tx.transaction.create({
        data: {
          accountId: sourceAccount.id,
          amount: transactionData.amount,
          type: TransactionType.TRANSFER,
          description: transactionData.description,
          note: transactionData.note,
          transactionDate: transactionData.transactionDate,
          transferGroupId,
        },
      });

      // Créer la transaction destination
      const destinationTransaction = await tx.transaction.create({
        data: {
          accountId: destinationAccount.id,
          amount: transactionData.amount,
          type: TransactionType.TRANSFER,
          description: transactionData.description,
          note: transactionData.note,
          transactionDate: transactionData.transactionDate,
          transferGroupId,
        },
      });

      // Débiter le compte source
      await tx.account.update({
        where: {
          id: sourceAccount.id,
        },
        data: {
          currentBalance: sourceAccount.currentBalance.minus(
            transactionData.amount,
          ),
        },
      });

      // Créditer le compte destination
      await tx.account.update({
        where: {
          id: destinationAccount.id,
        },
        data: {
          currentBalance: destinationAccount.currentBalance.plus(
            transactionData.amount,
          ),
        },
      });

      return sourceTransaction;
    }

    // =====================================================
    // INCOME / EXPENSE
    // =====================================================

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
    if (!transactionData.categoryId) {
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
    // =====================================================
    // A. RÉCUPÉRER LA TRANSACTION
    // =====================================================
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

    // =====================================================
    // B- Cas transfert
    // =====================================================
    if (transaction.type === TransactionType.TRANSFER) {
      // Un transfert doit avoir un id de groupe
      if (!transaction.transferGroupId) {
        throw new Error(ERRORS.TRANSFER_INVALID);
      }

      // Récup les 2 transfers
      const transferTransactions = await tx.transaction.findMany({
        where: { transferGroupId: transaction.transferGroupId },
      });

      // Un transfert doit toujours être composé de 2 transactions
      if (transferTransactions.length !== 2) {
        throw new Error(ERRORS.TRANSFER_INVALID);
      }

      // la transaction qu'on modifie représente le compte source
      const oldSourceTransaction = transferTransactions.find(
        (t) => t.accountId === transaction.accountId,
      );
      const oldDestinationTransaction = transferTransactions.find(
        (t) => t.accountId !== transaction.accountId,
      );
      if (!oldSourceTransaction || !oldDestinationTransaction) {
        throw new Error(ERRORS.TRANSFER_INVALID);
      }

      // =====================================================
      // B2. Récupérer les anciens compte
      // =====================================================
      const oldSourceAccount = await tx.account.findFirst({
        where: {
          id: oldSourceTransaction.accountId,
          userId,
          archived: false,
        },
      });

      const oldDestinationAccount = await tx.account.findFirst({
        where: {
          id: oldDestinationTransaction.accountId,
          userId,
          archived: false,
        },
      });

      if (!oldSourceAccount || !oldDestinationAccount) {
        throw new Error(ERRORS.ACCOUNT_NOT_FOUND);
      }

      // =====================================================
      // B1 Nouvelles valeurs du montant et des comptes
      // =====================================================
      const newAmount = newData.amount ?? transaction.amount;
      const newSourceAccountId = newData.sourceAccountId ?? oldSourceAccount.id;
      const newDestinationAccountId =
        newData.destinationAccountId ?? oldDestinationAccount.id;

      // Un compte ne peut pas être transféré vers lui-même
      if (newSourceAccountId === newDestinationAccountId) {
        throw new Error(ERRORS.TRANSFER_SAME_ACCOUNT);
      }

      // =====================================================
      // B2 Récupération des nouveaux comptes
      // =====================================================
      const newSourceAccount = await tx.account.findFirst({
        where: {
          id: newSourceAccountId,
          userId,
          archived: false,
        },
      });

      const newDestinationAccount = await tx.account.findFirst({
        where: {
          id: newDestinationAccountId,
          userId,
          archived: false,
        },
      });

      if (!newSourceAccount || !newDestinationAccount) {
        throw new Error(ERRORS.ACCOUNT_NOT_FOUND);
      }

      // =====================================================
      // B3 Annuler les anciens impacts
      // =====================================================
      await tx.account.update({
        where: {
          id: oldDestinationAccount.id,
        },
        data: {
          currentBalance: oldDestinationAccount.currentBalance.minus(
            oldDestinationTransaction.amount,
          ),
        },
      });

      await tx.account.update({
        where: {
          id: oldSourceAccount.id,
        },
        data: {
          currentBalance: oldSourceAccount.currentBalance.plus(
            oldSourceTransaction.amount,
          ),
        },
      });

      // =====================================================
      // B4 Vérifier le nouveau solde
      // =====================================================
      let availableBalance = newSourceAccount.currentBalance;

      // Si le nouveau compte source est aussi l'ancien compte source, son solde vient d'être restauré à l'étape précédente.
      if (newSourceAccount.id === oldSourceAccount.id) {
        availableBalance = oldSourceAccount.currentBalance.plus(
          oldSourceTransaction.amount,
        );
      }

      if (availableBalance.lessThan(newAmount)) {
        throw new Error(ERRORS.INSUFFICIENT_BALANCE);
      }

      // =====================================================
      // B5 Appliquer le nouveau transfert
      // =====================================================
      await tx.account.update({
        where: {
          id: newSourceAccount.id,
        },
        data: {
          currentBalance: availableBalance.minus(newAmount),
        },
      });

      // Si source et destination sont différents, on crédite le compte destination.
      await tx.account.update({
        where: {
          id: newDestinationAccount.id,
        },
        data: {
          currentBalance: newDestinationAccount.currentBalance.plus(newAmount),
        },
      });

      // =====================================================
      // B6 Mettre à jour les deux transactions
      // =====================================================
      const commonData = {
        amount: newAmount,
        transactionDate: newData.transactionDate ?? transaction.transactionDate,
        description: newData.description ?? transaction.description,
        note: newData.note !== undefined ? newData.note : transaction.note,
      };

      const updatedSourceTransaction = await tx.transaction.update({
        where: {
          id: oldSourceTransaction.id,
        },
        data: {
          ...commonData,
          accountId: newSourceAccount.id,
        },
      });

      await tx.transaction.update({
        where: {
          id: oldDestinationTransaction.id,
        },
        data: {
          ...commonData,
          accountId: newDestinationAccount.id,
        },
      });

      return updatedSourceTransaction;
    }

    // =====================================================
    // A. RÉCUPÉRER LA TRANSACTION
    // =====================================================
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
    // =====================================================
    // A. RÉCUPÉRER LA TRANSACTION
    // =====================================================
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

    // =====================================================
    // B. CAS TRANSFER
    // =====================================================
    if (transaction.type === TransactionType.TRANSFER) {
      if (!transaction.transferGroupId) {
        throw new Error(ERRORS.TRANSFER_INVALID);
      }

      // Récup les 2 transactions
      const transferTransactions = await tx.transaction.findMany({
        where: {
          transferGroupId: transaction.transferGroupId,
        },
      });

      if (transferTransactions.length !== 2) {
        throw new Error(ERRORS.TRANSFER_INVALID);
      }

      const sourceTransaction = transferTransactions.find(
        (t) => t.accountId === transaction.accountId,
      );
      const destinationTransaction = transferTransactions.find(
        (t) => t.accountId !== transaction.accountId,
      );
      if (!sourceTransaction || !destinationTransaction) {
        throw new Error(ERRORS.TRANSFER_INVALID);
      }

      // =====================================================
      // B1. Récupérer les comptes
      // =====================================================
      const sourceAccount = await tx.account.findFirst({
        where: {
          id: sourceTransaction.accountId,
          userId,
          archived: false,
        },
      });

      const destinationAccount = await tx.account.findFirst({
        where: {
          id: destinationTransaction.accountId,
          userId,
          archived: false,
        },
      });

      if (!sourceAccount || !destinationAccount) {
        throw new Error(ERRORS.ACCOUNT_NOT_FOUND);
      }

      // =====================================================
      // B3. Restaurer les soldes
      // =====================================================
      // Le compte source a été débité, on lui rend le montant
      await tx.account.update({
        where: {
          id: sourceAccount.id,
        },
        data: {
          currentBalance: sourceAccount.currentBalance.plus(
            sourceTransaction.amount,
          ),
        },
      });

      // Le compte destination avait été crédité, on lui retire le montant
      await tx.account.update({
        where: { id: destinationAccount.id },
        data: {
          currentBalance: destinationAccount.currentBalance.minus(
            destinationTransaction.amount,
          ),
        },
      });

      // =====================================================
      // B4. Supprimer les 2 transactions
      // =====================================================
      await tx.transaction.deleteMany({
        where: {
          transferGroupId: transaction.transferGroupId,
        },
      });

      return {
        message: 'Transfert supprimé',
        transferGroupId: transaction.transferGroupId,
      };
    }

    // =====================================================
    // C. INCOME / EXPENSE
    // =====================================================
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
