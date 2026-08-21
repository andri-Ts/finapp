import { Outlet } from 'react-router-dom';
import styles from './authLayout.module.css';

function AuthLayout() {
  return (
    <main className={styles.layout}>
      <div className={styles.backgroundDecoration} />
      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.logo}>FinApp</div>

          <p className={styles.tagline}>Gérer votre budget simplement</p>
        </header>

        <section className={styles.formContainer}>
          <Outlet />
        </section>
      </div>
    </main>
  );
}

export default AuthLayout;
