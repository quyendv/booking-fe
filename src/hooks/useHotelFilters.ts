import { create } from 'zustand';
import { HotelOverview } from '~/apis/hotel.api';
import { HotelFilterSchema } from '~/components/layouts/hotels/Filters/HotelFilterModal';
import { HotelSearchBar } from '~/components/layouts/hotels/Filters/SearchBar/HotelSearchBar';

type HookSchema = {
  filters: HotelFilterSchema;
  searchBar: HotelSearchBar;
  hotels: HotelOverview[];
  setFilters: (value: HotelFilterSchema) => void;
  resetFilters: (onReset?: (value: HotelFilterSchema) => void) => void;
  setSearchBar: (value: HotelSearchBar) => void;
  resetSearchBar: (onReset?: (value: HotelSearchBar) => void) => void;
};

const defaultFilterValue: HotelFilterSchema = {
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

const defaultSearchBarValue: HotelSearchBar = {
  location: undefined,
  timeRange: undefined,
  people: {
    guest: 0,
  },
};

const useHotelFilters = create<HookSchema>((set) => ({
  filters: defaultFilterValue,
  searchBar: defaultSearchBarValue,
  hotels: [],
  setFilters: (value: HotelFilterSchema) => set({ filters: value }),
  resetFilters: (onReset) => {
    set({ filters: defaultFilterValue });
    onReset && onReset(defaultFilterValue);
  },
  setSearchBar: (value: HotelSearchBar) => set({ searchBar: value }),
  resetSearchBar: (onReset) => {
    set({ searchBar: defaultSearchBarValue });
    onReset && onReset(defaultSearchBarValue);
  },
  setHotelList: (value: HotelOverview[]) => set({ hotels: value }),
}));

export default useHotelFilters;
