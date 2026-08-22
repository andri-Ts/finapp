import styles from './categoryPageSkeleton.module.css';

function CategoryPageSkeleton() {
  return (
    <div className={styles.container}>
      {/* MODIFICATION : skeleton des onglets */}
      <div className={styles.tabs}>
        <span className={styles.tab} />
        <span className={styles.tab} />
      </div>

      {/* MODIFICATION : skeleton du résumé */}
      <div className={styles.summary}>
        <span className={styles.summaryTitle} />
        <span className={styles.summaryAmount} />
      </div>

      {/* MODIFICATION : skeleton des Category Cards */}
      <div className={styles.list}>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className={styles.card}>
            <span className={styles.icon} />
            <span className={styles.name} />
            <span className={styles.amount} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPageSkeleton;
