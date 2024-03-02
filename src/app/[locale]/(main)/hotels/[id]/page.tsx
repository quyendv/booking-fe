'use client';

import HotelDetails from '~/components/layouts/hotels/HotelDetails';
import useHotel from '~/hooks/useHotel';

interface HotelDetailsProps {
  params: { id: string };
}

export default function HotelDetailsPage({ params }: HotelDetailsProps) {
  // const { isLoading, data, error } = useHotel(+params.id);
  // if (isLoading) return <div>Loading...</div>;
  // if (error || !data) return <div>Oops! Hotel with given id not found</div>;

  const data: any = {
    createdAt: '2024-02-26T17:22:05.767Z',
    updatedAt: '2024-03-02T07:26:00.196Z',
    deletedAt: null,
    id: 47,
    email: 'hotel@gmail.com',
    name: 'Hotel Demo',
    description: 'A beautiful hotel with many amenities',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/booking-care-v1.appspot.com/o/hotels%2F1708968117517-pexels-pixabay-164595.jpg?alt=media&token=721eb6eb-4672-440c-853c-db0c1c85a788',
    imageKey: 'hotels/1708968117517-pexels-pixabay-164595.jpg',
    gallery: [
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/373611573.jpg?k=9f5c42204ea1beae51b3ddb1317a43a3ce4023acf85bf7a065ed9c2719855ba5&o=&hp=1',
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/206190396.jpg?k=03b2072e79c3c1d417f9841a124ef112f35bcdd9771fde0e0565ea91fa66adae&o=&hp=1',
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/373610554.jpg?k=8d70b397dbd50aeebdc59fc47988065618f79e0d94e7477f58d45be6ff78e55a&o=&hp=1',
      },
    ],
    gym: true,
    bar: true,
    restaurant: true,
    freeParking: true,
    movieNight: true,
    coffeeShop: true,
    spa: true,
    laundry: true,
    shopping: true,
    bikeRental: true,
    swimmingPool: true,
    rooms: [
      {
        createdAt: '2024-02-28T15:06:14.681Z',
        updatedAt: '2024-03-02T07:26:09.735Z',
        deletedAt: null,
        id: 108,
        title: 'Room 2',
        description: 'Description...123',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/booking-care-v1.appspot.com/o/hotels%2F1709132147836-pexels-pixabay-164595.jpg?alt=media&token=8f54238e-4fc5-4555-8e34-c0c78062c565',
        imageKey: 'hotels/1709132147836-pexels-pixabay-164595.jpg',
        gallery: [],
        bedCount: 4,
        guestCount: 10,
        bathroomCount: 2,
        kingBed: 1,
        queenBed: 3,
        breakFastPrice: 200000,
        roomPrice: 1000000,
        roomService: true,
        tv: true,
        balcony: true,
        freeWifi: true,
        cityView: true,
        oceanView: true,
        forestView: true,
        mountainView: true,
        airCondition: true,
        soundProofed: true,
        hotelId: 47,
      },
      {
        createdAt: '2024-02-28T17:45:16.382Z',
        updatedAt: '2024-03-02T07:26:29.717Z',
        deletedAt: null,
        id: 112,
        title: 'Room 1',
        description: 'description.....',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/booking-care-v1.appspot.com/o/rooms%2F1709142294392-389604482.jpg?alt=media&token=27d8a7c2-3c1a-415a-aa45-9b06ecb733fd',
        imageKey: 'rooms/1709142294392-389604482.jpg',
        gallery: [],
        bedCount: 1,
        guestCount: 1,
        bathroomCount: 1,
        kingBed: 0,
        queenBed: 0,
        breakFastPrice: 0,
        roomPrice: 1000000,
        roomService: false,
        tv: false,
        balcony: true,
        freeWifi: false,
        cityView: true,
        oceanView: true,
        forestView: true,
        mountainView: false,
        airCondition: false,
        soundProofed: false,
        hotelId: 47,
      },
    ],
    address: {
      createdAt: '2024-02-26T17:22:05.767Z',
      updatedAt: '2024-02-28T17:40:49.094Z',
      deletedAt: null,
      id: 7,
      details: 'Đường 1234',
      ward: 'Xuan La',
      district: 'Tay Ho',
      province: 'Ha Noi',
      country: 'Viet Nam',
    },
  };
  return <HotelDetails hotel={data} />;
}
