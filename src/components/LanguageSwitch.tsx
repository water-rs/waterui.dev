import { useTranslation } from 'react-i18next'
import { languages, type LanguageCode } from '../i18n'

export default function LanguageSwitch() {
  const { t, i18n } = useTranslation()
  const current = (i18n.resolvedLanguage ?? 'en') as LanguageCode

  return (
    <label className="relative flex h-9 items-center border border-rule text-[14px] font-medium text-ink-2 transition-colors hover:border-ink hover:text-ink">
      <span className="sr-only">{t('nav.language')}</span>
      <select
        value={current}
        onChange={(event) => void i18n.changeLanguage(event.target.value)}
        className="h-full cursor-pointer appearance-none bg-transparent pr-7 pl-3 text-inherit outline-none"
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code} lang={language.htmlLang} className="bg-paper text-ink">
            {language.label}
          </option>
        ))}
      </select>
      <svg viewBox="0 0 12 12" className="pointer-events-none absolute right-2.5 h-2 w-2" fill="currentColor" aria-hidden>
        <path d="M1 3h10L6 9z" />
      </svg>
    </label>
  )
}
