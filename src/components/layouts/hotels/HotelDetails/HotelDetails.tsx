'use client';

import { Car, Clapperboard, Dumbbell, MapPin, ShoppingBasket, Utensils, Wine } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FaSpa, FaSwimmer } from 'react-icons/fa';
import { MdDryCleaning } from 'react-icons/md';
import { HotelSchemaWithBookings } from '~/apis/hotel.api';
import { ReviewSchema } from '~/apis/review.api';
import { ScrollArea } from '~/components/ui/scroll-area';
import AmenityWrapper from '../../amenities/AmenityWrapper';
import RoomCard from '../../rooms/RoomCard';
import Gallery from '../Gallery';
import HotelDetailReviews from './HotelDetailReviews';

interface HotelDetailsProps {
  hotel: HotelSchemaWithBookings;
  reviews: ReviewSchema[];
}

export default function HotelDetails({ hotel, reviews }: HotelDetailsProps) {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-6 pb-2">
      {/* Image Cover */}
      <div className="relative aspect-square h-[200px] w-full overflow-hidden rounded-lg bg-red-200 md:h-[400px]">
        <Image src={hotel.imageUrl} alt={hotel.name} fill priority className="object-cover" />
      </div>

      {/* Hotel Info */}
      <div className="space-y-12">
        {/* Title Section */}
        <div className="space-y-2.5">
          <h3 className="text-xl font-semibold md:text-3xl">{hotel.name}</h3>
          <AmenityWrapper className="text-sm leading-none text-muted-foreground">
            <MapPin size={16} />
            {hotel.address.country}, {hotel.address.province}
            {hotel.address.district ? ', ' + hotel.address.district : ''}
            {hotel.address.ward ? ', ' + hotel.address.ward : ''}
            {hotel.address.details ? ', ' + hotel.address.details : ''}
          </AmenityWrapper>
        </div>

        {/* About Section */}
        <div>
          <h4 className="text-lg font-semibold">{t('HotelDetails.heading.about')}</h4>
          <p className="text-primary/90">{hotel.description}</p>
        </div>

        {/* Amenities Section */}
        <div>
          <h4 className="mb-2 mt-4 text-lg font-semibold">{t('HotelDetails.heading.amenities')}</h4>
          <div className="grid grid-cols-2 content-start gap-4 text-sm md:grid-cols-3">
            {hotel.swimmingPool && (
              <AmenityWrapper>
                <FaSwimmer size={18} />
                {t('HotelDetails.info.swimmingPool')}
              </AmenityWrapper>
            )}
            {hotel.gym && (
              <AmenityWrapper>
                <Dumbbell size={18} />
                {t('HotelDetails.info.gym')}
              </AmenityWrapper>
            )}
            {hotel.spa && (
              <AmenityWrapper>
                <FaSpa size={18} />
                {t('HotelDetails.info.spa')}
              </AmenityWrapper>
            )}
            {hotel.bar && (
              <AmenityWrapper>
                <Wine size={18} />
                {t('HotelDetails.info.bar')}
              </AmenityWrapper>
            )}
            {hotel.laundry && (
              <AmenityWrapper>
                <MdDryCleaning size={18} />
                {t('HotelDetails.info.laundry')}
              </AmenityWrapper>
            )}
            {hotel.restaurant && (
              <AmenityWrapper>
                <Utensils size={18} />
                {t('HotelDetails.info.restaurant')}
              </AmenityWrapper>
            )}
            {hotel.shopping && (
              <AmenityWrapper>
                <ShoppingBasket size={18} />
                {t('HotelDetails.info.shopping')}
              </AmenityWrapper>
            )}
            {hotel.freeParking && (
              <AmenityWrapper>
                <Car size={18} />
                {t('HotelDetails.info.freeParking')}
              </AmenityWrapper>
            )}
            {hotel.movieNight && (
              <AmenityWrapper>
                <Clapperboard size={18} />
                {t('HotelDetails.info.movieNight')}
              </AmenityWrapper>
            )}
            {hotel.coffeeShop && (
              <AmenityWrapper>
                <Wine size={18} />
                {t('HotelDetails.info.coffeeShop')}
              </AmenityWrapper>
            )}
          </div>
        </div>

        {/* Gallery Section */}
        {hotel.gallery.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold">{t('HotelDetails.heading.gallery')}</h4>
            <ScrollArea className="mt-2 h-[350px] w-full">
              <Gallery data={hotel.gallery} />
            </ScrollArea>
          </div>
        )}

        {reviews.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold">{t('HotelDetails.heading.reviews')}</h4>
            <HotelDetailReviews reviews={reviews} />
          </div>
        )}
      </div>

      {/* Rooms */}
      <div>
        {hotel.rooms.length > 0 && (
          <div>
            <h3 className="my-4 text-lg font-semibold">{t('HotelDetails.heading.rooms')}</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {hotel.rooms.map((room) => (
                <RoomCard key={room.id} hotel={hotel} room={room} bookings={hotel.bookings} canBook />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
