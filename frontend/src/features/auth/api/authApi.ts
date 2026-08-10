import api from '@/lib/api';

// Données envoyés par le formulaire
interface LoginPayload {
  email: string;
  password: string;
}

// Réponse envoyée par le controller backend
interface LoginResponse {
  user: {
    id: string;
    email: string;
  };

  token: string;
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  /*Axios envoie: POST http://localhost:5000/api/auth/login avec payload dans le body.*/
  const response = await api.post<LoginResponse>('/auth/login', payload);

  return response.data;
}

/*
 * Récupère les informations de l'utilisateur connecté.
 *
 * Cette route est protégée par authenticate.
 *
 * Nous ne donnons PAS le token ici.
 * L'interceptor Axios l'ajoute automatiquement.
 */
// export async function getMe() {
//   const response = await api.get('/auth/me');

//   return response.data;
// }

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbXM0eDRvb2gwMDAyMTB1N3hvZWg4aDh6IiwiZW1haWwiOiJ0ZXN0NEB0b2cuY29tIiwiaWF0IjoxNzg2Mzc1NTQ4LCJleHAiOjE3ODY0NjE5NDh9.K2gAtcfSRVUgnNGBnbmsfJaRSYKMDUdn8mdEHrFcPOM

// {
//   "id": "cms4x4ooh000210u7xoeh8h8z",
//   "pseudo": "test4",
//   "email": "test4@tog.com",
//   "passwordHash": "$2b$10$MAQYxzAw5O8RQw/94QOVduJwnu6wmd31.NJKJzN8iI4I0xcvK77p2",
//   "currency": "EUR",
//   "createdAt": "2026-07-28T17:17:06.161Z",
//   "updatedAt": "2026-07-28T17:17:06.161Z"
// }
