import PageHeader from '@/components/layout/pageHeader';
import styles from './editCategoryPage.module.css';
import CategoryForm from '@/features/categories/components/categoryForm';
// import { mockCategories } from '@/mocks/categories.mock';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { ICategory } from '@/types/category.types';
import { toast } from 'sonner';
import { getCategory } from '@/features/categories/api/categoryApi';

function EditCategoryPage() {
  const [category, setCategory] = useState<ICategory | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function loadCategory() {
      if (!id) {
        toast.error('Categorie introuvable');
        navigate('/categories');
        return;
      }

      try {
        const data = await getCategory(id);
        setCategory(data);
      } catch (error) {
        console.error('Erreur lors du chargement de la catégorie : ', error);

        toast.error('Impossible de charger la catégorie');
        navigate('/categories');
      } finally {
        setLoading(false);
      }
    }

    loadCategory();
  }, [id, navigate]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (!category) {
    return null;
  }

  return (
    <section className={styles.page}>
      <PageHeader title="Modifier la catégorie" />

      <CategoryForm category={category} />
    </section>
  );
}

export default EditCategoryPage;
