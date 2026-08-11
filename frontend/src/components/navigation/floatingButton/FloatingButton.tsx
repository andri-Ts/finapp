import { Plus } from 'lucide-react';
import styles from './floatingButton.module.css';
import { useNavigate } from 'react-router-dom';

function FloatingButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/transactions/new');
  };

  return (
    <button
      type="button"
      className={styles.button}
      onClick={handleClick}
      aria-label="Nouvelle transaction"
    >
      <Plus size={24} />
    </button>
  );
}

export default FloatingButton;
