'use client';

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
  Wifi,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import { KeyedMutator, mutate } from 'swr';
import { HotelApi, HotelSchema, RoomSchema, hotelEndpoints } from '~/apis/hotel.api';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
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
import { useIPathname, useIRouter } from '~/locales/i18nNavigation';
import { splitNumber } from '~/utils/common.util';
import AmenityItem from '../amenities/AmenityItem';
import RoomForm from './RoomForm';

interface RoomCardProps {
  hotel: HotelSchema;
  room: RoomSchema;
  mutateHotel?: KeyedMutator<HotelSchema>;
}

export default function RoomCard({ room, hotel, mutateHotel }: RoomCardProps) {
  const t = useTranslations('RoomCard');
  const { toast } = useToast();
  const router = useIRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useIPathname();
  const isHotelDetailsPage = pathname.includes('hotel-details'); // FIXME

  function handleToggleDialog() {
    setOpen((prev) => !prev);
  }

  async function handleDeleteRoom() {
    setIsLoading(true);
    const { isSuccess } = await HotelApi.deleteRoom(hotel.id, room.id);
    if (isSuccess) {
      toast({ variant: 'success', description: t('toast.deleteSuccess') });
      setIsLoading(false);
      // router.refresh();
      // router.push(routeConfig.MANAGE_HOTELS + `/${hotel.id}`);
      mutate(hotelEndpoints.getById(hotel.id));
    } else {
      toast({ variant: 'destructive', description: t('toast.deleteFailure') });
      setIsLoading(false);
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
          <Image fill src={room.imageUrl} alt="room" className="object-cover" /> {/* TODO: placeholder */}
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
      </CardContent>
      <CardFooter>
        {isHotelDetailsPage ? (
          <div>{t('footer.detailPage')}</div>
        ) : (
          mutateHotel && (
            // Delete Button
            <div className="flex w-full justify-between">
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
              <Dialog open={open} onOpenChange={setOpen}>
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
                    handleToggleDialog={handleToggleDialog}
                    mutateHotel={mutateHotel}
                  />
                </DialogContent>
              </Dialog>
            </div>
          )
        )}
      </CardFooter>
    </Card>
  );
}
