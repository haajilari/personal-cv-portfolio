import { PersianContent } from './persian';
import { EnglishContent } from './english';

export type Language = 'en' | 'fa';

export type Direction = 'ltr' | 'rtl';

export interface LocaleConfig {
  dir: Direction;
  lang: Language;
}

export const localeConfig: Record<Language, LocaleConfig> = {
  en: {
    dir: 'ltr',
    lang: 'en',
  },
  fa: {
    dir: 'rtl',
    lang: 'fa',
  }
};

export const translations = {
  en: EnglishContent,
  fa: PersianContent,
};

export type TranslationKey = keyof typeof EnglishContent;