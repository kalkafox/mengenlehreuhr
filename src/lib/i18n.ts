import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import deTranslation from '@/locales/de.json'
import enTranslation from '@/locales/en.json'
import esTranslation from '@/locales/es.json'
import fiTranslation from '@/locales/fi.json'
import frTranslation from '@/locales/fr.json'
import idTranslation from '@/locales/id.json'
import jaTranslation from '@/locales/ja.json'
import ruTranslation from '@/locales/ru.json'
import ukTranslation from '@/locales/uk.json'
import viTranslation from '@/locales/vi.json'

export const languageNames = {
  de: 'Deutsch',
  en: 'English',
  es: 'Español',
  fi: 'Suomi',
  fr: 'Français',
  id: 'Bahasa Indonesia',
  ja: '日本語',
  ru: 'Русский',
  uk: 'Українська',
  vi: 'Tiếng Việt',
}

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: { translation: enTranslation },
      fr: { translation: frTranslation },
      de: { translation: deTranslation },
      fi: { translation: fiTranslation },
      es: { translation: esTranslation },
      ru: { translation: ruTranslation },
      uk: { translation: ukTranslation },
      ja: { translation: jaTranslation },
      id: { translation: idTranslation },
      vi: { translation: viTranslation },
    },
    supportedLngs: ['de', 'en', 'es', 'fi', 'fr', 'id', 'ja', 'ru', 'uk', 'vi'],
    lng: 'en',
    fallbackLng: 'en',
  })

export default i18next
