import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { store } from './store';
import { setDirection } from './features/ui/uiSlice';
import { updateUserLanguage } from './features/auth/authSlice';

// Initialize i18next
i18n
  // Load translations from /public/locales
  .use(Backend)
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    // Default namespace
    defaultNS: 'common',
    
    // Backend configuration
    backend: {
      // Path to load translations from
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    
    // Detection options
    detection: {
      // Order of language detection
      order: ['localStorage', 'navigator'],
      // Cache language in localStorage
      caches: ['localStorage'],
    },
  });

// Function to change language
export const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng).then(() => {
    // Update direction in UI state
    store.dispatch(setDirection(lng === 'ar' ? 'rtl' : 'ltr'));
    
    // Update user language preference if authenticated
    const state = store.getState();
    if (state.auth.isAuthenticated) {
      store.dispatch(updateUserLanguage(lng));
    }
  });
};

// Export i18n instance
export default i18n;
