import useSWRImmutable from 'swr/immutable';
import { axiosPrivateInstance } from './instances/axios.instance';
import { PrivateFetchInstance } from './instances/fetch.instance';
import useSWR from 'swr';

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

const endpoints = {
  list: '/hotels',
  getById: (id: number) => `/hotels/${id}`,
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
    return await axiosPrivateInstance.post<HotelSchema>(endpoints.create, data);
  },

  async getHotelById(id: number) {
    return await axiosPrivateInstance.get<HotelSchema>(endpoints.getById(id));
  },

  async updateHotelById(id: number, data: UpdateHotelDto) {
    return await axiosPrivateInstance.patch<HotelSchema>(endpoints.updateById(id), data);
  },

  useHotel(id: number) {
    const fetcher = (url: string) => new PrivateFetchInstance<HotelSchema>().fetcher(url, 'GET');
    const { isLoading, data, error } = useSWR(endpoints.getById(id), fetcher);
    // const { isLoading, data, error } = useSWRImmutable(endpoints.getById(id), fetcher);
    return { isLoading, data, error };
  },

  async createRoom(hotelId: number, data: CreateRoomDto) {
    return await axiosPrivateInstance.post<RoomSchema>(endpoints.createRoom(hotelId), data);
  },

  async updateRoom(hotelId: number, roomId: number, data: UpdateRoomDto) {
    return await axiosPrivateInstance.patch<RoomSchema>(endpoints.updateRoom(hotelId, roomId), data);
  },

  async deleteRoom(hotelId: number, roomId: number) {
    return await axiosPrivateInstance.delete<DeleteResponse>(endpoints.deleteRoom(hotelId, roomId));
  },
};
