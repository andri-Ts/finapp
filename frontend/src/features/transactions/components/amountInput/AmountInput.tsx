import styles from './amountInput.module.css';

interface AmountInputProps {
  value: number;
  onChange: (value: number) => void;
}

function AmountInput({ value, onChange }: AmountInputProps) {
  return (
    <div className={styles.container}>
      <label htmlFor="amount">Montant</label>
      <input
        type="number"
        id="amount"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className={styles.input}
      />
    </div>
  );
}

export default AmountInput;
