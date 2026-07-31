import React from 'react';
import styles from './button.module.css';

// On hérite directement des propriétés <button> de HTML.
interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  className = '',
  disabled,
  ...props
}: IButtonProps) {
  return (
    <button
      className={`{${styles.button} ${styles[variant]}
        ${styles[size]}
        ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Chargement...' : children}
    </button>
  );
}

export default Button;
