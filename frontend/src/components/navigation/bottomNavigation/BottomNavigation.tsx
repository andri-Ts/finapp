import { navigation } from '@/constants/navigation';
import styles from './bottomNavigation.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

function BottomNavigation() {
  const navigatePlus = useNavigate();

  const mobileNavigation = navigation.filter((item) => item.showOnMobile);

  return (
    <nav className={styles.navigation}>
      {mobileNavigation.slice(0, 2).map((nav) => {
        const Icon = nav.icon;

        return (
          <NavLink
            key={nav.label}
            to={nav.path}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            <Icon size={22} />
            <span>{nav.label}</span>
          </NavLink>
        );
      })}

      <button
        type="button"
        className={styles.addButton}
        onClick={() => navigatePlus('/transactions/new')}
        aria-label="Ajouter une transaction"
      >
        <Plus size={26} />
      </button>

      {mobileNavigation.slice(2).map((nav) => {
        const Icon = nav.icon;

        return (
          <NavLink
            key={nav.label}
            to={nav.path}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            <Icon size={22} />
            <span>{nav.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}

export default BottomNavigation;
