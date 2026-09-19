import { useTranslation } from 'react-i18next'
import { languages, type LanguageCode } from '../i18n'

export default function LanguageSwitch() {
  const { t, i18n } = useTranslation()
  const current = (i18n.resolvedLanguage ?? 'en') as LanguageCode

  return (
    <label className="relative inline-flex h-9 items-center rounded-md border border-line font-mono text-xs text-ink-muted transition-colors hover:border-line-strong hover:text-ink">
      <span className="sr-only">{t('nav.language')}</span>
      <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-2.5 h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18 M12 3a14 14 0 0 1 0 18 M12 3a14 14 0 0 0 0 18" />
      </svg>
      <select
        value={current}
        onChange={(event) => void i18n.changeLanguage(event.target.value)}
        className="h-full cursor-pointer appearance-none bg-transparent pr-7 pl-8 text-inherit outline-none"
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code} lang={language.htmlLang}>
            {language.label}
          </option>
        ))}
      </select>
      <svg viewBox="0 0 24 24" className="pointer-events-none absolute right-2 h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M6 9l6 6 6-6" />
      </svg>
    </label>
  )
}
