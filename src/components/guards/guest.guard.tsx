import { routeConfig } from '~/configs/route.config';
import { useAuth } from '~/contexts/auth.context';
import { useIRouter } from '~/locales/i18nNavigation';

interface GuestGuardProps {
  children: React.ReactNode;
}

export default function GuestGuard({ children }: GuestGuardProps) {
  const { isAuthenticated } = useAuth();
  const router = useIRouter();

  // if (isLoading) return <div>loading...</div>;
  if (isAuthenticated) router.push(routeConfig.HOME);
  return <>{children}</>;
}

export function withGuestGuard(Component: React.ComponentType) {
  return function WithGuestGuardWrapper(props: any) {
    return <Component {...props} />;
  };
}
