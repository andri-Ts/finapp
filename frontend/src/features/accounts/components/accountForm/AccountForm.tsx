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
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';

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

  // PRÉREMPLISSAGE DU FORMULAIRE EN MODE ÉDITION / Utiliser pour la modification (patch)
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

  // ============================================================
  // MUTATIONS
  // ============================================================
  const createMutation = useMutation({
    mutationFn: createAccount,

    onSuccess: () => {
      // apres la création, le cache 'accounts' est maintenant considéré obselete
      queryClient.invalidateQueries({
        queryKey: ['accounts'],
      });
      toast.success('Compte créé avec succès');
      navigate('/accounts');
    },

    onError: (error) => {
      console.error('Erreur lors de la création du compte :', error);
      toast.error('Impossible de créer le compte');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Parameters<typeof updateAccount>[1]; // TypScr : donne-moi le type du deuxième paramètre.
    }) => updateAccount(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] }); // invalide la liste apres modification
      queryClient.invalidateQueries({ queryKey: ['account'] }); // invalide également la transaciotn individuelle si elle est mise en cache
      toast.success('Compte modifiée avec succès');
      navigate('/accounts');
    },

    onError: (error) => {
      console.error('Erreur lors de la modification du compte :', error);
      toast.error('Impossible de modifier le compte');
    },
  });

  const issaving = createMutation.isPending || updateMutation.isPending;

  // ============================================================
  // SUBMIT
  // ============================================================
  const onSubmitForm = async (data: IAccountFormData) => {
    console.log('Données du formularie: ', data);

    if (account) {
      updateMutation.mutate({
        id: account.id,
        payload: {
          name: data.name,
          type: data.type,
          icon: data.icon ?? undefined,
          color: data.color ?? undefined,
        },
      });
      return;
    }

    createMutation.mutate({
      ...data,
      initialBalance: data.initialBalance ?? 0,
    });
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

      <Button type="submit" disabled={issaving}>
        {issaving
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
