import Container from '~/components/layouts/Container';
import Header from '~/components/layouts/header/Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <main className="z-0 flex min-h-screen flex-col">
      <Header />
      <section className="flex-grow">
        <Container>{children}</Container>
      </section>
    </main>
  );
}

export default MainLayout;
