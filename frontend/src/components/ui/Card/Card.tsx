import React from 'react';
import styles from './card.module.css';

interface ICardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

function Card({ children, title, className = '' }: ICardProps) {
  return (
    <section className={`${styles.card} ${className}`}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.content}>{children}</div>
    </section>
  );
}

export default Card;
