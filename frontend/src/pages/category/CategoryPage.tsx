import PageHeader from '@/components/layout/pageHeader';
import styles from './categoryPage.module.css';
import CategoryList from '@/features/categories/components/categoryList';
import { mockCategories } from '@/mocks/categories.mock';

function CategoryPage() {
  return (
    <section className={styles.page}>
      <PageHeader title="Catégories" />

      <CategoryList categories={mockCategories} />
    </section>
  );
}

export default CategoryPage;
