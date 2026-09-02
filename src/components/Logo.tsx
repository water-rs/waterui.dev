import type { SVGProps } from 'react'

/** The stroke geometry of docs/logo.svg in the WaterUI repository, scaled to a 200-unit box. */
const LEFT_CHEVRON = 'M46 80 L18 100 L46 120'
const RIGHT_CHEVRON = 'M154 80 L182 100 L154 120'
const LEFT_HASH = ['M67 74 L62 126', 'M80 74 L75 126', 'M56.5 90 L87.5 90', 'M54.5 110 L85.5 110']
const RIGHT_HASH = ['M125 74 L120 126', 'M138 74 L133 126', 'M114.5 90 L145.5 90', 'M112.5 110 L143.5 110']
const BOND = 'M93 100 L107 100'

const STROKE = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

type MarkProps = SVGProps<SVGSVGElement> & { title?: string }

/** The full `<#-#>` mark. */
export function Mark({ title, ...props }: MarkProps) {
  return (
    <svg viewBox="12 66 176 68" aria-hidden={title === undefined} role={title === undefined ? undefined : 'img'} {...props}>
      {title === undefined ? null : <title>{title}</title>}
      <g {...STROKE}>
        <path d={LEFT_CHEVRON} />
        <path d={RIGHT_CHEVRON} />
        {LEFT_HASH.map((d) => (
          <path key={d} d={d} />
        ))}
        {RIGHT_HASH.map((d) => (
          <path key={d} d={d} />
        ))}
        <path d={BOND} />
      </g>
    </svg>
  )
}

/** One `#` glyph from the mark, used wherever a node in a data flow is drawn. */
export function Hash(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="50 68 42 64" aria-hidden {...props}>
      <g {...STROKE}>
        {LEFT_HASH.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </svg>
  )
}

/** One chevron from the mark. */
export function Chevron({ direction, ...props }: SVGProps<SVGSVGElement> & { direction: 'left' | 'right' }) {
  return (
    <svg viewBox={direction === 'left' ? '12 74 40 52' : '148 74 40 52'} aria-hidden {...props}>
      <g {...STROKE}>
        <path d={direction === 'left' ? LEFT_CHEVRON : RIGHT_CHEVRON} />
      </g>
    </svg>
  )
}
