'use client';

import HotelDetails from '~/components/layouts/hotels/HotelDetails';
import useHotel from '~/hooks/useHotel';

interface HotelDetailsProps {
  params: { id: string };
}

export default function HotelDetailsPage({ params }: HotelDetailsProps) {
  const { isLoading, data, error } = useHotel(+params.id);
  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Oops! Hotel with given id not found</div>;

  return <HotelDetails hotel={data} />;
}
