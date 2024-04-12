// i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './en.json';
import translationFR from './fr.json';

// Définir les traductions
const resources = {
  en: {
    translation: translationEN
  },
  fr: {
    translation: translationFR
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Langue par défaut
    interpolation: {
      escapeValue: false // Pas besoin d'échapper les caractères spéciaux
    }
  });

export default i18n;
