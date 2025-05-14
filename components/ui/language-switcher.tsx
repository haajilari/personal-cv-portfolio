'use client';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/i18n/context';

export function LanguageSwitcher() {
  const { lang, switchLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    switchLanguage(lang === 'en' ? 'fa' : 'en');
  };

  return (
    <Button
      variant="outline"
      onClick={toggleLanguage}
      className="text-sm font-medium"
    >
      {t('changeLanguage')}
    </Button>
  );
}