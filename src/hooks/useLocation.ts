import { City, Country, State } from 'country-state-city';

const useLocation = () => {
  const getCountryByCode = (countryCode: string) => {
    return Country.getAllCountries().find((value) => value.isoCode === countryCode);
  };

  const getStateByCode = (countryCode: string, stateCode: string) => {
    const state = State.getAllStates().find(
      (value) => value.countryCode === countryCode && value.isoCode === stateCode,
    );
    if (!state) return null;
    return state;
  };

  const getCountryStates = (countryCode: string) => {
    return State.getAllStates().filter((state) => state.countryCode === countryCode);
  };

  const getStateCities = (countryCode: string, stateCode: string) => {
    return City.getAllCities().filter((city) => city.countryCode === countryCode && city.stateCode === stateCode);
  };

  return {
    getAllCountries: Country.getAllCountries(),
    getCountryByCode,
    getStateByCode,
    getCountryStates,
    getStateCities,
  };
};

export default useLocation;
