import { useLayoutEffect, useRef, useState, type ElementType, type ReactNode } from 'react'

type Rect = { x: number; y: number; width: number; height: number }

type Geometry = {
  padding: { top: number; right: number; bottom: number; left: number }
  gaps: Rect[]
}

/** The container's padding and the spacing between consecutive children of a flex stack, which the outline hatches. */
function measure(element: HTMLElement): Geometry {
  const style = getComputedStyle(element)
  const padding = {
    top: parseFloat(style.paddingTop),
    right: parseFloat(style.paddingRight),
    bottom: parseFloat(style.paddingBottom),
    left: parseFloat(style.paddingLeft),
  }
  const gaps: Rect[] = []
  if (style.display.includes('flex')) {
    const vertical = style.flexDirection.startsWith('column')
    const origin = element.getBoundingClientRect()
    const children = Array.from(element.children)
      .filter((child): child is HTMLElement => child instanceof HTMLElement && child.dataset.outlineOverlay === undefined)
      .map((child) => child.getBoundingClientRect())
      .filter((rect) => rect.width > 0 && rect.height > 0)
    for (let index = 1; index < children.length; index += 1) {
      const previous = children[index - 1]
      const next = children[index]
      if (vertical) {
        const size = next.top - previous.bottom
        if (size >= 6) {
          gaps.push({ x: padding.left, y: previous.bottom - origin.top, width: origin.width - padding.left - padding.right, height: size })
        }
      } else if (Math.abs(next.top - previous.top) < 1) {
        const size = next.left - previous.right
        if (size >= 6) {
          gaps.push({ x: previous.right - origin.left, y: padding.top, width: size, height: origin.height - padding.top - padding.bottom })
        }
      }
    }
  }
  return { padding, gaps }
}

/** A box with less top padding than this has no room for its tags inside, so they sit on its top edge, outside. */
const INSIDE_TAG_MIN_PADDING = 16

type OutlineProps = {
  /** What the framed figure shows, e.g. a platform name; omitted for a purely decorative frame. */
  label?: string
  /** A fact about the figure, e.g. a capture's own size; never a measurement of the page. */
  readout?: string
  as?: ElementType
  className?: string
  children?: ReactNode
}

/**
 * The page's frame motif: an outline in the guide colour with its padding and
 * stack spacing hatched. Tags appear only when the caller names what the
 * figure shows.
 */
export function Outline({ label, readout, as: Element = 'div', className = '', children }: OutlineProps) {
  const ref = useRef<HTMLElement>(null)
  const [geometry, setGeometry] = useState<Geometry | null>(null)

  useLayoutEffect(() => {
    const element = ref.current
    if (element === null) {
      return
    }
    const update = () => setGeometry(measure(element))
    update()
    const observer = new ResizeObserver(update)
    observer.observe(element)
    for (const child of Array.from(element.children)) {
      observer.observe(child)
    }
    return () => observer.disconnect()
  }, [])

  const strip = 'hatch absolute'
  const edge = geometry !== null && geometry.padding.top >= INSIDE_TAG_MIN_PADDING ? 'top-0' : 'bottom-full'
  return (
    <Element ref={ref} className={`relative ${className}`}>
      {children}
      {geometry === null ? null : (
        <span data-outline-overlay="" className="pointer-events-none absolute inset-0 z-10 select-none" aria-hidden>
          {geometry.padding.top > 0 ? <span className={`${strip} top-0 right-0 left-0`} style={{ height: geometry.padding.top }} /> : null}
          {geometry.padding.bottom > 0 ? <span className={`${strip} right-0 bottom-0 left-0`} style={{ height: geometry.padding.bottom }} /> : null}
          {geometry.padding.left > 0 ? (
            <span className={`${strip} left-0`} style={{ top: geometry.padding.top, bottom: geometry.padding.bottom, width: geometry.padding.left }} />
          ) : null}
          {geometry.padding.right > 0 ? (
            <span className={`${strip} right-0`} style={{ top: geometry.padding.top, bottom: geometry.padding.bottom, width: geometry.padding.right }} />
          ) : null}
          {geometry.gaps.map((gap) => (
            <span key={`${gap.x}-${gap.y}`} className={strip} style={{ left: gap.x, top: gap.y, width: gap.width, height: gap.height }} />
          ))}
          <span className="absolute inset-0 border border-guide" />
          {label === undefined ? null : <span className={`readout absolute ${edge} left-0 bg-guide px-1.5 text-guide-ink`}>{label}</span>}
          {readout === undefined ? null : <span className={`readout absolute ${edge} right-0 bg-paper px-1.5 text-guide`}>{readout}</span>}
        </span>
      )}
    </Element>
  )
}
