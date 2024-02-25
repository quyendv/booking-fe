'use client';

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

interface HeaderProps {
  showUserMenu?: boolean;
  className?: string;
}

const Header = ({ showUserMenu = true, className = '' }: HeaderProps) => {
  const { isAuthenticated, user, signOut } = useAuth();
  const t = useTranslations('Index');

  return (
    <header className={cn('sticky top-0 border border-b-primary/10 bg-secondary', className)}>
      {/* Container */}
      <div className="container mx-auto flex w-full max-w-[1920px] items-center p-4 xl:px-20">
        {/* Logo Group */}
        <Logo />

        {/* User Buttons */}
        <ul className="ml-auto flex items-center gap-6">
          <ThemeToggle />
          <LocaleSwitcher />

          {isAuthenticated
            ? showUserMenu && <UserMenu user={user} signOut={signOut} />
            : showUserMenu && (
                <>
                  <ILink className={buttonVariants({ variant: 'outline' })} href={routeConfig.SIGN_IN}>
                    {t('signIn')}
                  </ILink>
                  <ILink className={buttonVariants()} href={routeConfig.SIGN_UP}>
                    {t('signUp')}
                  </ILink>
                </>
              )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
