import type { ReactNode } from 'react'

/** The page's measure: a centred column with the 16px phone gutter. */
export function Frame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1280px] px-4 sm:px-8 ${className}`}>{children}</div>
}

/** A section's heading block: its name as an eyebrow, then the statement and the lead. */
export function Heading({ label, title, lead, className = '' }: { label: string; title: ReactNode; lead?: ReactNode; className?: string }) {
  return (
    <header className={className}>
      <p className="text-[17px] font-semibold text-guide">{label}</p>
      <h2 className="display mt-4 text-[clamp(40px,6vw,84px)]">{title}</h2>
      {lead === undefined ? null : <p className="mt-6 max-w-[46ch] text-[clamp(19px,1.7vw,22px)] leading-[1.45] text-ink-2">{lead}</p>}
    </header>
  )
}

/** A figure caption, with an optional status in front of it (an interactive figure's live readout). */
export function Caption({ status, children, className = '' }: { status?: string; children: ReactNode; className?: string }) {
  return (
    <p className={`pt-3 text-[15px] leading-relaxed text-ink-2 ${className}`}>
      {status === undefined ? null : <span className="mr-2 font-semibold text-guide">{status}</span>}
      {children}
    </p>
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

/** A point in a list of claims: its icon in a tinted tile, the title, and optionally a line or two of body. */
export function Point({ icon, title, children, className = '' }: { icon: ReactNode; title: ReactNode; children?: ReactNode; className?: string }) {
  return (
    <li className={`flex gap-4 ${children === undefined ? 'items-center' : ''} ${className}`}>
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-guide-soft text-guide">{icon}</span>
      <div>
        <h3 className="text-[18px] leading-snug font-semibold tracking-[-0.01em]">{title}</h3>
        {children === undefined ? null : <p className="mt-1 text-[16px] leading-relaxed text-ink-2">{children}</p>}
      </div>
    </li>
  )
}
