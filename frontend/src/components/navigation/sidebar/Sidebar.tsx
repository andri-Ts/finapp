import { navigation } from '@/constants/navigation';
import styles from './sidebar.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut, Plus } from 'lucide-react';
import { userAuth } from '@/features/auth/context/AuthContext';
import Button from '@/components/ui/Button';

function Sidebar() {
  const navigate = useNavigate();
  const { logout } = userAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className={styles.sidebar}>
      {/* =================================================
          LOGO
      ================================================= */}
      <div className={styles.logo}>
        Fin<span>App</span>
      </div>

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

      {/* =================================================
          ACTIONS
      ================================================= */}
      <div className={styles.bottom}>
        <button
          type="button"
          onClick={() => navigate('/transactions/new')}
          className={styles.addButton}
        >
          <Plus size={20} />
          <span>Nouvelle transaction</span>
        </button>

        <div className={styles.profile}>
          <p className={styles.profileTitle}>Profil</p>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className={styles.logoutButton}
          >
            <LogOut size={16} />
            <span>Déconnexion</span>
          </Button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
