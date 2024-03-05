import { useTranslations } from 'next-intl';
import { routeConfig } from '~/configs/route.config';
import { useAuth } from '~/contexts/auth.context';
import { ILink } from '~/locales/i18nNavigation';
import LocaleSwitcher from '../../common/LocaleSwitcher';
import { ThemeToggle } from '../../common/ThemeToggle';
import { buttonVariants } from '../../ui/button';
import Logo from './Logo';
import { UserMenu } from './UserMenu';
import { cn } from '~/utils/ui.util';
import Container from '../Container';

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
