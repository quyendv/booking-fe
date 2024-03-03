'use client';

import HotelList from '~/components/layouts/hotels/HotelList';
import useHotels from '~/hooks/useHotels';

interface HotelPageProps {
  searchParams: {
    name: string;
    country: string;
    province: string;
    district: string;
  };
}

function HotelPage({}: HotelPageProps) {
  const { isLoading, data, error } = useHotels(); // filter search params
  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Oops! No hotels found</div>;

  return <HotelList hotels={data} />;
}

export default HotelPage;
