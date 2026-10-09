import demos from './demos.json'

/** The hosted WebAssembly bundle of `id`. */
export function demoUrl(id: string): string {
  return `/demo/${id}/index.html`
}

/** The source the hosted bundle was built from: the pinned revision, not a moving branch. */
export function demoSource(id: string): string {
  return `https://github.com/water-rs/waterui/tree/${demos.waterui}/examples/${id}`
}
