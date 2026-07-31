// Contrôler la largeur du contenu.

import type React from 'react';
import styles from './container.module.css';

interface IContainerProps {
  children: React.ReactNode;
  className: string;
}

function Container({ children, className = '' }: IContainerProps) {
  return <div className={`${styles.container} ${className}`}>{children}</div>;
}

export default Container;

// Une page à l'interieur de container sera automatiquement :

// centrée ;
// responsive ;
// limitée en largeur.
