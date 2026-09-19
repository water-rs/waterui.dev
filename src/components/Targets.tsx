import { useTranslation } from 'react-i18next'
import Section from './Section'
import { Hash } from './Logo'

const targets = ['apple', 'android', 'gtk', 'hydrolysis', 'dew'] as const

export default function Targets() {
  const { t } = useTranslation()

  return (
    <Section id="targets" eyebrow={t('targets.eyebrow')} title={t('targets.title')} lead={t('targets.lead')}>
      <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
        {targets.map((target) => {
          const highlight = target === 'dew'
          return (
            <li
              key={target}
              className={`flex flex-col gap-6 p-6 ${highlight ? 'bg-water-soft' : 'bg-surface'} ${
                highlight ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <Hash className={`h-8 w-5 ${highlight ? 'text-water' : 'text-ink-faint'}`} />
              <div className="mt-auto">
                <p className="mb-2 font-mono text-[11px] tracking-wider text-ink-faint uppercase">{t(`targets.items.${target}.platform`)}</p>
                <h3 className="font-mono text-xl font-semibold">{t(`targets.items.${target}.backend`)}</h3>
                <p className="mt-1 text-sm text-ink-muted">
                  <span className="sr-only">{t('targets.rendersThrough')}: </span>
                  {t(`targets.items.${target}.renders`)}
                </p>
              </div>
            </li>
          )
        })}
      </ul>
      <p className="mt-6 max-w-2xl text-base text-ink-muted">
        <span className="mr-2 font-mono text-water" aria-hidden>
          #
        </span>
        {t('targets.dewNote')}
      </p>
    </Section>
  )
}
