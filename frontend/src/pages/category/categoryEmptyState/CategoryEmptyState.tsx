import Button from '@/components/ui/Button';

import styles from './categoryEmptyState.module.css';

interface CategoryEmptyStateProps {
  type: 'EXPENSE' | 'INCOME';
  onAdd: () => void;
}

function CategoryEmptyState({ type, onAdd }: CategoryEmptyStateProps) {
  const isExpense = type === 'EXPENSE';

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Aucune {isExpense ? 'dépense' : 'revenu'} ce mois-ci</h2>

        <p>
          {isExpense
            ? 'Vos catégories apparaîtront ici dès que vous enregistrerez une dépense.'
            : 'Vos catégories apparaîtront ici dès que vous enregistrerez un revenu.'}
        </p>

        <Button type="button" onClick={onAdd}>
          + Ajouter
        </Button>
      </div>
    </div>
  );
}

export default CategoryEmptyState;
