'use client';

import useSWR from 'swr';
import { hotelEndpoints } from '~/apis/hotel.api';
import { axiosPrivateInstance } from '~/apis/instances/axios.instance';
import useHotel from '~/hooks/useHotel';

interface HotelDetailsProps {
  params: { id: string };
}

export default function HotelDetails({ params }: HotelDetailsProps) {
  const { isLoading, data, error } = useHotel(+params.id);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Oops! Hotel with given id not found</div>;

  return <div>page</div>;
}
