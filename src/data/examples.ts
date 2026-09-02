/**
 * Screenshots under public/examples/, one per example featured in the repository README.
 * Each was rendered from the example's `#[preview]` function by the workspace CLI:
 *
 *   water preview demo --backend hydrolysis --theme material3 --frame 900x640 \
 *     --path examples/<name> --output <name>.png
 *
 * Hydrolysis emits at 2x scale, hence 1800x1280. See scripts/README.md for the variants
 * used for `filter` (--expr) and `flow_markdown` (--scenario).
 */
export type ExampleShot = {
  id: 'gallery' | 'form' | 'navigation' | 'flow_markdown' | 'map' | 'video_player' | 'filter'
  platform: string
  image: string
  width: number
  height: number
}

const RENDERED_BY = 'Hydrolysis'
const WIDTH = 1800
const HEIGHT = 1280

function shot(id: ExampleShot['id']): ExampleShot {
  return { id, platform: RENDERED_BY, image: `/examples/${id}.webp`, width: WIDTH, height: HEIGHT }
}

export const examples: ExampleShot[] = [
  shot('gallery'),
  shot('form'),
  shot('navigation'),
  shot('flow_markdown'),
  shot('map'),
  shot('video_player'),
  shot('filter'),
]

export const previewShot: ExampleShot = examples[0]
