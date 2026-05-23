export const SUPPORT_URL = 'https://support.sloom.app/';

export type SignedInNavActionIcon = 'message-circle' | 'printer' | 'log-out';

export type SignedInNavAction =
  | {
      id: string;
      title: string;
      icon: SignedInNavActionIcon;
      type: 'external-link';
      href: string;
    }
  | {
      id: string;
      title: string;
      icon: SignedInNavActionIcon;
      type: 'action';
      action: 'print';
    }
  | {
      id: string;
      title: string;
      icon: SignedInNavActionIcon;
      type: 'sign-out';
      variant: 'outlined';
    };

export const signedInNavActions: SignedInNavAction[] = [
  {
    id: 'contact-support',
    title: 'Contact Support',
    icon: 'message-circle',
    type: 'external-link',
    href: SUPPORT_URL,
  },
  {
    id: 'print-report',
    title: 'Print Report',
    icon: 'printer',
    type: 'action',
    action: 'print',
  },
  {
    id: 'sign-out',
    title: 'Sign Out',
    icon: 'log-out',
    type: 'sign-out',
    variant: 'outlined',
  },
];
