'use client';

import GuestGuard from '~/components/guards/guest.guard';
import Header from '~/components/layouts/header/Header';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <GuestGuard>
      <Header showUserMenu={false} className="fixed left-0 right-0 top-0 bg-background" />
      {children}
    </GuestGuard>
  );
}
