import RoleGuard from '~/components/guards/role.guard';
import Container from '~/components/layouts/Container';
import { UserRole } from '~/configs/role.config';

interface HotelLayoutProps {
  children: React.ReactNode;
}

export default function HotelLayout({ children }: HotelLayoutProps) {
  // return <RoleGuard allowedRoles={[UserRole.HOTEL, UserRole.RECEPTIONIST]}>{children}</RoleGuard>;
  return (
    <RoleGuard allowedRoles={[UserRole.HOTEL, UserRole.RECEPTIONIST]}>
      <Container>{children}</Container>
    </RoleGuard>
  );
}
