import React from 'react';
import styles from './input.module.css';

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

function Input({ label, error, helperText, className, ...props }: IInputProps) {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}

      <input
        className={`${styles.input}
          ${error ? styles.error : ''}
          ${className}`}
        {...props}
      />

      {error && <p className={styles.erroMessage}>{error}</p>}

      {error && helperText && <p className={styles.helperText}>{helperText}</p>}
    </div>
  );
}

export default Input;
