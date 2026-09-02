/**
 * Screenshots under public/examples/, one per example featured in the repository README.
 * Every file here was produced by `water preview`; see scripts/README.md for the command.
 */
export type ExampleShot = {
  id: 'gallery' | 'form' | 'navigation' | 'flow_markdown' | 'map' | 'video_player' | 'filter'
  platform: string
  image: string
  width: number
  height: number
}

export const examples: ExampleShot[] = [
  { id: 'form', platform: 'macOS', image: '/examples/form.png', width: 1824, height: 1488 },
  { id: 'flow_markdown', platform: 'macOS', image: '/examples/flow_markdown.png', width: 1824, height: 1488 },
  { id: 'video_player', platform: 'Android', image: '/examples/video_player.png', width: 940, height: 1850 },
]

export const previewShot: ExampleShot = examples[0]
