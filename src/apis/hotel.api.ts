import axios, { AxiosResponse } from 'axios';
import useSWR from 'swr';
import { StorageResult } from '~/components/layouts/form/UploadFile';
import { axiosPrivateInstance } from './instances/axios.instance';
import { PrivateFetchInstance } from './instances/fetch.instance';

export type AddressSchema = {
  details: string;
  ward?: string;
  district?: string;
  province: string;
  country: string;
};

export type GalleryItem = StorageResult;

export type RoomSchema = {
  title: string;
  description: string;
  imageUrl: string;
  imageKey: string;
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

type CreateHotelDto = Omit<HotelSchema, 'rooms' | 'gallery'>;
type UpdateHotelDto = Partial<Omit<CreateHotelDto, 'email' | 'id'>>;
export type CreateHotelResponse = HotelSchema;
const endpoints = {
  list: '/hotels',
  getById: (id: number) => `/hotels/${id}`,
  create: '/hotels',
  updateById: (id: number) => `/hotels/${id}`,
  delete: (id: number) => `/hotels/${id}`,
  // getRooms: '/hotels/:id/rooms',
  // getRoom: '/hotels/:id/rooms/:id',
  // createRoom: '/hotels/:id/rooms',
  // updateRoom: '/hotels/:id/rooms/:id',
  // deleteRoom: '/hotels/:id/rooms/:id',
  // getGallery: '/hotels/:id/gallery',
  // createGallery: '/hotels/:id/gallery',
  // deleteGallery: '/hotels/:id/gallery/:id',
};

export const HotelApi = {
  async createHotel(data: CreateHotelDto) {
    return await axiosPrivateInstance.post<CreateHotelResponse>(endpoints.create, data);
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
    return { isLoading, data, error };
  },
};
