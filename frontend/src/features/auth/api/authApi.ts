import api from '@/lib/api';

// Données envoyés par le formulaire
interface LoginPayload {
  email: string;
  password: string;
}

// Données nécessaire pour créer un utilisateur
interface RegisterPayload {
  pseudo: string;
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

// Réponse renvoyé apres création
interface RegisterResponse {
  user: {
    id: string;
    pseudo: string;
    email: string;
  };
}

export async function loginApi(payload: LoginPayload): Promise<LoginResponse> {
  /*Axios envoie: POST http://localhost:5000/api/auth/login avec payload dans le body.*/
  const response = await api.post<LoginResponse>('/auth/login', payload);

  return response.data;
}

export async function registerUser(
  payload: RegisterPayload,
): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>('/users', payload);

  return response.data;
}
