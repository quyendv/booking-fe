'use client';

import { useTranslations } from 'next-intl';
import MyBookingCard from '~/components/layouts/booking/MyBookingCard';
import { useAuth } from '~/contexts/auth.context';
import useMyBookings from '~/hooks/useMyBookings';

interface MyBookingsPageProps {}

export default function MyBookingsPage({}: MyBookingsPageProps) {
  const t = useTranslations('MyBookings');
  const { user } = useAuth();
  // if (!user) return <div>Not authenticated </div>;

  const { isLoading, data, error } = useMyBookings();
  // TODO: get hotel bookings... (9h50)

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Error</div>;

  return (
    <div className="flex flex-col gap-10">
      <h2 className="mb-6 mt-2 text-xl font-semibold md:text-2xl">{t('title', { role: user?.role })}</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {data.map((item) => (
          <MyBookingCard key={item.id} booking={item} />
        ))}
      </div>
    </div>
  );
}
