export const ROADMAP_URL = 'https://raw.githubusercontent.com/water-rs/waterui/dev/docs/ROADMAP.md'

export type MilestoneItem = { text: string; done: boolean }
export type Milestone = { version: string; title: string; items: MilestoneItem[] }

const HEADING = /^#{1,3}\s+(\d+\.\d+\.\d+)\s+-\s+(.+?)\s*$/
const CHECKBOX = /^-\s+\[( |x|X)\]\s+(.+?)\s*$/
const MARKDOWN_LINK = /\[([^\]]+)\]\([^)]+\)/g
const TRAILING_NOTE = /\s+[—–-]\s+.*$/
const EMOJI_WIP = /\s*\(👷\s*WIP\)/g

/** Turns a checklist line into plain text: strip links, notes after a dash, and status emoji. */
function cleanItem(raw: string) {
  return raw.replace(MARKDOWN_LINK, '$1').replace(EMOJI_WIP, '').replace(TRAILING_NOTE, '').trim()
}

/** Parses the milestone headings and their top-level checkboxes out of ROADMAP.md. */
export function parseRoadmap(markdown: string): Milestone[] {
  const milestones: Milestone[] = []
  for (const line of markdown.split('\n')) {
    const heading = HEADING.exec(line)
    if (heading !== null) {
      milestones.push({ version: heading[1], title: heading[2], items: [] })
      continue
    }
    const checkbox = CHECKBOX.exec(line)
    const current = milestones.at(-1)
    if (checkbox !== null && current !== undefined) {
      current.items.push({ text: cleanItem(checkbox[2]), done: checkbox[1] !== ' ' })
    }
  }
  if (milestones.length === 0) {
    throw new Error('ROADMAP.md contains no milestone headings of the form "## x.y.z - Title"')
  }
  return milestones
}

export async function fetchRoadmap(signal: AbortSignal): Promise<Milestone[]> {
  const response = await fetch(ROADMAP_URL, { signal })
  if (!response.ok) {
    throw new Error(`GitHub answered ${response.status} for ROADMAP.md`)
  }
  return parseRoadmap(await response.text())
}
