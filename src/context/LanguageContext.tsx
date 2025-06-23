import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // First try to get language from localStorage
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage === 'ru' || savedLanguage === 'en') {
      return savedLanguage;
    }
    // Fall back to browser language
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith('ru') ? 'ru' : 'en';
  });

  useEffect(() => {
    // Store language preference
    localStorage.setItem('preferredLanguage', language);

    // Try to detect user's language as a background task
    const detectLanguage = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        const response = await fetch('https://ipapi.co/json/', {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0' // Some APIs require a user agent
          }
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (data.country === 'RU') {
          setLanguage('ru');
        }
      } catch (error) {
        // Silently handle the error - we already have a fallback language set
        console.debug('Language detection failed, using fallback:', error);
      }
    };

    detectLanguage();
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};