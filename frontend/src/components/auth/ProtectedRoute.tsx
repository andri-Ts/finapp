import { userAuth } from '@/features/auth/context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
  const { isAuthenticated, isLoading } = userAuth();

  // Au démarage, authContext vérfie, s'il existe une session sauvegardé dans localStorage
  if (isLoading) {
    return null;
  }

  // Si l'utilisateur n'est pas connecté, pas acces au routes protéges
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si user connecté, OUtlet affiche les routes enfants
  return <Outlet />;
}

export default ProtectedRoute;
