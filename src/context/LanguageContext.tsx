import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { languages } from '../data/languages';

type Language = 'id' | 'en' | 'jv';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  currentTranslations: Record<string, string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && ['id', 'en', 'jv'].includes(savedLang)) {
      return savedLang;
    }
    
    // Detect browser language
    const browserLang = navigator.language.split('-')[0];
    if (['id', 'en', 'jv'].includes(browserLang)) {
      return browserLang as Language;
    }
    
    return 'id';
  });

  const currentTranslations = languages[language];

  const t = (key: string): string => {
    return currentTranslations[key] || key;
  };

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, currentTranslations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
