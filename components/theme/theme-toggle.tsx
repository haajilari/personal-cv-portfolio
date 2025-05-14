'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from './theme-provider';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/i18n/context';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? t('lightMode') : t('darkMode')}
      className="rounded-full"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
}