import { HotelSchema } from '~/apis/hotel.api';

export function isFavoriteHotel(data: HotelSchema[], hotel: HotelSchema): boolean {
  console.log(data, hotel.id, data && data.find((item) => item.id === hotel.id));
  return !!(data && data.find((item) => item.id === hotel.id));
}
