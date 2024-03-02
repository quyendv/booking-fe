'use client';

import HotelForm from '~/components/layouts/hotels/HotelForm';
import useMyHotel from '~/hooks/useMyHotel';

interface MyHotelPageProps {}

const MyHotelPage = ({}: MyHotelPageProps) => {
  const { isLoading, data, error, mutate } = useMyHotel();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Hotel not found</div>;

  return <HotelForm hotel={data} mutateHotel={mutate} />;
};

export default MyHotelPage;
