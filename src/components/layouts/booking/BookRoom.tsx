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

interface BookRoomProps {}

export default function BookRoom({}: BookRoomProps) {
  const { bookingRoomData } = useBookRoom();
  const [channel, setChannel] = useState('vn_pay');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  async function handlePayment() {
    if (bookingRoomData) {
      setIsLoading(true);
      if (channel === 'vn_pay') {
        const { isSuccess, data } = await BookingApi.createVnpayPaymentUrl(bookingRoomData.bookingId);
        if (isSuccess) {
          toast({
            description: 'Redirecting to VNPay payment gateway ...',
            variant: 'success',
          });
          // window.open(data.data, '_blank');
          window.open(data.data, '_self');
          // window.location.href = data.data;
        } else {
          toast({
            description: 'Failed to redirect to VNPay payment gateway!',
            variant: 'destructive',
          });
        }
      } else {
        toast({
          // title: 'Payment Method',
          description: 'This payment method is not available yet!',
          variant: 'destructive',
        });
        setIsLoading(false);
      }
    } else {
      toast({
        // title: 'Booking Error',
        description: 'No booking found!',
        variant: 'destructive',
      });
    }
  }

  return (
    <div className="mx-auto max-w-[700px]">
      {bookingRoomData ? (
        <>
          <h3 className="mb-6 text-2xl font-semibold">Complete payment to reserve this room!</h3>
          <div className="mb-6">
            <RoomCard room={bookingRoomData.room} hotel={bookingRoomData.hotel} isBookRoomPage />
          </div>

          <PaymentChannel channel={channel} setChannel={setChannel} />

          <div className="mt-8 flex flex-col gap-4">
            <div className="space-y-1">
              <h3 className="mb-1 text-xl font-semibold">Your Booking Summary</h3>
              <div>You will check-in on {format(bookingRoomData.startDate, 'yyyy-MM-dd')} at 5PM</div>
              <div>You will check-out on {format(bookingRoomData.endDate, 'yyyy-MM-dd')} at 5PM</div>
              {bookingRoomData.breakfastIncluded && <div>You will be served breakfast each day at 8PM</div>}
            </div>
            <div className="text-lg font-bold">Total Price: {splitNumber(bookingRoomData.totalPrice)} VND</div>
          </div>

          <Button onClick={handlePayment} disabled={isLoading} className="mt-4">
            {isLoading ? 'Process Payment ...' : 'Pay Now'}
          </Button>
        </>
      ) : (
        <div>No Booking Found</div>
      )}
    </div>
  );
}
