import PageHeader from '@/components/layout/pageHeader';
import styles from './categoryDetailPage.module.css';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCategory } from '@/features/categories/api/categoryApi';
import PageSection from '@/components/layout/pageSection';
import TransactionList from '@/features/transactions/components/transactionList';
import { useTransactionActions } from '@/features/transactions/hooks/useTransactionActions';

function CategoryDetailPage() {
  const { id } = useParams();

  const { handleDelete, handleEdit } = useTransactionActions();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['category', id],
    queryFn: () => getCategory(id!),
    enabled: !!id,
  });
  // console.log('categories: ', data);

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  if (isError || !data) {
    return <p>Impossible de charger la catégorie.</p>;
  }

  const { category, transactions } = data;

  return (
    <section className={styles.page}>
      <PageHeader
        title={category.name}
        subtitle={
          category.type === 'EXPENSE'
            ? 'Categorie de dépenses'
            : 'Catégorie de revenus'
        }
      />

      <div className={styles.transactions}>
        <PageSection title="Transactions">
          <TransactionList
            transactions={transactions}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </PageSection>
      </div>
    </section>
  );
}

export default CategoryDetailPage;
