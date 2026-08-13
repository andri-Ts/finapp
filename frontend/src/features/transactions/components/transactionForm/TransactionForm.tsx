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
import { useEffect } from 'react';
import { buildTransactionPayload } from '../../utils/buildTransactionPayload';
import { createTransaction } from '../../api/transactionApi';
import axios from 'axios';
import { toast } from 'sonner';

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
    reset, // reset le formulaire
    formState: { errors, isSubmitting }, // Contient les erreurs de validation
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
  const selectedType = watch('type');
  // const selectedCategoryId = watch('categoryId');
  // const selectedAccountId = watch('accountId');

  // quand le type change, on remet le catégorie à 0
  useEffect(() => {
    setValue('categoryId', '');
  }, [selectedType, setValue]);

  // fonc appeller par handleSubmit de Hook Form si le formulaire est valide
  const onSubmitForm = async (data: ITransactionFormData) => {
    const payload = buildTransactionPayload(data);

    console.log('Données du formulaire: ', data);
    console.log("Payload envoyé à l'API: ", payload);

    try {
      const transactionCreated = await createTransaction(payload);
      toast.success('Transaction ajoutée');
      console.log('Transaciton créée OK', transactionCreated);
    } catch (error) {
      console.error('❌ Erreur lors de la création :', error);

      if (axios.isAxiosError(error)) {
        console.error('❌ Réponse du backend :', error.response?.data);
      }
    }

    reset();
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmitForm, (errors) => {
        console.log('Formulaire invalide :', errors);
      })}
    >
      {/* =========================
      MONTANT
       ========================== */}
      <div className={`${styles.field} ${styles.amountField}`}>
        <AmountInput
          value={amount}
          onChange={(value) => setValue('amount', value)}
        />

        {errors.amount && (
          <span className={styles.error}>{errors.amount.message}</span>
        )}
      </div>

      {/* =========================
      TYPE
      ========================== */}
      <div className={styles.typeField}>
        <TransactionTypeToggle
          value={selectedType}
          onChange={(value) => setValue('type', value)}
        />

        {errors.type && (
          <span className={styles.error}>{errors.type.message}</span>
        )}
      </div>

      {/* =========================
      CATÉGORIE / COMPTE
      ========================== */}

      {selectedType !== 'TRANSFER' && (
        <>
          <div className={styles.field}>
            <CategorySelect
              value={watch('categoryId')}
              onChange={(value) => setValue('categoryId', value)}
              type={selectedType}
            />

            {errors.categoryId && (
              <span className={styles.error}>{errors.categoryId.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <AccountSelect
              value={watch('accountId')}
              onChange={(value) => setValue('accountId', value)}
            />

            {errors.accountId && (
              <span className={styles.error}>{errors.accountId.message}</span>
            )}
          </div>
        </>
      )}

      {/* =========================
      TRANSFERT
      ========================== */}
      {selectedType === 'TRANSFER' && (
        <>
          <div className={styles.field}>
            <AccountSelect
              value={watch('sourceAccountId') ?? ''}
              onChange={(value) => setValue('sourceAccountId', value)}
            />

            {errors.sourceAccountId && (
              <span className={styles.error}>
                {errors.sourceAccountId.message}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <AccountSelect
              value={watch('destinationAccountId') ?? ''}
              onChange={(value) => setValue('destinationAccountId', value)}
            />

            {errors.destinationAccountId && (
              <span className={styles.error}>
                {errors.destinationAccountId.message}
              </span>
            )}
          </div>
        </>
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
          rows={3}
          {...register('note')}
          placeholder="Ajouter une note..."
        />

        {errors.note && (
          <span className={styles.error}>{errors.note.message}</span>
        )}
      </div>

      {/* =========================
      SUBMIT
  ========================== */}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
      </Button>
    </form>
  );
}

export default TransactionForm;
