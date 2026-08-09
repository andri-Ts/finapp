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

    // La valeur '0' s'efface lorsque on tape d'autres nombre
    const cleanedValue =
      inputValue === '0' && newValue.length > 1
        ? newValue.replace(/^0+/, '')
        : newValue;
    setInputValue(cleanedValue);

    // Si user efface le champ, on considère que amount = 0
    if (cleanedValue === '') {
      onChange(0);
      return;
    }

    // Convertire la valeur affciher en nombre
    const numericValue = Number(cleanedValue);
    if (!Number.isNaN(numericValue)) {
      onChange(numericValue);
    }
  };

  return (
    <div className={styles.container}>
      <label htmlFor="amount">Montant</label>
      <input
        type="text" // input affcihe un string
        inputMode="decimal" // formulaire travail avec un number
        id="amount"
        value={value}
        onChange={handleChange}
        className={styles.input}
      />
    </div>
  );
}

export default AmountInput;
