import { useCallback, useLayoutEffect, useMemo, useRef, useState, type ElementType, type ReactNode } from 'react'
import { InspectorContext, useInspector } from './inspectorContext'

/** WaterUI's `StretchAxis`, as the inspector labels it. */
export type Stretch = 'Horizontal' | 'Vertical' | 'Both'

const STRETCH_GLYPH: Record<Stretch, string> = {
  Horizontal: '↔',
  Vertical: '↕',
  Both: '↔↕',
}

const STORAGE_KEY = 'waterui.inspector'

function readStored(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'on'
  } catch {
    return false
  }
}

/** Holds the page-wide "inspect layout" switch; the choice is remembered per visitor. */
export function InspectorProvider({ children }: { children: ReactNode }) {
  const [on, setOn] = useState(readStored)
  const toggle = useCallback(() => {
    setOn((current) => {
      const next = !current
      try {
        window.localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off')
      } catch {
        // Storage can be unavailable (private windows, blocked site data); the switch still works for this visit.
      }
      return next
    })
  }, [])
  const value = useMemo(() => ({ on, toggle }), [on, toggle])
  return <InspectorContext.Provider value={value}>{children}</InspectorContext.Provider>
}

type Rect = { x: number; y: number; width: number; height: number }

type Measurement = {
  width: number
  height: number
  padding: { top: number; right: number; bottom: number; left: number }
  gaps: (Rect & { size: number; vertical: boolean })[]
}

/**
 * The real geometry of a container: its border-box size, its padding, and the
 * spacing between consecutive children of a flex stack. These are the numbers
 * the overlay prints, so they change as the page resizes.
 */
function measure(element: HTMLElement): Measurement {
  const style = getComputedStyle(element)
  const padding = {
    top: parseFloat(style.paddingTop),
    right: parseFloat(style.paddingRight),
    bottom: parseFloat(style.paddingBottom),
    left: parseFloat(style.paddingLeft),
  }
  const gaps: Measurement['gaps'] = []
  if (style.display.includes('flex')) {
    const vertical = style.flexDirection.startsWith('column')
    const origin = element.getBoundingClientRect()
    const children = Array.from(element.children)
      .filter((child): child is HTMLElement => child instanceof HTMLElement && child.dataset.inspectorOverlay === undefined)
      .map((child) => child.getBoundingClientRect())
      .filter((rect) => rect.width > 0 && rect.height > 0)
    for (let index = 1; index < children.length; index += 1) {
      const previous = children[index - 1]
      const next = children[index]
      if (vertical) {
        const size = next.top - previous.bottom
        if (size >= 6) {
          gaps.push({ x: padding.left, y: previous.bottom - origin.top, width: origin.width - padding.left - padding.right, height: size, size, vertical })
        }
      } else if (Math.abs(next.top - previous.top) < 1) {
        const size = next.left - previous.right
        if (size >= 6) {
          gaps.push({ x: previous.right - origin.left, y: padding.top, width: size, height: origin.height - padding.top - padding.bottom, size, vertical })
        }
      }
    }
  }
  return { width: element.offsetWidth, height: element.offsetHeight, padding, gaps }
}

/** Below this width a box shows its name without its size. */
const READOUT_MIN_WIDTH = 150

/** A box with less top padding than this has no room for its tags inside, so they sit on its top edge, outside. */
const INSIDE_TAG_MIN_PADDING = 16

function Overlay({ label, readout, measurement, quiet }: { label: string; readout: string; measurement: Measurement; quiet: boolean }) {
  const { padding, gaps } = measurement
  const strip = 'hatch absolute'
  // Inside, the tags would cover the box's own content; above the edge they label it the way a layout debugger does.
  const edge = padding.top >= INSIDE_TAG_MIN_PADDING ? 'top-0' : 'bottom-full'
  return (
    <span data-inspector-overlay="" className="pointer-events-none absolute inset-0 z-10 select-none" aria-hidden>
      {padding.top > 0 ? <span className={`${strip} top-0 right-0 left-0`} style={{ height: padding.top }} /> : null}
      {padding.bottom > 0 ? <span className={`${strip} right-0 bottom-0 left-0`} style={{ height: padding.bottom }} /> : null}
      {padding.left > 0 ? <span className={`${strip} left-0`} style={{ top: padding.top, bottom: padding.bottom, width: padding.left }} /> : null}
      {padding.right > 0 ? <span className={`${strip} right-0`} style={{ top: padding.top, bottom: padding.bottom, width: padding.right }} /> : null}
      {/* In a vertical stack the number sits at the top of the gap, clear of the next box's tags above its edge. */}
      {gaps.map((gap) => (
        <span key={`${gap.x}-${gap.y}`} className={`${strip} flex justify-center ${gap.vertical ? 'items-start' : 'items-center'}`} style={{ left: gap.x, top: gap.y, width: gap.width, height: gap.height }}>
          {Math.min(gap.width, gap.height) >= 16 ? <span className="readout bg-paper px-1 text-guide">{Math.round(gap.size)}</span> : null}
        </span>
      ))}
      <span className={`absolute inset-0 border ${quiet ? 'border-guide/45' : 'border-guide'}`} />
      <span className={`readout absolute ${edge} left-0 bg-guide px-1.5 text-guide-ink`}>{label}</span>
      {/* A narrow box has room for its name only; the size would cover it. */}
      {measurement.width >= READOUT_MIN_WIDTH ? <span className={`readout absolute ${edge} right-0 bg-paper px-1.5 text-guide`}>{readout}</span> : null}
    </span>
  )
}

type BoxProps = {
  /** The WaterUI container this element stands for, e.g. `VStack`. */
  kind: string
  stretch?: Stretch
  /** Drawn whether or not the visitor has switched the inspector on. */
  always?: boolean
  /** Replaces the measured size, for a box whose subject has its own geometry (a capture). */
  readout?: string
  /** Draws a lighter outline, for boxes nested inside another drawn box. */
  quiet?: boolean
  as?: ElementType
  className?: string
  children?: ReactNode
}

/**
 * An element of the page drawn as the WaterUI container it stands for. With
 * the inspector on (or `always`), it shows its outline, its name, its stretch
 * axis, its measured size, and its padding and stack spacing as hatching.
 */
export function Box({ kind, stretch, always = false, readout, quiet = false, as: Element = 'div', className = '', children }: BoxProps) {
  const { on } = useInspector()
  const visible = always || on
  const ref = useRef<HTMLElement>(null)
  const [measurement, setMeasurement] = useState<Measurement | null>(null)

  useLayoutEffect(() => {
    const element = ref.current
    if (!visible || element === null) {
      return
    }
    const update = () => setMeasurement(measure(element))
    update()
    const observer = new ResizeObserver(update)
    observer.observe(element)
    for (const child of Array.from(element.children)) {
      observer.observe(child)
    }
    return () => observer.disconnect()
  }, [visible])

  const label = stretch === undefined ? kind : `${kind} ${STRETCH_GLYPH[stretch]}`
  return (
    <Element ref={ref} className={`relative ${className}`}>
      {children}
      {visible && measurement !== null ? (
        <Overlay label={label} readout={readout ?? `${Math.round(measurement.width)} × ${Math.round(measurement.height)}`} measurement={measurement} quiet={quiet} />
      ) : null}
    </Element>
  )
}

/** The navigation switch that draws every container on the page. */
export function InspectorSwitch({ label }: { label: string }) {
  const { on, toggle } = useInspector()
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={toggle}
      className={`flex h-9 items-center gap-2 border px-3 font-mono text-[12px] transition-colors ${
        on ? 'border-guide bg-guide text-guide-ink' : 'border-rule text-ink-2 hover:border-guide hover:text-guide'
      }`}
    >
      <span className={`h-2 w-2 border ${on ? 'border-guide-ink bg-guide-ink' : 'border-current'}`} aria-hidden />
      {label}
    </button>
  )
}
