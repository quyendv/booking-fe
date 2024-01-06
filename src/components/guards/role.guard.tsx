import { UserRole } from '~/configs/role.config';
import { routeConfig } from '~/configs/route.config';
import { ILink } from '~/locales/i18nNavigation';

type AllowedRolesType = {
  allowedRoles: UserRole[];
  notAllowedRoles?: never;
};

type NotAllowedRolesType = {
  allowedRoles?: never;
  notAllowedRoles: UserRole[];
};

type RoleGuardType = AllowedRolesType | NotAllowedRolesType;

type RoleGuardProps = { children: React.ReactNode } & RoleGuardType;

export default function RoleGuard({ children, allowedRoles, notAllowedRoles }: RoleGuardProps) {
  const userRole = UserRole.ADMIN; // get user role from context | redux (in database)
  const isAllowed =
    (allowedRoles && allowedRoles.includes(userRole)) || (notAllowedRoles && notAllowedRoles.includes(userRole));

  if (!isAllowed)
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-2">
        <p className="text-3xl text-destructive">You do not have permission to access this page</p>
        <ILink href={routeConfig.HOME} className="hover:text-primary">
          Go to Home page
        </ILink>
      </div>
    );

  return <>{children}</>;
}

export function withRoleGuard(Component: React.ComponentType, roles: RoleGuardType) {
  return function WithRoleGuardWrapper(props: any) {
    if (roles.allowedRoles)
      return (
        <RoleGuard allowedRoles={roles.allowedRoles}>
          <Component {...props} />
        </RoleGuard>
      );
    if (roles.notAllowedRoles)
      return (
        <RoleGuard notAllowedRoles={roles.notAllowedRoles}>
          <Component {...props} />
        </RoleGuard>
      );
    return null; // ensure at least one of allowedRoles or notAllowedRoles is provided
  };
}
