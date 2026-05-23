import { GuestOnly } from '@/components/auth/GuestOnly';
import { RequireAuth } from '@/components/auth/RequireAuth';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import Patients from '@/pages/Patients';
import { RootLayout } from '@/layouts/RootLayout';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <GuestOnly>
            <Home />
          </GuestOnly>
        ),
      },
      {
        path: '/patients',
        element: (
          <RequireAuth>
            <Patients />
          </RequireAuth>
        ),
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
export default router;
