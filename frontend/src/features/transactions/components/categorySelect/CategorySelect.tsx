import DropdownSelect from '@/components/forms/dropdownSelect';
import { mockCategories } from '@/mocks/categories.mock';
import { formatCurrency } from '@/utils/formatCurrency';

interface CategorySelectProps {
  value: string;
  onChange: (id: string) => void;
}

function CategorySelect({ value, onChange }: CategorySelectProps) {
  return (
    <DropdownSelect
      label="Catégorie"
      items={mockCategories}
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
