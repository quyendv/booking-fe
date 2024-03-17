import { HotelSchema } from '~/apis/hotel.api';
import HotelCard from './HotelCard';

interface HotelListProps {
  hotels: HotelSchema[];
}

export default function HotelList({ hotels }: HotelListProps) {
  return (
    <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {hotels.map((hotel, index) => (
        <HotelCard key={index} hotel={hotel} />
      ))}
    </div>
  );
}
