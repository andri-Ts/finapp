import { Link } from 'react-router-dom';
import styles from './mobileHeader.module.css';

function MobileHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>FinApp</div>

      <button type="button" className={styles.profileButton}>
        Profile
      </button>
      <Link to={'/login'}>Connexion</Link>
    </header>
  );
}

export default MobileHeader;
