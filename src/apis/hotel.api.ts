import useSWRImmutable from 'swr/immutable';
import { axiosPrivateInstance, axiosPublicInstance } from './instances/axios.instance';
import { FetchInstance, PrivateFetchInstance } from './instances/fetch.instance';

export type AddressSchema = {
  id: number;
  details: string;
  ward?: string;
  district?: string;
  province: string;
  country: string;
};

export type GalleryItem = {
  url: string;
  key?: string;
};

export type RoomSchema = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  imageKey?: string;
  gallery: GalleryItem[];
  // hotel: HotelEntity;
  bedCount: number;
  guestCount: number;
  bathroomCount: number;
  kingBed: number;
  queenBed: number;
  breakFastPrice: number;
  roomPrice: number;
  roomService: boolean;
  tv: boolean;
  balcony: boolean;
  freeWifi: boolean;
  cityView: boolean;
  oceanView: boolean;
  forestView: boolean;
  mountainView: boolean;
  airCondition: boolean;
  soundProofed: boolean;
};

export type HotelSchema = {
  id: number;
  email: string;
  name: string;
  description: string;
  imageUrl: string;
  imageKey?: string | null;
  address: AddressSchema;
  rooms: RoomSchema[];
  gallery: GalleryItem[];
  gym: boolean;
  bar: boolean;
  restaurant: boolean;
  freeParking: boolean;
  movieNight: boolean;
  coffeeShop: boolean;
  spa: boolean;
  laundry: boolean;
  shopping: boolean;
  bikeRental: boolean;
  swimmingPool: boolean;
};

type CreateAddressDto = Omit<AddressSchema, 'id'>;
type CreateHotelDto = Omit<HotelSchema, 'id' | 'rooms' | 'address'> & { address: CreateAddressDto };
type UpdateHotelDto = Partial<Omit<CreateHotelDto, 'email' | 'id'>>;

type CreateRoomDto = Omit<RoomSchema, 'id'>;
type UpdateRoomDto = Partial<CreateRoomDto>;

type DeleteResponse = { status: string; message: string };

export const hotelEndpoints = {
  list: '/hotels',
  getById: (id: number) => `/hotels/${id}`,
  myHotel: '/hotels/me',
  create: '/hotels',
  updateById: (id: number) => `/hotels/${id}`,
  delete: (id: number) => `/hotels/${id}`,
  // getRooms: '/hotels/:id/rooms',
  // getRoom: '/hotels/:id/rooms/:id',
  createRoom: (hotelId: number) => `/hotels/${hotelId}/rooms`,
  updateRoom: (hotelId: number, roomId: number) => `/hotels/${hotelId}/rooms/${roomId}`,
  deleteRoom: (hotelId: number, roomId: number) => `/hotels/${hotelId}/rooms/${roomId}`,
  // getGallery: '/hotels/:id/gallery',
  // createGallery: '/hotels/:id/gallery',
  // deleteGallery: '/hotels/:id/gallery/:id',
};

export const HotelApi = {
  async createHotel(data: CreateHotelDto) {
    return await axiosPrivateInstance.post<HotelSchema>(hotelEndpoints.create, data);
  },

  async listHotels() {
    return await new FetchInstance<HotelSchema[]>().get(hotelEndpoints.list);
    // return await axiosPublicInstance.get<HotelSchema[]>(hotelEndpoints.list);
  },

  async getHotelById(id: number) {
    return await axiosPrivateInstance.get<HotelSchema>(hotelEndpoints.getById(id));
  },

  async getMyHotel() {
    return new PrivateFetchInstance<HotelSchema>().get(hotelEndpoints.myHotel);
    // return await axiosPrivateInstance.get<HotelSchema>(hotelEndpoints.myHotel);
  },

  async updateHotelById(id: number, data: UpdateHotelDto) {
    return await axiosPrivateInstance.patch<HotelSchema>(hotelEndpoints.updateById(id), data);
  },

  async createRoom(hotelId: number, data: CreateRoomDto) {
    return await axiosPrivateInstance.post<RoomSchema>(hotelEndpoints.createRoom(hotelId), data);
  },

  async updateRoom(hotelId: number, roomId: number, data: UpdateRoomDto) {
    return await axiosPrivateInstance.patch<RoomSchema>(hotelEndpoints.updateRoom(hotelId, roomId), data);
  },

  async deleteRoom(hotelId: number, roomId: number) {
    return await axiosPrivateInstance.delete<DeleteResponse>(hotelEndpoints.deleteRoom(hotelId, roomId));
  },
};
