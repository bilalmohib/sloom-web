import { cn } from '@/lib/utils';

import type { IIconProps } from './types';

export const Logo = ({
  className,
  color = '#6366F1',
}: IIconProps) => {
  return (
    <span
      className={cn(
        'inline-block font-semibold leading-none tracking-tight',
        className,
      )}
      style={{ color }}
      aria-hidden
    >
      Sloom
    </span>
  );
};
