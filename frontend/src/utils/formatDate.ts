const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}); // outil JS: ermet d'afficher dates/heures selon la langue et les habitudes d'un pays précis

export function formatDate(date: string | Date): string {
  const parseDate = typeof date === 'string' ? new Date(date) : date;

  return dateFormatter.format(parseDate); // Transformer une date en texte français.
}
