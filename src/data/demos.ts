import demos from './demos.json'

/** Whether any example runs in the page; the hero's call to run one reads this. */
export const hasLiveDemos = demos.examples.length > 0

/** Whether `id` builds for the Hydrolysis web backend and is hosted here. */
export function runsLive(id: string): boolean {
  return demos.examples.includes(id)
}

/** The hosted WebAssembly bundle of `id`. */
export function demoUrl(id: string): string {
  return `/demo/${id}/index.html`
}

/** The source the hosted bundle was built from: the pinned revision, not a moving branch. */
export function demoSource(id: string): string {
  return `https://github.com/water-rs/waterui/tree/${demos.waterui}/examples/${id}`
}
