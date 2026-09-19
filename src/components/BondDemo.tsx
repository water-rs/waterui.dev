import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Chevron, Hash } from './Logo'
import Code from './Code'
import bondSnippet from '../snippets/bond.rs?raw'

/** Between autoplay ticks while nobody has touched the demo. */
const AUTOPLAY_MS = 2400

/**
 * The mark, animated: a Binding on the left `#`, a view on the right `#`, and the
 * bond between them lighting up on each change. This is exactly what
 * `text!("Count: {count}")` does, so the demo runs the counter from the README.
 * The view reads the binding in the same render; the pulse is decoration, not latency.
 */
export default function BondDemo() {
  const { t } = useTranslation()
  const [count, setCount] = useState(0)
  const [pulse, setPulse] = useState(0)
  const [touched, setTouched] = useState(false)

  const change = useCallback((delta: number) => {
    setCount((current) => current + delta)
    setPulse((current) => current + 1)
  }, [])

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

  const stepperButton =
    'h-10 w-9 text-lg text-ink-muted transition-colors select-none hover:bg-water-soft hover:text-water sm:w-10'

  return (
    <div className="rounded-lg border border-line bg-surface p-5 shadow-[0_1px_0_var(--line)] md:p-6">
      <div className="flex items-stretch gap-2 md:gap-4">
        <Chevron direction="left" className="hidden h-16 w-10 shrink-0 self-center text-ink-faint sm:block" />

        {/* Binding node */}
        <div className="flex min-w-0 flex-1 flex-col items-center gap-3">
          <Hash className={`h-12 w-8 text-ink ${pulse > 0 ? 'animate-node-flash' : ''}`} key={`a-${pulse}`} />
          <div className="flex items-center rounded-md border border-line-strong font-mono">
            <button type="button" onClick={() => interact(-1)} aria-label={t('bond.decrement')} className={stepperButton}>
              −
            </button>
            <output className="min-w-12 border-x border-line-strong px-3 text-center text-lg tabular-nums select-none" aria-live="off">
              {count}
            </output>
            <button type="button" onClick={() => interact(1)} aria-label={t('bond.increment')} className={stepperButton}>
              +
            </button>
          </div>
          <p className="font-mono text-[11px] text-ink-faint">{t('bond.binding')}</p>
        </div>

        {/* Bond */}
        <div className="flex w-8 shrink-0 items-center sm:w-16 md:w-28">
          <div className="relative h-0.5 w-full rounded-full bg-line-strong">
            {pulse > 0 ? <div key={pulse} className="absolute inset-0 origin-left rounded-full bg-water animate-bond-pulse" /> : null}
          </div>
        </div>

        {/* View node */}
        <div className="flex min-w-0 flex-1 flex-col items-center gap-3">
          <Hash className={`h-12 w-8 text-ink ${pulse > 0 ? 'animate-node-flash [animation-delay:120ms]' : ''}`} key={`b-${pulse}`} />
          <div className="flex h-10 items-center rounded-md border border-line-strong px-3 font-mono text-lg whitespace-nowrap tabular-nums select-none sm:px-4">
            Count: {count}
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
