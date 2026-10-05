import { useTranslation } from 'react-i18next'
import Terminal from './Terminal'
import { Frame, Heading } from './ui'
import installCommand from '../snippets/install.sh?raw'

export default function QuickStart() {
  const { t } = useTranslation()

  const steps = [
    { id: 'install', label: t('quickStart.steps.install'), command: installCommand.trim() },
    { id: 'create', label: t('quickStart.steps.create'), command: 'water create counter' },
    { id: 'run', label: t('quickStart.steps.run'), command: 'cd counter && water run' },
  ]

  const elsewhere = [
    { id: 'ios', label: 'iOS', command: 'water run --platform ios' },
    { id: 'android', label: 'Android', command: 'water run --platform android' },
    { id: 'linux', label: 'Linux · Hydrolysis', command: 'water run --platform linux --backend hydrolysis' },
  ]

  const tools = ['doctor', 'devices', 'update'] as const

  return (
    <section id="quick-start" className="border-t border-rule py-20 md:py-28">
      <Frame>
        <Heading number="07" label={t('quickStart.label')} title={t('quickStart.title')} lead={t('quickStart.lead')} />
        <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Terminal commands={steps} title="shell" />
          </div>
          <div className="space-y-10 lg:col-span-5">
            <div>
              <p className="mb-3 font-mono text-[12px] text-ink-2">{t('quickStart.elsewhere')}</p>
              <Terminal commands={elsewhere} title="shell" />
            </div>
            <dl className="border-t border-ink/80">
              {tools.map((tool) => (
                <div key={tool} className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-rule py-3">
                  <dt className="font-mono text-[13.5px] font-semibold">water {tool}</dt>
                  <dd className="text-[14.5px] text-ink-2">{t(`quickStart.tools.${tool}`)}</dd>
                </div>
              ))}
            </dl>
            <div>
              <p className="text-[17px] leading-relaxed">{t('quickStart.shipping')}</p>
              <a
                href="https://github.com/water-rs/waterui#shipping-a-real-app"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex h-11 items-center border border-ink/80 px-4 text-[15px] font-semibold transition-colors hover:bg-ink hover:text-paper"
              >
                {t('quickStart.shippingLink')} ↗
              </a>
            </div>
          </div>
        </div>
      </Frame>
    </section>
  )
}
