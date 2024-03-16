'use client';

import { useTranslations } from 'next-intl';
import { BookingDetails } from '~/apis/booking.api';
import MyBookingCard from '~/components/layouts/booking/MyBookingCard';
import { useAuth } from '~/contexts/auth.context';

interface MyBookingsPageProps {}

export default function MyBookingsPage({}: MyBookingsPageProps) {
  const t = useTranslations('MyBookings');

  const { user } = useAuth();
  // const { isLoading, data, error } = useMyBookings();

  if (!user) return <div>Not authenticated </div>;
  // if (isLoading) return <div>Loading...</div>;
  // if (error || !data) return <div>Error</div>;

  const data = [
    {
      createdAt: '2024-03-09T15:45:17.372Z',
      id: 'c3c5eeb6-d5be-4132-813b-93fac7c900f2',
      customerName: 'izanagi',
      hotelOwnerEmail: 'hotel@gmail.com',
      startDate: '2024-03-16',
      endDate: '2024-03-17',
      breakFastIncluded: true,
      currency: 'VND',
      totalPrice: 1200000,
      isPaid: true,
      paymentChannel: 'vn_pay',
      paymentId: 'vn_pay_izanagi.gameacc45_1709999117371',
      paymentInfo: {
        vnp_Amount: '120000000',
        vnp_TxnRef: 'vn_pay_izanagi.gameacc45_1709999117371',
        vnp_PayDate: '20240309224555',
        vnp_TmnCode: '157760YC',
        vnp_BankCode: 'NCB',
        vnp_CardType: 'ATM',
        vnp_OrderInfo: 'Thanh toan cho ma GD:vn_pay_izanagi.gameacc45_1709999117371',
        vnp_BankTranNo: 'VNP14327170',
        vnp_ResponseCode: '00',
        vnp_TransactionNo: '14327170',
        vnp_TransactionStatus: '00',
      },
      status: 'reviewed',
      roomId: 108,
      hotelId: 47,
      customerEmail: 'izanagi.gameacc45@gmail.com',
      room: {
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
      hotel: {
        id: 47,
        email: 'hotel@gmail.com',
        name: 'Hotel Demo',
        description: 'A beautiful hotel with many amenities',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/booking-care-v1.appspot.com/o/hotels%2F1709441288513-492855323.jpg?alt=media&token=49db4e9d-d68f-4532-be56-019db5af0c16',
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
        address: {
          id: 7,
          details: 'Đường 1234',
          ward: 'Xuan La',
          district: 'Tay Ho',
          province: 'Ha Noi',
          country: 'Viet Nam',
        },
      },
    },
    {
      createdAt: '2024-03-05T16:41:20.920Z',
      id: 'd1ead860-4c4b-4103-9055-988cfdd04271',
      customerName: 'izanagi',
      hotelOwnerEmail: 'hotel@gmail.com',
      startDate: '2024-03-05',
      endDate: '2024-03-05',
      breakFastIncluded: true,
      currency: 'VND',
      totalPrice: 1200000,
      isPaid: false,
      paymentChannel: 'vn_pay',
      paymentId: 'vn_pay_izanagi.gameacc45_1709656880912',
      paymentInfo: null,
      status: 'pending',
      roomId: 108,
      hotelId: 47,
      customerEmail: 'izanagi.gameacc45@gmail.com',
      room: {
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
      hotel: {
        id: 47,
        email: 'hotel@gmail.com',
        name: 'Hotel Demo',
        description: 'A beautiful hotel with many amenities',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/booking-care-v1.appspot.com/o/hotels%2F1709441288513-492855323.jpg?alt=media&token=49db4e9d-d68f-4532-be56-019db5af0c16',
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
        address: {
          id: 7,
          details: 'Đường 1234',
          ward: 'Xuan La',
          district: 'Tay Ho',
          province: 'Ha Noi',
          country: 'Viet Nam',
        },
      },
    },
    {
      createdAt: '2024-03-06T14:35:16.146Z',
      id: '164f4ac9-0bfc-4ada-9f7c-2a4e5579b3c5',
      customerName: 'izanagi',
      hotelOwnerEmail: 'hotel@gmail.com',
      startDate: '2024-03-12',
      endDate: '2024-03-13',
      breakFastIncluded: true,
      currency: 'VND',
      totalPrice: 1200000,
      isPaid: false,
      paymentChannel: 'vn_pay',
      paymentId: 'vn_pay_izanagi.gameacc45_1709735716135',
      paymentInfo: null,
      status: 'pending',
      roomId: 108,
      hotelId: 47,
      customerEmail: 'izanagi.gameacc45@gmail.com',
      room: {
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
      hotel: {
        id: 47,
        email: 'hotel@gmail.com',
        name: 'Hotel Demo',
        description: 'A beautiful hotel with many amenities',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/booking-care-v1.appspot.com/o/hotels%2F1709441288513-492855323.jpg?alt=media&token=49db4e9d-d68f-4532-be56-019db5af0c16',
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
        address: {
          id: 7,
          details: 'Đường 1234',
          ward: 'Xuan La',
          district: 'Tay Ho',
          province: 'Ha Noi',
          country: 'Viet Nam',
        },
      },
    },
    {
      createdAt: '2024-03-05T17:34:07.352Z',
      id: '5a9c5c1d-cfe0-41fb-bb22-5c7d9885cf35',
      customerName: 'izanagi',
      hotelOwnerEmail: 'hotel@gmail.com',
      startDate: '2024-03-11',
      endDate: '2024-03-11',
      breakFastIncluded: true,
      currency: 'VND',
      totalPrice: 1200000,
      isPaid: true,
      paymentChannel: 'vn_pay',
      paymentId: 'vn_pay_izanagi.gameacc45_1709660047351',
      paymentInfo: null,
      status: 'checked_out',
      roomId: 108,
      hotelId: 47,
      customerEmail: 'izanagi.gameacc45@gmail.com',
      room: {
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
      hotel: {
        id: 47,
        email: 'hotel@gmail.com',
        name: 'Hotel Demo',
        description: 'A beautiful hotel with many amenities',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/booking-care-v1.appspot.com/o/hotels%2F1709441288513-492855323.jpg?alt=media&token=49db4e9d-d68f-4532-be56-019db5af0c16',
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
        address: {
          id: 7,
          details: 'Đường 1234',
          ward: 'Xuan La',
          district: 'Tay Ho',
          province: 'Ha Noi',
          country: 'Viet Nam',
        },
      },
    },
    {
      createdAt: '2024-03-05T00:27:50.688Z',
      id: '6911bbe0-8111-42af-b51d-68c392fc815b',
      customerName: 'izanagi',
      hotelOwnerEmail: 'hotel@gmail.com',
      startDate: '2024-03-05',
      endDate: '2024-03-10',
      breakFastIncluded: false,
      currency: 'VND',
      totalPrice: 10000000,
      isPaid: true,
      paymentChannel: 'vn_pay',
      paymentId: 'vn_pay_izanagi.gameacc45_1709598470685',
      paymentInfo: null,
      status: 'checked_out',
      roomId: 108,
      hotelId: 47,
      customerEmail: 'izanagi.gameacc45@gmail.com',
      room: {
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
      hotel: {
        id: 47,
        email: 'hotel@gmail.com',
        name: 'Hotel Demo',
        description: 'A beautiful hotel with many amenities',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/booking-care-v1.appspot.com/o/hotels%2F1709441288513-492855323.jpg?alt=media&token=49db4e9d-d68f-4532-be56-019db5af0c16',
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
        address: {
          id: 7,
          details: 'Đường 1234',
          ward: 'Xuan La',
          district: 'Tay Ho',
          province: 'Ha Noi',
          country: 'Viet Nam',
        },
      },
    },
    {
      createdAt: '2024-03-09T14:50:40.672Z',
      id: '83df6c24-7d0e-445d-ae22-d4dfdf721d72',
      customerName: 'izanagi',
      hotelOwnerEmail: 'hotel@gmail.com',
      startDate: '2024-03-22',
      endDate: '2024-03-23',
      breakFastIncluded: false,
      currency: 'VND',
      totalPrice: 1000000,
      isPaid: true,
      paymentChannel: 'vn_pay',
      paymentId: 'vn_pay_izanagi.gameacc45_1709995840668',
      paymentInfo: {
        vnp_Amount: '100000000',
        vnp_TxnRef: 'vn_pay_izanagi.gameacc45_1709995840668',
        vnp_PayDate: '20240309215133',
        vnp_TmnCode: '157760YC',
        vnp_BankCode: 'NCB',
        vnp_CardType: 'ATM',
        vnp_OrderInfo: 'Thanh toan cho ma GD:vn_pay_izanagi.gameacc45_1709995840668',
        vnp_BankTranNo: 'VNP14327076',
        vnp_ResponseCode: '00',
        vnp_TransactionNo: '14327076',
        vnp_TransactionStatus: '00',
      },
      status: 'booked',
      roomId: 108,
      hotelId: 47,
      customerEmail: 'izanagi.gameacc45@gmail.com',
      room: {
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
      hotel: {
        id: 47,
        email: 'hotel@gmail.com',
        name: 'Hotel Demo',
        description: 'A beautiful hotel with many amenities',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/booking-care-v1.appspot.com/o/hotels%2F1709441288513-492855323.jpg?alt=media&token=49db4e9d-d68f-4532-be56-019db5af0c16',
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
        address: {
          id: 7,
          details: 'Đường 1234',
          ward: 'Xuan La',
          district: 'Tay Ho',
          province: 'Ha Noi',
          country: 'Viet Nam',
        },
      },
    },
    {
      createdAt: '2024-03-09T15:35:49.713Z',
      id: '652ec688-0d45-4bbd-b592-e4102de6afda',
      customerName: 'izanagi',
      hotelOwnerEmail: 'hotel@gmail.com',
      startDate: '2024-03-14',
      endDate: '2024-03-15',
      breakFastIncluded: true,
      currency: 'VND',
      totalPrice: 1200000,
      isPaid: true,
      paymentChannel: 'vn_pay',
      paymentId: 'vn_pay_izanagi.gameacc45_1709998549712',
      paymentInfo: {
        vnp_Amount: '120000000',
        vnp_TxnRef: 'vn_pay_izanagi.gameacc45_1709998549712',
        vnp_PayDate: '20240309223614',
        vnp_TmnCode: '157760YC',
        vnp_BankCode: 'NCB',
        vnp_CardType: 'ATM',
        vnp_OrderInfo: 'Thanh toan cho ma GD:vn_pay_izanagi.gameacc45_1709998549712',
        vnp_BankTranNo: 'VNP14327151',
        vnp_ResponseCode: '00',
        vnp_TransactionNo: '14327151',
        vnp_TransactionStatus: '00',
      },
      status: 'booked',
      roomId: 108,
      hotelId: 47,
      customerEmail: 'izanagi.gameacc45@gmail.com',
      room: {
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
      hotel: {
        id: 47,
        email: 'hotel@gmail.com',
        name: 'Hotel Demo',
        description: 'A beautiful hotel with many amenities',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/booking-care-v1.appspot.com/o/hotels%2F1709441288513-492855323.jpg?alt=media&token=49db4e9d-d68f-4532-be56-019db5af0c16',
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
        address: {
          id: 7,
          details: 'Đường 1234',
          ward: 'Xuan La',
          district: 'Tay Ho',
          province: 'Ha Noi',
          country: 'Viet Nam',
        },
      },
    },
  ] as any as BookingDetails[];

  return (
    <div className="flex flex-col gap-10">
      <h2 className="mb-6 mt-2 text-xl font-semibold md:text-2xl">{t('title', { role: user?.role })}</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {data.map((item) => (
          <MyBookingCard key={item.id} booking={item} />
        ))}
      </div>
    </div>
  );
}
