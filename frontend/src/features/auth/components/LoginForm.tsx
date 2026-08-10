import { useState } from 'react';
import { login } from '../api/authApi';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Empêche le navigateur de recharger la page.

    setError(''); // On efface une éventuelle ancienne erreur.

    try {
      /*
       * Ici, notre frontend fait exactement
       * ce que Postman faisait auparavant :
       */
      const response = await login({
        email,
        password,
      });

      console.log('✅ Connexion réussie');
      console.log('Utilisateur :', response.user);
      console.log('Token :', response.token);

      /*
       * Pour l'instant, on sauvegarde le JWT.
       *
       * Ce token permettra ensuite à Axios
       * de s'authentifier auprès des routes protégées.
       */
      localStorage.setItem('token', response.token);

      /*
       * Plus tard, ici on redirigera l'utilisateur vers le dashboard.
       */

      // const user = await getMe();

      // console.log('👤 /me :', user);
    } catch (error) {
      /*
       * Pour l'instant on affiche simplement
       * une erreur générique.
       *
       * On améliorera ensuite la gestion des erreurs Axios.
       */
      console.error(error);

      setError('Email ou mot de passe incorrect');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Connexion</h2>

      <div>
        <label htmlFor="email">Email</label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="password">Mot de passe</label>

        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>

      {error && <p>{error}</p>}

      <button type="submit">Se connecter</button>
    </form>
  );
}

export default LoginForm;
