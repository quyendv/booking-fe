'use client';

import { usePathname } from 'next/navigation';
import { buttonVariants } from '~/components/ui/button';
import { cn } from '~/utils/ui.util';

import { LucideIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';
import { ILink } from '~/locales/i18nNavigation';

interface SideBarNavProps {
  isOpen: boolean;
  items: NavProps[];
}

interface NavProps {
  title: string;
  label?: string;
  icon: LucideIcon;
  variant: 'default' | 'ghost';
}

export function SideBarNav({ isOpen, items }: SideBarNavProps) {
  const path = usePathname();

  return (
    <>
      <div data-collapsed={!isOpen} className="group flex flex-col gap-4 py-2">
        <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-start">
          {items.map((item, index) => (
            <ILink
              key={index}
              href="#"
              className={cn(
                buttonVariants({ variant: item.variant }),
                item.variant === 'default' &&
                  'dark:bg-muted dark:text-primary dark:hover:bg-muted dark:hover:text-primary',
                // path === '#' && 'bg-muted font-bold hover:bg-muted',
                'relative justify-start',
              )}
            >
              <item.icon className="size-4" />
              <span
                className={cn(
                  'ml-2 w-16 opacity-100 transition-all duration-1000', // width can be wrong -> only for transition
                  !isOpen && 'm-0 w-0 opacity-0 transition-all duration-300', // transition-duration here triggered when click collapse button
                )}
              >
                {item.title}
              </span>

              {!isOpen && (
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <span className="absolute inset-0"></span>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="flex items-center gap-4">
                    {item.title}
                  </TooltipContent>
                </Tooltip>
              )}
            </ILink>
          ))}
        </nav>
      </div>
    </>
  );
}
