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
import koTranslation from '@/locales/ko.json'
import ruTranslation from '@/locales/ru.json'
import ukTranslation from '@/locales/uk.json'
import viTranslation from '@/locales/vi.json'
import { languageAtom, store } from './atom'

const languageDetector = new LanguageDetector()

const language = languageDetector.detect()

if (language && !Array.isArray(language)) {
  store.set(languageAtom, language)
}

export const languageNames = {
  de: 'Deutsch',
  en: 'English',
  es: 'Español',
  fi: 'Suomi',
  fr: 'Français',
  id: 'Bahasa Indonesia',
  ja: '日本語',
  ko: '한국어',
  ru: 'Русский',
  uk: 'Українська',
  vi: 'Tiếng Việt',
}

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      de: { translation: deTranslation },
      en: { translation: enTranslation },
      es: { translation: esTranslation },
      fi: { translation: fiTranslation },
      fr: { translation: frTranslation },
      id: { translation: idTranslation },
      ja: { translation: jaTranslation },
      ko: { translation: koTranslation },
      ru: { translation: ruTranslation },
      uk: { translation: ukTranslation },
      vi: { translation: viTranslation },
    },
    supportedLngs: [
      'de',
      'en',
      'es',
      'fi',
      'fr',
      'id',
      'ja',
      'ko',
      'ru',
      'uk',
      'vi',
    ],
    lng: 'en',
    fallbackLng: 'en',
  })

export default i18next
