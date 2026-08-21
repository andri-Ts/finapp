import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // données considéré comme fraîche pendant 5mn
      gcTime: 1000 * 60 * 30, // ache conservé 30mn apres qu'il n'est plus utilisé
      retry: 1, // une requête échoué es réessayée une fois
    },
  },
});
