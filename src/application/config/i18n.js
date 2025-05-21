import es from 'application/config/locales/es.json';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

i18next.use(initReactI18next).init({
  resources: {
    es: {
      translation: es,
    },
  },
  lng: 'es',
  interpolation: {
    escapeValue: false,
  },
});
