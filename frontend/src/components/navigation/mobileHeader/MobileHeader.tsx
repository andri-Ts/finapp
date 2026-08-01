import styles from './mobileHeader.module.css';

function MobileHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>FinApp</div>

      <button type="button" className={styles.profileButton}>
        Profile
      </button>
    </header>
  );
}

export default MobileHeader;
