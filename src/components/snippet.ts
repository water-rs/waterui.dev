/** Finds the 1-based line of `needle` in a snippet, so callouts follow the file rather than a hand-kept number. */
export function lineOf(source: string, needle: string): number {
  const index = source.split('\n').findIndex((line) => line.includes(needle))
  if (index < 0) {
    throw new Error(`snippet has no line containing ${JSON.stringify(needle)}`)
  }
  return index + 1
}
