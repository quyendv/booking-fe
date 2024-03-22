'use client';

import { format } from 'date-fns';
import { useState } from 'react';
import useBookRoom from '~/hooks/useBookRoom';
import { splitNumber } from '~/utils/common.util';
import RoomCard from '../rooms/RoomCard';
import PaymentChannel from './PaymentChannel';
import { Button } from '~/components/ui/button';
import { useToast } from '~/components/ui/use-toast';
import { BookingApi } from '~/apis/booking.api';
import { useTranslations } from 'next-intl';

interface BookRoomProps {}

export default function BookRoom({}: BookRoomProps) {
  const { bookingRoomData } = useBookRoom();
  const [channel, setChannel] = useState('vn_pay');
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations('BookRoom');
  const { toast } = useToast();

  async function handlePayment() {
    if (bookingRoomData) {
      setIsLoading(true);
      if (channel === 'vn_pay') {
        const { isSuccess, data } = await BookingApi.createVnpayPaymentUrl(bookingRoomData.bookingId);
        if (isSuccess) {
          toast({
            description: t('toast.redirecting'),
            variant: 'success',
          });
          // window.open(data.data, '_blank');
          window.open(data.data, '_self');
          // window.location.href = data.data;
        } else {
          toast({
            description: t('toast.redirectFailed'),
            variant: 'destructive',
          });
        }
      } else {
        toast({
          // title: 'Payment Method',
          description: t('toast.methodNotSupported'),
          variant: 'destructive',
        });
        setIsLoading(false);
      }
    } else {
      toast({
        // title: 'Booking Error',
        description: t('toast.noBooking'),
        variant: 'destructive',
      });
    }
  }

  return (
    <div className="mx-auto max-w-[700px] p-8">
      {bookingRoomData ? (
        <>
          <h3 className="mb-6 text-2xl font-semibold">{t('title')}</h3>
          <div className="mb-6">
            <RoomCard room={bookingRoomData.room} hotel={bookingRoomData.hotel} isBookRoomPage />
          </div>

          <PaymentChannel channel={channel} setChannel={setChannel} />

          <div className="mt-8 flex flex-col gap-4">
            <div className="space-y-1">
              <h3 className="mb-1 text-xl font-semibold">{t('summary.heading')}</h3>
              <div>{t('summary.checkIn', { date: format(bookingRoomData.startDate, 'yyyy-MM-dd'), hour: '9AM' })}</div>
              <div>{t('summary.checkOut', { date: format(bookingRoomData.endDate, 'yyyy-MM-dd'), hour: '9AM' })}</div>
              {bookingRoomData.breakfastIncluded && <div>{t('summary.breakfast', { hour: '8AM' })}</div>}
            </div>
            <div className="text-lg font-bold">
              {t('summary.total')}: {splitNumber(bookingRoomData.totalPrice)} VND
            </div>
          </div>

          <Button onClick={handlePayment} disabled={isLoading} className="mt-4">
            {isLoading ? t('summary.processPayment') : t('summary.payNow')}
          </Button>
        </>
      ) : (
        <div>{t('toast.noBooking')}</div>
      )}
    </div>
  );
}
