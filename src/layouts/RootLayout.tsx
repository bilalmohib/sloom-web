import { Outlet } from 'react-router-dom';

import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';

export function RootLayout() {
  return (
    <div className="flex min-h-dvh w-full flex-col">
      <Navbar />
      <main className="flex min-h-0 flex-1 flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
