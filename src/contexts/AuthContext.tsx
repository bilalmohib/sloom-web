import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

interface AuthContextValue {
  isSignedIn: boolean;
  signIn: () => void;
  signOut: () => void;
}

const AUTH_STORAGE_KEY = 'satori-clinical-signed-in';

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredAuth(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(readStoredAuth);

  const signIn = useCallback(() => {
    sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
    setIsSignedIn(true);
  }, []);

  const signOut = useCallback(() => {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setIsSignedIn(false);
  }, []);

  const value = useMemo(
    () => ({ isSignedIn, signIn, signOut }),
    [isSignedIn, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
