import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box } from './inspector'
import { Caption, Frame, Heading } from './ui'
import demos from '../data/demos.json'

/** Whether any example is hosted live; sections that link to the demo read this. */
export const hasLiveDemos = demos.examples.length > 0

function demoUrl(id: string): string {
  return `/demo/${id}/index.html`
}

/** The source the hosted bundle was built from: the pinned revision, not a moving branch. */
function demoSource(id: string): string {
  return `https://github.com/water-rs/waterui/tree/${demos.waterui}/examples/${id}`
}

/**
 * Hydrolysis compiles the example crate itself to WebAssembly and runs the
 * whole retained view tree on WebGPU. Each bundle loads in an iframe, so the
 * runner's single canvas stays out of the page, and only when the visitor asks
 * for it. Loaded demos stay mounted, so their state survives switching away.
 */
export default function LiveDemo() {
  const { t } = useTranslation()
  const [example, setExample] = useState(demos.examples[0])
  const [loaded, setLoaded] = useState<readonly string[]>([])

  // An empty list means no example currently builds and renders on the web
  // backend; the section is left out rather than shown without a demo.
  if (example === undefined) {
    return null
  }
  const isLoaded = loaded.includes(example)

  return (
    <section id="live" className="band-dark py-20 md:py-28">
      <Frame>
        <Heading number="09" label={t('live.label')} title={t('live.title')} lead={t('live.lead')} />

        <div className="mt-14 grid gap-6 md:mt-20 lg:grid-cols-12 lg:gap-8">
          <nav aria-label={t('live.examples')} className="lg:col-span-3">
            <ol role="tablist" className="flex flex-wrap gap-1 border-t border-ink/80 lg:flex-col lg:gap-0">
              {demos.examples.map((candidate, index) => {
                const selected = candidate === example
                return (
                  <li key={candidate} className="lg:border-b lg:border-rule">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setExample(candidate)}
                      className={`flex w-full items-baseline gap-3 px-3 py-2.5 text-left transition-colors lg:px-0 ${
                        selected ? 'bg-ink text-paper lg:bg-transparent lg:text-ink' : 'text-ink-2 hover:text-ink'
                      }`}
                    >
                      <span className="hidden font-mono text-[11px] text-ink-3 lg:inline">{String(index + 1).padStart(2, '0')}</span>
                      <span className="font-mono text-[14px] font-semibold">{candidate}</span>
                      {selected ? <span className="ml-auto hidden h-2 w-2 rounded-full bg-guide lg:inline-block" aria-hidden /> : null}
                    </button>
                  </li>
                )
              })}
            </ol>
          </nav>

          <figure className="lg:col-span-9">
            <Box kind="Hydrolysis" always readout="wasm32 · WebGPU" className="border border-rule">
              <div className="relative aspect-[3/4] bg-paper sm:aspect-[4/3] lg:aspect-[16/10]">
                {loaded.map((id) => (
                  <iframe
                    key={id}
                    src={demoUrl(id)}
                    title={t('live.frameTitle', { example: id })}
                    hidden={id !== example}
                    className="absolute inset-0 h-full w-full"
                  />
                ))}
                {isLoaded ? null : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8 text-center">
                    <p className="font-mono text-[13px] text-ink-2">wasm32-unknown-unknown · WebGPU</p>
                    <p className="text-[clamp(32px,5vw,64px)] leading-none font-[740] tracking-[-0.035em] [font-stretch:122%]">{example}</p>
                    <p className="max-w-[40ch] text-[15px] text-ink-2">{t('live.loadHint', { example })}</p>
                    <button
                      type="button"
                      onClick={() => setLoaded((current) => [...current, example])}
                      className="flex h-12 items-center bg-ink px-6 text-[16px] font-semibold text-paper transition-colors hover:bg-guide hover:text-guide-ink"
                    >
                      {t('live.load', { example })}
                    </button>
                  </div>
                )}
              </div>
            </Box>
            <Caption
              note={
                <span className="flex gap-4">
                  <a href={demoSource(example)} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-guide">
                    {t('live.source')} ↗
                  </a>
                  <a href={demoUrl(example)} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-guide">
                    {t('live.openFull')} ↗
                  </a>
                </span>
              }
            >
              {t('live.caption', { example })}
            </Caption>
          </figure>
        </div>
      </Frame>
    </section>
  )
}
