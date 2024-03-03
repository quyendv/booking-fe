import useSWR from 'swr';
import { HotelSchema, hotelEndpoints } from '~/apis/hotel.api';
import { PrivateFetchInstance } from '~/apis/instances/fetch.instance';

export default function useHotels() {
  const fetcher = (url: string) => new PrivateFetchInstance<HotelSchema[]>().fetcher(url, 'GET');
  const { isLoading, data, error, mutate } = useSWR(hotelEndpoints.list, fetcher);
  return { isLoading, data, error, mutate };
}
