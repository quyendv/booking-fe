import { create } from 'zustand';
import { RoomSchema } from '~/apis/hotel.api';
import { persist } from 'zustand/middleware';

interface BookingRoomData {
  bookingRoomData: RoomDataType | null;
  paymentIntentId: string | null;
  // clientSecret: string | undefined;
  setBookingRoomData: (data: RoomDataType) => void;
  setPaymentIntentId: (paymentIntent: string) => void;
  // setClientSecret: (clientSecret: string) => void;
  resetBookingRoom: () => void;
}

type RoomDataType = {
  room: RoomSchema;
  totalPrice: number;
  breakfastIncluded: boolean;
  startDate: Date;
  endDate: Date;
  bookingId: string;
};

const useBookRoom = create<BookingRoomData>()(
  persist(
    (set) => ({
      bookingRoomData: null,
      paymentIntentId: null,
      // clientSecret: undefined,
      setBookingRoomData: (data: RoomDataType) => set({ bookingRoomData: data }),
      // setClientSecret: (clientSecret: string) => set({ clientSecret }),
      setPaymentIntentId: (paymentIntentId: string) => set({ paymentIntentId }),
      resetBookingRoom: () => set({ bookingRoomData: null, paymentIntentId: null /* clientSecret: undefined */ }),
    }),
    { name: 'BookRoom' },
  ),
);

export default useBookRoom;
