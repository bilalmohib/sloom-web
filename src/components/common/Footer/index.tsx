import { Link } from 'react-router-dom';

import Container from '@/components/common/Container';
import { HelpCenterLogo } from '@/components/icons';
import { policyLinks } from '@/components/common/Footer/data';

const SUPPORT_URL = 'https://support.beyondintelligence.ai/';

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  return (
    <footer
      className={`w-full border-t border-input-text/10 bg-white-smoke text-input-text ${className ?? ''}`}
    >
      <Container>
        <div className="flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-normal">
            <span className="text-input-text">
              Copyright 2026. Beyond Intelligence. All rights reserved.
            </span>
            <span className="text-input-text/30" aria-hidden>
              |
            </span>
            <Link
              to={policyLinks[0].link}
              className="font-normal text-input-text transition-opacity hover:opacity-80"
            >
              {policyLinks[0].title}
            </Link>
            <span className="text-input-text" aria-hidden>
              |
            </span>
            <Link
              to={policyLinks[1].link}
              className="font-normal text-input-text transition-opacity hover:opacity-80"
            >
              {policyLinks[1].title}
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm font-normal text-input-text">
            <span>Can&apos;t find the report you&apos;re looking for?</span>
            <a
              href={SUPPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-normal text-primary underline underline-offset-2 transition-colors hover:text-buttonHover"
            >
              <HelpCenterLogo className="shrink-0 text-primary" width={18} height={18} />
              Contact Support
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
