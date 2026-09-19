import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Section from './Section'
import Code from './Code'
import ButtonLink from './Button'
import { backends, examples, shotUrl, sourceUrl, type BackendId } from '../data/examples'
import runExample from '../snippets/run-example.sh?raw'

/**
 * The examples grid, one backend at a time. A segmented control switches the
 * whole grid between the captures each backend's e2e suite (or `water preview`
 * for Hydrolysis) produced for the same source example.
 */
export default function Gallery() {
  const { t } = useTranslation()
  const [backend, setBackend] = useState<BackendId>('ios')
  const active = backends.find((candidate) => candidate.id === backend) ?? backends[0]
  const visible = examples.filter((example) => example.shots.includes(backend))

  return (
    <Section id="examples" eyebrow={t('gallery.eyebrow')} title={t('gallery.title')} lead={t('gallery.lead')}>
      <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-4">
        <div role="tablist" aria-label={t('gallery.backend')} className="inline-flex flex-wrap gap-1 rounded-lg border border-line bg-surface p-1">
          {backends.map((candidate) => {
            const selected = candidate.id === backend
            return (
              <button
                key={candidate.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setBackend(candidate.id)}
                className={`rounded-md px-4 py-2 font-mono text-sm transition-colors ${
                  selected ? 'bg-ink text-paper' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {t(`gallery.backends.${candidate.id}.label`)}
              </button>
            )
          })}
        </div>
        <p className="text-sm text-ink-muted">
          {t(`gallery.backends.${active.id}.caption`)}
          <span className="mx-2 text-ink-faint" aria-hidden>
            ·
          </span>
          <span className="font-mono text-xs text-ink-faint">
            {t('gallery.shotCount', { count: visible.length })}
          </span>
        </p>
      </div>

      <ul
        role="tabpanel"
        className={`grid gap-6 ${
          active.orientation === 'portrait' ? 'grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {visible.map((example) => (
          <li key={example.id} className="group overflow-hidden rounded-lg border border-line bg-surface transition-colors hover:border-line-strong">
            <a href={sourceUrl(example)} target="_blank" rel="noopener noreferrer" className="block">
              <div
                className={`overflow-hidden border-b border-line bg-paper ${
                  active.orientation === 'portrait' ? 'aspect-[3/4]' : 'aspect-[4/3]'
                }`}
              >
                <img
                  src={shotUrl(backend, example.id)}
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
                {example.interactive && (
                  <span className="shrink-0 rounded border border-water px-2 py-0.5 font-mono text-[11px] text-water">
                    {t('gallery.liveBadge')}
                  </span>
                )}
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
