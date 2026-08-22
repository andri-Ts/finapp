import React from 'react';
import styles from './card.module.css';

interface ICardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  interactive?: boolean;
}

function Card({
  children,
  title,
  className = '',
  interactive = false,
}: ICardProps) {
  return (
    <section
      className={`${styles.card} ${interactive ? styles.interactive : ''} ${className}`}
    >
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.content}>{children}</div>
    </section>
  );
}

export default Card;
