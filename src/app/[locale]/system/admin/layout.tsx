import RoleGuard from '~/components/guards/role.guard';
import Container from '~/components/layouts/Container';
import { UserRole } from '~/configs/role.config';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  // return <RoleGuard allowedRoles={[UserRole.ADMIN]}>{children}</RoleGuard>;
  return (
    <RoleGuard allowedRoles={[UserRole.ADMIN]}>
      <Container className="h-excludeHeader p-0">{children}</Container>
    </RoleGuard>
  );
}
