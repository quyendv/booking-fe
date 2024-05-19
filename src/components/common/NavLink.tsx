'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import { ComponentProps } from 'react';
import { ILink } from '~/locales/i18nNavigation';
import { cn } from '~/utils/ui.util';

interface NavLinkProps extends ComponentProps<typeof ILink> {
  className?: string;
}

export default function NavLink({ href, className = '', ...rest }: NavLinkProps) {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/';
  // const pathname = usePathname(); -> pathname.includes(href)
  const isActive = pathname === href;

  return (
    <ILink
      aria-current={isActive ? 'page' : undefined}
      href={href}
      className={cn(isActive && 'font-bold text-red-500', className)}
      {...rest}
    />
  );
}
