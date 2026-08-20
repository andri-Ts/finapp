import { navigation } from '@/constants/navigation';
import styles from './sidebar.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

function Sidebar() {
  const navigate = useNavigate();

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

      <button
        type="button"
        onClick={() => navigate('/transactions/new')}
        className={styles.addButton}
      >
        <Plus size={20} />
        <span>Ajouter une transaction</span>
      </button>

      <div className={styles.profile}>
        <p>Profil</p>
        {/* <Link to={'/login'}>Connexion</Link> */}
      </div>
    </aside>
  );
}

export default Sidebar;
