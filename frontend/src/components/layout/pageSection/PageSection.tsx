import type { ReactNode } from 'react';
import styles from './pageSection.module.css';

interface IPageSectionProps {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}

function PageSection({ title, action, children }: IPageSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        {action && <div className={styles.action}>{action}</div>}
      </div>

      <div className={styles.content}>{children}</div>
    </section>
  );
}

export default PageSection;
