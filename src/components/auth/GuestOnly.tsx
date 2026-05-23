import { Navigate } from 'react-router-dom';

import { useAuth } from '@/contexts/AuthContext';

export function GuestOnly({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Navigate to="/patients" replace />;
  }

  return children;
}
