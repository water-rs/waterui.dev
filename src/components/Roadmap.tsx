import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Section from './Section'
import { fetchRoadmap, type Milestone } from '../data/roadmap'

type State = { kind: 'loading' } | { kind: 'ready'; milestones: Milestone[] } | { kind: 'failed'; error: Error }

export default function Roadmap() {
  const { t } = useTranslation()
  const [state, setState] = useState<State>({ kind: 'loading' })

  useEffect(() => {
    const controller = new AbortController()
    fetchRoadmap(controller.signal)
      .then((milestones) => setState({ kind: 'ready', milestones }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) {
          return
        }
        setState({ kind: 'failed', error: error instanceof Error ? error : new Error(String(error)) })
      })
    return () => controller.abort()
  }, [])

  return (
    <Section id="roadmap" eyebrow={t('roadmap.eyebrow')} title={t('roadmap.title')} lead={t('roadmap.lead')}>
      {state.kind === 'loading' ? (
        <p className="font-mono text-sm text-ink-faint" role="status">
          {t('roadmap.loading')}
        </p>
      ) : null}

      {state.kind === 'failed' ? (
        <div className="rounded-lg border border-line p-5 font-mono text-sm" role="alert">
          <p className="text-ink">{t('roadmap.failed')}</p>
          <p className="mt-1 text-ink-faint">{state.error.message}</p>
        </div>
      ) : null}

      {state.kind === 'ready' ? (
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {state.milestones.map((milestone) => {
            const done = milestone.items.filter((item) => item.done).length
            const complete = done === milestone.items.length && milestone.items.length > 0
            return (
              <li key={milestone.version} className={`rounded-lg border p-5 ${complete ? 'border-line bg-surface' : 'border-line-strong'}`}>
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-mono text-base font-semibold">
                    <span className="text-water">{milestone.version}</span> {milestone.title}
                  </h3>
                  <span className="shrink-0 font-mono text-[11px] text-ink-faint">{t('roadmap.done', { done, total: milestone.items.length })}</span>
                </div>
                <div className="mt-3 h-px w-full bg-line" aria-hidden>
                  <div className="h-px bg-water" style={{ width: `${milestone.items.length === 0 ? 0 : (done / milestone.items.length) * 100}%` }} />
                </div>
                <ul className="mt-4 space-y-2 text-sm">
                  {milestone.items.map((item) => (
                    <li key={item.text} className="flex gap-2.5">
                      <span className={`mt-[3px] font-mono text-xs ${item.done ? 'text-water' : 'text-ink-faint'}`} aria-hidden>
                        {item.done ? '#' : '·'}
                      </span>
                      <span className={item.done ? 'text-ink-muted' : 'text-ink'}>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ol>
      ) : null}

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
        <p className="max-w-xl text-sm text-ink-muted">{t('roadmap.status')}</p>
        <a
          href="https://github.com/water-rs/waterui/blob/dev/docs/ROADMAP.md"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm text-ink underline decoration-line-strong underline-offset-4 hover:decoration-water"
        >
          {t('roadmap.openSource')}
        </a>
      </div>
    </Section>
  )
}
