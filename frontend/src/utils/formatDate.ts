const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}); // outil JS: ermet d'afficher dates/heures selon la langue et les habitudes d'un pays précis

export function formatDate(date: string): string {
  return dateFormatter.format(new Date(date));
}
