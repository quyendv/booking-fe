import AuthGuard from '~/components/guards/auth.guard';
import Container from '~/components/layouts/Container';
import Header from '~/components/layouts/header/Header';
import GlobalLoading from '~/components/layouts/loading/GlobalLoading';

interface SystemLayoutProps {
  children: React.ReactNode;
}

export default function SystemLayout({ children }: SystemLayoutProps) {
  return (
    <>
      <GlobalLoading />
      <AuthGuard>
        <main className="z-0 flex min-h-screen flex-col">
          <Header />
          <section className="flex-grow">
            {/* <Container>{children}</Container> */}
            {children}
          </section>
        </main>
      </AuthGuard>
    </>
  );
}
