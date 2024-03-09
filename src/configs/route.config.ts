export const routeConfig = {
  // Common
  HOME: '/',
  ABOUT: '/about',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  VERIFY_EMAIL: '/verify-email',

  HOTELS: '/hotels',
  HOTEL_DETAILS: (hotelId: number) => `/hotels/${hotelId}`,
  BOOK_ROOM: '/book-room',

  // Customer
  MANAGE_ACCOUNT: '/personal',
  MY_BOOKING: '/my-booking',
  MY_TRIPS: '/my-trips',
  SAVED: '/saved',

  // Admin
  DASHBOARD: '/system/admin/dashboard',
  MANAGE_CUSTOMERS: '/system/admin/customers',
  MANAGE_HOTELS: `/system/admin/hotels`,
  MANAGE_HOTEL_DETAILS: (hotelId: number) => `/system/admin/hotels/${hotelId}`,

  // Hotel
  MY_HOTEL: '/system/hotel',
};
