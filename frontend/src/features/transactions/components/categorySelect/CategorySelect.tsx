import DropdownSelect from '@/components/forms/dropdownSelect';
import { mockCategories } from '@/mocks/categories.mock';
import type { CategoryType } from '@/types/category.types';
import { formatCurrency } from '@/utils/formatCurrency';

interface CategorySelectProps {
  value: string;
  type: CategoryType; // permet de savoir quelle type afficher
  onChange: (id: string) => void;
}

function CategorySelect({ value, type, onChange }: CategorySelectProps) {
  // ON ne garde que les catégories qui correspondent au type d'actions
  const categories = mockCategories.filter(
    (category) => category.type === type,
  );

  return (
    <DropdownSelect
      label="Catégorie"
      items={categories}
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

          <small>{formatCurrency(category.monthlyAmount)}</small>
        </div>
      )}
    />
  );
}

export default CategorySelect;
