import { navigation } from '@/constants/navigation';
import styles from './bottomNavigation.module.css';
import { NavLink } from 'react-router-dom';

function BottomNavigation() {
  return (
    <nav className={styles.navigation}>
      {navigation
        .filter((item) => item.showOnMobile)
        .map((nav) => {
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
