'use client';

import { SearchCode } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Icons } from '~/components/common/Icons';
import HotelList from '~/components/layouts/hotels/HotelList';
import { Input } from '~/components/ui/input';
import useHotels from '~/hooks/useHotels';

interface HotelPageProps {
  searchParams: {
    name: string;
    country: string;
    province: string;
    district: string;
  };
}

function HotelPage({}: HotelPageProps) {
  const { isLoading, data, error } = useHotels(); // filter search params
  // if (isLoading) return <div>Loading...</div>;
  // if (error || !data) return <div>Oops! No hotels found</div>;
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState(data ?? []);

  const t = useTranslations();

  useEffect(() => {
    if (searchValue) {
      const filtered = data?.filter((hotel) => hotel.name.toLowerCase().includes(searchValue.toLowerCase()));
      setFilteredData(filtered ?? []);
    } else {
      setFilteredData(data ?? []);
    }
  }, [searchValue, data]);

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Oops! No hotels found</div>;

  return (
    <div>
      <div className="flex w-full gap-2">
        <div className="relative w-full">
          <SearchCode className="absolute left-2.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={t('Shared.button.searchHotel')}
            className="px-8"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value.trimStart())}
          />
          {searchValue && (
            <Icons.xCircle
              onClick={() => setSearchValue('')}
              className="absolute right-3 top-1/2 size-5 -translate-y-1/2"
            />
          )}
        </div>
      </div>
      <HotelList hotels={filteredData} />
    </div>
  );
}

export default HotelPage;
