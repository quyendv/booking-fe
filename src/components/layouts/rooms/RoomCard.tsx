'use client';

import { differenceInCalendarDays, eachDayOfInterval, format, isWithinInterval, startOfDay } from 'date-fns';
import {
  AirVent,
  Bath,
  Bed,
  BedDouble,
  Castle,
  Home,
  Loader2,
  MountainSnow,
  Pencil,
  Ship,
  Trash,
  Trees,
  Tv,
  Users,
  UtensilsCrossed,
  VolumeX,
  Wand2,
  Wifi,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { KeyedMutator, mutate } from 'swr';
import { BookingApi, BookingSchema, CreateBookingDto } from '~/apis/booking.api';
import { HotelApi, HotelSchema, RoomSchema, hotelEndpoints } from '~/apis/hotel.api';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Checkbox } from '~/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Separator } from '~/components/ui/separator';
import { useToast } from '~/components/ui/use-toast';
import { routeConfig } from '~/configs/route.config';
import { useAuth } from '~/contexts/auth.context';
import useBookRoom from '~/hooks/useBookRoom';
import { useIRouter } from '~/locales/i18nNavigation';
import { convertPriceToString, splitNumber } from '~/utils/common.util';
import AmenityWrapper from '../amenities/AmenityWrapper';
import { CalendarDateRangePicker } from '../../common/DateRangePicker';
import RoomForm from './RoomForm';

type DateRangeType = { startDate: Date; endDate: Date };
function checkTimeRangeOverlap(startDate: Date, endDate: Date, dateRanges: DateRangeType[]): boolean {
  const targetInterval = { start: startOfDay(startDate), end: startOfDay(endDate) };

  return dateRanges.some((dateRange) => {
    const interval = { start: startOfDay(dateRange.startDate), end: startOfDay(dateRange.endDate) };
    return (
      isWithinInterval(targetInterval.start, interval) ||
      isWithinInterval(targetInterval.end, interval) ||
      (targetInterval.start < interval.start && targetInterval.end > interval.end)
    );
  });
}

interface RoomCardProps {
  hotel: HotelSchema;
  room: RoomSchema;
  bookings?: BookingSchema[];
  mutateHotel?: KeyedMutator<HotelSchema>;
  canBook?: boolean;
  canManage?: boolean;
}

export default function RoomCard({
  room,
  hotel,
  mutateHotel,
  bookings = [],
  canBook = false, // Booking Hotel Room
  canManage = false, // Manage Hotel Room
}: RoomCardProps) {
  const t = useTranslations('RoomCard');
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useIRouter();
  const { setBookingRoomData, setPaymentIntentId } = useBookRoom();

  const [isLoading, setIsLoading] = useState(false);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [roomDialogOpen, setRoomDialogOpen] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>();
  const [includeBreakfast, setIncludeBreakfast] = useState(false);
  const [days, setDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const roomBookings = useMemo(() => bookings.filter((b) => b.roomId === room.id), [bookings, room.id]);
  const disabledDates = useMemo(() => {
    const dates = roomBookings.flatMap((booking) =>
      eachDayOfInterval({ start: new Date(booking.startDate), end: new Date(booking.endDate) }),
    );
    // return dates;
    return Array.from(new Set(dates)); // FIXME: can allow last end date
  }, [roomBookings]);

  useEffect(() => {
    if (date && date.from && date.to) {
      // const daysDiff = differenceInCalendarDays(date.to, date.from) + 1;
      const daysDiff = differenceInCalendarDays(date.to, date.from);
      setDays(daysDiff);
      if (daysDiff && room.roomPrice) {
        if (includeBreakfast && room.breakFastPrice) {
          setTotalPrice((room.roomPrice + room.breakFastPrice) * daysDiff);
        } else {
          setTotalPrice(room.roomPrice * daysDiff);
        }
      }
    } else {
      setDays(0);
      setTotalPrice(0);
    }
  }, [date, room.roomPrice, room.breakFastPrice, includeBreakfast]);

  function handleToggleRoomDialog() {
    setRoomDialogOpen((prev) => !prev);
  }

  async function handleDeleteRoom() {
    setIsLoading(true);
    const { isSuccess } = await HotelApi.deleteRoom(hotel.id, room.id);
    if (isSuccess) {
      toast({ variant: 'success', description: t('toast.deleteSuccess') });
      setIsLoading(false);
      // router.refresh();
      // router.push(routeConfig.A_MANAGE_HOTELS + `/${hotel.id}`);
      mutate(hotelEndpoints.getById(hotel.id));
    } else {
      toast({ variant: 'destructive', description: t('toast.deleteFailure') });
      setIsLoading(false);
    }
  }

  async function handleBookingRoom() {
    if (!user) {
      // push /login
      return toast({ variant: 'destructive', description: t('toast.loginRequired') });
    }
    if (!user.isVerified) {
      // verify link
      return toast({ variant: 'destructive', description: t('toast.verifyRequired') });
    }

    if (date?.from && date.to && days > 0) {
      const isTimeRangeOverlap = checkTimeRangeOverlap(
        date.from,
        date.to,
        roomBookings.map((b) => ({ startDate: new Date(b.startDate), endDate: new Date(b.endDate) })),
      );
      if (isTimeRangeOverlap) {
        return toast({
          variant: 'destructive',
          title: t('toast.dateOverlapTitle'),
          description: t('toast.dateOverlapDesc'),
        });
      }

      setIsBookingLoading(true);
      const bookingData: CreateBookingDto = {
        roomId: room.id,
        hotelId: hotel.id,
        startDate: format(date.from, 'yyyy-MM-dd'),
        endDate: format(date.to, 'yyyy-MM-dd'),
        breakFastIncluded: includeBreakfast,
        totalPrice,
      };

      const { isSuccess, data } = await BookingApi.create(bookingData);
      if (isSuccess) {
        toast({ variant: 'success', description: t('toast.bookingSuccess') });
        setBookingRoomData({
          breakfastIncluded: includeBreakfast,
          totalPrice,
          startDate: date.from,
          endDate: date.to,
          room,
          hotel,
          bookingId: data.id,
          timeRules: hotel.timeRules,
        });
        setPaymentIntentId(data.paymentId);
        router.push(routeConfig.BOOK_ROOM);
      } else {
        toast({ variant: 'destructive', description: t('toast.bookingFailure') });
      }
      setIsBookingLoading(false);
    } else {
      return toast({ variant: 'destructive', description: t('toast.dateRequired') });
    }
  }

  return (
    <Card className="h-fit">
      <CardHeader>
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
          <AmenityWrapper>
            <Bed className="size-4" /> {room.bedCount} {t('amenities.bed')}
          </AmenityWrapper>
          <AmenityWrapper>
            <Users className="size-4" /> {room.guestCount} {t('amenities.guest')}
          </AmenityWrapper>
          <AmenityWrapper>
            <Bath className="size-4" /> {room.bathroomCount} {t('amenities.bathroom')}
          </AmenityWrapper>
          {room.kingBed > 0 && (
            <AmenityWrapper>
              <BedDouble className="size-4" />
              {room.kingBed} {t('amenities.kingBed')}
            </AmenityWrapper>
          )}
          {room.queenBed > 0 && (
            <AmenityWrapper>
              <Bed className="size-4" />
              {room.queenBed} {t('amenities.queenBed')}
            </AmenityWrapper>
          )}
          {room.roomService && (
            <AmenityWrapper>
              <UtensilsCrossed className="size-4" />
              {t('amenities.roomService')}
            </AmenityWrapper>
          )}
          {room.tv && (
            <AmenityWrapper>
              <Tv className="size-4" />
              {t('amenities.tv')}
            </AmenityWrapper>
          )}
          {room.balcony && (
            <AmenityWrapper>
              <Home className="size-4" />
              {t('amenities.balcony')}
            </AmenityWrapper>
          )}
          {room.freeWifi && (
            <AmenityWrapper>
              <Wifi className="size-4" />
              {t('amenities.freeWifi')}
            </AmenityWrapper>
          )}
          {room.cityView && (
            <AmenityWrapper>
              <Castle className="size-4" />
              {t('amenities.cityView')}
            </AmenityWrapper>
          )}
          {room.oceanView && (
            <AmenityWrapper>
              <Ship className="size-4" />
              {t('amenities.oceanView')}
            </AmenityWrapper>
          )}
          {room.forestView && (
            <AmenityWrapper>
              <Trees className="size-4" />
              {t('amenities.forestView')}
            </AmenityWrapper>
          )}
          {room.mountainView && (
            <AmenityWrapper>
              <MountainSnow className="size-4" />
              {t('amenities.mountainView')}
            </AmenityWrapper>
          )}
          {room.airCondition && (
            <AmenityWrapper>
              <AirVent className="size-4" />
              {t('amenities.airCondition')}
            </AmenityWrapper>
          )}
          {room.soundProofed && (
            <AmenityWrapper>
              <VolumeX className="size-4" />
              {t('amenities.soundProofed')}
            </AmenityWrapper>
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
      </CardContent>
      {(canBook || canManage) && (
        <CardFooter>
          {/* Booking Section */}
          {canBook && (
            <div className="flex flex-col gap-6">
              {/* Date Picker */}
              <div>
                <div>{t('footer.selectDateDesc')}</div>
                <CalendarDateRangePicker
                  date={date}
                  onDateChange={setDate}
                  fromDate={new Date()}
                  title={t('footer.selectDateTitle')}
                  disabledDates={disabledDates}
                />
              </div>
              {/* Breakfast include? */}
              {room.breakFastPrice > 0 && (
                <div>
                  <div className="mb-2">{t('footer.includeBreakfastDesc')}</div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="breakfast" onCheckedChange={(value) => setIncludeBreakfast(!!value)} />
                    <label htmlFor="breakfast" className="cursor-pointer text-sm">
                      {t('footer.includeBreakfastLabel')}
                    </label>
                  </div>
                </div>
              )}
              {/* Summary */}
              <div>
                {t('footer.totalPrice')}: <span className="font-bold">{convertPriceToString(totalPrice)} VND</span>{' '}
                {t('footer.priceFor')}{' '}
                <span className="font-bold">
                  {days} {t('footer.days')}
                </span>
              </div>

              {/* Booking Button with dialog */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button disabled={isBookingLoading} type="button">
                    {isBookingLoading ? (
                      <Loader2 className="mr-2 size-4 animate-spin" />
                    ) : (
                      <Wand2 className="mr-2 size-4" />
                    )}
                    {isBookingLoading ? t('footer.loading') : t('footer.book')}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{t('footer.bookingDialogTitle')}</AlertDialogTitle>
                    <AlertDialogDescription>{t('footer.bookingDialogDesc')}</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t('footer.bookingDialogCancel')}</AlertDialogCancel>
                    <AlertDialogAction onClick={handleBookingRoom}>{t('footer.bookingDialogAction')}</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}

          {/* Manage Room Section */}
          {canManage && mutateHotel && (
            <div className="flex w-full justify-between">
              {/* Delete Button */}
              <Button disabled={isLoading} type="button" variant="outline" onClick={handleDeleteRoom}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 size-4" />
                    {t('footer.deleting')}
                  </>
                ) : (
                  <>
                    <Trash className="mr-2 size-4" />
                    {t('footer.delete')}
                  </>
                )}
              </Button>

              {/* Edit Dialog */}
              <Dialog open={roomDialogOpen} onOpenChange={setRoomDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="max-w-[150px]">
                    <Pencil className="mr-2 size-4" />
                    {t('footer.editTrigger')}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-[900px] w-[90%]">
                  <DialogHeader className="px-2">
                    <DialogTitle>{t('footer.editTitle')}</DialogTitle>
                    <DialogDescription>{t('footer.editDesc')}</DialogDescription>
                  </DialogHeader>
                  <RoomForm
                    hotel={hotel}
                    room={room}
                    handleToggleDialog={handleToggleRoomDialog}
                    mutateHotel={mutateHotel}
                  />
                </DialogContent>
              </Dialog>
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
