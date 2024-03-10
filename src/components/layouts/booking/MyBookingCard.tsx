import { differenceInCalendarDays, format } from 'date-fns';
import {
  AirVent,
  Bath,
  Bed,
  BedDouble,
  Castle,
  Home,
  MapPin,
  MountainSnow,
  Ship,
  Trees,
  Tv,
  Users,
  UtensilsCrossed,
  VolumeX,
  Wifi,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import { BookingDetails } from '~/apis/booking.api';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';
import { useToast } from '~/components/ui/use-toast';
import { routeConfig } from '~/configs/route.config';
import { useAuth } from '~/contexts/auth.context';
import useBookRoom from '~/hooks/useBookRoom';
import { useIRouter } from '~/locales/i18nNavigation';
import { convertPriceToString, splitNumber } from '~/utils/common.util';
import AmenityItem from '../amenities/AmenityItem';

interface MyBookingCardProps {
  booking: BookingDetails;
}

export default function MyBookingCard({ booking }: MyBookingCardProps) {
  const { setBookingRoomData, setPaymentIntentId } = useBookRoom();
  const { user } = useAuth();
  const [isBookingLoading, setIsBookingLoading] = useState(false);

  const { hotel, room } = booking;
  const dayCount = differenceInCalendarDays(new Date(booking.endDate), new Date(booking.startDate));

  const t = useTranslations('RoomCard');
  const { toast } = useToast();
  const router = useIRouter();

  async function handleBookingRoom() {
    if (!user) {
      // push /login
      return toast({ variant: 'destructive', description: t('toast.loginRequired') });
    }
    if (!user.isVerified) {
      // verify link
      return toast({ variant: 'destructive', description: t('toast.verifyRequired') });
    }

    setIsBookingLoading(true);
    setBookingRoomData({
      breakfastIncluded: booking.breakFastIncluded,
      totalPrice: booking.totalPrice,
      startDate: new Date(booking.startDate),
      endDate: new Date(booking.endDate),
      room,
      hotel,
      bookingId: booking.id,
    });
    setPaymentIntentId(booking.paymentId);
    router.push(routeConfig.BOOK_ROOM);
    setIsBookingLoading(false);
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>{hotel.name}</CardTitle>
        <CardDescription>
          <p className="mt-4 font-semibold">
            <AmenityItem>
              <MapPin size={16} />
              {hotel.address.country}, {hotel.address.province}
              {hotel.address.district ? ', ' + hotel.address.district : ''}
              {hotel.address.ward ? ', ' + hotel.address.ward : ''}
            </AmenityItem>
          </p>
          <p className="pb-2">{hotel.address.details}</p>
        </CardDescription>
        <CardTitle>{room.title}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* Cover */}
        <div className="relative aspect-square h-[200px] overflow-hidden rounded-lg">
          <Image fill priority src={room.imageUrl} alt="room" className="object-cover" /> {/* TODO: placeholder */}
        </div>

        {/* Amenities */}
        <div className="grid grid-cols-2 content-start gap-4 text-sm">
          <AmenityItem>
            <Bed className="size-4" /> {room.bedCount} {t('amenities.bed')}
          </AmenityItem>
          <AmenityItem>
            <Users className="size-4" /> {room.guestCount} {t('amenities.guest')}
          </AmenityItem>
          <AmenityItem>
            <Bath className="size-4" /> {room.bathroomCount} {t('amenities.bathroom')}
          </AmenityItem>
          {room.kingBed > 0 && (
            <AmenityItem>
              <BedDouble className="size-4" />
              {room.kingBed} {t('amenities.kingBed')}
            </AmenityItem>
          )}
          {room.queenBed > 0 && (
            <AmenityItem>
              <Bed className="size-4" />
              {room.queenBed} {t('amenities.queenBed')}
            </AmenityItem>
          )}
          {room.roomService && (
            <AmenityItem>
              <UtensilsCrossed className="size-4" />
              {t('amenities.roomService')}
            </AmenityItem>
          )}
          {room.tv && (
            <AmenityItem>
              <Tv className="size-4" />
              {t('amenities.tv')}
            </AmenityItem>
          )}
          {room.balcony && (
            <AmenityItem>
              <Home className="size-4" />
              {t('amenities.balcony')}
            </AmenityItem>
          )}
          {room.freeWifi && (
            <AmenityItem>
              <Wifi className="size-4" />
              {t('amenities.freeWifi')}
            </AmenityItem>
          )}
          {room.cityView && (
            <AmenityItem>
              <Castle className="size-4" />
              {t('amenities.cityView')}
            </AmenityItem>
          )}
          {room.oceanView && (
            <AmenityItem>
              <Ship className="size-4" />
              {t('amenities.oceanView')}
            </AmenityItem>
          )}
          {room.forestView && (
            <AmenityItem>
              <Trees className="size-4" />
              {t('amenities.forestView')}
            </AmenityItem>
          )}
          {room.mountainView && (
            <AmenityItem>
              <MountainSnow className="size-4" />
              {t('amenities.mountainView')}
            </AmenityItem>
          )}
          {room.airCondition && (
            <AmenityItem>
              <AirVent className="size-4" />
              {t('amenities.airCondition')}
            </AmenityItem>
          )}
          {room.soundProofed && (
            <AmenityItem>
              <VolumeX className="size-4" />
              {t('amenities.soundProofed')}
            </AmenityItem>
          )}
        </div>

        <Separator />

        {/* Price */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p>
              {t('price.roomPrice')} <span className="text-xs">(VND/{t('price.hour')})</span>:{' '}
            </p>
            <span className="font-bold">{splitNumber(room.roomPrice)}</span>
          </div>
          {room.breakFastPrice > 0 && (
            <div className="flex items-center justify-between">
              <p>
                {t('price.breakFast')} <span className="text-xs">(VND)</span>:{' '}
              </p>
              <span className="font-bold">{splitNumber(room.breakFastPrice)}</span>
            </div>
          )}
        </div>

        <Separator />

        {/* Booking Details */}
        <div className="flex flex-col gap-2">
          <CardTitle className="text-lg">{t('bookingDetails.title')}</CardTitle>
          <CardDescription className="space-y-1.5">
            <p>
              {t.rich('bookingDetails.desc', {
                customer: booking.customerName,
                dayCount: dayCount,
                date: format(new Date(booking.createdAt), 'dd/MM/yyyy'),
                bold: (text) => <span className="font-semibold">{text}</span>,
              })}
            </p>
            <p>
              {t('bookingDetails.checkIn', { date: format(new Date(booking.startDate), 'dd/MM/yyyy'), hour: '9AM' })}
              {/* TODO: dynamic */}
            </p>
            <p>
              {t('bookingDetails.checkOut', { date: format(new Date(booking.endDate), 'dd/MM/yyyy'), hour: '9AM' })}
            </p>

            {booking.breakFastIncluded && <p>{t('bookingDetails.breakfast')}</p>}
            {booking.isPaid ? (
              <p className="font-medium text-green-500">
                {t('bookingDetails.paid', { price: convertPriceToString(booking.totalPrice) })}
              </p>
            ) : (
              <p className="font-medium text-red-500">
                {t('bookingDetails.notPaid', { price: convertPriceToString(booking.totalPrice) })}
              </p>
            )}
          </CardDescription>
        </div>
      </CardContent>
      <CardFooter className="items-center justify-between">
        <Button
          disabled={isBookingLoading}
          variant="outline"
          onClick={() => router.push(routeConfig.HOTEL_DETAILS(hotel.id))}
        >
          {t('bookingDetails.viewHotel')}
        </Button>
        {!booking.isPaid && booking.customerEmail === user?.email && (
          <Button onClick={handleBookingRoom}>{t('bookingDetails.payNow')}</Button>
        )}
      </CardFooter>
    </Card>
  );
}
