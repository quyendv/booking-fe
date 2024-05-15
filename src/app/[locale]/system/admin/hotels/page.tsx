'use client';

import { MapPin, PlusCircle, SearchCode, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Icons } from '~/components/common/Icons';
import AmenityWrapper from '~/components/layouts/amenities/AmenityWrapper';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { routeConfig } from '~/configs/route.config';
import useHotels from '~/hooks/useHotels';
import { useIRouter } from '~/locales/i18nNavigation';
import { convertPriceToString } from '~/utils/common.util';
import { cn } from '~/utils/ui.util';

interface ListHotelProps {}

export default function ListHotel({}: ListHotelProps) {
  const { isLoading, data, error } = useHotels();
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState(data ?? []);

  const router = useIRouter();
  const t = useTranslations();

  useEffect(() => {
    if (searchValue) {
      const filtered = data?.filter((hotel) => hotel.name.toLowerCase().includes(searchValue.toLowerCase()));
      setFilteredData(filtered ?? []);
    } else {
      setFilteredData(data ?? []);
    }
  }, [searchValue, data]);

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Oops! No hotels found</div>;

  return (
    <div>
      <div className="flex w-full gap-2">
        <div className="relative w-full">
          <SearchCode className="absolute left-2.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={t('Shared.button.searchHotel')}
            className="px-8"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value.trimStart())}
          />
          {searchValue && (
            <Icons.xCircle
              onClick={() => setSearchValue('')}
              className="absolute right-3 top-1/2 size-5 -translate-y-1/2"
            />
          )}
        </div>
        <Button className="ml-auto" onClick={() => router.push(routeConfig.A_NEW_HOTEL)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          {t('Shared.button.create')}
        </Button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {filteredData.map((hotel, index) => (
          <div
            onClick={() => router.push(routeConfig.A_MANAGE_HOTEL_DETAILS(hotel.id))}
            className={cn('relative z-0 col-span-1 transition hover:scale-105 hover:cursor-pointer')}
            key={index}
          >
            {/* <div className="flex flex-col gap-2 rounded-lg border border-primary/10 bg-background/50">
              <div className="relative aspect-square h-[210px] w-full flex-1 overflow-hidden rounded-s-lg">
                <Image fill src={hotel.imageUrl} alt={hotel.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex h-[210px] flex-1 flex-col justify-between gap-1 px-1 py-2 text-sm">
                <h3 className="text-xl font-semibold">{hotel.name}</h3>
                <div className="text-primary/90">{hotel.description.slice(0, 45)}...</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {hotel.rooms.length > 0 && (
                      <>
                        <span className="text-base font-semibold">{convertPriceToString(hotel.rooms[0].roomPrice)}</span>{' '}
                        <span className="text-sm text-primary/70">VND/per night</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div> */}
            <div className="space-y-3 rounded-lg bg-background/50">
              {/* Cover */}
              <div className="relative aspect-[4/3] h-auto w-full overflow-hidden">
                <Image fill src={hotel.imageUrl} alt={hotel.name} className="h-auto w-full rounded-lg object-cover" />
              </div>

              {/* Info */}
              <div className="space-y-1 text-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">{hotel.name}</h3>
                  <p className="flex items-center gap-0.5 font-medium">
                    <Star className="size-4 fill-yellow-500 stroke-yellow-500" />
                    {hotel.overview.reviews.total === 0
                      ? t('HotelForm.noRating')
                      : hotel.overview.reviews.average.toFixed(1)}
                  </p>
                </div>
                <div className="line-clamp-1 text-primary/90">{hotel.description}</div>

                <div className="text-primary/90">
                  <AmenityWrapper className="text-muted-foreground">
                    <MapPin className="size-4" /> {hotel.address.country}, {hotel.address.province}
                  </AmenityWrapper>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-between gap-1">
                    {hotel.overview.rooms.minPrice && (
                      <>
                        <span className="text-base font-semibold">
                          {convertPriceToString(hotel.overview.rooms.minPrice)}
                        </span>{' '}
                        <span className="text-sm text-primary/70">VND/{t('HotelForm.pricePerNight')}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
