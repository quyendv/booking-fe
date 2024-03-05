export const routeConfig = {
  HOME: '/',
  ABOUT: '/about',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  VERIFY_EMAIL: '/verify-email',

  HOTELS: '/hotels',
  HOTEL_DETAILS: (hotelId: number) => `/hotels/${hotelId}`,
  BOOK_ROOM: '/book-room',

  MANAGE_ACCOUNT: '/personal',
  MY_BOOKING: '/my-booking',
  MY_TRIPS: '/my-trips',
  SAVED: '/saved',

  DASHBOARD: '/system/admin/dashboard',
  MANAGE_CUSTOMERS: '/system/admin/customers',
  MANAGE_HOTELS: (hotelId: number) => `/system/admin/hotels/${hotelId}`,
  SYSTEM_HOTEL_DETAILS: (hotelId: number) => `/system/admin/hotel-details/${hotelId}`,

  MY_HOTEL: '/system/hotel',
};
