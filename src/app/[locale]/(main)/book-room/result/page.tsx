'use client';

import useBookRoom from '~/hooks/useBookRoom';

interface PaymentResultPageProps {
  searchParams: {
    channel: string;
    code: string;
  };
}

export default function PaymentResultPage({ searchParams }: PaymentResultPageProps) {
  const { resetBookingRoom } = useBookRoom();
  if (searchParams.code === '00') {
    resetBookingRoom();
    // toast, redirect, etc.
  }
  return <div>Payment result page, status: {searchParams.code === '00' ? 'success' : 'failed'}</div>;
}
