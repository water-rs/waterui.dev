import type { ReactNode } from 'react'

type SectionProps = {
  id: string
  eyebrow: string
  title: string
  lead: string
  children: ReactNode
  className?: string
}

/**
 * Every section shares the same header: a numbered eyebrow, a mono title wrapped in
 * the mark's chevrons, and one lead sentence. Layout inside is up to the caller.
 */
export default function Section({ id, eyebrow, title, lead, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`border-t border-line ${className}`}>
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <header className="mb-12 grid gap-4 md:mb-16 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="mb-3 font-mono text-xs tracking-[0.2em] text-ink-faint">{eyebrow}</p>
            <h2 className="font-mono text-3xl font-semibold tracking-tight md:text-4xl">
              <span className="mr-1 text-water" aria-hidden>
                &lt;
              </span>
              {title}
              <span className="ml-1 text-water" aria-hidden>
                &gt;
              </span>
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-ink-muted md:col-span-7 md:pt-7">{lead}</p>
        </header>
        {children}
      </div>
    </section>
  )
}
