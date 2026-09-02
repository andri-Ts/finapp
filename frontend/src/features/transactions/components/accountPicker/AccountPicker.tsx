import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

import { getAllAccount } from '@/features/accounts/api/acccountApi';
import type { IAccount } from '@/types/account.types';
import { formatCurrency } from '@/utils/formatCurrency';

import styles from './accountPicker.module.css';

interface AccountPickerProps {
  value: string;
  onChange: (id: string) => void;
  error?: string;
}

function AccountPicker({ value, onChange, error }: AccountPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['accounts'],
    queryFn: getAllAccount,
  });

  const accounts: IAccount[] = data?.accounts ?? [];

  const selectedAccount = accounts.find((account) => account.id === value);

  // MODIFICATION : fermeture du menu lorsqu'on clique à l'extérieur.
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function handleSelect(accountId: string) {
    onChange(accountId);
    setIsOpen(false);
  }

  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <span className={styles.label}>Compte</span>

        <div className={styles.loading}>Chargement des comptes...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.wrapper}>
        <span className={styles.label}>Compte</span>

        <div className={`${styles.loading} ${styles.error}`}>
          Impossible de charger les comptes.
        </div>
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <span className={styles.label}>Compte</span>

      <div className={styles.selectWrapper}>
        <button
          type="button"
          className={`${styles.trigger} ${error ? styles.triggerError : ''}`}
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          {selectedAccount ? (
            <div className={styles.selectedAccount}>
              <div className={styles.accountIcon}>
                {selectedAccount.icon || '🏦'}
              </div>

              <div className={styles.accountInfo}>
                <span className={styles.accountName}>
                  {selectedAccount.name}
                </span>

                <span className={styles.accountBalance}>
                  {formatCurrency(selectedAccount.currentBalance)}
                </span>
              </div>
            </div>
          ) : (
            <span className={styles.placeholder}>Sélectionner un compte</span>
          )}

          <ChevronDown
            size={18}
            className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
          />
        </button>

        {isOpen && (
          <div className={styles.menu} role="listbox">
            {accounts.map((account) => {
              const isSelected = account.id === value;

              return (
                <button
                  key={account.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={`${styles.option} ${
                    isSelected ? styles.optionSelected : ''
                  }`}
                  onClick={() => handleSelect(account.id)}
                >
                  <div className={styles.accountIcon}>
                    {account.icon || '🏦'}
                  </div>

                  <div className={styles.accountInfo}>
                    <span className={styles.accountName}>{account.name}</span>

                    <span className={styles.accountBalance}>
                      {formatCurrency(account.currentBalance)}
                    </span>
                  </div>

                  {isSelected && <Check size={18} className={styles.check} />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {error && <span className={styles.errorMessage}>⚠ {error}</span>}
    </div>
  );
}

export default AccountPicker;
