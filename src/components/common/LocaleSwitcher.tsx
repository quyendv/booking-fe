'use client';

import { useLocale } from 'next-intl';
import type { ChangeEventHandler } from 'react';

import { LocaleConfig } from '~/configs/locale.config';
import { useIPathname, useIRouter } from '~/locales/i18nNavigation';

export default function LocaleSwitcher() {
  const router = useIRouter();
  const pathname = useIPathname();
  const locale = useLocale();

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    router.push(pathname, { locale: event.target.value });
    router.refresh();
  };

  return (
    <select
      defaultValue={locale}
      onChange={handleChange}
      className="border border-muted bg-background font-medium focus:outline-none focus-visible:ring"
    >
      {LocaleConfig.locales.map((elt) => (
        <option key={elt} value={elt}>
          {elt.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
