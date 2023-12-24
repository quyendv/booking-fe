'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import { ComponentProps } from 'react';
import { ILink } from '~/locales/i18nNavigation';

export default function NavLink({ href, ...rest }: ComponentProps<typeof ILink>) {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/';
  const isActive = pathname === href;

  return (
    <ILink
      aria-current={isActive ? 'page' : undefined}
      href={href}
      // style={{ fontWeight: isActive ? 'bold' : 'normal' }}
      className={isActive ? 'font-bold text-red-500' : 'font-normal'}
      {...rest}
    />
  );
}
