import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import zh from './locales/zh.json'
import ja from './locales/ja.json'
import ko from './locales/ko.json'
import de from './locales/de.json'
import fr from './locales/fr.json'
import es from './locales/es.json'
import pt from './locales/pt.json'
import ru from './locales/ru.json'

/** English is the source of truth; every other locale must carry exactly its keys. */
type Locale = typeof en

export const languages = [
  { code: 'en', label: 'English', htmlLang: 'en' },
  { code: 'zh', label: '中文', htmlLang: 'zh-Hans' },
  { code: 'ja', label: '日本語', htmlLang: 'ja' },
  { code: 'ko', label: '한국어', htmlLang: 'ko' },
  { code: 'de', label: 'Deutsch', htmlLang: 'de' },
  { code: 'fr', label: 'Français', htmlLang: 'fr' },
  { code: 'es', label: 'Español', htmlLang: 'es' },
  { code: 'pt', label: 'Português', htmlLang: 'pt-BR' },
  { code: 'ru', label: 'Русский', htmlLang: 'ru' },
] as const

export type LanguageCode = (typeof languages)[number]['code']

export const resources = {
  en: { translation: en },
  zh: { translation: zh satisfies Locale },
  ja: { translation: ja satisfies Locale },
  ko: { translation: ko satisfies Locale },
  de: { translation: de satisfies Locale },
  fr: { translation: fr satisfies Locale },
  es: { translation: es satisfies Locale },
  pt: { translation: pt satisfies Locale },
  ru: { translation: ru satisfies Locale },
} satisfies Record<LanguageCode, { translation: Locale }>

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

/** Narrows a `returnObjects` translation to a list of strings, failing loudly on a malformed locale file. */
export function stringList(value: unknown): string[] {
  if (!Array.isArray(value) || !value.every((item) => typeof item === 'string')) {
    throw new Error(`translation is not a list of strings: ${JSON.stringify(value)}`)
  }
  return value
}
