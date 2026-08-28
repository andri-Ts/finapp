import { navigation } from '@/constants/navigation';
import styles from './bottomNavigation.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

function BottomNavigation() {
  const navigatePlus = useNavigate();

  const mobileNavigation = navigation.filter((item) => item.showOnMobile);

  return (
    <nav className={styles.navigation} aria-label="Navigation principale">
      {/* =====================================================
          LEFT NAVIGATION
      ===================================================== */}
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
            {({ isActive }) => (
              <>
                <span className={styles.icon}>
                  <Icon size={20} strokeWidth={isActive ? 2.4 : 2} />
                </span>
                <span className={styles.label}>{nav.label}</span>
              </>
            )}
          </NavLink>
        );
      })}

      {/* =====================================================
          FAB
      ===================================================== */}
      <button
        type="button"
        className={styles.addButton}
        onClick={() => {
          navigatePlus('/transactions/new');
        }}
        aria-label="Ajouter une transaction"
      >
        <Plus size={26} strokeWidth={2} />
      </button>

      {/* =====================================================
          RIGHT NAVIGATION
      ===================================================== */}
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
            {({ isActive }) => (
              <>
                <span className={styles.icon}>
                  <Icon size={20} strokeWidth={isActive ? 2.4 : 2} />
                </span>
                <span className={styles.label}>{nav.label}</span>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}

export default BottomNavigation;
