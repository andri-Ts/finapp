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
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import CategoryTabs from '@/features/categories/components/categoryTabs';
import { useState } from 'react';
import CategorySummary from '@/features/categories/components/categorySummary';
import { getDashboard } from '@/features/dashboard/api/dashboardApi';
import CategoryPageSkeleton from '@/features/categories/components/categoryPageSkeleton';
import { queryClient } from '@/lib/queryClient';
import CategoryErrorState from '@/features/categories/components/categoryErrorState';
import CategoryEmptyState from '../../features/categories/components/categoryEmptyState';

function CategoryPage() {
  const [selectedType, setSelectedType] = useState<CategoryType>('EXPENSE'); // onglet de tyope affiché

  const navigate = useNavigate();

  // =========================================================
  // Utiliasation de useQuery
  // =========================================================
  const {
    data: categoryData,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategory,
  });

  const categories: ICategory[] = categoryData?.categories ?? [];

  // MODIFICATION : récupération des statistiques mensuelles
  const {
    data: dashboard,
    isLoading: isDashboardLoading,
    isError: isDashboardError,
  } = useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboard,
  });

  // =========================================================
  // Fonctions
  // =========================================================
  // Catégories affichées selon l'onglet
  const displayedCategories = categories.filter(
    (category) => category.type === selectedType,
  );

  // Total vient de dashboard, , on ne recalule pas
  const monthlyTotal =
    selectedType === 'EXPENSE'
      ? (dashboard?.stats.expenseOfMonth ?? 0)
      : (dashboard?.stats.incomeOfMonth ?? 0);

  // =========================================================
  // Handle
  // =========================================================

  const handleEditCategory = (id: string) => {
    navigate(`/categories/${id}/edit`);
  };

  const handleClick = (id: string) => {
    navigate(`/categories/${id}`);
  };

  // const handleArchiveCategory = async (id: string) => {
  //   // On ne modifie plus directement categories avec setState.
  //   // La mutation appelle l'API puis invalide le cache.
  //   archiveMutation.mutate(id);
  // };

  if (displayedCategories.length === 0) {
    return (
      <section className={styles.page}>
        <PageHeader title="Catégories" />

        <CategoryTabs selectedType={selectedType} onChange={setSelectedType} />

        <CategorySummary type={selectedType} amount={monthlyTotal} />

        <CategoryEmptyState
          type={selectedType}
          onAdd={() => navigate('/transactions/new')}
        />
      </section>
    );
  }

  if (isCategoriesLoading || isDashboardLoading) {
    return (
      <section className={styles.page}>
        <PageHeader title="Catégories" />

        <CategoryPageSkeleton />
      </section>
    );
  }

  if (isCategoriesError || isDashboardError || !dashboard) {
    return (
      <section className={styles.page}>
        <PageHeader title="Catégories" />

        <CategoryErrorState
          onRetry={() => {
            queryClient.invalidateQueries({
              queryKey: ['categories'],
            });

            queryClient.invalidateQueries({
              queryKey: ['dashboard'],
            });
          }}
        />
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <PageHeader title="Catégories" />

      <CategoryTabs selectedType={selectedType} onChange={setSelectedType} />

      <CategorySummary type={selectedType} amount={monthlyTotal} />

      <CategoryList
        categories={displayedCategories}
        onEdit={handleEditCategory}
        onClick={handleClick}
        // onArchive={handleArchiveCategory}
      />
    </section>
  );
}

export default CategoryPage;
