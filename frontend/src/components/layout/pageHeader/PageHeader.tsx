import type { ReactNode } from 'react';
import styles from './pageHeader.module.css';

interface IPageHeaderProps {
  title: string;
  action?: ReactNode; // "Je peux recevoir n'importe quel élément React." ; La partie supplémentaire est précisément une action." (pas child)
}

function PageHeader({ title, action }: IPageHeaderProps) {
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
      {action}
    </header>
  );
}

export default PageHeader;
