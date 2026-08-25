// import DropdownSelect from '@/components/forms/dropdownSelect';
import { getAllCategory } from '@/features/categories/api/categoryApi';
import styles from './categorySelect.module.css';
// import { mockCategories } from '@/mocks/categories.mock';
import type { ICategory, CategoryType } from '@/types/category.types';
import { useQuery } from '@tanstack/react-query';
import { categoryIcons, iconSizes } from '@/constants/constIcons';
// import { formatCurrency } from '@/utils/formatCurrency';
// import { useEffect, useState } from 'react';

interface CategorySelectProps {
  value: string;
  type: CategoryType; // permet de savoir quelle type afficher
  onChange: (id: string) => void;
}

function CategorySelect({ value, type, onChange }: CategorySelectProps) {
  // récup catégories avec TanStack Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategory,
  });

  const categories: ICategory[] = data?.categories ?? [];

  // On ne garde que les catégories correspondant au type de transaction.
  const filteredCategories = categories.filter(
    (category) => category.type === type,
  );

  if (isLoading) {
    return (
      <div className={styles.container}>
        <span className={styles.label}>Catégorie</span>
        <p>Chargement...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.container}>
        <span className={styles.label}>Catégorie</span>
        <p className={styles.error}>Impossible de charger les catégories.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <span className={styles.label}>Catégorie</span>

      <div className={styles.grid}>
        {filteredCategories.map((category) => {
          const isSelected = category.id === value;
          const CategoryIcon = category.icon
            ? categoryIcons[category.icon]
            : null;

          return (
            <button
              key={category.id}
              type="button"
              className={`${styles.category} ${
                isSelected ? styles.selected : ''
              }`}
              onClick={() => onChange(category.id)}
              aria-pressed={isSelected}
            >
              <div
                className={styles.icon}
                style={{
                  backgroundColor: category.color ?? 'var(--color-secondary)',
                }}
              >
                {CategoryIcon ? (
                  <CategoryIcon size={iconSizes.md} strokeWidth={2} />
                ) : (
                  '•'
                )}
              </div>

              <span className={styles.name}>{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CategorySelect;
