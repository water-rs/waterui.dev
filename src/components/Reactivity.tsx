import { useTranslation } from 'react-i18next'
import Section from './Section'
import Code from './Code'
import { Hash } from './Logo'
import progressSnippet from '../snippets/progress.rs?raw'
import contactsSnippet from '../snippets/contacts.rs?raw'

const points = ['binding', 'computed', 'collections'] as const
const flow = ['binding', 'computed', 'view'] as const

export default function Reactivity() {
  const { t } = useTranslation()

  return (
    <Section id="state" eyebrow={t('reactivity.eyebrow')} title={t('reactivity.title')} lead={t('reactivity.lead')}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <ol className="flex items-center gap-3 font-mono text-xs text-ink-muted" aria-label="Binding to Computed to View">
            {flow.map((stage, index) => (
              <li key={stage} className="flex items-center gap-3">
                {index > 0 ? <span className="block h-px w-6 bg-line-strong" aria-hidden /> : null}
                <span className="flex items-center gap-1.5">
                  <Hash className="h-5 w-3.5 text-water" />
                  {t(`reactivity.flow.${stage}`)}
                </span>
              </li>
            ))}
          </ol>
          <dl className="mt-8 space-y-7">
            {points.map((point) => (
              <div key={point} className="border-l border-line pl-5">
                <dt className="font-mono text-base font-semibold">{t(`reactivity.points.${point}.title`)}</dt>
                <dd className="mt-1.5 text-base leading-relaxed text-ink-muted">{t(`reactivity.points.${point}.body`)}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="space-y-4 lg:col-span-7">
          <Code code={progressSnippet} language="rust" title="Binding → Computed" />
          <Code code={contactsSnippet} language="rust" title="List::for_each" />
        </div>
      </div>
    </Section>
  )
}
