import { useTranslation } from 'react-i18next'
import Section from './Section'
import Code from './Code'
import { Hash } from './Logo'
import testingSnippet from '../snippets/testing.rs?raw'
import { stringList } from '../i18n'

const groups = ['layout', 'controls', 'navigation', 'graphics', 'media', 'icons'] as const

export default function Features() {
  const { t } = useTranslation()
  const kitItems = stringList(t('features.kit.items', { returnObjects: true }))

  return (
    <Section id="features" eyebrow={t('features.eyebrow')} title={t('features.title')} lead={t('features.lead')}>
      <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <li key={group} className="bg-surface p-6">
            <div className="flex items-center gap-2.5">
              <Hash className="h-5 w-3.5 text-water" />
              <h3 className="font-mono text-base font-semibold">{t(`features.groups.${group}.title`)}</h3>
            </div>
            <ul className="mt-4 space-y-1.5 text-sm text-ink-muted">
              {stringList(t(`features.groups.${group}.items`, { returnObjects: true })).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <div className="flex items-center gap-2.5">
            <Hash className="h-5 w-3.5 text-water" />
            <h3 className="font-mono text-base font-semibold">{t('features.kit.title')}</h3>
          </div>
          <p className="mt-3 text-base leading-relaxed text-ink-muted">{t('features.kit.lead')}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {kitItems.map((item) => (
              <li key={item} className="rounded border border-line px-2.5 py-1 font-mono text-xs text-ink-muted">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-6">
          <div className="flex items-center gap-2.5">
            <Hash className="h-5 w-3.5 text-water" />
            <h3 className="font-mono text-base font-semibold">{t('features.testing.title')}</h3>
          </div>
          <p className="mt-3 text-base leading-relaxed text-ink-muted">{t('features.testing.lead')}</p>
          <Code code={testingSnippet} language="rust" title="cargo test" className="mt-5" />
        </div>
      </div>
    </Section>
  )
}
