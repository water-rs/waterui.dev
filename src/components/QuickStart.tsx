import { useTranslation } from 'react-i18next'
import Section from './Section'
import Terminal from './Terminal'
import ButtonLink from './Button'
import Code from './Code'
import counterSnippet from '../snippets/counter.rs?raw'

export default function QuickStart() {
  const { t } = useTranslation()

  const steps = [
    { id: 'install', label: t('quickStart.steps.install'), command: 'cargo install waterui-cli' },
    { id: 'create', label: t('quickStart.steps.create'), command: 'water create counter --mode playground' },
    { id: 'run', label: t('quickStart.steps.run'), command: 'cd counter && water run' },
  ]

  const elsewhere = [
    { id: 'ios', label: 'iOS', command: 'water run --platform ios' },
    { id: 'android', label: 'Android', command: 'water run --platform android' },
    { id: 'linux', label: 'Linux', command: 'water run --platform linux' },
  ]

  return (
    <Section id="quick-start" eyebrow={t('quickStart.eyebrow')} title={t('quickStart.title')} lead={t('quickStart.lead')}>
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="space-y-6 lg:col-span-7">
          <Terminal commands={steps} title="playground" />
          <Code code={counterSnippet} language="rust" title="src/lib.rs" />
          <p className="text-sm text-ink-muted">{t('quickStart.entryPoint')}</p>
        </div>
        <div className="space-y-6 lg:col-span-5">
          <div>
            <p className="mb-3 font-mono text-xs tracking-wider text-ink-faint uppercase">{t('quickStart.elsewhere')}</p>
            <Terminal commands={elsewhere} />
          </div>
          <dl className="space-y-2 font-mono text-sm">
            <div className="flex gap-3">
              <dt className="shrink-0 text-ink">water doctor</dt>
              <dd className="text-ink-muted">{t('quickStart.tools.doctor')}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="shrink-0 text-ink">water devices</dt>
              <dd className="text-ink-muted">{t('quickStart.tools.devices')}</dd>
            </div>
          </dl>
          <div className="rounded-lg border border-line p-5">
            <p className="text-sm leading-relaxed text-ink-muted">{t('quickStart.shipping')}</p>
            <ButtonLink
              variant="secondary"
              href="https://github.com/water-rs/waterui#shipping-a-real-app"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4"
            >
              {t('quickStart.shippingLink')}
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  )
}
