import RoleGuard from '~/components/guards/role.guard';
import Container from '~/components/layouts/Container';
import SideBar from '~/components/layouts/sidebar/SideBar';
import { UserRole } from '~/configs/role.config';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  // return <RoleGuard allowedRoles={[UserRole.ADMIN]}>{children}</RoleGuard>;
  return (
    <RoleGuard allowedRoles={[UserRole.ADMIN]}>
      <div className="flex h-excludeHeader w-full border-collapse flex-row">
        <SideBar />
        <Container className="h-excludeHeader flex-1 overflow-auto">{children}</Container>
      </div>
    </RoleGuard>
  );
}
