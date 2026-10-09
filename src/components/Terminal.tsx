import { Check, Copy } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useCopy } from './useCopy'

export type Command = {
  id: string
  /** What the command does, shown as a shell comment above it. */
  label?: string
  command: string
}

type TerminalProps = {
  commands: Command[]
  title: string
  className?: string
}

/** Shell commands in a terminal card, each with its own copy button. */
export default function Terminal({ commands, title, className = '' }: TerminalProps) {
  const { t } = useTranslation()
  const { copied, copy } = useCopy<string>()

  return (
    <div className={`overflow-hidden rounded-xl bg-[#14161b] text-[#eceef2] ${className}`}>
      <p className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5 text-[14px] font-semibold text-[#a4a9b4]">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
        </span>
        <span className="ml-2">{title}</span>
      </p>
      <ol className="py-2">
        {commands.map((command) => (
          <li key={command.id} className="flex items-center gap-2 py-1.5 pr-2 pl-4">
            <div className="min-w-0 flex-1">
              {command.label === undefined ? null : <p className="font-mono text-[13.5px] text-[#7d838e]"># {command.label}</p>}
              <code className="block overflow-x-auto font-mono text-[14.5px] leading-7 whitespace-nowrap">
                <span className="mr-2.5 text-[#6d737e] select-none" aria-hidden>
                  $
                </span>
                {command.command}
              </code>
            </div>
            <button
              type="button"
              onClick={() => void copy(command.id, command.command)}
              className="shrink-0 rounded-md p-2 text-[#a4a9b4] transition-colors hover:bg-white/10 hover:text-white"
              aria-label={`${t('common.copy')}: ${command.command}`}
              title={copied === command.id ? t('common.copied') : t('common.copy')}
            >
              {copied === command.id ? <Check size={17} aria-hidden /> : <Copy size={17} aria-hidden />}
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}
