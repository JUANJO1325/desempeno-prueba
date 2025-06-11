// src/routes/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Si no está autenticado, redirige a /login
    return <Navigate to="/login" />;
  }

  // Si está autenticado, renderiza el componente hijo (en este caso, Dashboard)
  return children;
};