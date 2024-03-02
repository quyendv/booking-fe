import { HotelApi } from '~/apis/hotel.api';
import HotelList from '~/components/layouts/hotels/HotelList';

interface HotelPageProps {
  searchParams: {
    name: string;
    country: string;
    province: string;
    district: string;
  };
}

async function HotelPage({}: HotelPageProps) {
  const { isSuccess, data } = await HotelApi.listHotels(); // TODO: filter search params
  if (!isSuccess) return <div>Error when fetch hotels</div>;

  return <HotelList hotels={data} />;
}

export default HotelPage;
