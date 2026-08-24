import React from 'react';
import styles from './input.module.css';

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

function Input({
  label,
  error,
  helperText,
  className,
  id,
  ...props
}: IInputProps) {
  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}

      <input
        id={id}
        className={`${styles.input}
          ${error ? styles.error : ''}
          ${className}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          error ? `${id}-error` : helperText ? `${id}-helper` : undefined
        }
        {...props}
      />

      {error && (
        <p className={styles.erroMessage} id={`${id}-error`}>
          {error}
        </p>
      )}

      {!error && helperText && (
        <p className={styles.helperText} id={`${id}-error`}>
          {helperText}
        </p>
      )}
    </div>
  );
}

export default Input;
