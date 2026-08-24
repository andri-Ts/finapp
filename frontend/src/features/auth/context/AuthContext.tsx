import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { loginApi } from '../api/authApi';
import { setOnUnauthorized } from '@/lib/api';

interface IUser {
  id: String;
  email: String;
}

interface IAuthContext {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // On récupère le token au démarage suavegardé
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setIsLoading(false);
  }, []);

  // SE CONNECTER
  const login = async (email: string, password: string) => {
    const response = await loginApi({
      email,
      password,
    });

    // Conservation de token pour que api.ts puisse automatqiemument l'atjouter au requête
    localStorage.setItem('token', response.token);
    // Conservation de l'utilisateur
    localStorage.setItem('user', JSON.stringify(response.user));

    setToken(response.token);
    setUser(response.user);
  };

  // SE DECONNECTER
  const logout = () => {
    // Suppression des informations de session
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setToken(null);
    setUser(null);
  };

  // =========================
  // TOKEN EXPIRE
  // =========================

  useEffect(() => {
    // L'interceptor Axios appellera logout(), lorsqu'une requête retourne 401.
    setOnUnauthorized(logout);

    // Nettoyage lorsque le Provider est démonté.
    return () => {
      setOnUnauthorized(() => {});
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token, // 'est ce que token existe?' -> boolea; !! 2 inverses und false->true
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function userAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth doit être utilisé à l'intérieur de AuthProvider");
  }

  return context;
}
