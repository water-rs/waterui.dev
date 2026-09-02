import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import zh from './locales/zh.json'

export const languages = [
  { code: 'en', label: 'English', htmlLang: 'en' },
  { code: 'zh', label: '中文', htmlLang: 'zh-Hans' },
] as const

export type LanguageCode = (typeof languages)[number]['code']

export const resources = {
  en: { translation: en },
  zh: { translation: zh },
} as const

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: languages.map((language) => language.code),
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      lookupQuerystring: 'lang',
      lookupLocalStorage: 'waterui.lang',
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
  })

function applyDocumentLanguage(code: string) {
  const language = languages.find((candidate) => candidate.code === code) ?? languages[0]
  document.documentElement.lang = language.htmlLang
  document.title = i18n.t('meta.title')
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute('content', i18n.t('meta.description'))
}

i18n.on('languageChanged', applyDocumentLanguage)
applyDocumentLanguage(i18n.resolvedLanguage ?? 'en')

export default i18n
