import PageHeader from '@/components/layout/pageHeader';
import styles from './categoryPage.module.css';
import CategoryList from '@/features/categories/components/categoryList';
// import { mockCategories } from '@/mocks/categories.mock';
// import { useEffect, useState } from 'react';
import type { ICategory } from '@/types/category.types';
import {
  archiveCategory,
  getAllCategory,
} from '@/features/categories/api/categoryApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';

function CategoryPage() {
  const navigate = useNavigate();

  // =========================================================
  // Utiliasation de useQuery
  // =========================================================
  const { data, isLoading, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategory,
  });

  const categories: ICategory[] = data?.categories ?? [];

  const archiveMutation = useMutation({
    mutationFn: archiveCategory,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
      toast.success('Catégories archivées avec succes');
    },

    onError: (error) => {
      console.error("Erreur lors de l'archivage de la catégorie :", error);
      toast.error("Impossible d'archiver la catégorie");
    },
  });

  // useEffect(() => {
  //   async function loadingCategories() {
  //     try {
  //       const data = await getAllCategory();
  //       console.log('categories: ', data);
  //       setCategories(data.categories);
  //     } catch (error) {
  //       console.error('Erreur lors du chargement des catégories: ', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   loadingCategories();
  // }, []);
  // console.log('categories: ', categories);

  const handleEditCategory = (category: ICategory) => {
    navigate(`/categories/${category.id}/edit`);
  };

  const handleArchiveCategory = async (id: string) => {
    // On ne modifie plus directement categories avec setState.
    // La mutation appelle l'API puis invalide le cache.
    archiveMutation.mutate(id);
  };

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  if (isError) {
    return <p>Impossible de charger les catégories.</p>;
  }

  return (
    <section className={styles.page}>
      <PageHeader title="Catégories" />

      <CategoryList
        categories={categories}
        onEdit={handleEditCategory}
        onArchive={handleArchiveCategory}
      />
    </section>
  );
}

export default CategoryPage;
