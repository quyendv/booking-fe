import { getCookie } from 'cookies-next';
import { axiosPrivateInstance } from './instances/axios.instance';
import { LocaleConfig } from '~/configs/locale.config';

const bookingEndpoints = {
  create: '/bookings',
  list: '/bookings',
  createVnpayPaymentURL: '/bookings/payment/vnpay',
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

  async createVnpayPaymentUrl(bookingId: string) {
    return await axiosPrivateInstance.post<{ status: 'success' | 'failure' | 'error'; data: string }>(
      bookingEndpoints.createVnpayPaymentURL,
      {
        bookingId,
        locale: getCookie('NEXT_LOCALE') ?? LocaleConfig.defaultLocale,
        // bankCode: 'VNBANK',
      },
    );
  },
};
