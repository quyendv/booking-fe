'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

import { PersonIcon } from '@radix-ui/react-icons';
import { Heart, HotelIcon, LayoutDashboardIcon, LogOutIcon, Luggage, UsersIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { buttonVariants } from '~/components/ui/button';
import { UserRole } from '~/configs/role.config';
import { routeConfig } from '~/configs/route.config';
import { useAuth } from '~/contexts/auth.context';
import { ILink } from '~/locales/i18nNavigation';

const customerMenuItems = [
  { label: 'manageAccount', href: routeConfig.MANAGE_ACCOUNT, icon: PersonIcon },
  { label: 'myBookings', href: routeConfig.MY_BOOKING, icon: Luggage },
  { label: 'saved', href: routeConfig.SAVED, icon: Heart },
];

const adminMenuItems = [
  { label: 'dashboard', href: routeConfig.DASHBOARD, icon: LayoutDashboardIcon },
  { label: 'manageCustomers', href: routeConfig.MANAGE_CUSTOMERS, icon: UsersIcon },
  { label: 'manageHotels', href: routeConfig.MANAGE_HOTELS, icon: HotelIcon },
  // { label: 'manageRooms', href: routeConfig.MANAGE_ROOMS, icon: Luggage },
];

const hotelMenuItems = [{ label: 'myHotel', href: routeConfig.MY_HOTEL, icon: HotelIcon }];

interface UserMenuProps {}

export function UserMenu({}: UserMenuProps) {
  const { isAuthenticated, user, signOut } = useAuth();
  const t = useTranslations('Header');

  const menuItems = isAuthenticated
    ? user.role === UserRole.CUSTOMER
      ? customerMenuItems
      : user.role === UserRole.ADMIN
        ? adminMenuItems
        : hotelMenuItems
    : [];

  return isAuthenticated ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-8 cursor-pointer rounded-full">
          {user.avatar ? (
            <>
              <AvatarImage src={user.avatar} alt="avatar" />
              <AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
            </>
          ) : (
            <AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
            // <div className="flex-center size-8 rounded-full bg-primary/10">{user.name[0].toUpperCase()}</div>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="[&>*]:cursor-pointer">
        <DropdownMenuLabel>Hi, {user.name.split(' ')[0]}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {menuItems.map((item, index) => (
          <DropdownMenuItem key={index}>
            <ILink href={item.href} className="flex-center">
              <item.icon className="size-5" />
              <span className="ml-4">{t(item.label)}</span>
            </ILink>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>
          <LogOutIcon className="size-5" />
          <span className="ml-4">{t('signOut')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <div className="space-x-3">
      <ILink className={buttonVariants({ variant: 'outline' })} href={routeConfig.SIGN_IN}>
        {t('signIn')}
      </ILink>
      <ILink className={buttonVariants()} href={routeConfig.SIGN_UP}>
        {t('signUp')}
      </ILink>
    </div>
  );
}
