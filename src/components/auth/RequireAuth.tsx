import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '@/contexts/AuthContext';

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useAuth();
  const location = useLocation();

  if (!isSignedIn) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
}
