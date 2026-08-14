import { navigation } from '@/constants/navigation';
import styles from './sidebar.module.css';
import { Link, NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>FinApp</div>

      <nav className={styles.navigation}>
        {navigation
          .filter((nav) => nav.showOnDesktop)
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
                <Icon size={20} />
                <span>{nav.label}</span>
              </NavLink>
            );
          })}
      </nav>

      <div className={styles.profile}>
        <p>Profil</p> <Link to={'/login'}>Connexion</Link>
      </div>
    </aside>
  );
}

export default Sidebar;
