import React from 'react';
import styles from './grid.module.css';

interface IGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

function Grid({
  children,
  columns = 2,
  gap = 'md',
  className = '',
}: IGridProps) {
  return (
    <div
      className={`${styles.grid} ${styles[columns]} ${styles[gap]} ${className}`}
    >
      {children}
    </div>
  );
}

export default Grid;
