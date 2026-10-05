import type { ReactNode } from 'react'
import { Box } from './inspector'

/** The page's measure: a centred column with the 16px phone gutter. */
export function Frame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1280px] px-4 sm:px-8 ${className}`}>{children}</div>
}

/** A section's heading block: its number and name in the readout face, then the statement and the lead. */
export function Heading({ number, label, title, lead, className = '' }: { number: string; label: string; title: ReactNode; lead?: ReactNode; className?: string }) {
  return (
    <Box kind="VStack" as="header" className={`grid gap-6 md:grid-cols-12 md:gap-8 ${className}`}>
      <p className="font-mono text-[12px] text-ink-2 md:col-span-3 md:pt-3">
        <span className="mr-2 text-guide">{number}</span>
        {label}
      </p>
      <div className="md:col-span-9">
        <h2 className="display text-[clamp(38px,6vw,84px)]">{title}</h2>
        {lead === undefined ? null : <p className="mt-6 max-w-[48ch] text-[clamp(18px,1.6vw,21px)] leading-[1.45] text-ink-2">{lead}</p>}
      </div>
    </Box>
  )
}

/** A figure caption: a short mono tag, the caption, and an optional note on the right. */
export function Caption({ tag, children, note, className = '' }: { tag?: string; children: ReactNode; note?: ReactNode; className?: string }) {
  return (
    <div className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pt-2.5 ${className}`}>
      <p className="text-[13.5px] leading-5 text-ink-2">
        {tag === undefined ? null : <span className="mr-2 font-mono text-[11.5px] text-ink-3">{tag}</span>}
        {children}
      </p>
      {note === undefined ? null : <p className="font-mono text-[11.5px] leading-5 text-ink-3">{note}</p>}
    </div>
  )
}

const button = 'inline-flex h-12 items-center px-5 text-[16px] font-semibold transition-colors'

/** The page's primary action: solid ink. */
export function PrimaryLink({ href, children, external = false }: { href: string; children: ReactNode; external?: boolean }) {
  return (
    <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} className={`${button} bg-ink text-paper hover:bg-guide hover:text-guide-ink`}>
      {children}
    </a>
  )
}

/** A secondary action: outlined. */
export function SecondaryLink({ href, children, external = false }: { href: string; children: ReactNode; external?: boolean }) {
  return (
    <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} className={`${button} border border-ink/80 hover:border-guide hover:text-guide`}>
      {children}
    </a>
  )
}
