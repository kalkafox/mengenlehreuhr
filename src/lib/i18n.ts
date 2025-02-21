import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import deTranslation from '@/locales/de.json'
import enTranslation from '@/locales/en.json'
import esTranslation from '@/locales/es.json'
import fiTranslation from '@/locales/fi.json'
import frTranslation from '@/locales/fr.json'
import jaTranslation from '@/locales/ja.json'
import ruTranslation from '@/locales/ru.json'
import ukTranslation from '@/locales/uk.json'

export const languageNames = {
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  fi: 'Suomi',
  es: 'Español',
  ru: 'Русский',
  uk: 'Українська',
  ja: '日本語',
}

i18next.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    fr: { translation: frTranslation },
    de: { translation: deTranslation },
    fi: { translation: fiTranslation },
    es: { translation: esTranslation },
    ru: { translation: ruTranslation },
    uk: { translation: ukTranslation },
    ja: { translation: jaTranslation },
  },
  lng: 'en',
  fallbackLng: 'en',
})
