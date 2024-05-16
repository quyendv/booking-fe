'use client';

import { SearchCode } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Icons } from '~/components/common/Icons';
import HotelFilterModal from '~/components/layouts/hotels/Filters/HotelFilterModal';
import HotelSearchBar from '~/components/layouts/hotels/Filters/SearchBar/HotelSearchBar';
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
  const t = useTranslations();

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Oops! No hotels found</div>;

  return (
    <div>
      <div className="flex-center gap-2">
        <HotelSearchBar />
        <HotelFilterModal />
      </div>

      <HotelList hotels={data} />
    </div>
  );
}

export default HotelPage;
