/**
 * Regroupe les transactions de transfert pour l'affichage.
 *
 * IMPORTANT :
 * Un transfert possède volontairement deux transactions en base :
 *
 *   SOURCE      → -100 €
 *   DESTINATION → +100 €
 *
 * Elles ont le même transferGroupId.
 *
 * Pour l'interface, nous voulons cependant afficher UNE seule
 * opération de transfert.
 *
 * Cette fonction ne modifie donc PAS les données métier.
 * Elle prépare uniquement les données destinées à l'affichage.
 */

import type { ITransaction } from '@/types/transaction.types';

export function groupTransactionsForDisplay(
  transactions: ITransaction[],
): ITransaction[] {
  const displayedTransactions: ITransaction[] = [];
  const displayedTransferGroups = new Set<string>(); // on mémorise les groupes de transfert déjà affichés

  for (const transaction of transactions) {
    // =====================================================
    // CAS NORMAL
    // =====================================================
    // Une dépense / revenue est affichée normalement
    if (transaction.type !== 'TRANSFER') {
      displayedTransactions.push(transaction);
      continue;
    }

    // =====================================================
    // CAS TRANSFERT
    // =====================================================
    // Transfert doit normalement toujours avoir un groupe, sinon on ne masque pas la transaction
    if (!transaction.transferGroupId) {
      displayedTransactions.push(transaction);
      continue;
    }

    // Si ce groupe a déjà été ajouté à affichage, cela signifie que nous avons déjà affiché l'autre ligne du même transfert.
    if (displayedTransferGroups.has(transaction.transferGroupId)) continue;

    // On privilégie la transaction SOURCE comme représentation visuelle du transfert
    const sourceTransaction = transactions.find(
      (item) =>
        item.type === 'TRANSFER' &&
        item.transferGroupId === transaction.transferGroupId &&
        item.transferRole === 'SOURCE',
    );

    // Recherher la destination
    const destinationTransaction = transactions.find(
      (item) =>
        item.type === 'TRANSFER' &&
        item.transferGroupId === transaction.transferGroupId &&
        item.transferRole === 'DESTINATION',
    );

    // Signal le prob si le groupe n'est pas correctement constitué
    if (!sourceTransaction || !destinationTransaction) {
      displayedTransactions.push(transaction);
      displayedTransferGroups.add(transaction.transferGroupId);

      continue;
    }

    //On crée une nouvelle transaction destinée à  l'affichage.
    // On conserve toutes les informations de SOURCE, auxquelles on ajoute le compte destination.
    const displayedTransfer: ITransaction = {
      ...sourceTransaction,
      transferDestinationAccount: destinationTransaction.account,
    };
    displayedTransactions.push(displayedTransfer);

    // On mémorise le groupe pour empêcher l'affichage de la 2e transaction (du même transafert)
    displayedTransferGroups.add(transaction.transferGroupId);
  }

  return displayedTransactions;
}
