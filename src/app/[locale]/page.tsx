import { useTranslations } from 'next-intl';
import { ThemeToggle } from '~/components/common/ThemeToggle';

export default function Home() {
  const t = useTranslations('Index');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>{t('title')}</h1>
      <ThemeToggle />
    </main>
  );
}
