import { useState } from 'react';
import AmountInput from '../amountInput';
import styles from './transationForm.module.css';
import TransactionTypeToggle from '../transactionTypeToggle';
import type { TransactionType } from '@/types/transaction.types';
import AccountSelect from '../accountSelect';
import CategorySelect from '../categorySelect';
import Button from '@/components/ui/Button';

function TransactionForm() {
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState<TransactionType>('EXPENSE');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedAccountId, setSelectedAccountId] = useState('');
  // "2026-08-08T11:01:30.456Z" (La lettre T sépare la date de l'heure)
  // .split('T') coupe la chaîne en deux parties au niveau de la lettre T.
  // On obtient un tableau à deux éléments : ["2026-08-08", "11:01:30.456Z"]
  const [transactionDate, setTransactionDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [description, setDescription] = useState('');
  const [note, setNote] = useState('');

  return (
    <form className={styles.form}>
      {/* <h2>Nouvelle transaction</h2> */}

      {/* AmountInput */}
      <AmountInput value={amount} onChange={setAmount} />

      {/* TransactionTypeToggle */}
      <TransactionTypeToggle value={type} onChange={setType} />

      {/* CategorySelect */}
      <CategorySelect
        value={selectedCategoryId}
        onChange={setSelectedCategoryId}
      />

      {/* AccountSelect */}
      <AccountSelect
        value={selectedAccountId}
        onChange={setSelectedAccountId}
      />

      {/* Date  */}
      <div className={styles.field}>
        <label htmlFor="transactionDate">Date</label>
        <input
          type="date"
          id="transactionDate"
          value={transactionDate}
          onChange={(event) => setTransactionDate(event.target.value)}
        />
      </div>

      {/* Description */}
      <div className={styles.field}>
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Ex. Restaurant"
        />
      </div>

      {/* Note */}
      <div className={styles.field}>
        <label htmlFor="note">Note</label>
        <textarea
          id="note"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Ajouter une note..."
          rows={3}
        />
      </div>

      <Button type="submit">Enregistrer</Button>
    </form>
  );
}

export default TransactionForm;
