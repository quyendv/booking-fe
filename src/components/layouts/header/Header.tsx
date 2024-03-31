import { cn } from '~/utils/ui.util';
import LocaleSwitcher from '../../common/LocaleSwitcher';
import { ThemeToggle } from '../../common/ThemeToggle';
import Container from '../../common/Container';
import Logo from './Logo';
import { UserMenu } from './UserMenu';

interface HeaderProps {
  disableUserMenu?: boolean;
  className?: string;
}

const Header = ({ disableUserMenu = false, className = '' }: HeaderProps) => {
  return (
    <header className={cn('sticky top-0 z-10 max-h-header border border-b-primary/10 bg-background', className)}>
      <Container className="flex items-center">
        <Logo />

        <div className="ml-auto flex items-center gap-5">
          <ThemeToggle />
          <LocaleSwitcher />

          {!disableUserMenu && <UserMenu />}
        </div>
      </Container>
    </header>
  );
};

export default Header;
