'use client';

import HotelDetails from '~/components/layouts/hotels/HotelDetails';
import useHotel from '~/hooks/useHotel';
import useHotelReviews from '~/hooks/useHotelReviews';

interface HotelDetailsProps {
  params: { id: string };
}

export default function HotelDetailsPage({ params }: HotelDetailsProps) {
  // const hotelResponse = useHotel(+params.id);
  // const reviewsResponse = useHotelReviews(+params.id);

  // if (hotelResponse.isLoading || reviewsResponse.isLoading) return <div>Loading...</div>;
  // if (hotelResponse.error || reviewsResponse.error || !hotelResponse.data || !reviewsResponse.data) {
  //   return <div>Oops! Hotel with given id not found</div>;
  // }

  // return <HotelDetails hotel={hotelResponse.data} reviews={reviewsResponse.data} />;
  const { hotel, reviews }: { hotel: any; reviews: any[] } = newFunction();
  return <HotelDetails hotel={hotel} reviews={reviews} />;

  function newFunction() {
    const hotel: any = {
      id: 47,
      email: 'hotel@gmail.com',
      name: 'Villa Orca',
      description:
        'A protected forest surrounds this villa in tropical Thailand, creating a sense of serenity. Azure waves gently lull in the distance as the infinity pool melts into the horizon. There are plenty of local attractions mere minutes away, from Big Buddha Temple to Chaweng. Settle in at a roadside eatery for a taste of local street food. The honey-hued shore at Choeng Mon Beach is just a 2-minute drive.',
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/booking-care-v1.appspot.com/o/hotels%2F1709366194913-khu-ngh%25E1%25BB%2589-d%25C6%25B0%25E1%25BB%25A1ng-sang-tr%25E1%25BB%258Dng.jpg-1709366194913?alt=media&token=0c701d43-ebf6-4048-b18b-6afaaefb6ece',
      imageKey: 'hotels/1709441288513-492855323.jpg',
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
        {
          key: 'hotels/1712255944878-h3-rev-img-1.jpg-1712255944877',
          url: 'https://firebasestorage.googleapis.com/v0/b/booking-care-v1.appspot.com/o/hotels%2F1712255944878-h3-rev-img-1.jpg-1712255944877?alt=media&token=e291bb27-6f53-4ac6-88be-f5c1eae09e93',
        },
        {
          key: 'hotels/1712255990522-h3-img-08-520x787.jpg-1712255990522',
          url: 'https://firebasestorage.googleapis.com/v0/b/booking-care-v1.appspot.com/o/hotels%2F1712255990522-h3-img-08-520x787.jpg-1712255990522?alt=media&token=339f9322-ea92-4022-b4d7-0ea391c47d0e',
        },
        {
          key: 'hotels/1712256093017-room-single-img-04.jpg-1712256093016',
          url: 'https://firebasestorage.googleapis.com/v0/b/booking-care-v1.appspot.com/o/hotels%2F1712256093017-room-single-img-04.jpg-1712256093016?alt=media&token=01110008-60bd-4bc3-bd57-89474137cebd',
        },
        {
          key: 'hotels/1712260455994-373612224.jpg-1712260455989',
          url: 'https://firebasestorage.googleapis.com/v0/b/booking-care-v1.appspot.com/o/hotels%2F1712260455994-373612224.jpg-1712260455989?alt=media&token=84d3ce4d-b728-431a-9e3e-1fd61d6665ef',
        },
        {
          key: 'hotels/1712260493066-374736747.jpg-1712260493066',
          url: 'https://firebasestorage.googleapis.com/v0/b/booking-care-v1.appspot.com/o/hotels%2F1712260493066-374736747.jpg-1712260493066?alt=media&token=9740930d-60da-41c2-a0b2-746e0fc22f0e',
        },
        {
          key: 'hotels/1712260545047-206190396.jpg-1712260545046',
          url: 'https://firebasestorage.googleapis.com/v0/b/booking-care-v1.appspot.com/o/hotels%2F1712260545047-206190396.jpg-1712260545046?alt=media&token=13022090-1e13-4663-a58c-924305882d10',
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
      allowPets: true,
      allowSmoking: true,
      timeRules: {
        checkIn: {
          end: '23:00',
          start: '14:00',
        },
        checkOut: {
          end: '12:00',
          start: '08:00',
        },
        timezone: 7,
      },
      rooms: [
        {
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
        },
        {
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
        },
      ],
      bookings: [
        {
          createdAt: '2024-03-09T14:50:40.672Z',
          id: '83df6c24-7d0e-445d-ae22-d4dfdf721d72',
          customerName: 'izanagi',
          hotelOwnerEmail: 'hotel@gmail.com',
          startDate: '2024-03-22',
          timeRules: {
            checkIn: {
              end: '',
              start: '',
            },
            checkOut: {
              end: '',
              start: '',
            },
            timezone: 7,
          },
          endDate: '2024-03-23',
          breakFastIncluded: false,
          currency: 'VND',
          totalPrice: 1000000,
          isPaid: true,
          paymentChannel: 'vn_pay',
          paymentId: 'vn_pay_izanagi.gameacc45_1709995840668',
          status: 'checked_in',
          roomId: 108,
          hotelId: 47,
          customerEmail: 'izanagi.gameacc45@gmail.com',
        },
        {
          createdAt: '2024-03-09T15:35:49.713Z',
          id: '652ec688-0d45-4bbd-b592-e4102de6afda',
          customerName: 'izanagi',
          hotelOwnerEmail: 'hotel@gmail.com',
          startDate: '2024-03-14',
          timeRules: {
            checkIn: {
              end: '23:00',
              start: '14:00',
            },
            checkOut: {
              end: '12:00',
              start: '08:00',
            },
            timezone: 7,
          },
          endDate: '2024-03-15',
          breakFastIncluded: true,
          currency: 'VND',
          totalPrice: 1200000,
          isPaid: true,
          paymentChannel: 'vn_pay',
          paymentId: 'vn_pay_izanagi.gameacc45_1709998549712',
          status: 'checked_out',
          roomId: 108,
          hotelId: 47,
          customerEmail: 'izanagi.gameacc45@gmail.com',
        },
        {
          createdAt: '2024-03-09T15:45:17.372Z',
          id: 'c3c5eeb6-d5be-4132-813b-93fac7c900f2',
          customerName: 'izanagi',
          hotelOwnerEmail: 'hotel@gmail.com',
          startDate: '2024-03-16',
          timeRules: {
            checkIn: {
              end: '',
              start: '',
            },
            checkOut: {
              end: '',
              start: '',
            },
            timezone: 7,
          },
          endDate: '2024-03-17',
          breakFastIncluded: true,
          currency: 'VND',
          totalPrice: 1200000,
          isPaid: true,
          paymentChannel: 'vn_pay',
          paymentId: 'vn_pay_izanagi.gameacc45_1709999117371',
          status: 'reviewed',
          roomId: 108,
          hotelId: 47,
          customerEmail: 'izanagi.gameacc45@gmail.com',
        },
        {
          createdAt: '2024-03-05T16:41:20.920Z',
          id: 'd1ead860-4c4b-4103-9055-988cfdd04271',
          customerName: 'izanagi',
          hotelOwnerEmail: 'hotel@gmail.com',
          startDate: '2024-03-05',
          timeRules: {
            checkIn: {
              end: '',
              start: '',
            },
            checkOut: {
              end: '',
              start: '',
            },
            timezone: 7,
          },
          endDate: '2024-03-05',
          breakFastIncluded: true,
          currency: 'VND',
          totalPrice: 1200000,
          isPaid: false,
          paymentChannel: 'vn_pay',
          paymentId: 'vn_pay_izanagi.gameacc45_1709656880912',
          status: 'pending',
          roomId: 108,
          hotelId: 47,
          customerEmail: 'izanagi.gameacc45@gmail.com',
        },
        {
          createdAt: '2024-03-06T14:35:16.146Z',
          id: '164f4ac9-0bfc-4ada-9f7c-2a4e5579b3c5',
          customerName: 'izanagi',
          hotelOwnerEmail: 'hotel@gmail.com',
          startDate: '2024-03-12',
          timeRules: {
            checkIn: {
              end: '',
              start: '',
            },
            checkOut: {
              end: '',
              start: '',
            },
            timezone: 7,
          },
          endDate: '2024-03-13',
          breakFastIncluded: true,
          currency: 'VND',
          totalPrice: 1200000,
          isPaid: false,
          paymentChannel: 'vn_pay',
          paymentId: 'vn_pay_izanagi.gameacc45_1709735716135',
          status: 'pending',
          roomId: 108,
          hotelId: 47,
          customerEmail: 'izanagi.gameacc45@gmail.com',
        },
        {
          createdAt: '2024-03-05T17:34:07.352Z',
          id: '5a9c5c1d-cfe0-41fb-bb22-5c7d9885cf35',
          customerName: 'izanagi',
          hotelOwnerEmail: 'hotel@gmail.com',
          startDate: '2024-03-11',
          timeRules: {
            checkIn: {
              end: '',
              start: '',
            },
            checkOut: {
              end: '',
              start: '',
            },
            timezone: 7,
          },
          endDate: '2024-03-11',
          breakFastIncluded: true,
          currency: 'VND',
          totalPrice: 1200000,
          isPaid: true,
          paymentChannel: 'vn_pay',
          paymentId: 'vn_pay_izanagi.gameacc45_1709660047351',
          status: 'checked_out',
          roomId: 108,
          hotelId: 47,
          customerEmail: 'izanagi.gameacc45@gmail.com',
        },
        {
          createdAt: '2024-03-05T00:27:50.688Z',
          id: '6911bbe0-8111-42af-b51d-68c392fc815b',
          customerName: 'izanagi',
          hotelOwnerEmail: 'hotel@gmail.com',
          startDate: '2024-03-05',
          timeRules: {
            checkIn: {
              end: '',
              start: '',
            },
            checkOut: {
              end: '',
              start: '',
            },
            timezone: 7,
          },
          endDate: '2024-03-10',
          breakFastIncluded: false,
          currency: 'VND',
          totalPrice: 10000000,
          isPaid: true,
          paymentChannel: 'vn_pay',
          paymentId: 'vn_pay_izanagi.gameacc45_1709598470685',
          status: 'reviewed',
          roomId: 108,
          hotelId: 47,
          customerEmail: 'izanagi.gameacc45@gmail.com',
        },
      ],
      address: {
        id: 7,
        details: '1234 Street',
        ward: null,
        district: 'Tay Ho',
        province: 'Ha Noi',
        country: 'Viet Nam',
      },
    };
    const reviews: any[] = [
      {
        id: '5c99041f-78e3-4814-8207-c1f96c3a4ce1',
        customerName: 'izanagi',
        customerImage:
          'https://firebasestorage.googleapis.com/v0/b/booking-care-v1.appspot.com/o/customers%2Fizanagi.gameacc45-1708199462234-astronaut-WTFWARES.jpg?alt=media&token=0ac00678-49a2-4910-8c1b-d74954f91d7c',
        hotelOwnerEmail: 'hotel@gmail.com',
        staffRating: 5,
        facilityRating: 5,
        cleanlinessRating: 5,
        comfortRating: 5,
        valueForMoneyRating: 5,
        locationRating: 5,
        comment: 'Perfect!!',
        bookingId: 'c3c5eeb6-d5be-4132-813b-93fac7c900f2',
        roomId: 108,
        hotelId: 47,
        customerEmail: 'izanagi.gameacc45@gmail.com',
        total: 5,
      },
      {
        id: '2e286bde-46ad-4561-b88a-4244eac8dce3',
        customerName: 'izanagi',
        customerImage:
          'https://firebasestorage.googleapis.com/v0/b/booking-care-v1.appspot.com/o/customers%2Fizanagi.gameacc45-1708199462234-astronaut-WTFWARES.jpg?alt=media&token=0ac00678-49a2-4910-8c1b-d74954f91d7c',
        hotelOwnerEmail: 'hotel@gmail.com',
        staffRating: 5,
        facilityRating: 5,
        cleanlinessRating: 5,
        comfortRating: 5,
        valueForMoneyRating: 5,
        locationRating: 5,
        comment: 'Perfect!',
        bookingId: '6911bbe0-8111-42af-b51d-68c392fc815b',
        roomId: 108,
        hotelId: 47,
        customerEmail: 'izanagi.gameacc45@gmail.com',
        total: 5,
      },
    ];
    return { hotel, reviews };
  }
}
