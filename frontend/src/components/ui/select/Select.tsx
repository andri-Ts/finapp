import React from 'react';

import styles from './select.module.css';

interface ISelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

function Select({
  label,
  error,
  helperText,
  className,
  id,
  children,
  ...props
}: ISelectProps) {
  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}

      <div className={styles.selectWrapper}>
        <select
          id={id}
          className={`${styles.select} ${
            error ? styles.error : ''
          } ${className || ''}`}
          // MODIFICATION : état d'erreur accessible.
          aria-invalid={error ? true : undefined}
          // MODIFICATION : association avec le message d'aide/erreur.
          aria-describedby={
            error ? `${id}-error` : helperText ? `${id}-helper` : undefined
          }
          {...props}
        >
          {children}
        </select>
      </div>

      {error && (
        <p id={`${id}-error`} className={styles.errorMessage}>
          {error}
        </p>
      )}

      {!error && helperText && (
        <p id={`${id}-helper`} className={styles.helperText}>
          {helperText}
        </p>
      )}
    </div>
  );
}

export default Select;
