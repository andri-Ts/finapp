import Button from '@/components/ui/Button';
import styles from './categoryErrorState.module.css';

interface CategoryErrorStateProps {
  onRetry: () => void;
}

function CategoryErrorState({ onRetry }: CategoryErrorStateProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Impossible de charger les catégories</h2>

        <p>Vos données n'ont pas pu être récupérées.</p>

        <Button type="button" onClick={onRetry}>
          Réessayer
        </Button>
      </div>
    </div>
  );
}

export default CategoryErrorState;
