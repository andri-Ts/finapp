import { useState } from 'react';
import styles from './loginForm.module.css';
import { useNavigate } from 'react-router-dom';
import { userAuth } from '../../context/AuthContext';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { login } = userAuth(); // on récupère la fonc login() de authContexte

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Empêche le navigateur de recharger la page.

    setError(''); // On efface une éventuelle ancienne erreur.
    setIsSubmitting(true);

    try {
      // AutContext s'occupe de toute la logique
      await login(email, password);
      // Si login() ne déclenche aps d'erreur, la connexion est réussie
      navigate('/');
    } catch (error) {
      console.error('Erreur de connexion: ', error);

      setError('Email ou mot de passe incorrect');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.header}>
        <h2 className={styles.title}>Bienvenue sur FinApp</h2>
        <p className={styles.subtitle}>
          Connectez-vous pour gérer votre budget
        </p>
      </div>

      <div className={styles.fields}>
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="exemple@email.com"
          autoComplete="email"
          required
        />

        <Input
          label="Mot de passe"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Votre mot passe"
          autoComplete="current-password"
          required
        />
      </div>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <Button type="submit" loading={isSubmitting} size="lg">
        Se connecter
      </Button>
    </form>
  );
}

export default LoginForm;
