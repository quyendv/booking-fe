import useSWRImmutable from 'swr/immutable';
import { HotelSchema, hotelEndpoints } from '~/apis/hotel.api';
import { FetchInstance } from '~/apis/instances/fetch.instance';

export default function useHotel(id: number) {
  const fetcher = (url: string) => new FetchInstance<HotelSchema>().fetcher(url, 'GET');
  return useSWRImmutable(hotelEndpoints.getById(id), fetcher);
}
