'use client';

import GuestGuard from '~/components/guards/guest.guard';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <GuestGuard>{children}</GuestGuard>;
}
