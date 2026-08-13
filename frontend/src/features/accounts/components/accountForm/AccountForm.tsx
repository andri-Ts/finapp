import { useForm } from 'react-hook-form';
import styles from './accountForm.module.css';
import {
  createAccount,
  updateAccount,
  // type ICreateAccountPayload,
} from '../../api/acccountApi';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  accountSchema,
  type IAccountFormData,
} from '../../schema/account.schema';
import { accountIcons, type AccountIconName } from '@/constants/constIcons';
import Button from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useEffect } from 'react';
import type { IAccount } from '@/types/account.types';

// interface IAccountFormProps {
//   onCreated: () => void;
// }

interface IAccountFormProps {
  account?: IAccount;
}

function AccountForm({ account }: IAccountFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting }, // isSubmitting passe à true pendant l'éxécutions de handleSubmit
  } = useForm<IAccountFormData>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: '',
      type: 'BANK',
      initialBalance: 0,
      icon: null,
      color: null,
    },
  });
  const navigate = useNavigate();

  const selectedIcon = watch('icon');

  // Utiliser pour la modification (patch)
  useEffect(() => {
    if (!account) return;

    // Remplace les valeurs par défaut si on modifie (et non créer) une compte
    reset({
      name: account.name,
      type: account.type,
      // initialBalance: account.currentBalance,
      icon: account.icon,
      color: account.color,
    });
  }, [account, reset]);

  const handleIconSelect = (iconName: AccountIconName) => {
    setValue('icon', iconName, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const onSubmitForm = async (data: IAccountFormData) => {
    console.log('Données du formularie: ', data);

    try {
      // POur la modification d'un compte
      if (account) {
        await updateAccount(account.id, {
          name: data.name,
          type: data.type,
          icon: data.icon ?? undefined,
          color: data.color ?? undefined,
        });
        toast.success('Compte modifié avec succès');
        navigate('/accounts');
        return;
      }

      await createAccount({
        ...data,
        initialBalance: data.initialBalance ?? 0,
      });
      toast.success('Compte créé avec succès');
      navigate('/accounts');
    } catch (error) {
      toast.error(
        account
          ? 'Impossible de modifier le compte'
          : 'Impossible de créer le compte',
      );
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmitForm, (error) =>
        console.log('Erreurs formulaire: ', error),
      )}
    >
      <div className={styles.field}>
        <label htmlFor="name">Nom du compte</label>
        <input
          type="text"
          id="name"
          placeholder="Ex. Compte courant"
          {...register('name')}
        />

        {errors.name && (
          <span className={styles.error}>{errors.name.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="type">Type de compte</label>
        <select id="type" {...register('type')}>
          <option value="BANK">Compte bancaire</option>
          <option value="CASH">Espèce</option>
          <option value="SAVINGS">Épargne</option>
          <option value="OTHER">Autres</option>
        </select>

        {errors.type && (
          <span className={styles.error}>{errors.type.message}</span>
        )}
      </div>

      {!account && (
        <div className={styles.field}>
          <label htmlFor="initialBalance">Solde initiale</label>
          <input
            type="number"
            step="0.01"
            id="initialBalance"
            placeholder="Ex. Compte courant"
            {...register('initialBalance', { valueAsNumber: true })}
          />

          {errors.initialBalance && (
            <span className={styles.error}>
              {errors.initialBalance.message}
            </span>
          )}
        </div>
      )}

      <div className={styles.field}>
        <span className={styles.label}>Icône</span>
        <div className={styles.iconGrid}>
          {
            // Object.entries() permet de transformer un objet en tableau de paires clé + valeur: [ ['wallet', Wallet], ...]
            (
              Object.entries(accountIcons) as [
                AccountIconName,
                (typeof accountIcons)[AccountIconName],
              ][]
            )
              // Desstructiring de map -> ['wallet', Wallet]
              .map(([iconName, Icon]) => {
                const isSelected = selectedIcon === iconName;

                return (
                  <button
                    key={iconName}
                    type="button"
                    className={`${styles.iconButton} ${
                      isSelected ? styles.iconButtonSelected : ''
                    }`}
                    onClick={() => handleIconSelect(iconName)}
                    aria-label={`Choisir l'icône ${iconName}`}
                    aria-pressed={isSelected}
                  >
                    <Icon size={24} />
                  </button>
                );
              })
          }
        </div>

        {errors.icon && (
          <span className={styles.error}>{errors.icon.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="color">Couleur</label>
        <input type="color" id="color" {...register('color')} />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? account
            ? 'Modification...'
            : 'Création..'
          : account
            ? 'Modifier le compte'
            : 'Créer le compte'}
      </Button>
    </form>
  );
}

export default AccountForm;
