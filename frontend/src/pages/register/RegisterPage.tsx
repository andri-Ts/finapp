import PageHeader from '@/components/layout/pageHeader';
import styles from './registerPage.module.css';
import React from 'react';
import SignUp from '@/features/auth/components/register';
import RegisterForm from '@/features/auth/components/register';

function RegisterPage() {
  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Créer un compte</h1>
        <p className={styles.description}>
          Créer votre compte pour commencer à gere votre budget
        </p>
      </div>

      <RegisterForm />
    </section>
  );
}

export default RegisterPage;
