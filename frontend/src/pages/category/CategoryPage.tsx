import PageHeader from '@/components/layout/pageHeader';
import styles from './categoryPage.module.css';
import CategoryList from '@/features/categories/components/categoryList';
// import { mockCategories } from '@/mocks/categories.mock';
// import { useEffect, useState } from 'react';
import type { CategoryType, ICategory } from '@/types/category.types';
import {
  // archiveCategory,
  getAllCategory,
} from '@/features/categories/api/categoryApi';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
// import { queryClient } from '@/lib/queryClient';
import CategoryTabs from '@/features/categories/components/categoryTabs';
import { useState } from 'react';

function CategoryPage() {
  const [activeType, setActiveType] = useState<CategoryType>('EXPENSE'); // tyope de catégorie affiché

  // const navigate = useNavigate();

  // =========================================================
  // Utiliasation de useQuery
  // =========================================================
  const { data, isLoading, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategory,
  });

  const categories: ICategory[] = data?.categories ?? [];

  // const archiveMutation = useMutation({
  //   mutationFn: archiveCategory,

  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: ['categories'],
  //     });
  //     toast.success('Catégories archivées avec succes');
  //   },

  //   onError: (error) => {
  //     console.error("Erreur lors de l'archivage de la catégorie :", error);
  //     toast.error("Impossible d'archiver la catégorie");
  //   },
  // });

  // =========================================================
  // Catégories affichées selon l'onglet
  // =========================================================
  const displayedCategories = categories.filter(
    (category) => category.type === activeType,
  );

  // =========================================================
  // Handle
  // =========================================================

  // const handleEditCategory = (category: ICategory) => {
  //   navigate(`/categories/${category.id}/edit`);
  // };

  // const handleArchiveCategory = async (id: string) => {
  //   // On ne modifie plus directement categories avec setState.
  //   // La mutation appelle l'API puis invalide le cache.
  //   archiveMutation.mutate(id);
  // };

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  if (isError) {
    return <p>Impossible de charger les catégories.</p>;
  }

  return (
    <section className={styles.page}>
      <PageHeader title="Catégories" />

      <p className={styles.period}>Ce mois-ci</p>

      <CategoryTabs activeType={activeType} onChange={setActiveType} />

      <CategoryList
        categories={displayedCategories}
        // onEdit={handleEditCategory}
        // onArchive={handleArchiveCategory}
      />
    </section>
  );
}

export default CategoryPage;
