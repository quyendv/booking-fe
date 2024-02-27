'use client';

import { HotelApi } from '~/apis/hotel.api';
import HotelForm from '~/components/layouts/hotels/HotelForm';

interface EditHotelPageProps {
  params: {
    locale: string;
    id: string;
  };
}

// nextjs.org/docs/app/api-reference/functions/use-params
// nextjs.org/docs/app/building-your-application/routing/dynamic-routes
// use "fetch" instead of "axios" to get data from server

const EditHotelPage = ({ params }: EditHotelPageProps) => {
  const { isLoading, data, error } = HotelApi.useHotel(+params.id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Hotel not found</div>;

  return <HotelForm hotel={data} />;
};

export default EditHotelPage;
