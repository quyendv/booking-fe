'use client';

import { CheckCircle, XCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import useBookRoom from '~/hooks/useBookRoom';

interface PaymentResultPageProps {
  searchParams: {
    channel: string;
    code: string;
  };
}

export default function PaymentResultPage({ searchParams }: PaymentResultPageProps) {
  const { resetBookingRoom } = useBookRoom();

  useEffect(() => {
    if (searchParams.code === '00') {
      resetBookingRoom();
      // toast, redirect, etc.
    }
  }, [searchParams.code, resetBookingRoom]);

  const isSuccess = searchParams.channel === 'vn_pay' && searchParams.code === '00';

  const t = useTranslations('PaymentResult');

  return (
    <div className="mt-10 flex h-full flex-col items-center justify-center p-8 text-center">
      {isSuccess ? (
        <div className="space-y-2 rounded-md bg-green-500/15 p-4 text-green-700">
          <h2 className="text-2xl font-bold">{t('success')}</h2>
          <p>{t('successDesc')}</p>
          <div className="flex-center">
            <CheckCircle className="size-12" />
          </div>
          <button className="!mt-4 rounded-md bg-green-500/60 px-4 py-2 text-primary/95">{t('goHome')}</button>
        </div>
      ) : (
        <div className="space-y-2 rounded-md bg-red-500/15 p-4 text-red-700">
          <h2 className="text-2xl font-bold">{t('failure')}</h2>
          <p>{t('failureDesc')}</p>
          <div className="flex-center">
            <XCircle className="size-12" />
          </div>
          <button className="!mt-4 rounded-md bg-red-500/60 px-4 py-2 text-primary/95">{t('goHome')}</button>
        </div>
      )}
    </div>
  );
}
