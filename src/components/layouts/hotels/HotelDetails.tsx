import { HotelSchema } from '~/apis/hotel.api';

interface HotelDetailsProps {
  hotel: HotelSchema;
}

export default function HotelDetails({}: HotelDetailsProps) {
  return <div>Hotel</div>;
}
