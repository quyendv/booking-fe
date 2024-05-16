export const routeConfig = {
  // Common
  // HOME: '/',
  HOME: '/hotels',
  ABOUT: '/about',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  VERIFY_EMAIL: '/verify-email',
  SETTINGS: '/settings',

  HOTELS: '/hotels',
  HOTEL_DETAILS: (hotelId: number) => `/hotels/${hotelId}`,
  BOOK_ROOM: '/book-room',

  // Customer
  MANAGE_ACCOUNT: '/personal',
  MY_BOOKINGS: '/my-bookings',
  MY_TRIPS: '/my-trips',
  SAVED: '/saved',

  // Admin
  A_OVERVIEW: '/system/admin/overview',
  A_MANAGE_CUSTOMERS: '/system/admin/customers',
  A_MANAGE_HOTELS: `/system/admin/hotels`,
  A_NEW_HOTEL: `/system/admin/hotels/new`,
  A_MANAGE_RECEPTIONISTS: `/system/admin/receptionists`,
  A_MANAGE_ROOMS: `/system/admin/rooms`,
  A_MANAGE_HOTEL_DETAILS: (hotelId: number) => `/system/admin/hotels/${hotelId}`,

  // Hotel
  MY_HOTEL: '/system/hotel/my-hotel',
  H_OVERVIEW: '/system/hotel/overview',
  H_MANAGE_RECEPTIONISTS: `/system/hotel/receptionists`,
  H_MANAGE_ROOMS: `/system/hotel/rooms`,
};
