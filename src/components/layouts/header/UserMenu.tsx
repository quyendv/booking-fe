'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

import Image from 'next/image';
import { UserInfo } from '~/contexts/auth.context';
import { useTranslations } from 'next-intl';
import { routeConfig } from '~/configs/route.config';
import { PersonIcon } from '@radix-ui/react-icons';
import { Luggage, Heart, LogOutIcon, LayoutDashboardIcon, UsersIcon, HotelIcon } from 'lucide-react';
import { ILink } from '~/locales/i18nNavigation';
import { UserRole } from '~/configs/role.config';

interface UserMenuProps {
  user: UserInfo;
  signOut: () => Promise<void>;
}

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

export function UserMenu({ user, signOut }: UserMenuProps) {
  const t = useTranslations('Header');
  const menuItems =
    user.role === UserRole.CUSTOMER
      ? customerMenuItems
      : user.role === UserRole.ADMIN
        ? adminMenuItems
        : hotelMenuItems;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {user.avatar ? (
          <Image src={user.avatar} alt="avatar" width={32} height={32} className="size-8 cursor-pointer rounded-full" />
        ) : (
          <div className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-primary/10">
            {user.name[0]}
          </div>
        )}
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
  );
}
