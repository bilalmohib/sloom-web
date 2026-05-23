import { Link } from 'react-router-dom';

import { Logo } from '@/components/icons';
import { cn } from '@/lib/utils';

interface SloomLogoProps {
  to?: string;
  onClick?: () => void;
  className?: string;
}

const SloomLogo = ({ to = '/', onClick, className }: SloomLogoProps) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      aria-label="Sloom home"
      className={cn(
        'inline-flex shrink-0 no-underline',
        'transition-opacity hover:opacity-80',
        className,
      )}
    >
      <Logo className="text-[23px]" />
    </Link>
  );
};

export default SloomLogo;
