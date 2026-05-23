import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import { ThemeSync } from '@/components/common/DarkModeToggle';
import { AuthProvider } from '@/contexts/AuthContext';
import { store } from '@/redux/store';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeSync />
        <Toaster
          position="top-center"
          toastOptions={{
            className: '',
            style: { boxShadow: 'none', background: 'transparent', padding: 0 },
          }}
        />
        <div className="flex min-h-dvh w-full flex-col">{children}</div>
      </AuthProvider>
    </Provider>
  );
}
