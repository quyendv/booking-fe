import { create } from 'zustand';
import { HotelOverview } from '~/apis/hotel.api';
import { HotelFilterSchema } from '~/components/layouts/hotels/Filters/HotelFilterModal';

type HookSchema = {
  filters: HotelFilterSchema;
  hotels: HotelOverview[];
  setFilters: (value: HotelFilterSchema) => void;
  resetFilters: (onReset?: (value: HotelFilterSchema) => void) => void;
};

const defaultValue = {
  priceRange: [0, 20000000],
  rating: 0,
  gym: false,
  bar: false,
  restaurant: false,
  freeParking: false,
  movieNight: false,
  coffeeShop: false,
  spa: false,
  laundry: false,
  shopping: false,
  bikeRental: false,
  swimmingPool: false,
  allowPets: false,
  allowSmoking: false,
};

const useHotelFilters = create<HookSchema>((set) => ({
  filters: {
    priceRange: [0, 20000000],
  },
  hotels: [],
  setFilters: (value: HotelFilterSchema) => set({ filters: value }),
  resetFilters: (onReset) => {
    set({ filters: defaultValue });
    onReset && onReset(defaultValue);
  },
  setHotelList: (value: HotelOverview[]) => set({ hotels: value }),
}));

export default useHotelFilters;
