import styles from './EmptyState.module.css';

// C'est un composant affiché quand il n'y a pas encore de données.

interface IEmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

function EmptyState({
  title,
  description,
  action,
  icon,
  className = '',
}: IEmptyStateProps) {
  return (
    <div className={`${styles.emptyState}${className}`}>
      {icon && <div className={styles.icon}>{icon}</div>}

      <h2>{title}</h2>

      {description && <p className={styles.description}>{description}</p>}

      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}

export default EmptyState;
