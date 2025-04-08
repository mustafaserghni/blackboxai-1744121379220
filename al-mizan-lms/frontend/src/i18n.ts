import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  // Load translation using http -> see /public/locales
  .use(Backend)
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Init i18next
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, // Not needed for React as it escapes by default
    },

    // Backend configuration
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    // Language detector options
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },

    // Namespaces
    ns: ['common'],
    defaultNS: 'common',

    // Available languages
    supportedLngs: ['en', 'ar', 'fr'],

    // React specific options
    react: {
      useSuspense: true,
    },
  });

// Handle RTL languages
i18n.on('languageChanged', (lng) => {
  const direction = lng === 'ar' ? 'rtl' : 'ltr';
  document.dir = direction;
  document.documentElement.setAttribute('dir', direction);
  document.documentElement.setAttribute('lang', lng);
});

export default i18n;
