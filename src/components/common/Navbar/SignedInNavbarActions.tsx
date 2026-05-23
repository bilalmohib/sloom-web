import { cn } from '@/lib/utils';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  signedInNavActions,
  type SignedInNavActionIcon,
} from '@/components/common/Navbar/data';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, MessageCircle, Printer, type LucideIcon } from 'lucide-react';

const iconMap: Record<SignedInNavActionIcon, LucideIcon> = {
  'message-circle': MessageCircle,
  printer: Printer,
  'log-out': LogOut,
};

const navActionClass = cn(
  'inline-flex items-center gap-2 font-inter text-base font-semibold leading-6 text-input-text',
  'transition-opacity hover:opacity-80',
);

const SignedInNavbarActions = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  const handleAction = (action: 'print') => {
    if (action === 'print') {
      window.print();
    }
  };

  return (
    <div className="flex items-center gap-4">
      {signedInNavActions.map((item, index) => {
        const Icon = iconMap[item.icon];
        const showDivider = index > 0;

        if (item.type === 'external-link') {
          return (
            <Fragment key={item.id}>
              {showDivider && (
                <span
                  className="h-6 w-px bg-input-border-default"
                  aria-hidden
                />
              )}
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={navActionClass}
              >
                <Icon className="size-5 shrink-0" strokeWidth={2} />
                {item.title}
              </a>
            </Fragment>
          );
        }

        if (item.type === 'action') {
          return (
            <Fragment key={item.id}>
              {showDivider && (
                <span
                  className="h-6 w-px bg-input-border-default"
                  aria-hidden
                />
              )}
              <button
                type="button"
                className={cn(
                  navActionClass,
                  'cursor-pointer border-0 bg-transparent p-0',
                )}
                onClick={() => handleAction(item.action)}
              >
                <Icon className="size-5 shrink-0" strokeWidth={2} />
                {item.title}
              </button>
            </Fragment>
          );
        }

        return (
          <Fragment key={item.id}>
            {showDivider && (
              <span className="h-6 w-px bg-input-border-default" aria-hidden />
            )}
            <button
              type="button"
              onClick={handleSignOut}
              className={cn(
                navActionClass,
                'cursor-pointer bg-transparent p-0',
                item.variant === 'outlined' &&
                  'rounded-md border border-input-border-default px-3 py-2 hover:bg-black/5',
              )}
            >
              <Icon className="size-5 shrink-0" strokeWidth={2} />
              {item.title}
            </button>
          </Fragment>
        );
      })}
    </div>
  );
};

export default SignedInNavbarActions;
