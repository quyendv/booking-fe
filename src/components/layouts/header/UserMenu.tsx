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
import { Luggage, Heart } from 'lucide-react';
import { ILink } from '~/locales/i18nNavigation';

interface UserMenuProps {
  user: UserInfo;
  signOut: () => Promise<void>;
}

const menuItems = [
  { label: 'manageAccount', href: routeConfig.MANAGE_ACCOUNT, icon: PersonIcon },
  { label: 'myBookings', href: routeConfig.MY_BOOKING, icon: Luggage },
  { label: 'saved', href: routeConfig.SAVED, icon: Heart },
];

export function UserMenu({ user, signOut }: UserMenuProps) {
  const t = useTranslations('Header');

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
          <PersonIcon className="size-5" />
          <span className="ml-4">{t('signOut')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
