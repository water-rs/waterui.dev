import type { AnchorHTMLAttributes, ReactNode } from 'react'

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant: 'primary' | 'secondary'
  children: ReactNode
}

/**
 * Links styled as buttons. On hover the mark's chevrons close in from both sides,
 * the same gesture the logo makes around `#-#`.
 */
export default function ButtonLink({ variant, children, className = '', ...props }: ButtonLinkProps) {
  const palette =
    variant === 'primary'
      ? 'bg-ink text-paper hover:bg-water hover:text-water-ink'
      : 'border border-line-strong text-ink hover:border-water hover:text-water'
  return (
    <a
      className={`group inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 font-mono text-sm font-medium transition-colors ${palette} ${className}`}
      {...props}
    >
      <span
        aria-hidden
        className="inline-block -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
      >
        &lt;
      </span>
      {children}
      <span
        aria-hidden
        className="inline-block translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
      >
        &gt;
      </span>
    </a>
  )
}
