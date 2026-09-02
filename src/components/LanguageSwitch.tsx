import { useTranslation } from 'react-i18next'
import { languages, type LanguageCode } from '../i18n'

export default function LanguageSwitch() {
  const { t, i18n } = useTranslation()
  const current = (i18n.resolvedLanguage ?? 'en') as LanguageCode

  return (
    <div role="group" aria-label={t('nav.language')} className="inline-flex h-9 items-center rounded-md border border-line font-mono text-xs">
      {languages.map((language, index) => {
        const active = language.code === current
        return (
          <button
            key={language.code}
            type="button"
            lang={language.htmlLang}
            aria-pressed={active}
            onClick={() => void i18n.changeLanguage(language.code)}
            className={`h-full px-2.5 transition-colors ${index > 0 ? 'border-l border-line' : ''} ${
              active ? 'text-ink' : 'text-ink-faint hover:text-ink'
            }`}
          >
            {language.label}
          </button>
        )
      })}
    </div>
  )
}
