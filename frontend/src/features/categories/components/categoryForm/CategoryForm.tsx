import type { ICategory } from '@/types/category.types';
import styles from './categoryForm.module.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  categorySchema,
  type ICategoryFormData,
} from '../../schema/category.schema';
import Button from '@/components/ui/Button';
import { categoryIcons, type CategoryIconName } from '@/constants/constIcons';
import { useEffect } from 'react';
import { updateCategory } from '../../api/categoryApi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface ICategoryFormProps {
  category?: ICategory;
}

function CategoryForm({ category }: ICategoryFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ICategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      type: 'EXPENSE',
      icon: null,
      color: null,
    },
  });
  const navigate = useNavigate();

  // Charge les données de la catégorie à modif dans le formulaire
  useEffect(() => {
    if (!category) return;
    // reset() : remplacer les valeurs actuelles du formulaire
    reset({
      name: category.name,
      type: category.type,
      icon: category.icon,
      color: category.color,
    });
  }, [category, reset]); // si l'un des ces 2 éléments changent, re-render le composant

  const selectedIcon = watch('icon');

  const handleIconSelect = (iconName: CategoryIconName) => {
    setValue('icon', iconName, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const onSubmit = async (data: ICategoryFormData) => {
    try {
      if (category) {
        await updateCategory(category.id, {
          name: data.name,
          type: data.type,
          icon: data.icon ?? undefined,
          color: data.color ?? undefined,
        });

        toast.success('Catégorie modifié avec succes');
        navigate('/categories');
        return;
      }

      // Création d'une catégorie
    } catch (error) {
      console.error('Erreur lors de la modificaiton: ', error);
      toast.error(
        category
          ? 'Impossible de modifier la catégorie'
          : 'Impossible de créer la catégorie',
      );
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit, (error) =>
        console.error('Erreurs formulaire: ', error),
      )}
    >
      <div className={styles.field}>
        <label htmlFor="name">Nom de la catégorie</label>
        <input type="text" id="name" {...register('name')} />

        {errors.name && (
          <span className={styles.error}>{errors.name.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="type">Type de catégorie</label>
        <select id="type" {...register('type')}>
          <option value="EXPENSE">Dépense</option>
          <option value="INCOME">Revenu</option>
        </select>

        {errors.type && (
          <span className={styles.error}>{errors.type.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <span className={styles.label}>Icône</span>
        <div className={styles.iconGrid}>
          {
            // Object.entries() permet de transformer un objet en tableau de paires clé + valeur: [ ['wallet', Wallet], ...]
            (
              Object.entries(categoryIcons) as [
                CategoryIconName,
                (typeof categoryIcons)[CategoryIconName],
              ][]
            )
              // Desstructiring de map -> ['wallet', Wallet]
              .map(([iconName, Icon]) => {
                const isSelected = selectedIcon === iconName;

                return (
                  <button
                    key={iconName}
                    type="button"
                    className={`${styles.iconButton} ${
                      isSelected ? styles.iconButtonSelected : ''
                    }`}
                    onClick={() => handleIconSelect(iconName)}
                    aria-label={`Choisir l'icône ${iconName}`}
                    aria-pressed={isSelected}
                  >
                    <Icon size={24} />
                  </button>
                );
              })
          }
        </div>

        {errors.icon && (
          <span className={styles.error}>{errors.icon.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="color">Couleur</label>
        <input type="color" id="color" {...register('color')} />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? category
            ? 'Modification en cours...'
            : 'Création...'
          : category
            ? 'Modifier la catégorie'
            : 'Créer la catégorie'}
      </Button>
    </form>
  );
}

export default CategoryForm;
