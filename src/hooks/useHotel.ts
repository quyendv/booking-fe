import useSWRImmutable from 'swr/immutable';
import { HotelSchemaWithBookings, hotelEndpoints } from '~/apis/hotel.api';
import { PrivateFetchInstance } from '~/apis/instances/fetch.instance';

export default function useHotel(id: number) {
  const fetcher = (url: string) => new PrivateFetchInstance<HotelSchemaWithBookings>().fetcher(url, 'GET');
  // const { isLoading, data, error } = useSWR(hotelEndpoints.getById(id), fetcher);
  const { isLoading, data, error, mutate } = useSWRImmutable(hotelEndpoints.getById(id), fetcher);
  return { isLoading, data, error, mutate };
}
