import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'

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

/**
 * English ships in the main bundle as the fallback; every other locale is its
 * own chunk, fetched only when a visitor selects it. Each loader is typed so a
 * locale file that drifts from English's keys still fails the build.
 */
const locales = {
  zh: () => import('./locales/zh.json').then((module) => module.default satisfies Locale),
  ja: () => import('./locales/ja.json').then((module) => module.default satisfies Locale),
  ko: () => import('./locales/ko.json').then((module) => module.default satisfies Locale),
  de: () => import('./locales/de.json').then((module) => module.default satisfies Locale),
  fr: () => import('./locales/fr.json').then((module) => module.default satisfies Locale),
  es: () => import('./locales/es.json').then((module) => module.default satisfies Locale),
  pt: () => import('./locales/pt.json').then((module) => module.default satisfies Locale),
  ru: () => import('./locales/ru.json').then((module) => module.default satisfies Locale),
} satisfies Record<Exclude<LanguageCode, 'en'>, () => Promise<Locale>>

function loadLocale(code: string): Promise<Locale> {
  if (!(code in locales)) {
    throw new Error(`no locale file for ${code}`)
  }
  return locales[code as keyof typeof locales]()
}

i18n
  .use(LanguageDetector)
  .use(resourcesToBackend((code: string) => loadLocale(code)))
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en } },
    partialBundledLanguages: true,
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
