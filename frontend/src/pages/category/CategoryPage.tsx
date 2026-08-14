import PageHeader from '@/components/layout/pageHeader';
import styles from './categoryPage.module.css';
import CategoryList from '@/features/categories/components/categoryList';
// import { mockCategories } from '@/mocks/categories.mock';
import { useEffect, useState } from 'react';
import type { ICategory } from '@/types/category.types';
import {
  archiveCategory,
  getAllCategory,
} from '@/features/categories/api/categoryApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function CategoryPage() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadingCategories() {
      try {
        const data = await getAllCategory();
        console.log('categories: ', data);
        setCategories(data.categories);
      } catch (error) {
        console.error('Erreur lors du chargement des catégories: ', error);
      } finally {
        setLoading(false);
      }
    }

    loadingCategories();
  }, []);
  console.log('categories: ', categories);

  const handleEditCategory = (category: ICategory) => {
    navigate(`/categories/${category.id}/edit`);
  };

  const handleArchiveCategory = async (id: string) => {
    try {
      await archiveCategory(id);

      setCategories((prevValue) =>
        prevValue.filter((category) => category.id !== id),
      );
      toast.success('Catégorie archivée avec succès');
    } catch (error) {
      console.error("Erreurs lors de l'archivage de la catégorie: ", error);
      toast.error("Impossible d'archiver la catégorie");
    }
  };

  if (loading) {
    return <p>Chargement...</p>;
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
