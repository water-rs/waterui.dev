import { useTranslation } from 'react-i18next'
import Section from './Section'
import Code from './Code'
import ButtonLink from './Button'
import { examples } from '../data/examples'
import runExample from '../snippets/run-example.sh?raw'

export default function Gallery() {
  const { t } = useTranslation()

  return (
    <Section id="examples" eyebrow={t('gallery.eyebrow')} title={t('gallery.title')} lead={t('gallery.lead')}>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {examples.map((example) => (
          <li key={example.id} className="group overflow-hidden rounded-lg border border-line bg-surface transition-colors hover:border-line-strong">
            <a
              href={`https://github.com/water-rs/waterui/tree/main/examples/${example.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="aspect-[4/3] overflow-hidden border-b border-line bg-paper">
                <img
                  src={example.image}
                  width={example.width}
                  height={example.height}
                  alt={t(`gallery.items.${example.id}`)}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="flex items-start justify-between gap-4 p-5">
                <div>
                  <h3 className="font-mono text-base font-semibold">{example.id}</h3>
                  <p className="mt-1 text-sm text-ink-muted">{t(`gallery.items.${example.id}`)}</p>
                </div>
                <span className="shrink-0 rounded border border-line px-2 py-0.5 font-mono text-[11px] text-ink-faint">{example.platform}</span>
              </div>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-7">
          <p className="mb-3 font-mono text-xs tracking-wider text-ink-faint uppercase">{t('gallery.runOne')}</p>
          <Code code={runExample} language="bash" />
        </div>
        <div className="lg:col-span-5 lg:pt-7">
          <ButtonLink variant="primary" href="https://github.com/water-rs/waterui/tree/main/examples" target="_blank" rel="noopener noreferrer">
            {t('gallery.viewAll')}
          </ButtonLink>
        </div>
      </div>
    </Section>
  )
}
