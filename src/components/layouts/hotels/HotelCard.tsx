'use client';

import { Dumbbell, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FaHeart, FaSpinner, FaSwimmer } from 'react-icons/fa';
import { HotelSchema } from '~/apis/hotel.api';
import { Button } from '~/components/ui/button';
import { UserRole } from '~/configs/role.config';
import { routeConfig } from '~/configs/route.config';
import { useAuth } from '~/contexts/auth.context';
import useFavoriteHotels from '~/hooks/useFavoriteHotels';
import { useIPathname, useIRouter } from '~/locales/i18nNavigation';
import { convertPriceToString } from '~/utils/common.util';
import { cn } from '~/utils/ui.util';
import AmenityItem from '../amenities/AmenityItem';
import { isFavoriteHotel } from '~/utils/favorite.util';
import { Icons } from '~/components/common/Icons';
import { MouseEvent, useEffect, useState } from 'react';
import { FavoriteApi } from '~/apis/favorite.api';
import { toast } from '~/components/ui/use-toast';

interface HotelCardProps {
  hotel: HotelSchema;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  const { user } = useAuth();
  const { data, removeFavoriteHotel, addFavoriteHotel } = useFavoriteHotels();
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  const t = useTranslations();
  const router = useIRouter();
  const pathname = useIPathname();
  const isMyHotel = pathname.includes(routeConfig.MY_HOTEL);
  // const isMyHotel = hotel.email === user?.email;

  useEffect(() => {
    setIsFavorite(isFavoriteHotel(data, hotel));
  }, [data]);

  const handleAddFavorite = async () => {
    const response = await FavoriteApi.addFavorites({ hotelIds: [hotel.id] });
    if (response.isSuccess) {
      toast({ variant: 'success', description: t('Favorites.toast.addSuccess') });
      setIsFavorite(true);
      addFavoriteHotel(hotel);
    } else {
      toast({ variant: 'destructive', description: t('Favorites.toast.addFailure') });
    }
  };

  const handleRemoveFavorite = async () => {
    const response = await FavoriteApi.removeFavorite(hotel.id);
    if (response.isSuccess) {
      toast({ variant: 'success', description: t('Favorites.toast.removeSuccess') });
      setIsFavorite(false);
      removeFavoriteHotel(hotel);
    } else {
      toast({ variant: 'destructive', description: t('Favorites.toast.removeFailure') });
    }
  };

  const handleToggleFavorite = (e: MouseEvent) => {
    e.stopPropagation();
    if (!user || user.role !== UserRole.CUSTOMER) return;

    setFavoriteLoading(true);
    if (isFavorite) {
      handleRemoveFavorite();
    } else {
      handleAddFavorite();
    }
    setFavoriteLoading(false);
  };

  return (
    <div
      onClick={() => !isMyHotel && router.push(routeConfig.HOTEL_DETAILS(hotel.id))}
      className={cn('relative z-0 col-span-1 cursor-pointer transition hover:scale-105', isMyHotel && 'cursor-default')}
    >
      {/* Favorite */}
      {user && user.role === UserRole.CUSTOMER && (
        <div className="absolute left-5 top-5 z-10 transition-all hover:scale-125">
          {favoriteLoading ? (
            <FaSpinner className="size-6 animate-spin" />
          ) : (
            <Icons.heart
              onClick={handleToggleFavorite}
              className={cn(
                'size-6 cursor-pointer text-primary/90',
                isFavorite ? '!fill-red-500 text-primary' : 'fill-primary/50',
              )}
            />
          )}
        </div>
      )}

      {/* Main Content */}
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
                  <span className="text-sm text-primary/70">VND/{t('HotelForm.pricePerNight')}</span>
                </>
              )}
            </div>
            {isMyHotel && (
              <Button onClick={() => router.push(routeConfig.MY_HOTEL)} variant="outline">
                {t('HotelForm.button.edit')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
