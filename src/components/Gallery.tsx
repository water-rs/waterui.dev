import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Code from './Code'
import ExampleRunner from './ExampleRunner'
import { Frame, Heading, PrimaryLink } from './ui'
import { backends, desktopOnly, examples, shotUrl, sourceUrl, type BackendId } from '../data/examples'
import runExample from '../snippets/run-example.sh?raw'

/** Two rows of the grid at its widest: what the section shows before "Show all". */
const COLLAPSED = { portrait: 10, landscape: 6 } as const

/**
 * The examples, one backend at a time: a contact sheet of each backend's
 * captures of the same source example. Captures that do not show the example
 * are withheld, and the count of them is stated. Under Hydrolysis every
 * example also runs in the page.
 */
export default function Gallery() {
  const { t } = useTranslation()
  const [backend, setBackend] = useState<BackendId>('hydrolysis')
  const [expanded, setExpanded] = useState(false)
  const [running, setRunning] = useState<string | null>(null)
  const section = useRef<HTMLElement>(null)
  const active = backends.find((candidate) => candidate.id === backend) ?? backends[0]
  const visible = examples.filter((example) => example.shots.includes(backend))
  const withheld = examples.filter((example) => example.withheld[backend] !== undefined).length
  const portrait = active.orientation === 'portrait'
  const collapsedCount = portrait ? COLLAPSED.portrait : COLLAPSED.landscape
  const shown = expanded ? visible : visible.slice(0, collapsedCount)

  return (
    <section ref={section} id="examples" className="border-t border-rule py-20 md:py-28">
      <Frame>
        <Heading number="07" label={t('gallery.label')} title={t('gallery.title')} lead={t('gallery.lead')} />

        <div className="mt-14 flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-b border-rule md:mt-20">
          <div role="tablist" aria-label={t('gallery.backend')} className="-mb-px flex flex-wrap items-end">
            {backends.map((candidate, index) => {
              const selected = candidate.id === backend
              const firstExperimental = candidate.experimental && !backends[index - 1].experimental
              return (
                <div key={candidate.id} className="flex items-end">
                  {firstExperimental ? (
                    <span className="mr-1 ml-3 self-center border-l border-rule pl-4 font-mono text-[11px] text-ink-3 sm:ml-5">{t('gallery.experimental')}</span>
                  ) : null}
                  <button
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setBackend(candidate.id)}
                    className={`border border-b-0 px-4 py-2.5 text-[16px] font-semibold transition-colors sm:px-6 ${
                      selected ? 'border-rule bg-raised' : 'border-transparent text-ink-2 hover:text-ink'
                    } ${candidate.experimental && !selected ? 'text-ink-3' : ''}`}
                  >
                    {t(`gallery.backends.${candidate.id}.label`)}
                  </button>
                </div>
              )
            })}
          </div>
          <p className="pb-2.5 font-mono text-[12px] text-ink-2">
            {t(`gallery.backends.${active.id}.caption`)} · {t('gallery.shotCount', { count: visible.length })}
          </p>
        </div>

        <ul
          role="tabpanel"
          className={`grid gap-x-4 gap-y-8 border-x border-b border-rule bg-raised p-4 sm:p-6 ${
            portrait ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5' : 'sm:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {shown.map((example, index) => (
            <li key={example.id} className="flex flex-col">
              <a href={sourceUrl(example)} target="_blank" rel="noopener noreferrer" className="group block">
                <div className={`overflow-hidden border border-rule bg-paper ${portrait ? 'aspect-[9/19.5]' : 'aspect-[4/3]'}`}>
                  <img
                    src={shotUrl(backend, example.id)}
                    alt={t(`gallery.items.${example.id}`)}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="mt-2.5 flex items-baseline gap-2">
                  <span className="font-mono text-[11px] text-ink-3">{String(index + 1).padStart(2, '0')}</span>
                  <span className="font-mono text-[13.5px] font-semibold group-hover:text-guide">{example.id}</span>
                </p>
                <p className="mt-0.5 text-[13.5px] leading-snug text-ink-2">{t(`gallery.items.${example.id}`)}</p>
              </a>
              {active.runs ? (
                <button
                  type="button"
                  onClick={() => setRunning(example.id)}
                  aria-label={t('gallery.runLabel', { example: example.id })}
                  className="mt-2.5 flex h-8 w-fit items-center gap-2 bg-ink px-3 text-[13px] font-semibold text-paper transition-colors hover:bg-guide hover:text-guide-ink"
                >
                  <span aria-hidden>▶</span>
                  {t('gallery.run')}
                </button>
              ) : null}
            </li>
          ))}
        </ul>
        {visible.length > collapsedCount ? (
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => {
              if (expanded) {
                section.current?.scrollIntoView({ block: 'start' })
              }
              setExpanded(!expanded)
            }}
            className="flex h-12 w-full items-center justify-center border-x border-b border-rule bg-raised text-[14.5px] font-semibold transition-colors hover:bg-ink hover:text-paper"
          >
            {expanded ? t('gallery.showFewer') : t('gallery.showAll', { count: visible.length })}
          </button>
        ) : null}
        {running === null ? null : <ExampleRunner example={running} onClose={() => setRunning(null)} />}
        {withheld === 0 ? null : <p className="mt-3 font-mono text-[12px] text-ink-2">{t('gallery.withheld', { count: withheld })}</p>}
        {active.runs ? <p className="mt-3 font-mono text-[12px] text-ink-2">{t('gallery.desktopOnly', { list: desktopOnly.join(', ') })}</p> : null}

        <div className="mt-16 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-mono text-[12px] text-ink-2">{t('gallery.runOne')}</p>
            <div className="mt-4">
              <PrimaryLink href="https://github.com/water-rs/waterui/tree/dev/examples" external>
                {t('gallery.viewAll')} ↗
              </PrimaryLink>
            </div>
          </div>
          <div className="lg:col-span-8">
            <Code code={runExample} language="bash" title="shell" />
          </div>
        </div>
      </Frame>
    </section>
  )
}
