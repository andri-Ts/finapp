import styles from './Badge.module.css';

// Affichage de texte : "Je suis une petite étiquette visuelle."

interface IBadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'danger' | 'warning' | 'neutral';
  className?: string;
}

function Badge({ children, variant = 'neutral', className = '' }: IBadgeProps) {
  return (
    <span
      className={`
        ${styles.badge}
        ${styles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

export default Badge;
