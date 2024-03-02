import { create } from 'zustand';
import { RoomSchema } from '~/apis/hotel.api';
import { persist } from 'zustand/middleware';

interface BookingRoomData {
  bookingRoomData: RoomDataType | null;
  paymentIntent: string | null;
  clientSecret: string | undefined;
  setRoomData: (data: RoomDataType) => void;
  setPaymentIntent: (paymentIntent: string) => void;
  setClientSecret: (clientSecret: string) => void;
  resetBookingRoom: () => void;
}

type RoomDataType = {
  room: RoomSchema;
  totalPrice: number;
  breakfastIncluded: boolean;
  startDate: Date;
  endDate: Date;
};

const useBookRoom = create<BookingRoomData>()(
  persist(
    (set) => ({
      bookingRoomData: null,
      paymentIntent: null,
      clientSecret: undefined,
      setRoomData: (data: RoomDataType) => set({ bookingRoomData: data }),
      setClientSecret: (clientSecret: string) => set({ clientSecret }),
      setPaymentIntent: (paymentIntent: string) => set({ paymentIntent }),
      resetBookingRoom: () => set({ bookingRoomData: null, paymentIntent: null, clientSecret: undefined }),
    }),
    { name: 'BookRoom' },
  ),
);

export default useBookRoom;
