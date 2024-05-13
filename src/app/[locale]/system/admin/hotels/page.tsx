'use client';

import Image from 'next/image';
import { HotelSchema } from '~/apis/hotel.api';
import { routeConfig } from '~/configs/route.config';
import { useIRouter } from '~/locales/i18nNavigation';
import { convertPriceToString } from '~/utils/common.util';
import { cn } from '~/utils/ui.util';

interface ListHotelProps {}

export default function ListHotel({}: ListHotelProps) {
  // return <div>List Hotel</div>;
  const data: HotelSchema[] = [
    {
      id: 46,
      email: 'hotel1@gmail.com',
      name: 'Hotel Demo 1',
      description: 'A beautiful hotel',
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/booking-care-v1.appspot.com/o/hotels%2F1709366194913-khu-ngh%25E1%25BB%2589-d%25C6%25B0%25E1%25BB%25A1ng-sang-tr%25E1%25BB%258Dng.jpg-1709366194913?alt=media&token=0c701d43-ebf6-4048-b18b-6afaaefb6ece',
      imageKey: 'hotels/1709366194913-khu-ngh%E1%BB%89-d%C6%B0%E1%BB%A1ng-sang-tr%E1%BB%8Dng.jpg-1709366194913',
      gallery: [
        {
          url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/206188898.jpg?k=71f294fd8cd0c915e43d82eea26666b7572097a054b57e43aecabb81d7ac74dc&o=&hp=1',
        },
        {
          url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/373610310.jpg?k=4618c9c5bcfa89f5948b91d931908eba4f64bad0478315a2c44890ef1e0c2677&o=&hp=1',
        },
        {
          url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/206190396.jpg?k=03b2072e79c3c1d417f9841a124ef112f35bcdd9771fde0e0565ea91fa66adae&o=&hp=1',
        },
      ],
      gym: true,
      bar: true,
      restaurant: true,
      freeParking: true,
      movieNight: false,
      coffeeShop: true,
      spa: false,
      laundry: true,
      shopping: false,
      bikeRental: true,
      swimmingPool: true,
      allowPets: false,
      allowSmoking: false,
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
      rooms: [],
      address: {
        id: 6,
        details: 'Bãi biển Mỹ Khuê',
        ward: null,
        district: null,
        province: 'Đà Nẵng',
        country: 'Việt Nam',
      },
    },
    {
      id: 50,
      email: 'hotel5@gmail.com',
      name: 'Hotel ABC',
      description: 'A beautiful hotel',
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/booking-care-v1.appspot.com/o/hotels%2F1712767352950-2c8f59fc-ec00-4eae-ab5f-684fd1168b4e.jpeg-1712767352054?alt=media&token=db998a64-94be-48d6-9a89-d9ad2cf5f8f3',
      imageKey: 'hotels/1712767352950-2c8f59fc-ec00-4eae-ab5f-684fd1168b4e.jpeg-1712767352054',
      gallery: [
        {
          url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/206188898.jpg?k=71f294fd8cd0c915e43d82eea26666b7572097a054b57e43aecabb81d7ac74dc&o=&hp=1',
        },
        {
          url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/373610310.jpg?k=4618c9c5bcfa89f5948b91d931908eba4f64bad0478315a2c44890ef1e0c2677&o=&hp=1',
        },
        {
          url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/206190396.jpg?k=03b2072e79c3c1d417f9841a124ef112f35bcdd9771fde0e0565ea91fa66adae&o=&hp=1',
        },
      ],
      gym: true,
      bar: true,
      restaurant: true,
      freeParking: true,
      movieNight: false,
      coffeeShop: true,
      spa: false,
      laundry: true,
      shopping: false,
      bikeRental: true,
      swimmingPool: true,
      allowPets: true,
      allowSmoking: true,
      timeRules: {
        checkIn: {
          end: '21:00',
          start: '14:00',
        },
        checkOut: {
          end: '12:00',
          start: '12:00',
        },
        timezone: 7,
      },
      rooms: [],
      address: {
        id: 41,
        details: 'Bãi biển Mỹ Khuê',
        ward: null,
        district: null,
        province: 'Đà Nẵng',
        country: 'Việt Nam',
      },
    },
    {
      id: 48,
      email: 'hotel2@gmail.com',
      name: 'Hotel Demo 002',
      description: 'A beautiful hotel',
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/booking-care-v1.appspot.com/o/hotels%2F1712768120996-e7e7925f-e9fd-4538-bf7f-ac5ca9d101c7.jpeg-1712768120995?alt=media&token=33dc282c-bbe4-4545-94d9-2207574eb53a',
      imageKey: 'hotels/1712768120996-e7e7925f-e9fd-4538-bf7f-ac5ca9d101c7.jpeg-1712768120995',
      gallery: [
        {
          url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/206188898.jpg?k=71f294fd8cd0c915e43d82eea26666b7572097a054b57e43aecabb81d7ac74dc&o=&hp=1',
        },
        {
          url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/373610310.jpg?k=4618c9c5bcfa89f5948b91d931908eba4f64bad0478315a2c44890ef1e0c2677&o=&hp=1',
        },
        {
          url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/206190396.jpg?k=03b2072e79c3c1d417f9841a124ef112f35bcdd9771fde0e0565ea91fa66adae&o=&hp=1',
        },
      ],
      gym: true,
      bar: true,
      restaurant: true,
      freeParking: true,
      movieNight: false,
      coffeeShop: true,
      spa: false,
      laundry: true,
      shopping: false,
      bikeRental: true,
      swimmingPool: true,
      allowPets: false,
      allowSmoking: false,
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
      rooms: [],
      address: {
        id: 31,
        details: 'Bãi biển Mỹ Khuê',
        ward: null,
        district: null,
        province: 'Đà Nẵng',
        country: 'Việt Nam',
      },
    },
    {
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
      address: {
        id: 7,
        details: '1234 Street',
        ward: null,
        district: 'Tay Ho',
        province: 'Ha Noi',
        country: 'Viet Nam',
      },
    },
  ] as any;

  const router = useIRouter();
  // const pathname = useIPathname();

  return (
    <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((hotel, index) => (
        <div
          // onClick={() => !isMyHotel && router.push(routeConfig.HOTEL_DETAILS(hotel.id))}
          onClick={() => router.push(routeConfig.A_MANAGE_HOTEL_DETAILS(hotel.id))}
          className={cn('relative z-0 col-span-1 cursor-pointer transition hover:scale-105', 'cursor-default')}
          key={index}
        >
          <div className="flex flex-col gap-2 rounded-lg border border-primary/10 bg-background/50">
            <div className="relative aspect-square h-[210px] w-full flex-1 overflow-hidden rounded-s-lg">
              <Image
                fill
                /* need position in parent */ src={hotel.imageUrl}
                alt={hotel.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex h-[210px] flex-1 flex-col justify-between gap-1 px-1 py-2 text-sm">
              <h3 className="text-xl font-semibold">{hotel.name}</h3>
              <div className="text-primary/90">{hotel.description.slice(0, 45)}...</div>
              {/* <div className="space-y-1 text-primary/90">
              <AmenityItem>
                <MapPin className="size-4" /> {hotel.address.country}, {hotel.address.province}
              </AmenityItem>
              {hotel.swimmingPool && (
                <AmenityItem>
                  <FaSwimmer size={18} />
                  {t('HotelForm.label.swimmingPool')}
                </AmenityItem>
              )}
              {hotel.gym && (
                <AmenityItem>
                  <Dumbbell className="size-4" />
                  {t('HotelForm.label.gym')}
                </AmenityItem>
              )}
            </div> */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {hotel.rooms.length > 0 && (
                    <>
                      <span className="text-base font-semibold">{convertPriceToString(hotel.rooms[0].roomPrice)}</span>{' '}
                      <span className="text-sm text-primary/70">VND/per night</span>
                    </>
                  )}
                </div>
                {/* {isMyHotel && (
                <Button onClick={() => router.push(routeConfig.MY_HOTEL)} variant="outline">
                  {t('HotelForm.button.edit')}
                </Button>
              )} */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
