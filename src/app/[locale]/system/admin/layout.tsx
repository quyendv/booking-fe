import RoleGuard from '~/components/guards/role.guard';
import { UserRole } from '~/configs/role.config';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return <RoleGuard allowedRoles={[UserRole.ADMIN]}>{children}</RoleGuard>;
}
