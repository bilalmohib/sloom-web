import { useLocation } from 'react-router-dom';

import Container from '@/components/common/Container';
import DarkModeToggle from '@/components/common/DarkModeToggle';
import SatoriLogo from '@/components/common/Navbar/SatoriLogo';
import SignedInNavbarActions from '@/components/common/Navbar/SignedInNavbarActions';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface NavbarProps {
  className?: string;
}

function Navbar({ className }: NavbarProps) {
  const { isSignedIn } = useAuth();
  const { pathname } = useLocation();
  const isAppRoute = pathname.startsWith('/patients');

  return (
    <nav
      className={cn(
        'w-full border-b border-input-border-default bg-background transition-colors duration-200',
        className,
      )}
    >
      <Container>
        <div className="flex items-center justify-between py-4">
          <SatoriLogo to={isSignedIn ? '/patients' : '/'} />

          {isSignedIn && isAppRoute ? (
            <SignedInNavbarActions />
          ) : (
            <DarkModeToggle />
          )}
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
