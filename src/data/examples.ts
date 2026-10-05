/**
 * Backend × example screenshots staged under public/examples/<backend>/<id>.webp.
 *
 * Every frame comes from the backend repository's nightly end-to-end workflow:
 * the packaged example's settled first frame on a real simulator, emulator or
 * Xvfb session. The self-drawn Hydrolysis backend is not captured here; its
 * examples run live in the page instead (see demos.json).
 *
 * A capture that does not show the example's own UI is never shown. It is
 * listed under `withheld` with the issue tracking the defect, and returns to
 * `shots` once the backend's nightly produces a correct frame.
 */

export type BackendId = 'ios' | 'macos' | 'android' | 'gtk'

export type Backend = {
  id: BackendId
  /** Phones capture portrait frames; desktops capture landscape. */
  orientation: 'portrait' | 'landscape'
  /** Experimental backends are shown apart from the officially supported ones. */
  experimental: boolean
}

export const backends: Backend[] = [
  { id: 'ios', orientation: 'portrait', experimental: false },
  { id: 'macos', orientation: 'landscape', experimental: false },
  { id: 'android', orientation: 'portrait', experimental: false },
  { id: 'gtk', orientation: 'landscape', experimental: true },
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

const NATIVE: readonly BackendId[] = ['ios', 'macos', 'android', 'gtk']
// The native WebView needs a platform web engine; GTK4's is not wired up.
const WEBVIEW_BACKENDS: readonly BackendId[] = ['ios', 'macos', 'android']
const APPLE: readonly BackendId[] = ['ios', 'macos']
const MACOS_ONLY: readonly BackendId[] = ['macos']

const ANDROID_CAPTURE = 'https://github.com/water-rs/android-backend/issues/234'
const REPLY_COMPACT = 'https://github.com/water-rs/waterui/issues/1345'
const GTK_BLACK = 'https://github.com/water-rs/gtk-backend/issues/67'
const GTK_SURFACE_HOLE = 'https://github.com/water-rs/gtk-backend/issues/93'
const NO_CAMERA = 'https://github.com/water-rs/waterui.dev/issues/10'

function example(id: string, captured: readonly BackendId[] = NATIVE, withheld: Example['withheld'] = {}, source?: string): Example {
  return { id, shots: captured.filter((backend) => withheld[backend] === undefined), withheld, source }
}

export const examples: Example[] = [
  example('gallery', NATIVE, { android: ANDROID_CAPTURE }),
  example('form'),
  example('navigation'),
  example('map', NATIVE, { android: ANDROID_CAPTURE }),
  example('flow_markdown'),
  example('video_player', NATIVE, { android: ANDROID_CAPTURE, gtk: GTK_SURFACE_HOLE }),
  example('filter', NATIVE, { android: ANDROID_CAPTURE }),
  example('reply', NATIVE, { ios: REPLY_COMPACT, android: REPLY_COMPACT }),
  example('markdown'),
  example('list'),
  example('animation'),
  example('gesture'),
  example('gradient', NATIVE, { android: ANDROID_CAPTURE }),
  example('shape'),
  example('icons'),
  example('menu'),
  example('picker', NATIVE, { android: ANDROID_CAPTURE }),
  example('media_picker'),
  example('snackbar'),
  example('multi_window', NATIVE, { android: ANDROID_CAPTURE }),
  example('locale'),
  example('typography-rtl', NATIVE, { gtk: GTK_BLACK }),
  example('hover'),
  example('drag_drop'),
  example('webview', WEBVIEW_BACKENDS, { android: ANDROID_CAPTURE }),
  example('reminders'),
  example('starfield', NATIVE, { android: ANDROID_CAPTURE }),
  example('stress', NATIVE, { gtk: GTK_BLACK }),
  example('edge_layout'),
  example('edge_list'),
  example('edge_text'),
  example('waterkit_camera_filters', NATIVE, { ios: NO_CAMERA, macos: NO_CAMERA, android: NO_CAMERA, gtk: NO_CAMERA }),
  example('chromium', MACOS_ONLY),
  example('webview-cef', MACOS_ONLY),
  example('liquid_glass', APPLE, {}, 'https://github.com/water-rs/apple-backend/tree/dev/Examples/liquid_glass'),
]

/** The `water preview` output shown in the previews section. */
export const previewShot = {
  id: 'gallery',
  image: '/preview/gallery.webp',
  width: 1800,
  height: 1280,
} as const
