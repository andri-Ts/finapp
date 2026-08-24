import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fonction appelée lorsque l'API retourne 401, Elle sera fournie par AuthContext.
let onUnauthorized: (() => void) | null = null;

// Permet à AuthContext d'enregistrer la fonction logout.
export function setOnUnauthorized(callback: () => void) {
  onUnauthorized = callback;
}

// Interceptor exécuté AVANT chaque requête: récup JWT dans localStorage, ajout de header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // recup token enregistrer lors de la connexion

  // Si user connecté, on ajoute l'authorisation: Bearer eyJhde...
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config; // on retounr la configuration modifié
});

// Interceptor exécuté APRÈS la réponse. Si le backend répond 401, la session n'est plus valide.
api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      onUnauthorized?.();
    }

    return Promise.reject(error);
  },
);

export default api;
