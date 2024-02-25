'use client';

import GuestGuard from '~/components/guards/guest.guard';
import Header from '~/components/layouts/header/Header';

interface LayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <GuestGuard>
      <main className="flex min-h-screen flex-col">
        <Header showUserMenu={false} />
        <section className="flex flex-grow items-center justify-center">{children}</section>
      </main>
    </GuestGuard>
  );
}
