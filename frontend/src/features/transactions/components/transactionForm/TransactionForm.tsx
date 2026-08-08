import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AmountInput from '../amountInput';
import styles from './transationForm.module.css';
import TransactionTypeToggle from '../transactionTypeToggle';
import AccountSelect from '../accountSelect';
import CategorySelect from '../categorySelect';
import Button from '@/components/ui/Button';
import {
  transactionSchema,
  type ITransactionFormData,
} from '../../schemas/transaction.schema';

function TransactionForm() {
  /*
   * useForm() de React Hook Form est le "gestionnaire" de notre formulaire.
   *
   * On lui indique que notre formulaire contient des données correspondant au type ITransactionFormData.
   * Cela permet notamment à TypeScript de savoir que :
   *
   * amount       → number
   * type         → EXPENSE | INCOME
   * categoryId   → string
   * etc.
   */
  const {
    register, // fonc de Hook Form princ qui récup auto les valeurs (donc ca remplace onChange et velue)
    handleSubmit, // fonc de Hook Form: intercept le submit de formulaire, exécute la fonction à l'intérieur si tout est ok
    setValue,
    watch, // watch(): Permet de regarder la valeur actuelle d'un champ.
    formState: { errors }, // Contient les erreurs de validation
  } = useForm<ITransactionFormData>({
    resolver: zodResolver(transactionSchema), // branche zod et Hook Form pour checker le schema
    // remplace le useState()
    defaultValues: {
      amount: 0,
      type: 'EXPENSE',
      categoryId: '',
      accountId: '',
      transactionDate: new Date().toISOString().split('T')[0], // "2026-08-08T11:01:30.456Z"  // .split('T') coupe la chaîne en deux parties au niveau de la lettre T.
      description: '',
      note: '',
    },
  });

  /*
   * watch('amount'): "Donne-moi la valeur actuelle de amount."
   * C'est utile parce que nos composants personnalisés  ont besoin de connaître leur valeur actuelle.
   */
  const amount = watch('amount');
  const type = watch('type');
  const selectedCategoryId = watch('categoryId');
  const selectedAccountId = watch('accountId');

  // fonc appeller par handleSubmit de Hook Form si le formulaire est valide
  const onSubmitForm = (data: ITransactionFormData) => {
    console.log('Transaction valide: ', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className={styles.form}>
      {/* =========================
          MONTANT
      ========================== */}
      <AmountInput
        value={amount}
        onChange={(value) => setValue('amount', value)}
      />
      {/* Affichage de l'erreur Zod pour amount */}
      {errors.amount && (
        <span className={styles.error}>{errors.amount.message}</span>
      )}

      {/* =========================
          TYPE
      ========================== */}

      <TransactionTypeToggle
        value={type}
        onChange={(value) => setValue('type', value)}
      />

      {errors.type && (
        <span className={styles.error}>{errors.type.message}</span>
      )}

      {/* =========================
          CATÉGORIE
      ========================== */}

      <CategorySelect
        value={selectedCategoryId}
        onChange={(value) => setValue('categoryId', value)}
      />

      {errors.categoryId && (
        <span className={styles.error}>{errors.categoryId.message}</span>
      )}

      {/* =========================
          COMPTE
      ========================== */}
      <AccountSelect
        value={selectedAccountId}
        onChange={(value) => setValue('accountId', value)}
      />
      {errors.accountId && (
        <span className={styles.error}>{errors.accountId.message}</span>
      )}

      {/* =========================
          DATE
      ========================== */}
      <div className={styles.field}>
        <label htmlFor="transactionDate">Date</label>
        <input
          type="date"
          id="transactionDate"
          {...register('transactionDate')}
        />
        {errors.transactionDate && (
          <span className={styles.error}>{errors.transactionDate.message}</span>
        )}
      </div>

      {/* =========================
          DESCRIPTION
      ========================== */}
      <div className={styles.field}>
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          {...register('description')}
          placeholder="Ex. Restaurant"
        />
        {errors.description && (
          <span className={styles.error}>{errors.description.message}</span>
        )}
      </div>

      {/* =========================
          NOTE
      ========================== */}

      <div className={styles.field}>
        <label htmlFor="note">Note</label>
        <textarea
          id="note"
          placeholder="Ajouter une note..."
          rows={3}
          {...register('note')}
        />
        {errors.note && (
          <span className={styles.error}>{errors.note.message}</span>
        )}
      </div>

      {/* =========================
          SUBMIT
      ========================== */}
      <Button type="submit">Enregistrer</Button>
    </form>
  );
}

export default TransactionForm;
