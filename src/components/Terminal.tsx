import { useTranslation } from 'react-i18next'
import { useCopy } from './useCopy'

export type Command = {
  id: string
  label: string
  command: string
}

type TerminalProps = {
  commands: Command[]
  title: string
  className?: string
}

/** Shell commands, one per row: the label above, the command, a copy button. */
export default function Terminal({ commands, title, className = '' }: TerminalProps) {
  const { t } = useTranslation()
  const { copied, copy } = useCopy<string>()

  return (
    <div className={`border border-rule bg-raised ${className}`}>
      <p className="border-b border-rule px-3 py-1.5 font-mono text-[11.5px] text-ink-2">{title}</p>
      <ol>
        {commands.map((command, index) => (
          <li key={command.id} className="flex items-stretch border-b border-rule last:border-b-0">
            <span className="w-9 shrink-0 pt-3 text-center font-mono text-[11px] text-guide" aria-hidden>
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0 flex-1 py-2.5 pr-3">
              <p className="text-[13px] text-ink-2">{command.label}</p>
              <code className="mt-0.5 block overflow-x-auto font-mono text-[12.5px] leading-6 whitespace-nowrap md:text-[13px]">
                <span className="mr-2 text-ink-3 select-none" aria-hidden>
                  $
                </span>
                {command.command}
              </code>
            </div>
            <button
              type="button"
              onClick={() => void copy(command.id, command.command)}
              className="shrink-0 border-l border-rule px-3 text-[12.5px] font-semibold text-ink-2 transition-colors hover:bg-ink hover:text-paper"
              aria-label={`${t('common.copy')}: ${command.command}`}
            >
              {copied === command.id ? t('common.copied') : t('common.copy')}
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}
