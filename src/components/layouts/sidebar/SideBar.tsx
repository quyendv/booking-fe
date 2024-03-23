'use client';

import { Archive, ArchiveX, File, Inbox, Send, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { BsArrowLeftShort } from 'react-icons/bs';
import { cn } from '~/utils/ui.util';
import { SideBarNav } from './SideBarNav';

interface SideBarProps {}

export default function SideBar({}: SideBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={cn(
        'relative hidden h-full border-r pt-6 transition-all duration-500 ease-in-out md:block',
        isOpen ? 'w-56' : 'w-20',
      )}
    >
      <BsArrowLeftShort
        className={cn(
          'absolute -right-3 top-2 cursor-pointer rounded-full border bg-background text-3xl text-foreground',
          !isOpen && 'rotate-180',
        )}
        onClick={handleToggle}
      />

      <div className="space-y-4 px-3 py-4">
        <SideBarNav
          isOpen={isOpen}
          items={[
            {
              title: 'Overview',
              label: '128',
              icon: Inbox,
              variant: 'default',
            },
            {
              title: 'Customers',
              label: '9',
              icon: File,
              variant: 'ghost',
            },
            {
              title: 'Hotels',
              label: '',
              icon: Send,
              variant: 'ghost',
            },
            {
              title: 'Receptionist',
              label: '23',
              icon: ArchiveX,
              variant: 'ghost',
            },
            {
              title: 'Rooms',
              label: '',
              icon: Trash2,
              variant: 'ghost',
            },
            {
              title: 'Settings',
              label: '',
              icon: Archive,
              variant: 'ghost',
            },
          ]}
        />
      </div>
    </div>
  );
}
