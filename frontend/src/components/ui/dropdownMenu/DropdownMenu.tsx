import { MoreVertical } from 'lucide-react';
import styles from './dropdownMenu.module.css';
import { useState } from 'react';

export interface IDropdownMenuItem {
  label: string;
  onClick: () => void;
  danger?: boolean;
}

interface DropdownMenuProps {
  items: IDropdownMenuItem[];
}

function DropdownMenu({ items }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label="Ouvrir le menu"
        aria-expanded={isOpen}
      >
        <MoreVertical size={20} />
      </button>
      {isOpen ? (
        <div className={styles.menu}>
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              className={`${styles.item} ${item.danger ? styles.danger : ''}`}
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default DropdownMenu;
