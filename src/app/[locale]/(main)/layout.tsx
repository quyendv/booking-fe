import Header from '~/components/layouts/header/Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <main className="flex min-h-screen flex-col bg-secondary">
      <Header />
      {children}
    </main>
  );
}

export default MainLayout;
