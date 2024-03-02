'use client';

import { Car, Clapperboard, Dumbbell, MapPin, ShoppingBasket, Utensils, Wine } from 'lucide-react';
import Image from 'next/image';
import { FaSpa, FaSwimmer } from 'react-icons/fa';
import { MdDryCleaning } from 'react-icons/md';
import { HotelSchema } from '~/apis/hotel.api';
import AmenityItem from '../amenities/AmenityItem';
import RoomCard from '../rooms/RoomCard';
import { useTranslations } from 'next-intl';

interface HotelDetailsProps {
  hotel: HotelSchema;
  booking?: any[];
}

export default function HotelDetails({ hotel }: HotelDetailsProps) {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-6 pb-2">
      {/* Image Cover */}
      <div className="relative aspect-square h-[200px] w-full overflow-hidden rounded-lg bg-red-200 md:h-[400px]">
        <Image src={hotel.imageUrl} alt={hotel.name} fill objectFit="cover" />
      </div>

      {/* Hotel Info */}
      <div>
        <h3 className="text-xl font-semibold md:text-3xl">{hotel.name}</h3>
        <div>
          <AmenityItem>
            <MapPin size={16} />
            {hotel.address.country}, {hotel.address.province}
            {hotel.address.district ? ', ' + hotel.address.district : ''}
            {hotel.address.ward ? ', ' + hotel.address.ward : ''}
          </AmenityItem>
        </div>
        <h3 className="mb-2 mt-4 text-lg font-semibold">{t('HotelDetails.heading.location')}</h3>
        <p className="mb-2 text-primary/90">{hotel.address.details}</p>
        <h3 className="mb-2 mt-4 text-lg font-semibold">{t('HotelDetails.heading.about')}</h3>
        <p className="mb-2 text-primary/90">{hotel.description}</p>
        <h3 className="mb-2 mt-4 text-lg font-semibold">{t('HotelDetails.heading.amenities')}</h3>
        <div className="grid grid-cols-2 content-start gap-4 text-sm md:grid-cols-3">
          {hotel.swimmingPool && (
            <AmenityItem>
              <FaSwimmer size={18} />
              {t('HotelDetails.info.swimmingPool')}
            </AmenityItem>
          )}
          {hotel.gym && (
            <AmenityItem>
              <Dumbbell size={18} />
              {t('HotelDetails.info.gym')}
            </AmenityItem>
          )}
          {hotel.spa && (
            <AmenityItem>
              <FaSpa size={18} />
              {t('HotelDetails.info.spa')}
            </AmenityItem>
          )}
          {hotel.bar && (
            <AmenityItem>
              <Wine size={18} />
              {t('HotelDetails.info.bar')}
            </AmenityItem>
          )}
          {hotel.laundry && (
            <AmenityItem>
              <MdDryCleaning size={18} />
              {t('HotelDetails.info.laundry')}
            </AmenityItem>
          )}
          {hotel.restaurant && (
            <AmenityItem>
              <Utensils size={18} />
              {t('HotelDetails.info.restaurant')}
            </AmenityItem>
          )}
          {hotel.shopping && (
            <AmenityItem>
              <ShoppingBasket size={18} />
              {t('HotelDetails.info.shopping')}
            </AmenityItem>
          )}
          {hotel.freeParking && (
            <AmenityItem>
              <Car size={18} />
              {t('HotelDetails.info.freeParking')}
            </AmenityItem>
          )}
          {hotel.movieNight && (
            <AmenityItem>
              <Clapperboard size={18} />
              {t('HotelDetails.info.movieNight')}
            </AmenityItem>
          )}
          {hotel.coffeeShop && (
            <AmenityItem>
              <Wine size={18} />
              {t('HotelDetails.info.coffeeShop')}
            </AmenityItem>
          )}
        </div>
      </div>

      {/* Rooms */}
      <div>
        {hotel.rooms.length > 0 && (
          <div>
            <h3 className="my-4 text-lg font-semibold">Hotel Rooms</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {hotel.rooms.map((room) => (
                <RoomCard key={room.id} hotel={hotel} room={room} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
