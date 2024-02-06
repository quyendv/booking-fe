import { useEffect } from 'react';
import { routeConfig } from '~/configs/route.config';
import { useAuth } from '~/contexts/auth.context';
import { useIRouter } from '~/locales/i18nNavigation';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useAuth();
  const router = useIRouter();

  // if (isLoading) return <div>loading...</div>;
  // if (!isAuthenticated) {
  //   // return page showing that user is not authenticated & redirect to login page link
  //   router.push(routeConfig.SIGN_IN);
  // }

  useEffect(() => {
    if (!isAuthenticated) {
      // return page showing that user is not authenticated & redirect to login page link
      router.push(routeConfig.SIGN_IN);
    }
  }, [isAuthenticated, router]);

  return <>{children}</>;
}

export function withAuthGuard(Component: React.ComponentType) {
  return function WithRoleGuardWrapper(props: any) {
    return (
      <AuthGuard>
        <Component {...props} />
      </AuthGuard>
    );
  };
}
