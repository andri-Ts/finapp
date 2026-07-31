import React from 'react';
import styles from './stack.module.css';

interface IStackProps {
  children: React.ReactNode;
  gap?: 'sm' | 'md' | 'lg';
  align?: 'start' | 'center' | 'end' | 'stretch';
  className: string;
}

function Stack({
  children,
  gap = 'md',
  align = 'stretch',
  className,
}: IStackProps) {
  return (
    <div
      className={`${styles.stack} ${styles[gap]} ${styles[align]} ${className}`}
    >
      {children}
    </div>
  );
}

export default Stack;
