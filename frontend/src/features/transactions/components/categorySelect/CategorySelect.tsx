import DropdownSelect from '@/components/forms/dropdownSelect';
import { getAllCategory } from '@/features/categories/api/categoryApi';
// import { mockCategories } from '@/mocks/categories.mock';
import type { ICategory, CategoryType } from '@/types/category.types';
// import { formatCurrency } from '@/utils/formatCurrency';
import { useEffect, useState } from 'react';

interface CategorySelectProps {
  value: string;
  type: CategoryType; // permet de savoir quelle type afficher
  onChange: (id: string) => void;
}

function CategorySelect({ value, type, onChange }: CategorySelectProps) {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getAllCategory();
        setCategories(data.categories);
      } catch (error) {
        console.error('Erreur lors du chargement des catégories: ', error);
      }
    }

    loadCategories();
  }, []);

  // On ne garde que les catégories correspondant au type de transaction.
  const filteredCategories = categories.filter(
    (category) => category.type === type,
  );

  return (
    <DropdownSelect
      label="Catégorie"
      items={filteredCategories}
      value={value}
      onChange={onChange}
      renderItem={(category) => (
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>{category.name}</span>

          {/* <small>{formatCurrency(category.monthlyAmount)}</small> */}
        </div>
      )}
    />
  );
}

export default CategorySelect;
