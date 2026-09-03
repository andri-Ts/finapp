import PageHeader from '@/components/layout/pageHeader';
import styles from './categoryDetailPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCategory } from '@/features/categories/api/categoryApi';
import PageSection from '@/components/layout/pageSection';
import TransactionList from '@/features/transactions/components/transactionList';

function CategoryDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['category', id],
    queryFn: () => getCategory(id!),
    enabled: !!id,
  });
  console.log('categories: ', data);

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  if (isError || !data) {
    return <p>Impossible de charger la catégorie.</p>;
  }

  const { category, transactions } = data;

  const handleEdit = (transactionId: string) => {
    navigate(`/transactions/${transactionId}/edit`);
  };

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
          <TransactionList transactions={transactions} onEdit={handleEdit} />
        </PageSection>
      </div>
    </section>
  );
}

export default CategoryDetailPage;
