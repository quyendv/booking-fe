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

const Header = () => {
  const { isAuthenticated, user, signOut } = useAuth();
  const t = useTranslations('Index');

  return (
    <nav className="sticky top-0 border border-b-primary/10 bg-secondary">
      {/* Container */}
      <div className="container mx-auto flex w-full max-w-[1920px] items-center p-4 xl:px-20">
        {/* Logo Group */}
        <Logo />

        {/* User Buttons */}
        <ul className="ml-auto flex items-center gap-6">
          {/* <NavLink href={routeConfig.HOME}>Home</NavLink> */}
          <ThemeToggle />
          <LocaleSwitcher />
          {isAuthenticated ? (
            <UserMenu user={user} signOut={signOut} />
          ) : (
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
    </nav>
  );
};

export default Header;
