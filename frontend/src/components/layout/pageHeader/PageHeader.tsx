import type { ReactNode } from 'react';
import styles from './pageHeader.module.css';

interface IPageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode; // "Je peux recevoir n'importe quel élément React." ; La partie supplémentaire est précisément une action." (pas child)
}

function PageHeader({ title, subtitle, action }: IPageHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.heading}>
        <h1>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </header>
  );
}

export default PageHeader;
