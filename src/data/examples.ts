/**
 * Backend × example screenshots staged under public/examples/<backend>/<id>.webp.
 *
 * The iOS, macOS, Android and GTK4 frames come from each backend repository's
 * nightly e2e workflow — the packaged example's settled first frame on a real
 * simulator, emulator or Xvfb session. Hydrolysis frames are rendered by the
 * workspace CLI from the example's `#[preview]` function:
 *
 *   water preview demo --backend hydrolysis --theme material3 --frame 900x640 \
 *     --path examples/<name> --output <name>.png
 *
 * See scripts/README.md for the variants `filter`, `video_player` and
 * `flow_markdown` need.
 */

export type BackendId = 'ios' | 'macos' | 'android' | 'gtk' | 'hydrolysis'

export type Backend = {
  id: BackendId
  /** Phones capture portrait frames; desktops and the preview renderer capture landscape. */
  orientation: 'portrait' | 'landscape'
}

export const backends: Backend[] = [
  { id: 'ios', orientation: 'portrait' },
  { id: 'macos', orientation: 'landscape' },
  { id: 'android', orientation: 'portrait' },
  { id: 'gtk', orientation: 'landscape' },
  { id: 'hydrolysis', orientation: 'landscape' },
]

export type Example = {
  id: string
  /** Backends that produced a settled-frame capture for this example. */
  shots: readonly BackendId[]
  /** A Hydrolysis WebAssembly build is hosted under /demo/<id>/. */
  interactive: boolean
  /** Repository root when the example does not live in water-rs/waterui. */
  source?: string
}

export function shotUrl(backend: BackendId, id: string): string {
  return `/examples/${backend}/${id}.webp`
}

export function demoUrl(id: string): string {
  return `/demo/${id}/index.html`
}

export function sourceUrl(example: Example): string {
  return example.source ?? `https://github.com/water-rs/waterui/tree/main/examples/${example.id}`
}

const ALL: readonly BackendId[] = ['ios', 'macos', 'android', 'gtk', 'hydrolysis']
// SystemIcon has no OS-supplied catalog on self-drawn backends; the example's
// subject is that primitive, so Hydrolysis cannot capture it.
const NO_HYDROLYSIS: readonly BackendId[] = ['ios', 'macos', 'android', 'gtk']
// The native WebView needs a real window to composite; the headless preview
// renderer cannot capture it either.
const WEBVIEW_BACKENDS: readonly BackendId[] = ['ios', 'macos', 'android']
const APPLE: readonly BackendId[] = ['ios', 'macos']
const MACOS_ONLY: readonly BackendId[] = ['macos']

function example(
  id: string,
  shots: readonly BackendId[] = ALL,
  interactive = false,
  source?: string,
): Example {
  return { id, shots, interactive, source }
}

export const examples: Example[] = [
  example('gallery', ALL, true),
  example('form', ALL, true),
  example('navigation'),
  example('map', ALL, true),
  example('flow_markdown'),
  example('video_player'),
  example('filter'),
  example('reply'),
  example('markdown'),
  example('list'),
  example('animation', ALL, true),
  example('gesture'),
  example('gradient'),
  example('shape'),
  example('icons', NO_HYDROLYSIS),
  example('menu'),
  example('picker'),
  example('media_picker'),
  example('snackbar'),
  example('multi_window'),
  example('locale'),
  example('typography-rtl'),
  example('hover'),
  example('drag_drop'),
  example('webview', WEBVIEW_BACKENDS),
  example('reminders'),
  example('starfield'),
  example('stress'),
  example('edge_layout'),
  example('edge_list'),
  example('edge_text'),
  example('waterkit_camera_filters'),
  example('chromium', MACOS_ONLY),
  example('webview-cef', MACOS_ONLY),
  example('liquid_glass', APPLE, false, 'https://github.com/water-rs/apple-backend/tree/dev/Examples/liquid_glass'),
]

export const previewShot = {
  id: 'gallery',
  image: shotUrl('hydrolysis', 'gallery'),
  width: 1800,
  height: 1280,
} as const
