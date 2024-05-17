'use client';

import { CheckIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '~/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { cn } from '~/utils/ui.util';

const cities = [
  {
    value: 'hanoi',
    label: 'Hà Nội',
  },
  {
    value: 'danang',
    label: 'Đà Nẵng',
  },
  {
    value: 'hue',
    label: 'Huế',
  },
  {
    value: 'tp.hcm',
    label: 'TP Hồ Chí Minh',
  },
  {
    value: 'vinhphuc',
    label: 'Vĩnh Phúc',
  },
];

interface HotelSearchLocationProps {
  value: string | undefined;
  setValue: (value: string) => void;
}

export default function HotelSearchLocation({ value = '', setValue }: HotelSearchLocationProps) {
  const [open, setOpen] = useState(false);
  // const [value, setValue] = useState('');
  const t = useTranslations('HotelFilters.searchBar.location');

  return (
    <div aria-label="search-bar-location">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="line-clamp-1 flex w-[150px] flex-col justify-between font-semibold">
            <span className="text-xs">{t('label')}</span>
            <span className={cn('text-sm', !value && 'font-normal text-muted-foreground')}>
              {value ? cities.find((city) => city.value === value)?.label : t('placeholder')}
            </span>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder={t('inputPlaceholder')} className="h-9" />
            <CommandEmpty>{t('notFound')}</CommandEmpty>
            <CommandGroup>
              <CommandList>
                {cities.map((city) => (
                  <CommandItem
                    key={city.value}
                    value={city.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue);
                      setOpen(false);
                    }}
                  >
                    {city.label}
                    <CheckIcon className={cn('ml-auto h-4 w-4', value === city.value ? 'opacity-100' : 'opacity-0')} />
                  </CommandItem>
                ))}
              </CommandList>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
