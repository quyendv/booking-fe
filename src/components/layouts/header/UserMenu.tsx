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
  { label: 'myBookings', href: routeConfig.MY_BOOKINGS, icon: Luggage },
  { label: 'saved', href: routeConfig.SAVED, icon: Heart },
];

const adminMenuItems = [
  { label: 'dashboard', href: routeConfig.A_OVERVIEW, icon: LayoutDashboardIcon },
  { label: 'manageCustomers', href: routeConfig.A_MANAGE_CUSTOMERS, icon: UsersIcon },
  { label: 'manageHotels', href: routeConfig.A_MANAGE_HOTELS, icon: HotelIcon },
  // { label: 'manageRooms', href: routeConfig.A_MANAGE_ROOMS, icon: Luggage },
];

const hotelMenuItems = [
  { label: 'myHotel', href: routeConfig.MY_HOTEL, icon: HotelIcon },
  { label: 'customerBookings', href: routeConfig.MY_BOOKINGS, icon: Luggage },
];

interface UserMenuProps {}

export function UserMenu({}: UserMenuProps) {
  const { isAuthenticated, user, signOut } = useAuth();
  const t = useTranslations('Header');

  const menuItems = isAuthenticated
    ? user.role === UserRole.CUSTOMER
      ? customerMenuItems
      : user.role === UserRole.ADMIN
        ? adminMenuItems
        : hotelMenuItems // hotel & receptionist
    : [];

  return isAuthenticated ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-8 cursor-pointer rounded-full">
          <AvatarImage src={user.avatar ?? ''} alt="avatar" />
          <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="[&>*]:cursor-pointer">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col items-end gap-1">
            <p className="text-sm font-medium">Hi, {user.name.split(' ')[0]}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {menuItems.map((item, index) => (
          <DropdownMenuItem key={index}>
            <ILink href={item.href} className="flex-center">
              <item.icon className="size-4" />
              <span className="ml-4">{t(item.label)}</span>
            </ILink>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>
          <LogOutIcon className="size-4" />
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
