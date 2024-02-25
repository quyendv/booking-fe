import Container from '~/components/layouts/Container';
import Header from '~/components/layouts/header/Header';

interface SystemLayoutProps {
  children: React.ReactNode;
}

export default function SystemLayout({ children }: SystemLayoutProps) {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <section className="flex-grow">
        <Container>{children}</Container>
      </section>
    </main>
  );
}
