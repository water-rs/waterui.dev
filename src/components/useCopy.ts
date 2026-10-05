import { useEffect, useState } from 'react'

/** Copies text to the clipboard and reports which item was copied last, for a short while. */
export function useCopy<Id extends string>() {
  const [copied, setCopied] = useState<Id | undefined>(undefined)

  useEffect(() => {
    if (copied === undefined) {
      return
    }
    const timeout = window.setTimeout(() => setCopied(undefined), 1600)
    return () => window.clearTimeout(timeout)
  }, [copied])

  const copy = async (id: Id, text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(id)
  }

  return { copied, copy }
}
