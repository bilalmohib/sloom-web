import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { CheckCheckIcon, Moon } from 'lucide-react';

const THEME_STORAGE_KEY = 'sloom-theme';
const DARK_MODE_UNSUPPORTED_MESSAGE = "Dark mode isn't supported yet.";

function ensureLightMode() {
  document.documentElement.classList.remove('dark');
  localStorage.setItem(THEME_STORAGE_KEY, 'light');
}

/** App always uses light mode for now. */
export function ThemeSync() {
  useEffect(() => {
    ensureLightMode();
  }, []);

  return null;
}

if (typeof document !== 'undefined') {
  ensureLightMode();
}

interface DarkModeToggleProps {
  className?: string;
}

const DarkModeToggle = ({ className }: DarkModeToggleProps) => {
  const handleClick = () => {
    ensureLightMode();
    toast(DARK_MODE_UNSUPPORTED_MESSAGE, {
      duration: 1000,
      position: 'top-center',
      style: {
        background: '#ffffff',
        color: '#151641',
      },
      icon: (
        <CheckCheckIcon className="size-4 shrink-0 fill-input-text text-input-text" />
      ),
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'inline-flex items-center gap-2 border-0 bg-transparent p-0',
        'font-inter text-base font-normal leading-6 text-input-text',
        'cursor-pointer transition-opacity hover:opacity-80',
        className,
      )}
      aria-label="Dark mode (not available yet)"
    >
      <Moon className="size-4 shrink-0 fill-input-text text-input-text" />
      Dark Mode
    </button>
  );
};

export default DarkModeToggle;
