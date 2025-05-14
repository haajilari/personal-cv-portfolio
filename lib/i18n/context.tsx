'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Direction, localeConfig, translations, TranslationKey } from './config';

interface LanguageContextType {
  lang: Language;
  dir: Direction;
  t: (key: TranslationKey) => string;
  switchLanguage: (lang: Language) => void;
}

const defaultLanguageContext: LanguageContextType = {
  lang: 'en',
  dir: 'ltr',
  t: () => '',
  switchLanguage: () => {},
};

const LanguageContext = createContext<LanguageContextType>(defaultLanguageContext);

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Language>('en');
  const [dir, setDir] = useState<Direction>('ltr');

  useEffect(() => {
    // Check if there's a stored language preference
    const storedLang = localStorage.getItem('preferredLanguage') as Language;
    if (storedLang && (storedLang === 'en' || storedLang === 'fa')) {
      setLang(storedLang);
      setDir(localeConfig[storedLang].dir);
      document.documentElement.dir = localeConfig[storedLang].dir;
      document.documentElement.lang = storedLang;
    }
  }, []);

  const switchLanguage = (newLang: Language) => {
    setLang(newLang);
    setDir(localeConfig[newLang].dir);
    document.documentElement.dir = localeConfig[newLang].dir;
    document.documentElement.lang = newLang;
    localStorage.setItem('preferredLanguage', newLang);
  };

  const t = (key: TranslationKey): string => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, dir, t, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};