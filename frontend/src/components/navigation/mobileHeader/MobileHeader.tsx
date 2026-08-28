import { useLocation } from 'react-router-dom';
import styles from './mobileHeader.module.css';
import { pageTitles } from '@/constants/navigation';

function MobileHeader() {
  const location = useLocation(); // récupère la route courante
  const title = pageTitles[location.pathname]; // titre dynamique

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        Fin<span>App</span>
      </div>

      <span className={styles.title}>{title}</span>

      <div className={styles.avatar} aria-label="Profil">
        Z
      </div>
    </header>
  );
}

export default MobileHeader;
