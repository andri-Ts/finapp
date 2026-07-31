import styles from './Spinner.module.css';

// composant attente...

interface ISpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

function Spinner({ size = 'md', className = '' }: ISpinnerProps) {
  return (
    <span
      className={`
        ${styles.spinner}
        ${styles[size]}
        ${className}
      `}
      aria-label="Chargement"
      role="status"
    />
  );
}

export default Spinner;
