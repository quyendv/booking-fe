'use client';

import { Dumbbell, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FaSwimmer } from 'react-icons/fa';
import { HotelSchema } from '~/apis/hotel.api';
import { Button } from '~/components/ui/button';
import { routeConfig } from '~/configs/route.config';
import { useIPathname, useIRouter } from '~/locales/i18nNavigation';
import { convertPriceToString } from '~/utils/common.util';
import { cn } from '~/utils/ui.util';
import AmenityItem from '../amenities/AmenityItem';

interface HotelCardProps {
  hotel: HotelSchema;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  const t = useTranslations();
  const router = useIRouter();
  const pathname = useIPathname();
  const isMyHotel = pathname.includes(routeConfig.MY_HOTEL);
  // const { user } = useAuth();
  // const isMyHotel = hotel.email === user?.email;

  return (
    <div
      onClick={() => !isMyHotel && router.push(routeConfig.HOTEL_DETAILS(hotel.id))}
      className={cn('col-span-1 cursor-pointer transition hover:scale-105', isMyHotel && 'cursor-default')}
    >
      <div className="flex gap-2 rounded-lg border border-primary/10 bg-background/50">
        <div className="relative aspect-square h-[210px] w-full flex-1 overflow-hidden rounded-s-lg">
          <Image
            fill
            /* need position in parent */ src={hotel.imageUrl}
            alt={hotel.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex h-[210px] flex-1 flex-col justify-between gap-1 px-1 py-2 text-sm">
          <h3 className="text-xl font-semibold">{hotel.name}</h3>
          <div className="text-primary/90">{hotel.description.slice(0, 45)}...</div>
          <div className="space-y-1 text-primary/90">
            <AmenityItem>
              <MapPin className="size-4" /> {hotel.address.country}, {hotel.address.province}
            </AmenityItem>
            {hotel.swimmingPool && (
              <AmenityItem>
                <FaSwimmer size={18} />
                {t('HotelForm.label.swimmingPool')}
              </AmenityItem>
            )}
            {hotel.gym && (
              <AmenityItem>
                <Dumbbell className="size-4" />
                {t('HotelForm.label.gym')}
              </AmenityItem>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {hotel.rooms.length > 0 && (
                <>
                  <span className="text-base font-semibold">{convertPriceToString(hotel.rooms[0].roomPrice)}</span>{' '}
                  <span className="text-sm text-primary/70">VND/24hrs</span>
                </>
              )}
            </div>
            {isMyHotel && (
              <Button onClick={() => router.push(routeConfig.MY_HOTEL)} variant="outline">
                Edit
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
