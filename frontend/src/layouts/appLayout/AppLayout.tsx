import Sidebar from '@/components/navigation/sidebar';
import styles from './appLayout.module.css';
import { Outlet } from 'react-router-dom';
import MobileHeader from '@/components/navigation/mobileHeader';
import BottomNavigation from '@/components/navigation/bottomNavigation';
import FloatingButton from '@/components/navigation/floatingButton';

function AppLayout() {
  return (
    <div className={styles.layout}>
      <Sidebar />

      <div className={styles.content}>
        <MobileHeader />

        <main className={styles.main}>
          <Outlet />
        </main>

        <BottomNavigation />
      </div>

      <FloatingButton />
    </div>
  );
}

export default AppLayout;
