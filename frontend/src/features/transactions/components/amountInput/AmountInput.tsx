import React, { useEffect, useState } from 'react';
import styles from './amountInput.module.css';

interface AmountInputProps {
  value: number;
  onChange: (value: number) => void;
}

function AmountInput({ value, onChange }: AmountInputProps) {
  const [inputValue, setInputValue] = useState(String(value));

  useEffect(() => {
    setInputValue(String(value));
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    // Permet de garder uniquement les chiffres, la virgule et le point
    if (!/^\d*[,.]?\d*$/.test(newValue)) {
      return;
    }

    setInputValue(newValue);

    // Champ vide
    if (newValue === '') {
      onChange(0);
      return;
    }

    // Transforme 12,50 en 12.50 pour JavaScript
    const normalizedValue = newValue.replace(',', '.');

    const numericValue = Number(normalizedValue);

    if (!Number.isNaN(numericValue)) {
      onChange(numericValue);
    }
  };

  return (
    <div className={styles.container}>
      <label htmlFor="amount" className={styles.label}>
        Montant
      </label>
      <div className={styles.inputWrapper}>
        <input
          type="text" // input affcihe un string
          inputMode="decimal" // formulaire travail avec un number
          id="amount"
          value={inputValue}
          onChange={handleChange}
          className={styles.input}
          placeholder="0.00"
        />
        <span className={styles.currency}>€</span>
      </div>
    </div>
  );
}

export default AmountInput;
