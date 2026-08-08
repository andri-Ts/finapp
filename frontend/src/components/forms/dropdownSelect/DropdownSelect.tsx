import type { IDropdownItem } from '@/types/dropdown.types';
import styles from './dropdownSelect.module.css';
import type React from 'react';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// T peut être n'importe quel type mais il doit au minimum ressembler à IDropdownItem
interface DropdownSelectProps<T extends IDropdownItem> {
  label: string;
  items: T[];
  value: string;
  onChange: (id: string) => void;
  renderItem: (item: T) => React.ReactNode; // fonction que le parent donne au composant pour lui expliquer comment afficher un élément
}

function DropdownSelect<T extends IDropdownItem>({
  label,
  items,
  value,
  onChange,
  renderItem,
}: DropdownSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const selectItem = items.find((item) => item.id === value);

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <button
        type="button"
        className={styles.select}
        onClick={() => setIsOpen((previous) => !previous)}
      >
        {selectItem ? renderItem(selectItem) : <span>Choisir</span>}
        <ChevronDown size={18} />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={styles.option}
              onClick={() => {
                onChange(item.id);
                setIsOpen(false);
              }}
            >
              {renderItem(item)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownSelect;
