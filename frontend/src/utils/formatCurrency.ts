const currencyFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
}); // API officielle de JavaScript pour les prix (45.9 -> 45.90 €)

// On aurait pu mettre currencyFormatter dans la function
// Mais ce serait moins performant.
// À chaque appel, JavaScript recréerait un nouveau formatter.
// En le créant une seule fois : on le réutilise.
export function formatCurrency(amount: number): string {
  return currencyFormatter.format(amount);
}
