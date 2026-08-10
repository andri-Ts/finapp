import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor exécuté AVANT chaque requête: récup JWT dans localStorage, ajout de header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // recup token enregistrer lors de la connexion

  // Si user connecté, on ajoute l'authorisation: Bearer eyJhde...
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config; // on retounr la configuration modifié
});

export default api;
