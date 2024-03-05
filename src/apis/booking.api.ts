import { axiosPrivateInstance } from './instances/axios.instance';

const bookingEndpoints = {
  create: '/bookings',
  list: '/bookings',
};

export type CreateBookingDto = {
  roomId: number;
  hotelId: number;
  startDate: string;
  endDate: string;
  breakFastIncluded: boolean;
  totalPrice: number;
  currency?: 'VND';
  paymentChannel?: 'vn_pay';
};

export type BookingSchema = {
  id: string;
  customerName: string;
  customerEmail: string;
  hotelOwnerEmail: string;
  startDate: string;
  endDate: string;
  breakFastIncluded: boolean;
  currency: 'VND';
  totalPrice: number;
  isPaid: boolean;
  paymentChannel: 'vn_pay';
  paymentId: string; // Payment gateway's payment id
  paymentInfo: any;
  createdAt: string;
  roomId: number;
  hotelId: number;
};

export const BookingApi = {
  async create(dto: CreateBookingDto) {
    return await axiosPrivateInstance.post<BookingSchema>(bookingEndpoints.create, dto);
  },
};
