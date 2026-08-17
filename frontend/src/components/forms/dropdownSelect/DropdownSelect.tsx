import type { IDropdownItem } from '@/types/dropdown.types';
import styles from './dropdownSelect.module.css';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
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
  const dropdownRef = useRef<HTMLDivElement>(null); // permet de récupérer le conteur complet de dropdown

  const selectItem = items.find((item) => item.id === value);

  // Ferme le dropdown quaund on click à l'intérieur
  useEffect(() => {
    // fonc appelée à chque click sur la page
    function handleClickOutside(event: MouseEvent) {
      // dropdownRef.current contient le <div> auquel on a attaché la ref.
      //
      // contains() permet de vérifier si l'élément sur lequel l'utilisateur
      // a cliqué se trouve à l'intérieur de notre dropdown.
      //
      // Si le clic n'est PAS à l'intérieur du dropdown, alors on ferme le dropdown.
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside); // ecoute click sur tout le document, si oui appel handlclick

    // Nettoyage lorsque le composant est démonté.
    // On retire l'écouteur pour éviter de laisser une fonction
    // active inutilement dans le document.
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={styles.container}>
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
