import { cn } from '~/utils/ui.util';
import LocaleSwitcher from '../../common/LocaleSwitcher';
import { ThemeToggle } from '../../common/ThemeToggle';
import Container from '../Container';
import Logo from './Logo';
import { UserMenu } from './UserMenu';

interface HeaderProps {
  showUserMenu?: boolean;
  className?: string;
}

const Header = ({ showUserMenu = true, className = '' }: HeaderProps) => {
  return (
    <header className={cn('sticky top-0 z-10 border border-b-primary/10 bg-background', className)}>
      <Container className="flex items-center">
        <Logo />

        <div className="ml-auto flex items-center gap-5">
          <ThemeToggle />
          <LocaleSwitcher />

          {showUserMenu && <UserMenu />}
        </div>
      </Container>
    </header>
  );
};

export default Header;
