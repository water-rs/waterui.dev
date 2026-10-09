import demos from './demos.json'

/**
 * Backend × example screenshots staged under public/examples/<backend>/<id>.webp.
 *
 * The Apple and GTK4 frames come from those backends' nightly end-to-end
 * workflows: the packaged example's settled first frame on a real simulator,
 * Mac or Xvfb session. The Hydrolysis frames are the deployed web build of the
 * example, captured in a browser; every one of those also runs in the page.
 *
 * A capture that does not show the example's own UI is never shown. It is
 * listed under `withheld` with the issue tracking the defect, and returns to
 * `shots` once the backend produces a correct frame.
 */

export type BackendId = 'ios' | 'macos' | 'hydrolysis' | 'gtk'

export type Backend = {
  id: BackendId
  /** Phones capture portrait frames; desktops and browsers capture landscape. */
  orientation: 'portrait' | 'landscape'
  /** Experimental backends are shown apart from the officially supported ones. */
  experimental: boolean
  /** The examples of this backend run in the page as well as being captured. */
  runs: boolean
}

export const backends: Backend[] = [
  { id: 'ios', orientation: 'portrait', experimental: false, runs: false },
  { id: 'macos', orientation: 'landscape', experimental: false, runs: false },
  { id: 'hydrolysis', orientation: 'landscape', experimental: false, runs: true },
  { id: 'gtk', orientation: 'landscape', experimental: true, runs: false },
]

export type Example = {
  id: string
  /** Backends whose capture of this example is a correct settled frame. */
  shots: readonly BackendId[]
  /** Backends whose capture is broken, with the issue that tracks it. */
  withheld: Partial<Record<BackendId, string>>
  /** Repository root when the example does not live in water-rs/waterui. */
  source?: string
}

export function shotUrl(backend: BackendId, id: string): string {
  return `/examples/${backend}/${id}.webp`
}

export function sourceUrl(example: Example): string {
  return example.source ?? `https://github.com/water-rs/waterui/tree/dev/examples/${example.id}`
}

type Native = Exclude<BackendId, 'hydrolysis'>

const NATIVE: readonly Native[] = ['ios', 'macos', 'gtk']
// The native WebView needs a platform web engine; GTK4's is not wired up.
const WEBVIEW_BACKENDS: readonly Native[] = ['ios', 'macos']
const APPLE: readonly Native[] = ['ios', 'macos']
const MACOS_ONLY: readonly Native[] = ['macos']
const NONE: readonly Native[] = []

const REPLY_COMPACT = 'https://github.com/water-rs/waterui/issues/1345'
const GTK_BLACK = 'https://github.com/water-rs/gtk-backend/issues/67'
const GTK_SURFACE_HOLE = 'https://github.com/water-rs/gtk-backend/issues/93'
const NO_CAMERA = 'https://github.com/water-rs/waterui.dev/issues/10'

/** The native backends' nightly captures, for the examples whose set differs from every native backend. */
const native: Record<string, { captured: readonly Native[]; withheld?: Example['withheld'] }> = {
  video_player: { captured: NATIVE, withheld: { gtk: GTK_SURFACE_HOLE } },
  reply: { captured: NATIVE, withheld: { ios: REPLY_COMPACT } },
  'typography-rtl': { captured: NATIVE, withheld: { gtk: GTK_BLACK } },
  webview: { captured: WEBVIEW_BACKENDS },
  stress: { captured: NATIVE, withheld: { gtk: GTK_BLACK } },
  waterkit_camera_filters: { captured: NATIVE, withheld: { ios: NO_CAMERA, macos: NO_CAMERA, gtk: NO_CAMERA } },
  chromium: { captured: MACOS_ONLY },
  'webview-cef': { captured: MACOS_ONLY },
  // Newer than the native nightlies' capture set.
  anchored_overlay: { captured: NONE },
  keyboard_panel: { captured: NONE },
  multi_scene: { captured: NONE },
}

function example(id: string, captured: readonly BackendId[], withheld: Example['withheld'] = {}, source?: string): Example {
  return { id, shots: captured.filter((backend) => withheld[backend] === undefined), withheld, source }
}

const nativeCaptures = (id: string) => native[id] ?? { captured: NATIVE }

/**
 * Every example of the pinned waterui revision: first the ones that also run
 * on Hydrolysis in the page, then the ones a waterui issue still keeps out of
 * the browser, then the ones that embed a desktop browser engine and so run
 * only on desktop Hydrolysis, then the examples kept in other repositories.
 */
export const examples: Example[] = [
  ...demos.examples.map((id) => {
    const capture = nativeCaptures(id)
    return example(id, [...capture.captured, 'hydrolysis'], capture.withheld)
  }),
  ...[...Object.keys(demos.blocked), ...demos.desktopOnly].map((id) => {
    const capture = nativeCaptures(id)
    return example(id, capture.captured, capture.withheld)
  }),
  example('liquid_glass', APPLE, {}, 'https://github.com/water-rs/apple-backend/tree/dev/Examples/liquid_glass'),
]

/** The examples that cannot run in a browser: they embed a desktop browser engine. */
export const desktopOnly: readonly string[] = demos.desktopOnly

/** The examples a waterui issue still keeps out of the browser, with that issue. */
export const blocked: readonly { id: string; issue: string }[] = Object.entries(demos.blocked).map(([id, issue]) => ({
  id,
  issue: `https://github.com/water-rs/waterui/issues/${issue}`,
}))

/** The `water preview` output shown in the previews section. */
export const previewShot = {
  id: 'gallery',
  image: '/preview/gallery.webp',
  width: 1800,
  height: 1280,
} as const
