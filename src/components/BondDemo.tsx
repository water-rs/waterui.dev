import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Chevron, Hash } from './Logo'
import Code from './Code'
import bondSnippet from '../snippets/bond.rs?raw'

/** How long the pulse takes to travel the bond; must match --animate-bond-pulse. */
const TRAVEL_MS = 420
/** Between autoplay ticks while nobody has touched the demo. */
const AUTOPLAY_MS = 2400

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * The mark, animated: a Binding on the left `#`, a view on the right `#`, and the
 * bond between them carrying the change. This is exactly what `text!("Count: {count}")`
 * does, so the demo runs the counter from the README rather than a metaphor.
 */
export default function BondDemo() {
  const { t } = useTranslation()
  const [count, setCount] = useState(0)
  const [rendered, setRendered] = useState(0)
  const [pulse, setPulse] = useState(0)
  const [touched, setTouched] = useState(false)
  const latest = useRef(0)
  const arrival = useRef<number | undefined>(undefined)

  /** Moves the binding and schedules the view to catch up when the pulse lands. */
  const change = useCallback((delta: number) => {
    const next = latest.current + delta
    latest.current = next
    setCount(next)
    setPulse((current) => current + 1)
    window.clearTimeout(arrival.current)
    if (prefersReducedMotion()) {
      setRendered(next)
      return
    }
    arrival.current = window.setTimeout(() => setRendered(next), TRAVEL_MS - 40)
  }, [])

  useEffect(() => () => window.clearTimeout(arrival.current), [])

  useEffect(() => {
    if (touched) {
      return
    }
    const interval = window.setInterval(() => {
      if (!document.hidden) {
        change(1)
      }
    }, AUTOPLAY_MS)
    return () => window.clearInterval(interval)
  }, [touched, change])

  const interact = (delta: number) => {
    setTouched(true)
    change(delta)
  }

  return (
    <div className="rounded-lg border border-line bg-surface p-5 shadow-[0_1px_0_var(--line)] md:p-6">
      <div className="flex items-stretch gap-2 md:gap-4">
        <Chevron direction="left" className="hidden h-16 w-10 shrink-0 self-center text-ink-faint sm:block" />

        {/* Binding node */}
        <div className="flex min-w-0 flex-1 flex-col items-center gap-3">
          <Hash className={`h-12 w-8 text-ink ${pulse > 0 ? 'animate-node-flash' : ''}`} key={`a-${pulse}`} />
          <div className="flex items-center rounded-md border border-line-strong font-mono">
            <button
              type="button"
              onClick={() => interact(-1)}
              aria-label={t('bond.decrement')}
              className="h-10 w-9 text-lg text-ink-muted transition-colors hover:bg-water-soft hover:text-water sm:w-10"
            >
              −
            </button>
            <output className="min-w-12 border-x border-line-strong px-3 text-center text-lg tabular-nums" aria-live="off">
              {count}
            </output>
            <button
              type="button"
              onClick={() => interact(1)}
              aria-label={t('bond.increment')}
              className="h-10 w-9 text-lg text-ink-muted transition-colors hover:bg-water-soft hover:text-water sm:w-10"
            >
              +
            </button>
          </div>
          <p className="font-mono text-[11px] text-ink-faint">{t('bond.binding')}</p>
        </div>

        {/* Bond */}
        <div className="flex w-8 shrink-0 items-center sm:w-16 md:w-28">
          <svg viewBox="0 0 100 8" className="h-2 w-full" aria-hidden preserveAspectRatio="none">
            <line x1="0" y1="4" x2="100" y2="4" stroke="var(--line-strong)" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            {pulse > 0 ? (
              <line
                key={pulse}
                x1="0"
                y1="4"
                x2="100"
                y2="4"
                pathLength={1}
                strokeDasharray="1"
                stroke="var(--water)"
                strokeWidth="3"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                className="animate-bond-pulse"
              />
            ) : null}
          </svg>
        </div>

        {/* View node */}
        <div className="flex min-w-0 flex-1 flex-col items-center gap-3">
          <Hash className={`h-12 w-8 text-ink ${pulse > 0 ? 'animate-node-flash [animation-delay:380ms]' : ''}`} key={`b-${pulse}`} />
          <div className="flex h-10 items-center rounded-md border border-line-strong px-3 font-mono text-lg whitespace-nowrap tabular-nums sm:px-4">
            Count: {rendered}
          </div>
          <p className="font-mono text-[11px] text-ink-faint">{t('bond.view')}</p>
        </div>

        <Chevron direction="right" className="hidden h-16 w-10 shrink-0 self-center text-ink-faint sm:block" />
      </div>

      <div className="mt-5 border-t border-line pt-4">
        <Code code={bondSnippet} language="rust" className="border-0 bg-transparent [&_pre]:p-0 [&_pre]:text-xs" />
        <p className="mt-3 text-sm text-ink-muted">{t('bond.caption')}</p>
      </div>
    </div>
  )
}
