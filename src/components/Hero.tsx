import { useTranslation } from 'react-i18next'
import ButtonLink from './Button'
import BondDemo from './BondDemo'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <div className="relative overflow-hidden">
      <div className="hash-grid hash-grid-fade pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-16 md:pt-24 lg:grid-cols-12 lg:gap-10 lg:items-center lg:pb-28">
        <div className="animate-fade-up lg:col-span-6 lg:pt-6">
          <p className="mb-5 font-mono text-xs tracking-[0.2em] text-ink-muted uppercase">{t('hero.eyebrow')}</p>
          <h1 className="font-mono text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-[3.6rem]">
            {t('hero.titleLine1')}
            <br />
            <span className="text-water">{t('hero.titleLine2')}</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-muted">{t('hero.lead')}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink variant="primary" href="#quick-start">
              {t('hero.ctaStart')}
            </ButtonLink>
            <ButtonLink variant="secondary" href="https://book.waterui.dev" target="_blank" rel="noopener noreferrer">
              {t('hero.ctaBook')}
            </ButtonLink>
          </div>
          <p className="mt-8 font-mono text-xs text-ink-faint">{t('hero.status')}</p>
        </div>

        <div className="animate-fade-up [animation-delay:120ms] lg:col-span-6 lg:self-center">
          <BondDemo />
        </div>
      </div>
    </div>
  )
}
