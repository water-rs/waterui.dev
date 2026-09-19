import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export type Command = {
  id: string
  label: string
  command: string
}

type TerminalProps = {
  commands: Command[]
  title?: string
}

/** A list of shell commands, each with a copy button. */
export default function Terminal({ commands, title }: TerminalProps) {
  const { t } = useTranslation()
  const [copied, setCopied] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (copied === undefined) {
      return
    }
    const timeout = window.setTimeout(() => setCopied(undefined), 1600)
    return () => window.clearTimeout(timeout)
  }, [copied])

  const copy = async (command: Command) => {
    await navigator.clipboard.writeText(command.command)
    setCopied(command.id)
  }

  return (
    <div className="overflow-hidden rounded-md border border-line bg-surface">
      {title === undefined ? null : (
        <div className="flex items-center gap-2 border-b border-line px-4 py-2 font-mono text-xs text-ink-muted">
          <span className="text-water" aria-hidden>
            $
          </span>
          {title}
        </div>
      )}
      <ol className="divide-y divide-line">
        {commands.map((command) => (
          <li key={command.id} className="px-4 py-3">
            <p className="mb-1.5 text-xs text-ink-faint">{command.label}</p>
            <div className="flex items-center justify-between gap-4">
              <code className="min-w-0 overflow-x-auto font-mono text-[13px] whitespace-nowrap md:text-sm">
                <span className="mr-2 text-ink-faint select-none" aria-hidden>
                  $
                </span>
                {command.command}
              </code>
              <button
                type="button"
                onClick={() => void copy(command)}
                className="shrink-0 rounded border border-line px-2 py-1 font-mono text-[11px] text-ink-muted transition-colors hover:border-water hover:text-water"
                aria-label={`${t('quickStart.copy')}: ${command.command}`}
              >
                {copied === command.id ? t('quickStart.copied') : t('quickStart.copy')}
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
