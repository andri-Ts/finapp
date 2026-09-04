import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { deleteTransaction } from '../api/transactionApi';
import { queryClient } from '@/lib/queryClient';
import { toast } from 'sonner';

export function useTransactionActions() {
  const navigate = useNavigate();

  const deleteMutation = useMutation({
    mutationFn: deleteTransaction, // fonc API appelée pour sup transacion

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['transactions'],
      }); // indique à tansstack query que les trans ne sont plus à jour
      queryClient.invalidateQueries({
        queryKey: ['dashboard'], // dashboard dépent égalememnt des transactions
      });

      toast.success('Transaction supprimée');
      navigate('/');
    },

    onError: () => {
      toast.error('Impossible de supprimer la transaction');
    },
  });

  const handleEdit = (id: string) => {
    navigate(`/transactions/${id}/edit`);
  };

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      'Êtes-vous sûr de vouloir supprimer cette transaction ?',
    );
    // Si l'utilisateur annule, on ne fait rien.
    if (!confirmed) {
      return;
    }

    deleteMutation.mutate(id);
  };

  return {
    handleEdit,
    handleDelete,
    isDeleting: deleteMutation.isPending,
  };
}
