import { Link } from 'react-router-dom';

import { Logo } from '@/components/icons';
import { cn } from '@/lib/utils';

interface SatoriLogoProps {
  to?: string;
  onClick?: () => void;
  className?: string;
}

const SatoriLogo = ({ to = '/', onClick, className }: SatoriLogoProps) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      aria-label="Satori Clinical home"
      className={cn(
        'inline-flex shrink-0 no-underline',
        'transition-opacity hover:opacity-80',
        className,
      )}
    >
      <Logo className="h-[23px] w-auto" />
    </Link>
  );
};

export default SatoriLogo;
