import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Section from './Section'
import { demoUrl, examples } from '../data/examples'

const interactive = examples.filter((example) => example.interactive)

/**
 * Hydrolysis compiles the example crate itself to WebAssembly and runs the
 * whole retained view tree on a canvas — not a recording. The iframe keeps the
 * runner's single `#waterui-canvas` out of the page and loads the bundle only
 * when the visitor asks for it. Loaded demos stay mounted so their running
 * state survives switching to another example and back.
 */
export default function LiveDemo() {
  const { t } = useTranslation()
  const [example, setExample] = useState(interactive[0]?.id ?? '')
  const [loaded, setLoaded] = useState<readonly string[]>([])
  const active = interactive.find((candidate) => candidate.id === example)

  if (!active) {
    return null
  }

  const isLoaded = loaded.includes(example)

  return (
    <Section id="live" eyebrow={t('live.eyebrow')} title={t('live.title')} lead={t('live.lead')}>
      <div className="mb-6 flex flex-wrap items-center gap-2" role="tablist" aria-label={t('live.examples')}>
        {interactive.map((candidate) => {
          const selected = candidate.id === example
          return (
            <button
              key={candidate.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setExample(candidate.id)}
              className={`rounded-md border px-3 py-1.5 font-mono text-sm transition-colors ${
                selected
                  ? 'border-ink bg-ink text-paper'
                  : 'border-line text-ink-muted hover:border-line-strong hover:text-ink'
              }`}
            >
              {candidate.id}
            </button>
          )
        })}
      </div>

      <div className="overflow-hidden rounded-lg border border-line bg-surface">
        <div className="relative aspect-[4/3] md:aspect-[16/10]">
          {loaded.map((id) => (
            <iframe
              key={id}
              src={demoUrl(id)}
              title={t('live.frameTitle', { example: id })}
              hidden={id !== example}
              className="absolute inset-0 h-full w-full"
            />
          ))}
          {!isLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-surface p-8 text-center hash-grid hash-grid-fade">
              <p className="max-w-md text-sm text-ink-muted">{t('live.loadHint', { example })}</p>
              <button
                type="button"
                onClick={() => setLoaded((current) => [...current, example])}
                className="rounded-md bg-ink px-5 py-3 font-mono text-sm font-medium text-paper transition-colors hover:bg-water hover:text-water-ink"
              >
                {t('live.load', { example })}
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-line px-5 py-3">
          <p className="font-mono text-xs text-ink-faint">{t('live.caption', { example })}</p>
          <a
            href={demoUrl(example)}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 font-mono text-xs text-water transition-colors hover:text-ink"
          >
            {t('live.openFull')} ↗
          </a>
        </div>
      </div>
    </Section>
  )
}
