import { Plus } from 'lucide-react';
import styles from './floatingButton.module.css';

function FloatingButton() {
  return (
    <button className={styles.button}>
      <Plus size={24} />
    </button>
  );
}

export default FloatingButton;
